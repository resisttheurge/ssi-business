package com.cooksys.ssi.business.properties

import com.typesafe.config.{Config, ConfigFactory}

import scala.reflect.ClassTag

object Property {

  def apply[A: ClassTag](path: String, conf: Config = ConfigFactory.load()): A = conf.getAnyRef(path).asInstanceOf[A]

}

abstract class Property[A: ClassTag](implicit val parent: Option[Property[_]] = None) {
  this: Product =>

  implicit val asParent = Some(this)

  def name: String = this.productPrefix

  def path: String =
    parent match {
      case Some(prop) => s"${prop.path}.$name"
      case _ => name
    }

  def apply(): A = Property[A](path)

  def apply(conf: Config): A = Property[A](path, conf)

}
