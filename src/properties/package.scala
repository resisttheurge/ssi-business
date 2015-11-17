package object properties {

  case object server extends Property[AnyRef] {

    case object cwd extends Property[String]

    case object database extends Property[AnyRef] {

      case object name extends Property[String]

      case object url extends Property[String]

      case object username extends Property[String]

      case object password extends Property[String]

    }

    case object http extends Property[AnyRef] {

      case object bind extends Property[AnyRef] {

        case object interface extends Property[String]

        case object port extends Property[Int]

        case object timeout extends Property[Int]


      }

    }

  }

}
