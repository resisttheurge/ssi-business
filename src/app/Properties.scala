package app

import lib.property.Property

trait Properties {

  case object http extends Property[AnyRef] {

    case object bind extends Property[AnyRef] {

      case object interface extends Property[String]

      case object port extends Property[Int]

      case object timeout extends Property[Int]

    }

  }

}
