package com.cooksys.ssi.dao

import com.cooksys.ssi.models.{Response, Updated}
import com.cooksys.ssi.utils.AllUtilities
import slick.driver.MySQLDriver

import scala.concurrent.{ExecutionContext, Future}

trait CrudDao[Model]
  extends BaseDao {

  def index(implicit db: DB, ec: EC): Future[Response[Seq[Model]]] = indexAction
  def create(model: Model)(implicit db: DB, ec: EC): Future[Response[Model]] = createAction(model)
  def read(id: Int)(implicit db: DB, ec: EC): Future[Response[Model]] = readAction(id)
  def update(id: Int, model: Model)(implicit db: DB, ec: EC): Future[Response[Updated[Model]]] = updateAction(id, model)
  def destroy(id: Int)(implicit db: DB, ec: EC): Future[Response[Model]] = destroyAction(id)

  def indexAction(implicit ec: EC): DBIOAction[Response[Seq[Model]], NoStream, _]
  def createAction(model: Model)(implicit ec: EC): DBIOAction[Response[Model], NoStream, _]
  def readAction(id: Int)(implicit ec: EC): DBIOAction[Response[Model], NoStream, _]
  def updateAction(id: Int, model: Model)(implicit ec: EC): DBIOAction[Response[Updated[Model]], NoStream, _]
  def destroyAction(id: Int)(implicit ec: EC): DBIOAction[Response[Model], NoStream, _]

}
