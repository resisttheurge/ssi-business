package lib.actor

import slick.driver.MySQLDriver.api._

trait DB[+This <: DB[This]] extends Base[This] {
  this: This =>

  implicit val db: Database = Database.forConfig("database.test", this.config)

  @throws[Exception](classOf[Exception])
  override def postStop(): Unit = {
    db.close()
  }

}
