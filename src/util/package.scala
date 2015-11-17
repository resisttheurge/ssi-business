import scala.concurrent.Future

package object util {

  implicit class RichFuture[A](val self: Future[A]) extends AnyVal {
    def replace[B](value: B): Future[B] = self.map(_ => value)
    def discard: Future[Unit] = self.map(_ => ())
  }

}
