package com.cooksys.ssi.model

import akka.actor.Props
import com.cooksys.ssi.actor.DatabaseActor

object ModelActor {
  def props: Props = Props(classOf[ModelActor])
}

class ModelActor extends DatabaseActor {

  override def receive: Receive = ???

}
