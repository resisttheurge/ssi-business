package com.cooksys.ssi.models

case class JobAddresses(shipping: Option[Address],
                        invoicing: Option[Address])
