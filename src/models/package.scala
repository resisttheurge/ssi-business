import java.util.UUID

import scalikejdbc.TypeBinder
import scalikejdbc.async._

import scala.concurrent._

package object models {


  object syntax {

    object all extends All
    object types extends Types
    object values extends Values
    object implicits extends Implicits

    trait All extends Types with Values with Implicits

    trait Types {
      type EC = ExecutionContext
      type Session = AsyncDBSession
      type ECS = (EC, Session)
    }

    trait Values {
      val EC = ExecutionContext
      val DB = AsyncDB
    }

    trait Implicits {

      implicit lazy val `Role Companion` = Role
      implicit lazy val `Token Companion` = Token
      implicit lazy val `User Companion` = User
      implicit lazy val `UserRole Companion` = UserRole

      implicit lazy val `UUID TypeBinder` = implicitly[TypeBinder[String]].map(UUID.fromString)
      implicit lazy val `Option[UUID] TypeBinder` = implicitly[TypeBinder[Option[String]]]

      import types._

      implicit def `ECS -> EC destructor`(implicit ecs: ECS): EC = ecs._1
      implicit def `ECS -> Session destructor`(implicit ecs: ECS): Session = ecs._2

    }

  }

}
