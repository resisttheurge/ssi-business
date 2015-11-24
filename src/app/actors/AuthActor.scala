package app.actors

import java.util.UUID

import app.actors.AuthActor.protocol.Authenticate
import de.knutwalker.akka.typed._
import com.typesafe.config.Config
import lib.actor.Database

import scala.util.Try

object AuthActor {
  def props = PropsFor[AuthActor]

  object protocol {

    sealed trait Message

    sealed trait Request[Response] extends Message {
      def sender: ActorRef[Response]
    }

    case class Authenticate(username: String, password: String)(val sender: ActorRef[Try[UUID]]) extends Request[Try[UUID]]

  }

}

case class AuthActor(config: Config) extends TypedActor.Of[AuthActor.protocol.Message] with Database[AuthActor] {
  override def typedReceive: TypedReceive = {
    case msg@Authenticate(username: String, password: String) =>
      tx { implicit s =>
        for {

        } yield ()
      }
  }

}