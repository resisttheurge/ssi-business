package com.cooksys.ssi.utils.conversions

object AllConversions extends AllConversions

trait AllConversions
  extends Base64Conversions
    with DurationConversions
    with EnumConversions
    with ModelConversions
    with RowConversions
    with SeqConversions
    with OptionConversions