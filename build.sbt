lazy val `ssi-business` =
  (project in file("."))
    .settings(shared: _ *)
    .settings(Revolver.settings: _ *)
    .settings(
      name := "ssi-business",
      libraryDependencies ++= deps.main,
      unmanagedSourceDirectories in Compile += baseDirectory.value / "generated",
      slick <<= slickCodeGenTask
    )
    .dependsOn(codegen, reporting)

lazy val codegen =
  (project in file("codegen"))
    .settings(shared: _ *)
    .settings(
      name := "codegen",
      libraryDependencies ++= deps.codegen
    )
    .dependsOn(config)

lazy val reporting =
  (project in file("reporting"))
    .settings(shared: _ *)
    .settings(
      name := "reporting",
      libraryDependencies ++= deps.reporting
    )
    .dependsOn(config)

lazy val config =
  (project in file("config"))
    .settings(shared: _ *)
    .settings(
      name := "config",
      libraryDependencies ++= deps.config
    )

lazy val shared = Seq(
  organization := "Cook Systems Incorporated",
  version := "0.1.0",
  scalaVersion := "2.11.7",
  javaSource in Compile := baseDirectory.value / "src",
  scalaSource in Compile := baseDirectory.value / "src",
  resourceDirectory in Compile := baseDirectory.value / "resources",
  javaSource in Test := baseDirectory.value / "test",
  scalaSource in Test := baseDirectory.value / "test",
  resourceDirectory in Test := baseDirectory.value / "test-resources"
)

lazy val deps = new {

  lazy val main = akka ++ spray

  lazy val codegen = slick ++ mysql

  lazy val reporting = Seq(
    "junit" % "junit" % "3.8.1" % "test",
    "org.xhtmlrenderer" % "flying-saucer-pdf" % "9.0.4",
    "org.freemarker" % "freemarker" % "2.3.18",
    "com.lowagie" % "itext" % "2.1.7",
    "com.google.guava" % "guava" % "19.0",
    "org.apache.commons" % "commons-lang3" % "3.4"
  )

  lazy val config = Seq(
    "com.typesafe" % "config" % "1.3.+"
  )

  lazy val akka = Seq(
    "com.typesafe.akka" %% "akka-actor" % "2.3.+",
    "com.typesafe.akka" %% "akka-slf4j" % "2.3.+"
  )

  lazy val spray = Seq(
    "io.spray" %% "spray-can" % "1.3.+",
    "io.spray" %% "spray-routing" % "1.3.+",
    "io.spray" %% "spray-json" % "1.3.+"
  )

  lazy val slick = Seq(
    "com.typesafe.slick" %% "slick-codegen" % "3.1.+",
    "com.typesafe.slick" %% "slick-hikaricp" % "3.1.+",
    "com.typesafe.slick" %% "slick" % "3.1.+"
  )

  lazy val mysql = Seq(
    "mysql" % "mysql-connector-java" % "5.1.+"
  )

  lazy val logging = Seq(
    "org.slf4j" % "slf4j-api" % "1.7.+",
    "ch.qos.logback" % "logback-classic" % "1.1.+"
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