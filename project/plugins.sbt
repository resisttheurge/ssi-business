logLevel := Level.Info

libraryDependencies += "mysql" % "mysql-connector-java" % "5.1.37"

addSbtPlugin("io.spray" % "sbt-revolver" % "0.7.1")
addSbtPlugin("org.scalikejdbc" %% "scalikejdbc-mapper-generator" % "2.3.0")