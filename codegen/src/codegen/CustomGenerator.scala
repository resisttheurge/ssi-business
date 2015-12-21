package codegen

import slick.codegen.SourceCodeGenerator
import slick.driver.MySQLDriver
import scala.concurrent.Await
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.duration.Duration

object CustomGenerator {
  def main(args: Array[String]): Unit = {
    val db = MySQLDriver.api.Database.forConfig("database.test")
    try {
      val modelFuture = db.run(MySQLDriver.createModel())
      val codegenFuture = modelFuture.map(model => new SourceCodeGenerator(model) {})
      codegenFuture.onSuccess {
        case codegen =>
          codegen.writeToFile("slick.driver.MySQLDriver", args(0), args(1))
      }
      Await.ready(codegenFuture, Duration.Inf)
    } finally {
      db.close()
    }

  }
}