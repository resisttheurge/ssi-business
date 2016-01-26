package app.db

import slick.lifted._

abstract class Model[+This <: Model[This]] {
  this: This =>

}

trait ModelOps[M <: Model[M]] {

  trait Index
  trait Find
  trait Create
  trait Update
  trait Delete

}

abstract class ModelQuery[M <: Model[M], Ops <: ModelOps[M], Row, Table <: AbstractTable[Row]](cons: (Tag) => Table) extends TableQuery(cons) {

  def index(op: Ops#Index)
  def find(op: Ops#Find)
  def create(op: Ops#Create)
  def update(op: Ops#Update)
  def delete(op: Ops#Delete)

}
