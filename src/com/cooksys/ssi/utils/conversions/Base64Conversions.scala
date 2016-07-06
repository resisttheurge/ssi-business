package com.cooksys.ssi.utils.conversions

import java.util.Base64

object Base64Conversions extends Base64Conversions

trait Base64Conversions {

  implicit def fromByteArray(b: Array[Byte]): String =
    Base64.getEncoder.encodeToString(b)

}
