lazy val shared = Seq(
  organization := "Cook Systems Incorporated",
  version := "0.1.0",
  scalaVersion := "2.11.7",
  libraryDependencies ++= Seq(
    "com.typesafe.slick" %% "slick-hikaricp" % "3.1.+",
    "com.typesafe.slick" %% "slick" % "3.1.+",
    "ch.qos.logback" % "logback-classic" % "1.1.+",
    "mysql" % "mysql-connector-java" % "5.1.+"
  ),
  scalaSource in Compile := baseDirectory.value / "src",
  resourceDirectory in Compile := baseDirectory.value / "resources",
  scalaSource in Test := baseDirectory.value / "test",
  resourceDirectory in Test := baseDirectory.value / "test-resources"
)

lazy val slick = TaskKey[Seq[File]]("gen-tables")

lazy val slickCodeGenTask =
  (sourceManaged, dependencyClasspath in Compile, runner in Compile, streams) map {
    (dir, cp, r, s) => {
      val out = dir
      val pkg = "slick.schema"
      toError(r.run("codegen.CustomGenerator", cp.files, Array(out.getPath, pkg), s.log))
      val f = out / "slick" / "schema" / "Tables.scala"
      println(f.getPath)
      Seq(f)
    }
  }

lazy val `ssi-business` =
  (project in file("."))
    .settings(shared: _ *)
    .settings(Revolver.settings: _ *)
    .settings(
      name := "ssi-business",
      libraryDependencies ++= Seq(

        "com.typesafe.akka" %% "akka-actor" % "2.3.+",
        "com.typesafe.akka" %% "akka-slf4j" % "2.3.+",

        "io.spray" %% "spray-can" % "1.3.+",
        "io.spray" %% "spray-routing" % "1.3.+",
        "io.spray" %% "spray-json" % "1.3.+"
      ),

      slick <<= slickCodeGenTask,
      sourceGenerators in Compile <+= slickCodeGenTask

    )
    .dependsOn(codegen)

lazy val reporting =
  (project in file("reporting"))
    .settings(shared: _ *)
    .settings(
      name := "reporting"
    )

lazy val codegen =
  (project in file("codegen"))
    .settings(shared: _*)
    .settings(
      name := "codegen",
      libraryDependencies ++= Seq(
        "com.typesafe.slick" %% "slick-codegen" % "3.1.+"
      )
    )

