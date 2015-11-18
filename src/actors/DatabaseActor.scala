package actors

import akka.actor.Actor
import properties._
import scalikejdbc.async.{TxAsyncDBSession, AsyncConnectionPool}

import scala.concurrent.Future

trait DatabaseActor extends BaseActor {
  base: Actor =>

  def tx[A](f: (TxAsyncDBSession) => Future[A]): Future[A] = DB.localTx(f)

  override def preStart(): Unit = {
    AsyncConnectionPool.add(
      server.database.name(),
      server.database.url(),
      server.database.username(),
      server.database.password()
    )
    base.preStart()
  }


  override def postStop(): Unit = {
    AsyncConnectionPool.close(server.database.name())
    base.postStop()
  }


}
