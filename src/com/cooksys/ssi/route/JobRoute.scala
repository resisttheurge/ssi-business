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

  val indexQuery = Compiled(Jobs.withDependents)

  def index: Future[Job.Index] =
    db.run(
      for (jobs <- indexQuery.result)
      yield {
        Job.Index(
          jobs.par.map(j => j: Job).seq
        )
      }
  )

  val singleQuery =
    Compiled((id: Rep[Int]) => Jobs.filter(_.id === id).withDependents)


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

  def update(id: Int, job: Job.Update): Future[Job.Result] =
    db.run(
      for {
        before <- singleQuery(id).result.headOption
        rows <- Jobs.byId(id).update(job)
        after <- singleQuery(id).result.headOption
      }
        yield Job.Result(
          rows != 0,
          None,
          before.map(j => j: Job),
          after.map(j => j: Job),
          if (rows != 0) None else Some(s"Job with id=$id does not exist")
        )
    )

  def destroy(id: Int): Future[Job.Result] =
    db.run(
      for {
        before <- singleQuery(id).result.headOption
        rows <- Jobs.byId(id).delete
      }
        yield Job.Result(
          rows != 0,
          before.map(j => j: Job),
          None,
          None,
          if (rows != 0) None else Some(s"Job with id=$id does not exist")
        )
    )

}
