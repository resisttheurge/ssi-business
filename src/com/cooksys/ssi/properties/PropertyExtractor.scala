package com.cooksys.ssi.properties

import java.time.{Duration => JDuration}
import scala.concurrent.duration.{Duration, FiniteDuration}

import com.typesafe.config._
import scala.collection.JavaConversions._

import com.cooksys.ssi.utils._

trait PropertyExtractor[T] {

  implicit def apply(path: String)
  (implicit config: Config = ConfigFactory.load()): T

}

object PropertyExtractor {

  def apply[T](implicit pe: PropertyExtractor[T]): PropertyExtractor[T] = pe

  object Instances extends Instances
  trait Instances {

    implicit class GenericPropertyExtractor[B, A](val f: A => B)(implicit val pea: PropertyExtractor[A]) extends PropertyExtractor[B] {
      override implicit def apply(path: String)
      (implicit config: Config = ConfigFactory.load()): B
        = f(pea(path))
    }

    implicit object AnyRefPropertyExtractor extends PropertyExtractor[AnyRef] {
      override implicit def apply(path: String)
      (implicit config: Config = ConfigFactory.load()): AnyRef
        = config.getAnyRef(path)
    }

    implicit object AnyRefSeqPropertyExtractor extends PropertyExtractor[Seq[AnyRef]] {
      override implicit def apply(path: String)
      (implicit config: Config = ConfigFactory.load()): Seq[AnyRef]
        = config.getAnyRefList(path).map(o => o.asInstanceOf[AnyRef])
    }

    implicit object BooleanPropertyExtractor extends PropertyExtractor[Boolean] {
      override implicit def apply(path: String)
      (implicit config: Config = ConfigFactory.load()): Boolean
        = config.getBoolean(path)
    }

    implicit object BooleanSeqPropertyExtractor extends PropertyExtractor[Seq[Boolean]] {
      override implicit def apply(path: String)
      (implicit config: Config = ConfigFactory.load()): Seq[Boolean]
        = config.getBooleanList(path).map(b => b: Boolean)
    }

    implicit object ConfigPropertyExtractor extends PropertyExtractor[Config] {
      override implicit def apply(path: String)
      (implicit config: Config = ConfigFactory.load()): Config
        = config.getConfig(path)
    }

    implicit object ConfigSeqPropertyExtractor extends PropertyExtractor[Seq[Config]] {
      override implicit def apply(path: String)
      (implicit config: Config = ConfigFactory.load()): Seq[Config]
        = config.getConfigList(path)
    }

    implicit object ConfigListPropertyExtractor extends PropertyExtractor[ConfigList] {
      override implicit def apply(path: String)
      (implicit config: Config = ConfigFactory.load()): ConfigList
        = config.getList(path)
    }

    implicit object ConfigMemorySizePropertyExtractor extends PropertyExtractor[ConfigMemorySize] {
      override implicit def apply(path: String)
      (implicit config: Config = ConfigFactory.load()): ConfigMemorySize
        = config.getMemorySize(path)
    }

    implicit object ConfigMemorySizeSeqPropertyExtractor extends PropertyExtractor[Seq[ConfigMemorySize]] {
      override implicit def apply(path: String)
      (implicit config: Config = ConfigFactory.load()): Seq[ConfigMemorySize]
        = config.getMemorySizeList(path)
    }

    implicit object ConfigObjectPropertyExtractor extends PropertyExtractor[ConfigObject] {
      override implicit def apply(path: String)
      (implicit config: Config = ConfigFactory.load()): ConfigObject
        = config.getObject(path)
    }

    implicit object ConfigObjectSeqPropertyExtractor extends PropertyExtractor[Seq[ConfigObject]] {
      override implicit def apply(path: String)
      (implicit config: Config = ConfigFactory.load()): Seq[ConfigObject]
        = config.getObjectList(path)
    }

    implicit object ConfigValuePropertyExtractor extends PropertyExtractor[ConfigValue] {
      override implicit def apply(path: String)
      (implicit config: Config = ConfigFactory.load()): ConfigValue
        = config.getValue(path)
    }

    implicit object ConfigValueSeqPropertyExtractor extends PropertyExtractor[Seq[ConfigValue]] {
      override implicit def apply(path: String)
      (implicit config: Config = ConfigFactory.load()): Seq[ConfigValue]
        = config.getList(path)
    }

    implicit object DoublePropertyExtractor extends PropertyExtractor[Double] {
      override implicit def apply(path: String)
      (implicit config: Config = ConfigFactory.load()): Double
        = config.getDouble(path)
    }

    implicit object DoubleSeqPropertyExtractor extends PropertyExtractor[Seq[Double]] {
      override implicit def apply(path: String)
      (implicit config: Config = ConfigFactory.load()): Seq[Double]
        = config.getDoubleList(path).map(d => d: Double)
    }

    implicit object DurationPropertyExtractor extends PropertyExtractor[Duration] {
      override implicit def apply(path: String)
      (implicit config: Config = ConfigFactory.load()): Duration
        = config.getDuration(path)
    }

    implicit object DurationSeqPropertyExtractor extends PropertyExtractor[Seq[Duration]] {
      override implicit def apply(path: String)
      (implicit config: Config = ConfigFactory.load()): Seq[Duration]
        = config.getDurationList(path).map(d => d: Duration)
    }

    implicit object IntPropertyExtractor extends PropertyExtractor[Int] {
      override implicit def apply(path: String)
      (implicit config: Config = ConfigFactory.load()): Int
        = config.getInt(path)
    }

    implicit object IntSeqPropertyExtractor extends PropertyExtractor[Seq[Int]] {
      override implicit def apply(path: String)
      (implicit config: Config = ConfigFactory.load()): Seq[Int]
        = config.getIntList(path).map(i => i: Int)
    }

    implicit object LongPropertyExtractor extends PropertyExtractor[Long] {
      override implicit def apply(path: String)
      (implicit config: Config = ConfigFactory.load()): Long
        = config.getLong(path)
    }

    implicit object LongSeqPropertyExtractor extends PropertyExtractor[Seq[Long]] {
      override implicit def apply(path: String)
      (implicit config: Config = ConfigFactory.load()): Seq[Long]
        = config.getLongList(path).map(l => l: Long)
    }

    implicit object StringPropertyExtractor extends PropertyExtractor[String] {
      override implicit def apply(path: String)
      (implicit config: Config = ConfigFactory.load()): String
        = config.getString(path)
    }

    implicit object StringSeqPropertyExtractor extends PropertyExtractor[Seq[String]] {
      override implicit def apply(path: String)
      (implicit config: Config = ConfigFactory.load()): Seq[String]
        = config.getStringList(path)
    }
  }

}
