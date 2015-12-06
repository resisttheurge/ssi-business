package api

case class Job(id: JobId,
               current: JobRecord,
               previous: Option[Seq[JobRecord]] // most recent first
              )

case class JobId(prefix: String, // could be enum
                 year: Int, // 4 digits, display as 2
                 label: String
                )

case class JobRecord(revision: String, // empty if base revision
                     active: Boolean,
                     created: String, // timestamp format: `yyyy-mm-dd hh:mm:ss`

                     customer: String,
                     shipping: Address,
                     invoicing: Option[Address], // missing if empty
                     contact: Option[String], // missing if empty
                     phone: String, // Phone format `(___) ___-____`
                     fax: Option[String], // Phone format `(___) ___-____`, missing if empty
                     email: Option[String], // missing if empty

                     salesperson: Salesperson,
                     contractPrice: Float,
                     shop: Shop,

                     begin: Option[String], // Date format `yyyy-mm-dd`, missing if empty
                     due: String, // Date format `yyyy-mm-dd`, nonempty
                     schedule: Option[JobSchedule],

                     description: Option[String], // longer technical descriptions, missing if empty
                     systemTypes: Option[Seq[SystemType]], // missing if empty

                     po: Option[String] // no clue what this is, usually missing, definitely missing if empty
                    )

case class Address(lines: Seq[String], // nonempty
                   city: Option[String], // missing if empty
                   state: Option[String], // missing if empty
                   zip: String, // nonempty
                   country: Option[String] // missing if empty
                  )

case class JobSchedule(engineering: Option[Schedule], // missing if empty
                       mechanical: Option[Schedule], // missing if empty
                       electrical: Option[Schedule], // missing if empty
                       shipping: Option[Schedule], // missing if empty
                       installation: Option[Schedule] // missing if empty
                      )

case class Schedule(start: Option[String], // Date format `yyyy-mm-dd`, missing if empty
                    complete: Option[String] // Date format `yyyy-mm-dd`, missing if empty
                   )

// enumerated from database //
case class Salesperson(id: Int,
                       name: String // nonempty, unique
                      )

case class Shop(id: Int,
                label: String // nonempty, unique
               )


case class SystemType(id: Int,
                      label: String // nonempty, unique
                     )