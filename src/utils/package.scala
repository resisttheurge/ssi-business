import scala.concurrent.{ExecutionContext, Future}

package object utils {

  object syntax {

    object all extends All
    object implicits extends Implicits

    trait All extends Implicits

    trait Implicits {
      implicit def richFuture[T](future: Future[T]): RichFuture[T] = RichFuture(future)
    }
  }

  case class RichFuture[A](self: Future[A]) extends AnyVal {
    def replace[B](value: B)(implicit ec: ExecutionContext): Future[B] = self.map(_ => value)
    def discard(implicit ec: ExecutionContext): Future[Unit] = self.map(_ => ())
  }

}
