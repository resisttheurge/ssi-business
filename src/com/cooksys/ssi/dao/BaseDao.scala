package com.cooksys.ssi.dao

import com.cooksys.ssi.utils.AllUtilities
import slick.driver.MySQLDriver

import scala.concurrent.{Future, ExecutionContext}

trait BaseDao
  extends AllUtilities
    with MySQLDriver.API {

  type DB = Database
  type EC = ExecutionContext

  implicit def run[R, S <: NoStream, E <: Effect](action: DBIOAction[R, S, E])(implicit db: DB, ec: EC): Future[R] =
    db.run(action)

}
