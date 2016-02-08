package com.cooksys.ssi.actor

import com.cooksys.ssi.properties
import slick.driver.MySQLDriver.api._

trait DatabaseActor extends BaseActor {

  implicit val db = Database.forConfig(properties.database.default(), this.config)

  @throws[Exception](classOf[Exception])
  override def postStop(): Unit = {
    log.debug("stopping database actor")
    close()
  }

  private def close(): Unit = {
    log.debug("closing existing database")
    db.close()
  }

}
