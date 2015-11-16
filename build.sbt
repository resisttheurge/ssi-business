lazy val `ssi-business` =
  (project in file("."))
    .settings(Revolver.settings: _ *)
    .settings(

      name := "ssi-business",
      organization := "Cook Systems Incorporated",
      version := "0.1.0",

      scalaVersion := "2.11.7",

      libraryDependencies ++= Seq(
        "com.typesafe.akka" %% "akka-actor" % "2.3.9",
        "com.typesafe.akka" %% "akka-slf4j" % "2.3.9",

        "io.spray" %% "spray-can" % "1.3.3",
        "io.spray" %% "spray-routing" % "1.3.3",

        "ch.qos.logback" % "logback-classic" % "1.1.3"
      ),

  	  scalaSource in Compile := baseDirectory.value / "src",
  	  resourceDirectory in Compile := baseDirectory.value / "resources",

  	  scalaSource in Test := baseDirectory.value / "test",
  	  resourceDirectory in Test := baseDirectory.value / "test-resources"
    )
