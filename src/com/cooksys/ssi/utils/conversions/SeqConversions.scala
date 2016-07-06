package com.cooksys.ssi.utils.conversions

import scala.collection.JavaConversions._
import java.util.{List => JList}
object SeqConversions extends SeqConversions
trait SeqConversions {
//  implicit def list2seq[A](lista: JList[_ <: A]): Seq[A] = asScalaBuffer(lista).toSeq
  implicit def seqa2Seqb[A, B](seqa: Seq[A])(implicit f: A => B): Seq[B]
    = seqa.map(f)
}
