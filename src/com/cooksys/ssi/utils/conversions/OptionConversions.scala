package com.cooksys.ssi.utils.conversions

object OptionConversions extends OptionConversions
trait OptionConversions {
  implicit def optLift[T](t: T): Option[T]
    = Option(t)
  implicit def optFlatMap[A, B](opta: Option[A])(implicit f: A => Option[B]): Option[B]
    = opta.flatMap(f)
}
