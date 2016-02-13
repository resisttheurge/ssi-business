package com.cooksys.ssi.models

sealed trait JobPrefix

object JobPrefix {

  lazy val all = Set(
    B, F, FC, FE, FR, FS, M, MF, MT, RG, BM, LM, MM, D, G, DR, EE, ME, MS, TM
  )

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

  case object BM extends JobPrefix

  case object LM extends JobPrefix

  case object MM extends JobPrefix

  case object D extends JobPrefix

  case object G extends JobPrefix

  case object DR extends JobPrefix

  case object EE extends JobPrefix

  case object ME extends JobPrefix

  case object MS extends JobPrefix

  case object TM extends JobPrefix

}