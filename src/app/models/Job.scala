package app.models

case class Job(prefix: String,
               year: Int,
               label: String,
               revision: Option[String]
              ) {

}
