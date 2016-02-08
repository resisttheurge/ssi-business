package com.cooksys.ssi

import com.cooksys.ssi.property.Property

trait Properties {

  case object server extends Property[AnyRef] {

    case object timeout extends Property[Int]

  }

  case object bind extends Property[AnyRef] {

    case object interface extends Property[String]

    case object port extends Property[Int]

    case object timeout extends Property[Int]

  }

  case object database extends Property[AnyRef] {

    case object default extends Property[String]

  }

}
