package properties

import com.typesafe.config.{Config, ConfigFactory}

import scala.reflect.ClassTag

object Property {

  def apply[A: ClassTag](conf: Config, path: String): A = conf.getAnyRef(path).asInstanceOf[A]

}

abstract class Property[A: ClassTag](implicit val parent: Option[Property[_]] = None) {
  this: Product =>

  implicit val asParent = Some(this)

  lazy val path: String =
    parent match {
      case Some(prop) => s"${prop.path}.$productPrefix"
      case _ => productPrefix
    }

  def apply()(implicit conf: Config = ConfigFactory.load()): A = Property[A](conf, path)

}
