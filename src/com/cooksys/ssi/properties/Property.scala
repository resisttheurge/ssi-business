package com.cooksys.ssi.properties

import com.typesafe.config.{Config, ConfigFactory}

object Property {

  implicit def apply[T](path: String)
  (implicit vpt: PropertyExtractor[T], config: Config = ConfigFactory.load()): T
    = vpt(path)

}

abstract class Property[T : PropertyExtractor](implicit val parent: Option[Property[Config]] = None) {
  this: Product =>

  implicit val asParent
    = Some(this)

  lazy val path: String
    = parent match {
      case Some(prop) => s"${prop.path}.$productPrefix"
      case _ => productPrefix
    }

  def apply()(implicit conf: Config = ConfigFactory.load()): T
    = Property[T](path)

}
