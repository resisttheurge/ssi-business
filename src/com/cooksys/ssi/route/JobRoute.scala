package com.cooksys.ssi.route

import com.cooksys.ssi.model.schema.Job
import slick.driver.MySQLDriver.api._
import slick.schema.Tables._
import spray.routing.Route

import scala.concurrent.{ExecutionContext, Future}

class JobRoute(implicit val db: Database, ec: ExecutionContext) extends BaseRoute with Job.Implicits {

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
              update(id, job)
            }
          } ~ delete {
            destroy(id)
          }
        }
      }
    }

  def index: Future[Job.Index] =
    db.run(
      for (jobs <- Jobs.result)
        yield Job.Index(
          jobs.map(p => p: Job)
        )
    )

  def single(id: Int): Future[Job.Result] =
    db.run(
      for (option <- Jobs.filter(_.id === id).result.headOption)
        yield Job.Result(
          option.isDefined,
          option.map(p => p: Job),
          None,
          None,
          if (option.isDefined) None
          else Some(s"Job with id=$id does not exist")
        )
    )

  def create(job: Job.Create): Future[Job.Result] =
    db.run(
      for {
        id <- (Jobs returning Jobs.map(_.id)) += job
        option <- Jobs.filter(_.id === id).result.headOption
      }
        yield Job.Result(
          option.isDefined,
          option.map(p => p: Job),
          None,
          None,
          if (option.isDefined) None
          else Some(s"Job could not be created")
        )
    )

  def update(id: Int, job: Job.Update): Future[Job.Result] =
    db.run(
      for {
        before <- Jobs.filter(_.id === id).result.headOption
        rows <- Jobs.filter(_.id === id).map(p => ()).update()
        after <- Jobs.filter(_.id === id).result.headOption
      }
        yield Job.Result(
          rows != 0,
          None,
          before.map(p => p: Job),
          after.map(p => p: Job),
          if(rows != 0) None else Some(s"Job with id=$id does not exist")
        )
    )

  def destroy(id: Int): Future[Job.Result] =
    db.run(
      for {
        before <- Jobs.filter(_.id === id).result.headOption
        rows <- Jobs.filter(_.id === id).delete
      }
        yield Job.Result(
          rows != 0,
          before.map(p => p: Job),
          None,
          None,
          if(rows != 0) None else Some(s"Job with id=$id does not exist")
        )
    )

}
