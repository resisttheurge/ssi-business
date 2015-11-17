lazy val `ssi-business` =
  (project in file("."))
    .settings(Revolver.settings: _ *)
    .settings(scalikejdbcSettings: _ *)
    .settings(

      name := "ssi-business",
      organization := "Cook Systems Incorporated",
      version := "0.1.0",

      scalaVersion := "2.11.7",

      libraryDependencies ++= Seq(
        "mysql" % "mysql-connector-java" % "5.1.+",

        "org.scalikejdbc" %% "scalikejdbc"  % "2.2.+",
        "org.scalikejdbc"     %% "scalikejdbc-async" % "0.5.+",
        "com.github.mauricio" %% "mysql-async"       % "0.2.+",

        "com.typesafe.akka" %% "akka-actor" % "2.3.+",
        "com.typesafe.akka" %% "akka-slf4j" % "2.3.+",

        "io.spray" %% "spray-can" % "1.3.+",
        "io.spray" %% "spray-routing" % "1.3.+",

        "ch.qos.logback" % "logback-classic" % "1.1.+"
      ),

      scalaSource in Compile := baseDirectory.value / "src",
      resourceDirectory in Compile := baseDirectory.value / "resources",

      scalaSource in Test := baseDirectory.value / "test",
      resourceDirectory in Test := baseDirectory.value / "test-resources"
    )
