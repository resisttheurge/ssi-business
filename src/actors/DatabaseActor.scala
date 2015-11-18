package actors

import properties._
import scalikejdbc.async.{TxAsyncDBSession, AsyncConnectionPool}

import scala.concurrent.Future

trait DatabaseActor extends BaseActor with models.syntax.All {

  def tx[A](f: (TxAsyncDBSession) => Future[A]): Future[A] = DB.localTx(f)

  override def preStart(): Unit =
    AsyncConnectionPool.add(
      server.database.fragment(),
      server.database.url(),
      server.database.username(),
      server.database.password()
    )

  override def postStop(): Unit =
    AsyncConnectionPool.close(server.database.fragment())

}
