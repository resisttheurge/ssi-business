package com.cooksys.ssi.route

import com.cooksys.ssi.model.schema.Carrier
import slick.driver.MySQLDriver.api._
import slick.schema.Tables._
import spray.routing.Route

import scala.concurrent.{ExecutionContext, Future}

class CarrierRoute(implicit val db: Database, ec: ExecutionContext) extends BaseRoute with Carrier.Implicits {

  override def internal: Route =
    pathPrefix("carriers") {
      pathEndOrSingleSlash {
        get {
          index
        } ~ post {
          entity(as[Carrier.Create]) { carrier =>
            create(carrier)
          }
        }
      } ~ path(IntNumber) { id: Int =>
        get {
          single(id)
        } ~ patch {
          entity(as[Carrier.Update]) { carrier =>
            update(id, carrier)
          }
        } ~ delete {
          destroy(id)
        }
      }
    }

  def index: Future[Carrier.Index] =
    db.run(
      for (carriers <- Carriers.result)
        yield Carrier.Index(
          carriers.map(c => c: Carrier)
        )
    )

  def single(id: Int): Future[Carrier.Result] =
    db.run(
      for (option <- Carriers.filter(_.id === id).result.headOption)
        yield Carrier.Result(
          option.isDefined,
          option.map(c => c: Carrier),
          if (option.isDefined) None
          else Some(s"Carrier with id=$id does not exist")
        )
    )

  def create(carrier: Carrier.Create): Future[Carrier.Result] =
    db.run(
      for {
        id <- (Carriers returning Carriers.map(_.id)) += Carrier(None, carrier.label)
        option <- Carriers.filter(_.id === id).result.headOption
      }
        yield Carrier.Result(
          option.isDefined,
          option.map(c => c: Carrier),
          if (option.isDefined) None
          else Some(s"Carrier could not be created")
        )
    )

  def update(id: Int, carrier: Carrier.Update): Future[Carrier.Result] =
    db.run(
      for {
        rows <- Carriers.filter(_.id === id).map(_.label).update(carrier.label)
        after <- Carriers.filter(_.id === id).result.headOption
      }
        yield Carrier.Result(
          rows != 0,
          after.map(c => c: Carrier),
          if(rows != 0) None else Some(s"Carrier with id=$id does not exist")
        )
    )

  def destroy(id: Int): Future[Carrier.Result] =
    db.run(
      for {
        before <- Carriers.filter(_.id === id).result.headOption
        rows <- Carriers.filter(_.id === id).delete
      }
        yield Carrier.Result(
          rows != 0,
          before.map(c => c: Carrier),
          if(rows != 0) None else Some(s"Carrier with id=$id does not exist")
        )
    )

}
