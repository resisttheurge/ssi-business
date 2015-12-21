package app.models

case class JobId(prefix: JobPrefix,
                 year: Int,
                 label: String)
