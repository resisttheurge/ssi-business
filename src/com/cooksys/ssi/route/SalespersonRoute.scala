package com.cooksys.ssi.route

import akka.http.scaladsl.server.Route
import com.cooksys.ssi.model.schema.Salesperson
import slick.driver.MySQLDriver.api._
import slick.schema.Tables._

import scala.concurrent.{ExecutionContext, Future}

class SalespersonRoute(implicit val db: Database, ec: ExecutionContext) extends BaseRoute with Salesperson.Implicits {

  override def internal: Route =
    pathPrefix("salespeople") {
      pathEndOrSingleSlash {
        get {
          index
        } ~ post {
          entity(as[Salesperson.Create]) { salesperson =>
            create(salesperson)
          }
        }
      } ~ pathPrefix(IntNumber) { id: Int =>
        pathEndOrSingleSlash {
          get {
            single(id)
          } ~ patch {
            entity(as[Salesperson.Update]) { salesperson =>
              update(id, salesperson)
            }
          } ~ delete {
            destroy(id)
          }
        }
      }
    }

  def index: Future[Salesperson.Index] =
    db.run(
      for (salespeople <- Salespeople.result)
        yield Salesperson.Index(
          salespeople.map(s => s: Salesperson)
        )
    )

  def single(id: Int): Future[Salesperson.Result] =
    db.run(
      for (option <- Salespeople.filter(_.id === id).result.headOption)
        yield Salesperson.Result(
          option.isDefined,
          option.map(s => s: Salesperson),
          None,
          None,
          if (option.isDefined) None
          else Some(s"Salesperson with id=$id does not exist")
        )
    )

  def create(salesperson: Salesperson.Create): Future[Salesperson.Result] =
    db.run(
      for {
        id <- (Salespeople returning Salespeople.map(_.id)) += salesperson
        option <- Salespeople.filter(_.id === id).result.headOption
      }
        yield Salesperson.Result(
          option.isDefined,
          option.map(s => s: Salesperson),
          None,
          None,
          if (option.isDefined) None
          else Some(s"Salesperson could not be created")
        )
    )

  def update(id: Int, salesperson: Salesperson.Update): Future[Salesperson.Result] =
    db.run(
      for {
        before <- Salespeople.filter(_.id === id).result.headOption
        rows <- Salespeople.filter(_.id === id).map(_.label).update(salesperson.label)
        after <- Salespeople.filter(_.id === id).result.headOption
      }
        yield Salesperson.Result(
          rows != 0,
          None,
          before.map(s => s: Salesperson),
          after.map(s => s: Salesperson),
          if(rows != 0) None else Some(s"Salesperson with id=$id does not exist")
        )
    )

  def destroy(id: Int): Future[Salesperson.Result] =
    db.run(
      for {
        before <- Salespeople.filter(_.id === id).result.headOption
        rows <- Salespeople.filter(_.id === id).delete
      }
        yield Salesperson.Result(
          rows != 0,
          before.map(s => s: Salesperson),
          None,
          None,
          if(rows != 0) None else Some(s"Salesperson with id=$id does not exist")
        )
    )

}
