lazy val `ssi-business` =
  (project in file("."))
    .settings(shared: _ *)
    .settings(Revolver.settings: _ *)
    .settings(
      name := "ssi-business",
      libraryDependencies ++= deps.main,
      javacOptions ++= Seq("-source", "1.8", "-target", "1.8"),
      addCompilerPlugin("org.scalamacros" %% "paradise" % "2.1.+" cross CrossVersion.full),
      unmanagedSourceDirectories in Compile += baseDirectory.value / "generated",
      unmanagedResourceDirectories in Compile += baseDirectory.value / "ui" / "dist",
      slick <<= slickCodeGenTask,
      javaOptions in run := Seq("-Xms256M", "-Xmx4G")
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

  lazy val main = akka ++ spray ++ slick ++ mysql ++ config ++ logging ++ utils

  lazy val codegen = slick ++ mysql ++ logging

  lazy val reporting = logging ++ Seq(
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

  lazy val akka = spray ++ Seq(
    "com.typesafe.akka" %% "akka-actor" % "2.3.+",
    "com.typesafe.akka" %% "akka-slf4j" % "2.3.+",
    "com.typesafe.akka" %% "akka-stream-experimental" % "2.0.+",
    "com.typesafe.akka" %% "akka-http-core-experimental" % "2.0.+",
    "com.typesafe.akka" %% "akka-http-experimental" % "2.0.+",
    "com.typesafe.akka" %% "akka-http-spray-json-experimental" % "2.0.+"
  )

  lazy val spray = Seq(
    "io.spray" %% "spray-json" % "1.3.+"
  )

  lazy val slick = Seq(
    "com.typesafe.slick" %% "slick-codegen" % "3.1.+",
    "com.typesafe.slick" %% "slick-hikaricp" % "3.1.+",
    "com.typesafe.slick" %% "slick" % "3.1.+"
  )

  lazy val utils = monocle ++ Seq(
    "com.chuusai" %% "shapeless" % "2.2.+",
    "org.scalaz" %% "scalaz-core" % "7.2.+"
  )

  lazy val monocle = Seq(
    "com.github.julien-truffaut"  %%  "monocle-core"    % "1.2.+",
    "com.github.julien-truffaut"  %%  "monocle-macro"   % "1.2.+",
    "com.github.julien-truffaut"  %%  "monocle-state"   % "1.2.+"
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
