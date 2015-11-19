package protocols

import de.knutwalker.akka.typed._

trait Protocol {

  sealed trait Message[+This <: Message[This]] {
    this: This =>
    type Payload

    def payload: Payload
  }

  case class ScalarMessage[T](payload: T) extends Message[ScalarMessage[T]]

  sealed trait Request[+This <: Request[This]] extends Message[This] {
    this: This =>
    type Response <: Message

    def sender: ActorRef[Response]
  }

  case class ScalarRequest[T, R](payload: T)(val sender: ActorRef[R]) extends Request[ScalarRequest[T, R]]

}
