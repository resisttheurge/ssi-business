package com.cooksys.ssi.actor

import slick.driver.MySQLDriver.api._

trait DatabaseActor extends BaseActor {

  implicit var db: Database = null

  override def preStart(): Unit = {
    db = Database.forConfig("database.test", this.config)
  }

  @throws[Exception](classOf[Exception])
  override def postStop(): Unit = {
    db.close()
  }

}
