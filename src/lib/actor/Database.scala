package lib.actor

import lib.util.syntax.all._
import app.properties.server
import scalikejdbc.async.{AsyncConnectionPool, TxAsyncDBSession}

import scala.concurrent.Future

trait Database[+This <: Database[This]] extends Base[This] {
  this: This =>

  def tx[A](f: (TxAsyncDBSession) => Future[A]): Future[A] = DB.localTx(f)

  override def preStart(): Unit = {
    super.preStart()
    AsyncConnectionPool.add(
      server.database.name(),
      server.database.url(),
      server.database.username(),
      server.database.password()
    )
  }


  override def postStop(): Unit = {
    super.postStop()
    AsyncConnectionPool.close(server.database.name())
  }

}
