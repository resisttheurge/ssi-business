package com.cooksys.ssi.models

case class Updated[T](before: Option[T],
                      after: Option[T])
