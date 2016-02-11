package com.cooksys.ssi.route

import akka.http.scaladsl.server.Route
import com.cooksys.ssi.model.schema.Customer
import slick.driver.MySQLDriver.api._
import slick.schema.Tables._

import scala.concurrent.{ExecutionContext, Future}

class CustomerRoute(implicit val db: Database, ec: ExecutionContext) extends BaseRoute with Customer.Implicits {

  override def internal: Route =
    pathPrefix("customers") {
      pathEndOrSingleSlash {
        get {
          index
        } ~ post {
          entity(as[Customer.Create]) { customer =>
            create(customer)
          }
        }
      } ~ pathPrefix(IntNumber) { id: Int =>
        pathEndOrSingleSlash {
          get {
            single(id)
          } ~ patch {
            entity(as[Customer.Update]) { customer =>
              update(id, customer)
            }
          } ~ delete {
            destroy(id)
          }
        }
      }
    }

  def index: Future[Customer.Index] =
    db.run(
      for (customers <- Customers.result)
        yield Customer.Index(
          customers.map(c => c: Customer)
        )
    )

  def single(id: Int): Future[Customer.Result] =
    db.run(
      for (option <- Customers.filter(_.id === id).result.headOption)
        yield Customer.Result(
          option.isDefined,
          option.map(c => c: Customer),
          None,
          None,
          if (option.isDefined) None
          else Some(s"Customer with id=$id does not exist")
        )
    )

  def create(customer: Customer.Create): Future[Customer.Result] =
    db.run(
      for {
        id <- (Customers returning Customers.map(_.id)) += customer
        option <- Customers.filter(_.id === id).result.headOption
      }
        yield Customer.Result(
          option.isDefined,
          option.map(c => c: Customer),
          None,
          None,
          if (option.isDefined) None
          else Some(s"Customer could not be created")
        )
    )

  def update(id: Int, customer: Customer.Update): Future[Customer.Result] =
    db.run(
      for {
        before <- Customers.filter(_.id === id).result.headOption
        rows <- Customers.filter(_.id === id).map(_.label).update(customer.label)
        after <- Customers.filter(_.id === id).result.headOption
      }
        yield Customer.Result(
          rows != 0,
          None,
          before.map(c => c: Customer),
          after.map(c => c: Customer),
          if(rows != 0) None else Some(s"Customer with id=$id does not exist")
        )
    )

  def destroy(id: Int): Future[Customer.Result] =
    db.run(
      for {
        before <- Customers.filter(_.id === id).result.headOption
        rows <- Customers.filter(_.id === id).delete
      }
        yield Customer.Result(
          rows != 0,
          before.map(c => c: Customer),
          None,
          None,
          if(rows != 0) None else Some(s"Customer with id=$id does not exist")
        )
    )

}
