package com.cooksys.ssi.properties

import com.typesafe.config.Config

object DatabaseProperties extends DatabaseProperties
trait DatabaseProperties extends PropertyExtractor.Instances {

  case object database extends Property[Config] {

    case object default extends Property[String]

  }

}
