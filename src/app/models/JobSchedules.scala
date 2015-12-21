package app.models

case class JobSchedules(engineering: Schedule,
                        mechanical: Schedule,
                        electrical: Schedule,
                        shipping: Schedule,
                        installation: Schedule)
