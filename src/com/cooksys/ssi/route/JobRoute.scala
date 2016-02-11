package com.cooksys.ssi.route

import akka.http.scaladsl.server.Route
import com.cooksys.ssi.model.schema._
import slick.driver.MySQLDriver.api._
import slick.schema.Tables._

import scala.concurrent.{ExecutionContext, Future}

class JobRoute(implicit val db: Database, ec: ExecutionContext)
  extends BaseRoute
    with Job.Implicits
    with AllJobAddresses.Implicits
    with JobSchedules.Implicits {

  override def internal: Route =
    pathPrefix("jobs") {
      pathEndOrSingleSlash {
        get {
          index
        } ~ post {
          entity(as[Job.Create]) { job =>
            create(job)
          }
        }
      } ~ pathPrefix(IntNumber) { id: Int =>
        pathEndOrSingleSlash {
          get {
            single(id)
          } ~ patch {
            entity(as[Job.Update]) { job =>
              ???
            }
          } ~ delete {
            ???
          }
        } ~ pathPrefix("addresses") {
          pathEndOrSingleSlash {
            get {
              indexJobAddresses(id)
            }
          } ~ pathPrefix(Segment) { addressType =>
            pathEndOrSingleSlash {
              get {
                ???
              } ~ patch {
                entity(as[Address.Update]) { schedule =>
                  ???
                }
              } ~ delete {
                ???
              }
            }
          }
        } ~ pathPrefix("schedules") {
          pathEndOrSingleSlash {
            get {
              indexJobSchedules(id)
            }
          } ~ pathPrefix(Segment) { scheduleType =>
            pathEndOrSingleSlash {
              get {
                ???
              } ~ patch {
                entity(as[Schedule.Update]) { schedule =>
                  ???
                }
              } ~ delete {
                ???
              }
            }
          }
        } ~ pathPrefix("addenda") {
          pathEndOrSingleSlash {
            get {
              ???
            } ~ post {
              ???
            }
          } ~ pathPrefix(IntNumber) { addendumId =>
            pathEndOrSingleSlash {
              get {
                ???
              } ~ patch {
                entity(as[Addendum.Update]) { addendum =>
                  ???
                }
              } ~ delete {
                ???
              }
            }
          }
        }
      }
    }

  val indexQuery = Compiled(Jobs.withDependents).result

  def index: Future[Job.Index] =
    db.run(
      for (jobs <- indexQuery)
        yield {
          Job.Index(
            jobs.par.map(j => j: Job).seq
          )
        }
    )

  val indexAddressesQuery =
    Compiled((id: Rep[Int]) => JobAddresses.byJobId(id) join Addresses on (_.addressId === _.id))

  def indexJobAddresses(id: Int): Future[AllJobAddresses] =
    db.run(
      for {
        results <- indexAddressesQuery(id).result
      } yield {
        results.toSet: AllJobAddresses
      }
    )

  val indexSchedulesQuery =
    Compiled((id: Rep[Int]) => Schedules.byJobId(id))

  def indexJobSchedules(id: Int): Future[JobSchedules] =
    db.run(
      for {
        results <- indexSchedulesQuery(id).result
      } yield {
        results.toSet: JobSchedules
      }
    )

  val singleQuery =
    Compiled((id: Rep[Int]) => Jobs.byId(id).withDependents)


  def single(id: Int): Future[Job.Result] =
    db.run(
      for (option <- singleQuery(id).result.headOption)
        yield {
          Job.Result(
            option.isDefined,
            option.map(j => j: Job),
            None,
            None,
            if (option.isDefined) None
            else Some(s"Job with id=$id does not exist")
          )
        })

  def create(job: Job.Create): Future[Job.Result] =
    db.run(
      for {
        id <- (Jobs returning Jobs.map(_.id)) += job
        option <- singleQuery(id).result.headOption
      }
        yield {
          Job.Result(
            option.isDefined,
            option.map(j => j: Job),
            None,
            None,
            if (option.isDefined) None
            else Some(s"Job could not be created")
          )
        }
    )
}
