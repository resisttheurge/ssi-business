package com.cooksys.ssi.models

case class Response[T](success: Boolean,
                       message: Option[String] = None,
                       data: Option[T] = None)
