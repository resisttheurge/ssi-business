import java.util.UUID

import models.{Role, Token, User, UserRole}
import scalikejdbc.TypeBinder
import scalikejdbc.async.{AsyncDB, AsyncDBSession}

import scala.concurrent.ExecutionContext

package object utils {

  object syntax {

    object all extends All

    object types extends Types

    object values extends Values

    object implicits extends Implicits

    trait All extends Types with Values with Implicits

    trait Types {



    }

    trait Values {



    }

    trait Implicits {

      implicit lazy val `Role Companion` = Role
      implicit lazy val `Token Companion` = Token
      implicit lazy val `User Companion` = User
      implicit lazy val `UserRole Companion` = UserRole

      implicit lazy val `UUID TypeBinder` = implicitly[TypeBinder[String]].map(UUID.fromString)
      implicit lazy val `Option[UUID] TypeBinder` = implicitly[TypeBinder[Option[String]]].map(opts => opts.map(UUID.fromString))

      import types._



    }

  }


}
