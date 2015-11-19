package lib.actor

import lib.util.syntax.all._
import properties.server
import scalikejdbc.async.{AsyncConnectionPool, TxAsyncDBSession}

import scala.concurrent.Future

trait Database[D <: Database[D]] extends Base[D] {
  this: D =>

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
