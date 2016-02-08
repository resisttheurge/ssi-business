package com.cooksys.ssi.route

import com.cooksys.ssi.model.schema.Vendor
import slick.driver.MySQLDriver.api._
import slick.schema.Tables._
import spray.routing.Route

import scala.concurrent.{ExecutionContext, Future}

class VendorRoute(implicit val db: Database, ec: ExecutionContext) extends BaseRoute with Vendor.Implicits {

  override def internal: Route =
    pathPrefix("vendors") {
      pathEndOrSingleSlash {
        get {
          index
        } ~ post {
          entity(as[Vendor.Create]) { vendor =>
            create(vendor)
          }
        }
      } ~ path(IntNumber) { id: Int =>
        get {
          single(id)
        } ~ patch {
          entity(as[Vendor.Update]) { vendor =>
            update(id, vendor)
          }
        } ~ delete {
          destroy(id)
        }
      }
    }

  def index: Future[Vendor.Index] =
    db.run(
      for (vendors <- Vendors.result)
        yield Vendor.Index(
          vendors.map(v => v: Vendor)
        )
    )

  def single(id: Int): Future[Vendor.Result] =
    db.run(
      for (option <- Vendors.filter(_.id === id).result.headOption)
        yield Vendor.Result(
          option.isDefined,
          option.map(v => v: Vendor),
          if (option.isDefined) None
          else Some(s"Vendor with id=$id does not exist")
        )
    )

  def create(vendor: Vendor.Create): Future[Vendor.Result] =
    db.run(
      for {
        id <- (Vendors returning Vendors.map(_.id)) += Vendor(None, vendor.label)
        option <- Vendors.filter(_.id === id).result.headOption
      }
        yield Vendor.Result(
          option.isDefined,
          option.map(v => v: Vendor),
          if (option.isDefined) None
          else Some(s"Vendor could not be created")
        )
    )

  def update(id: Int, vendor: Vendor.Update): Future[Vendor.Result] =
    db.run(
      for {
        rows <- Vendors.filter(_.id === id).map(_.label).update(vendor.label)
        after <- Vendors.filter(_.id === id).result.headOption
      }
        yield Vendor.Result(
          rows != 0,
          after.map(v => v: Vendor),
          if(rows != 0) None else Some(s"Vendor with id=$id does not exist")
        )
    )

  def destroy(id: Int): Future[Vendor.Result] =
    db.run(
      for {
        before <- Vendors.filter(_.id === id).result.headOption
        rows <- Vendors.filter(_.id === id).delete
      }
        yield Vendor.Result(
          rows != 0,
          before.map(v => v: Vendor),
          if(rows != 0) None else Some(s"Vendor with id=$id does not exist")
        )
    )

}
