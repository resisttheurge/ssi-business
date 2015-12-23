package app

import slick.schema.Tables._

package object models {

  implicit def `Carrier -> CarriersRow`(c: Carrier): CarriersRow = CarriersRow(c.pk.getOrElse(-1), c.label)

  implicit def `CarriersRow -> Carrier`(r: CarriersRow): Carrier = Carrier(Some(r.id), r.label)

  implicit def `Customer -> CustomersRow`(c: Customer): CustomersRow = CustomersRow(c.pk.getOrElse(-1), c.label)

  implicit def `CustomersRow -> Customer`(r: CustomersRow): Customer = Customer(Some(r.id), r.label)

  implicit def `Manufacturer -> ManufacturersRow`(c: Manufacturer): ManufacturersRow = ManufacturersRow(c.pk.getOrElse(-1), c.label)

  implicit def `ManufacturersRow -> Manufacturer`(r: ManufacturersRow): Manufacturer = Manufacturer(Some(r.id), r.label)

  implicit def `Salesperson -> SalespeopleRow`(c: Salesperson): SalespeopleRow = SalespeopleRow(c.pk.getOrElse(-1), c.label)

  implicit def `SalespeopleRow -> Salesperson`(r: SalespeopleRow): Salesperson = Salesperson(Some(r.id), r.label)

  implicit def `Shop -> ShopsRow`(c: Shop): ShopsRow = ShopsRow(c.pk.getOrElse(-1), c.label)

  implicit def `ShopsRow -> Shop`(r: ShopsRow): Shop = Shop(Some(r.id), r.label)

  implicit def `Vendor -> VendorsRow`(c: Vendor): VendorsRow = VendorsRow(c.pk.getOrElse(-1), c.label)

  implicit def `VendorsRow -> Vendor`(r: VendorsRow): Vendor = Vendor(Some(r.id), r.label)

  implicit def `Part -> PartsRow`(c: Part): PartsRow = PartsRow(c.pk.getOrElse(-1), c.partType.toString, c.number, if (c.description.isEmpty) None else Some(c.description))

  implicit def `PartsRow -> Part`(r: PartsRow): Part = Part(Some(r.id), PartType(r.`type`), r.number, r.description.getOrElse(""))

}
