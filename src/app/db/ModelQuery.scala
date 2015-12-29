package app.db

import slick.lifted._

abstract class Model[+This <: Model[This]](companion: ModelCompanion[This])

trait ModelOps[M <: Model[M]] {

  trait Find
  trait Create
  trait Update
  trait Delete

}

class ModelQuery[M <: Model[M], Row, Table <: AbstractTable[Row]](cons: (Tag) => Table) extends TableQuery(cons) {

}
