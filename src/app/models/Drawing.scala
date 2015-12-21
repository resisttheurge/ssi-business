package app.models

import java.sql.Date

case class Drawing(pk: Option[Int],
                   jobPk: Int,
                   label: String,
                   drawingType: DrawingType,
                   title: String,
                   revision: String,
                   revisionDate: Date,
                   startDate: Date,
                   shopDate: Date,
                   fieldDate: Date,
                   shop: Shop,
                   marks: Vector[Mark])
