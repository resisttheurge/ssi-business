package actors

import actors.AuthenticationActor.protocol._
import de.knutwalker.akka.typed._
import models.Token

object AuthenticationActor {

  object protocol {

    sealed trait Message

    sealed trait Request extends Message {
      type Response

      def replyTo: ActorRef[Response]
    }

    case class Authenticate(uuidString: String)(val replyTo: ActorRef[Boolean]) extends Request

  }

}

trait AuthenticationActor extends TypedActor.Of[Message] with BaseActor with DatabaseActor {

  override def typedReceive: TypedReceive = Total {
    case a@Authenticate(uuid: String) =>
      tx {
        for {
          _ <- Token.by(uuid)
        } yield ()
        {
          token match {
            case Some(t) =>
            case None => a.replyTo ! false
          }
        }
      }
  }
}
