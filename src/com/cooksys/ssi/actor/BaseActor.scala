package com.cooksys.ssi.actor

import akka.actor.{Actor, ActorLogging}
import com.typesafe.config.{ConfigFactory, Config}

trait BaseActor extends Actor with ActorLogging {

  implicit lazy val config: Config = ConfigFactory.load()

  implicit lazy val system = context.system

  implicit lazy val dispatcher = context.dispatcher

}
