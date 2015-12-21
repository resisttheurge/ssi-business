package app.models

sealed trait JobPrefix

object JobPrefix {
  case object B extends JobPrefix
  case object F extends JobPrefix
  case object FC extends JobPrefix
  case object FE extends JobPrefix
  case object FR extends JobPrefix
  case object FS extends JobPrefix
  case object M extends JobPrefix
  case object MF extends JobPrefix
  case object MT extends JobPrefix
  case object RG extends JobPrefix
}