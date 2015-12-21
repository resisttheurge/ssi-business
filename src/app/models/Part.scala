package app.models

case class Part(pk: Option[Int],
                partType: PartType,
                number: String,
                description: String)
