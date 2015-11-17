package actors

import properties._
import scalikejdbc.async.AsyncConnectionPool

trait DatabaseActor extends BaseActor {

  override def preStart(): Unit =
    AsyncConnectionPool.add(
      server.database.name(),
      server.database.url(),
      server.database.username(),
      server.database.password()
    )

  override def postStop(): Unit =
    AsyncConnectionPool.close(server.database.name())

}
