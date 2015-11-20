package app

import java.sql.ResultSet
import java.util.UUID

import scalikejdbc.TypeBinder

package object models {

  implicit val `Role Model Companion` = Role
  implicit val `Token Model Companion` = Token
  implicit val `User Model Companion` = User
  implicit val `UserRole Model Companion` = UserRole

  implicit object `TypeBinder[UUID]` extends TypeBinder[UUID] {
    override def apply(rs: ResultSet, columnIndex: Int): UUID = UUID.fromString(rs.getString(columnIndex))
    override def apply(rs: ResultSet, columnLabel: String): UUID = UUID.fromString(rs.getString(columnLabel))
  }

}
