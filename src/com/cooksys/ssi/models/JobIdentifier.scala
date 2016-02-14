package com.cooksys.ssi.models

case class JobIdentifier(prefix: JobPrefix,
                         year: Int,
                         label: String)