package com.cooksys.ssi.actor

import com.cooksys.ssi.properties
import slick.driver.MySQLDriver.api._

trait DatabaseActor extends BaseActor {

  implicit var db: Database = null

  @throws[Exception](classOf[Exception])
  override def preStart(): Unit = {
    log.debug("starting database actor")
    close()
    db = Database.forConfig(properties.database.default(), this.config)
  }

  @throws[Exception](classOf[Exception])
  override def postStop(): Unit = {
    log.debug("stopping database actor")
    close()
  }

  private def close(): Unit = {
    if(db != null) {
      log.debug("closing existing database")
      db.close()
      db = null
    }
  }

}
