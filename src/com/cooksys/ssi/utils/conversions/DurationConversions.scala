package com.cooksys.ssi.utils.conversions

import java.time.{Duration => JDuration}
import scala.concurrent.duration.{Duration, FiniteDuration}

object DurationConversions extends DurationConversions
trait DurationConversions {
  implicit def javaDuration2ScalaDuration(duration: JDuration): Duration
    = Duration.fromNanos(duration.toNanos)
}
