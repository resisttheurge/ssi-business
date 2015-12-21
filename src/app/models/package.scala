package app

import slick.schema.Tables._

package object models {

  implicit def `Carrier -> CarriersRow`(c: Carrier): CarriersRow = CarriersRow(c.pk.getOrElse(-1), c.label)
  implicit def `CarriersRow -> Carrier`(r: CarriersRow): Carrier = Carrier(Some(r.id), r.label)

  implicit def `Customer -> CustomersRow`(c: Customer): CustomersRow = CustomersRow(c.pk.getOrElse(-1), c.label)
  implicit def `CustomersRow -> Customer`(r: CustomersRow): Customer = Customer(Some(r.id), r.label)

}
