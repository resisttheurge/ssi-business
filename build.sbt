lazy val `ssi-business` =
  (project in file("."))
    .settings(shared: _ *)
    .settings(Revolver.settings: _ *)
    .settings(
      name := "ssi-business",
      libraryDependencies ++= deps.all,
      unmanagedSourceDirectories in Compile += baseDirectory.value / "generated",
      slick <<= slickCodeGenTask
    )
    .dependsOn(codegen, reporting)

lazy val codegen =
  (project in file("codegen"))
    .settings(shared: _ *)
    .settings(
      name := "codegen",
      libraryDependencies ++= deps.db
    )
    .dependsOn(config)

lazy val reporting =
  (project in file("reporting"))
    .settings(shared: _ *)
    .settings(
      name := "reporting",
      libraryDependencies ++= deps.db
    )
    .dependsOn(config)

lazy val config =
  (project in file("config"))
    .settings(shared: _ *)
    .settings(
      name := "config",
      libraryDependencies ++= deps.conf,
      resourceDirectory in Compile := baseDirectory.value,
      resourceDirectory in Test := baseDirectory.value / "test"
    )

lazy val shared = Seq(
  organization := "Cook Systems Incorporated",
  version := "0.1.0",
  scalaVersion := "2.11.7",
  scalaSource in Compile := baseDirectory.value / "src",
  resourceDirectory in Compile := baseDirectory.value / "resources",
  scalaSource in Test := baseDirectory.value / "test",
  resourceDirectory in Test := baseDirectory.value / "test-resources"
)

lazy val deps = new {

  lazy val all = server ++ db ++ logging ++ conf

  lazy val server = Seq(
    "com.typesafe.akka" %% "akka-actor" % "2.3.+",
    "com.typesafe.akka" %% "akka-slf4j" % "2.3.+",

    "io.spray" %% "spray-can" % "1.3.+",
    "io.spray" %% "spray-routing" % "1.3.+",
    "io.spray" %% "spray-json" % "1.3.+"
  )

  lazy val db = Seq(
    "com.typesafe.slick" %% "slick-codegen" % "3.1.+",
    "com.typesafe.slick" %% "slick-hikaricp" % "3.1.+",
    "com.typesafe.slick" %% "slick" % "3.1.+",
    "mysql" % "mysql-connector-java" % "5.1.+"
  )

  lazy val logging = Seq(
    "org.slf4j" % "slf4j-api" % "1.7.+",
    "ch.qos.logback" % "logback-classic" % "1.1.+"
  )

  lazy val conf = Seq(
    "com.typesafe" % "config" % "1.3.+"
  )
}

lazy val slick = TaskKey[Seq[File]]("gen-tables")

lazy val slickCodeGenTask =
  (baseDirectory, dependencyClasspath in Compile, runner in Compile, streams) map {
    (dir, cp, r, s) => {
      val out = dir / "generated"
      val pkg = "slick.schema"
      toError(r.run("codegen.CustomGenerator", cp.files, Array(out.getPath, pkg), s.log))
      val f = out / "slick" / "schema" / "Tables.scala"
      println(f.getPath)
      Seq(f)
    }
  }