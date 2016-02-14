package com.cooksys.ssi.properties

import com.typesafe.config.Config

object BindingProperties extends BindingProperties
trait BindingProperties extends PropertyExtractor.Instances {

  case object bind extends Property[Config] {

    case object interface extends Property[String]

    case object port extends Property[Int]

  }

}
