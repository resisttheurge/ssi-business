package com.cooksys.ssi.utils.conversions

import java.sql.{Date, Timestamp}
import java.util.Calendar

import com.cooksys.ssi.models
import com.cooksys.ssi.models._
import slick.model
import slick.schema.Tables._

object RowConversions extends RowConversions

trait RowConversions {

  implicit def toAddressesRow(address: Address): AddressesRow =
    AddressesRow(
      address.id.getOrElse(-1),
      address.lines.map(_.mkString(";")),
      address.city,
      address.stateOrProvince,
      address.postalCode,
      address.country
    )

  implicit def fromAddressesRow(addressesRow: AddressesRow): Address =
    Address(
      Some(addressesRow.id),
      addressesRow.lines.map(_.split(';')),
      addressesRow.city,
      addressesRow.stateOrProvince,
      addressesRow.postalCode,
      addressesRow.country
    )

  implicit def toCarriersRow(carrier: Carrier): CarriersRow =
    CarriersRow(if (carrier.id.isDefined) carrier.id.get else -1, carrier.label)

  implicit def fromCarriersRow(carriersRow: CarriersRow): Carrier =
    Carrier(Option(carriersRow.id), carriersRow.label)

  implicit def toContactsRow(contact: Contact): ContactsRow =
    ContactsRow(
      id = contact.id.getOrElse(-1),
      label = contact.label,
      phone = contact.phone,
      fax = contact.fax,
      email = contact.email
    )

  implicit def fromContactsRow(row: ContactsRow): Contact =
    Contact(
      id = Some(row.id),
      label = row.label,
      phone = row.phone,
      fax = row.fax,
      email = row.email
    )

  implicit def toCustomersRow(customer: Customer): CustomersRow =
    CustomersRow(if (customer.id.isDefined) customer.id.get else -1, customer.label)

  implicit def fromCustomersRow(customersRow: CustomersRow): Customer =
    Customer(Option(customersRow.id), customersRow.label)

  implicit def toJobsRow(job: Job): JobsRow =
    JobsRow(
      id = job.id.getOrElse(-1),
      prefix = job.identifier.prefix,
      year = job.identifier.year,
      label = job.identifier.label,
      status = job.status,
      description = job.description,
      contractPrice = job.contractPrice,
      startDate = job.startDate,
      dueDate = job.dueDate,
      completeDate = job.completeDate,
      shopId = job.shop.flatMap(_.id),
      salespersonId = job.salesperson.flatMap(_.id),
      customerId = job.customer.flatMap(_.id),
      contactId = job.contact.flatMap(_.id)
    )

  implicit def fromJobsRow(row: JobsRow): Job =
    Job(
      id = Some(row.id),
      identifier = JobIdentifier(
        prefix = row.prefix,
        year = row.year,
        label = row.label
      ),
      status = row.status,
      description = row.description,
      contractPrice = row.contractPrice,
      startDate = row.startDate,
      dueDate = row.dueDate,
      completeDate = row.completeDate
    )

  implicit def fromJobsRowWithDependents(row: (JobsRow, Option[ShopsRow], Option[SalespeopleRow], Option[CustomersRow], Option[ContactsRow], Option[AddressesRow])): Job =
    Job(
      id = Some(row._1.id),
      identifier = JobIdentifier(
        prefix = row._1.prefix,
        year = row._1.year,
        label = row._1.label
      ),
      status = row._1.status,
      description = row._1.description,
      contractPrice = row._1.contractPrice,
      startDate = row._1.startDate,
      dueDate = row._1.dueDate,
      completeDate = row._1.completeDate,
      shop = row._2.map(s => s: Shop),
      salesperson = row._3.map(s => s: Salesperson),
      customer = row._4.map(c => c: Customer),
      contact = row._5.map(c => c: Contact),
      addresses = row._6.map(address => models.JobAddresses(Some(address), None))
    )

  implicit def toManufacturersRow(manufacturer: Manufacturer): ManufacturersRow =
    ManufacturersRow(if (manufacturer.id.isDefined) manufacturer.id.get else -1, manufacturer.label)

  implicit def fromManufacturersRow(manufacturersRow: ManufacturersRow): Manufacturer =
    Manufacturer(Option(manufacturersRow.id), manufacturersRow.label)

  implicit def fromSchedulesRow(row: SchedulesRow): Schedule =
    Schedule(
      id = Some(row.id),
      jobId = row.jobId,
      scheduleType = row.scheduleType,
      startDate = row.startDate,
      completeDate = row.completeDate
    )

  implicit def toSchedulesRow(schedule: Schedule): SchedulesRow =
    SchedulesRow(
      id = schedule.id.getOrElse(-1),
      jobId = schedule.jobId,
      scheduleType = schedule.scheduleType,
      startDate = schedule.startDate,
      completeDate = schedule.completeDate
    )

  implicit def toSalespeopleRow(salesperson: Salesperson): SalespeopleRow =
    SalespeopleRow(if (salesperson.id.isDefined) salesperson.id.get else -1, salesperson.label)

  implicit def fromShopsRow(salespeopleRow: SalespeopleRow): Salesperson =
    Salesperson(Option(salespeopleRow.id), salespeopleRow.label)

  implicit def toShopsRow(shop: Shop): ShopsRow =
    ShopsRow(if (shop.id.isDefined) shop.id.get else -1, shop.label)

  implicit def fromShopsRow(shopsRow: ShopsRow): Shop =
    Shop(Option(shopsRow.id), shopsRow.label)

  implicit def toSpecialtyItemsRow(specialtyItem: SpecialtyItem): SpecialtyItemsRow =
    SpecialtyItemsRow(if (specialtyItem.id.isDefined) specialtyItem.id.get else -1, specialtyItem.label)

  implicit def fromSpecialtyItemsRow(specialtyItemsRow: SpecialtyItemsRow): SpecialtyItem =
    SpecialtyItem(Option(specialtyItemsRow.id), specialtyItemsRow.label)

  implicit def toSystemTypesRow(systemType: SystemType): SystemTypesRow =
    SystemTypesRow(if (systemType.id.isDefined) systemType.id.get else -1, systemType.label)

  implicit def fromSystemTypesRow(systemTypesRow: SystemTypesRow): SystemType =
    SystemType(Option(systemTypesRow.id), systemTypesRow.label)

  implicit def toUsersRow(user: User): UsersRow =
    UsersRow(if (user.id.isDefined) user.id.get else -1, user.username, user.password.get, user.active.getOrElse(true))

  implicit def fromUsersRow(usersRow: UsersRow): User =
    User(Option(usersRow.id), usersRow.username, Option(usersRow.password), Option(usersRow.active))

  implicit def toVendorsRow(vendor: Vendor): VendorsRow =
    VendorsRow(if (vendor.id.isDefined) vendor.id.get else -1, vendor.label)

  implicit def fromVendorsRow(vendorsRow: VendorsRow): Vendor =
    Vendor(Option(vendorsRow.id), vendorsRow.label)

  implicit def toShippingRequestsRow(drawing: ShippingRequest): ShippingRequestsRow =
    ShippingRequestsRow(
      id = drawing.id.getOrElse(-1),
      tagType = drawing.tagType.map(t => t: String),
      title = drawing.title,
      revision = drawing.revision,
      revisionDate = drawing.revisionDate,
      startDate = drawing.startDate,
      shopDate = drawing.shopDate,
      fieldDate = drawing.fieldDate,
      requestDate = drawing.requestDate,
      requestedBy = drawing.requestedBy,
      preparedBy = drawing.preparedBy,
      filePath = drawing.filePath,
      shopId = drawing.shop.flatMap(_.id),
      carrierId = drawing.carrier.flatMap(_.id),
      contactId = drawing.contact.flatMap(_.id),
      addressId = drawing.address.flatMap(_.id)
    )

  implicit def fromShippingRequestsRow(row: ShippingRequestsRow): ShippingRequest =
    ShippingRequest(
      id = row.id,
      tagType = row.tagType.map(t => t: String),
      title = row.title,
      revision = row.revision,
      revisionDate = row.revisionDate,
      startDate = row.startDate,
      shopDate = row.shopDate,
      fieldDate = row.fieldDate,
      requestDate = row.requestDate,
      requestedBy = row.requestedBy,
      preparedBy = row.preparedBy,
      filePath = row.filePath
    )

  implicit def fromShippingRequestsRowWithDependents(row: (ShippingRequestsRow, Option[ShopsRow], Option[CarriersRow], Option[ContactsRow], Option[AddressesRow])): ShippingRequest =
    (row._1: ShippingRequest).copy(
      shop = row._2.map(r => r: Shop),
      carrier = row._3.map(r => r: Carrier),
      contact = row._4.map(r => r: Contact),
      address = row._5.map(r => r: Address)
    )

  implicit def toDrawingsRow(drawing: Drawing): DrawingsRow =
    DrawingsRow(
      id = drawing.id.getOrElse(-1),
      jobId = drawing.jobId,
      label = drawing.label,
      drawingType = drawing.drawingType,
      specialtyItemId = drawing.specialtyItem.flatMap(_.id),
      shippingRequestId = drawing.info.flatMap(_.id)
    )

  implicit def fromDrawingsRow(row: DrawingsRow): Drawing =
    Drawing(
      id = row.id,
      jobId = row.jobId,
      label = row.label,
      drawingType = row.drawingType
    )

  implicit def fromDrawingsRowWithDependents(row: (DrawingsRow, Option[SpecialtyItemsRow], Option[(ShippingRequestsRow, Option[ShopsRow], Option[CarriersRow], Option[ContactsRow], Option[AddressesRow])])): Drawing =
    (row._1: Drawing).copy(
      specialtyItem = row._2.map(r => r: SpecialtyItem),
      info = row._3.map(r => r: ShippingRequest)
    )

  implicit def toShippingGroupsRow(drawing: ShippingGroup): ShippingGroupsRow =
    ShippingGroupsRow(
      id = drawing.id.getOrElse(-1),
      jobId = drawing.jobId,
      label = drawing.label,
      rush = drawing.rush,
      shippingRequestId = drawing.info.flatMap(_.id)
    )

  implicit def fromShippingGroupsRow(row: ShippingGroupsRow): ShippingGroup =
    ShippingGroup(
      id = row.id,
      jobId = row.jobId,
      label = row.label,
      rush = row.rush
    )

  implicit def fromShippingGroupsRowWithDependents(row: (ShippingGroupsRow, Option[(ShippingRequestsRow, Option[ShopsRow], Option[CarriersRow], Option[ContactsRow], Option[AddressesRow])])): ShippingGroup =
    (row._1: ShippingGroup).copy(
      info = row._2.map(r => r: ShippingRequest)
    )

  implicit def toZonesRow(zone: Zone): ZonesRow =
    ZonesRow(
      id = zone.id.getOrElse(-1),
      jobId = zone.jobId,
      number = zone.number,
      fieldDate = zone.fieldDate
    )

  implicit def fromZonesRow(row: ZonesRow): Zone =
    Zone(
      id = row.id,
      jobId = row.jobId,
      number = row.number,
      fieldDate = row.fieldDate
    )

  implicit def toShippingItemsRow(si: ShippingItem): ShippingItemsRow =
    ShippingItemsRow(
      id = si.id.getOrElse(-1),
      status = si.status,
      label = si.label,
      requested = si.requested,
      completed = si.completed,
      remarks = si.remarks,
      shopId = si.shop.flatMap(_.id)
    )

  implicit def fromShippingItemsRow(row: ShippingItemsRow): ShippingItem =
    ShippingItem(
      id = row.id,
      status = row.status,
      label = row.label,
      requested = row.requested,
      completed = row.completed,
      remarks = row.remarks
    )

  implicit def fromShippingItemsRowWithDependents(row: (ShippingItemsRow, Option[ShopsRow])): ShippingItem =
    (row._1: ShippingItem).copy(shop = row._2.map(s => s: Shop))

  implicit def toPartOrdersRow(por: PartOrder): PartOrdersRow =
    PartOrdersRow(
      id = por.id.getOrElse(-1),
      jobId = por.jobId,
      drawingId = por.drawingId,
      abmNumber = por.abmNumber,
      status = por.status,
      partType = por.partType.map(s => s: String),
      partNumber = por.partNumber,
      partDescription = por.partDescription,
      manufacturerId = por.manufacturer.flatMap(_.id),
      vendorId = por.vendor.flatMap(_.id),
      po = por.po,
      requestedQuantity = por.requestedQuantity,
      stockQuantity = por.stockQuantity,
      purchaseQuantity = por.purchaseQuantity,
      requestDate = por.requestDate,
      purchaseDate = por.purchaseDate,
      releaseDate = por.releaseDate,
      releasedBy = por.releasedBy
    )

  implicit def fromPartOrdersRow(por: PartOrdersRow): PartOrder =
    PartOrder(
      id = por.id,
      jobId = por.jobId,
      drawingId = por.drawingId,
      abmNumber = por.abmNumber,
      status = por.status,
      partType = por.partType.map(s => s: PartType),
      partNumber = por.partNumber,
      partDescription = por.partDescription,
      po = por.po,
      requestedQuantity = por.requestedQuantity,
      stockQuantity = por.stockQuantity,
      purchaseQuantity = por.purchaseQuantity,
      requestDate = por.requestDate,
      purchaseDate = por.purchaseDate,
      releaseDate = por.releaseDate,
      releasedBy = por.releasedBy
    )

  implicit def fromPartOrdersRowWithDependents(por: (PartOrdersRow, Option[VendorsRow], Option[ManufacturersRow])): PartOrder =
    (por._1: PartOrder).copy(
      vendor = por._2.map(p => p: Vendor),
      manufacturer = por._3.map(p => p: Manufacturer)
    )

  implicit def toShippingItemZonesRow(siz: ShippingItemZone): ShippingItemZonesRow =
    ShippingItemZonesRow(
      id = siz.id.getOrElse(-1),
      shippingItemId = siz.shippingItemId,
      zoneId = siz.zone.id.get,
      quantity = siz.quantity
    )

  implicit def fromShippingItemZonesRow(siz: (ShippingItemZonesRow, ZonesRow)): ShippingItemZone =
    ShippingItemZone(
      id = siz._1.id,
      shippingItemId = siz._1.shippingItemId,
      zone = siz._2: Zone,
      quantity = siz._1.quantity
    )

  implicit def toShipmentsRow(sh: Shipment): ShipmentsRow =
    ShipmentsRow(
      id = sh.id.getOrElse(-1),
      jobId = sh.jobId,
      number = sh.number,
      status = sh.status,
      shopId = sh.shop.flatMap(_.id),
      carrierId = sh.carrier.flatMap(_.id),
      weight = sh.weight,
      billOfLading = sh.billOfLading,
      shipDate = sh.shipDate,
      contactId = sh.contact.flatMap(_.id),
      addressId = sh.address.flatMap(_.id)
    )

  implicit def fromShipmentsRow(sh: ShipmentsRow): Shipment =
    Shipment(
      id = sh.id,
      jobId = sh.jobId,
      number = sh.number,
      status = sh.status,
      weight = sh.weight,
      billOfLading = sh.billOfLading,
      shipDate = sh.shipDate
    )

  implicit def fromShipmentsRowWithDependents(sh: (ShipmentsRow, Option[ShopsRow], Option[CarriersRow], Option[ContactsRow], Option[AddressesRow])): Shipment =
    (sh._1: Shipment).copy(
      shop = sh._2.map(s => s: Shop),
      carrier = sh._3.map(c => c: Carrier),
      contact = sh._4.map(c => c: Contact),
      address = sh._5.map(a => a: Address)
    )

  implicit def toShipmentItemsRow(siz: ShipmentItem): ShipmentItemsRow =
    ShipmentItemsRow(
      id = siz.id.getOrElse(-1),
      shippingItemId = siz.shippingItem.id.get,
      shipmentId = siz.shipmentId,
      quantity = siz.quantity
    )

  implicit def fromShipmentItemsRow(siz: (ShipmentItemsRow, ShippingItemsRow)): ShipmentItem =
    ShipmentItem(
      id = siz._1.id,
      shippingItem = siz._2,
      shipmentId = siz._1.shipmentId,
      quantity = siz._1.quantity
    )

  implicit def toShippingGroupItemsRow(siz: ShippingGroupItem): ShippingGroupItemsRow =
    ShippingGroupItemsRow(
      id = siz.id.getOrElse(-1),
      shippingItemId = siz.shippingItem.id.get,
      shippingGroupId = siz.shippingGroupId,
      label = siz.label
    )

  implicit def fromShippingGroupItemsRow(siz: (ShippingGroupItemsRow, ShippingItemsRow)): ShippingGroupItem =
    ShippingGroupItem(
      id = siz._1.id,
      shippingItem = siz._2,
      shippingGroupId = siz._1.shippingGroupId,
      label = siz._1.label
    )

  implicit def toMarksRow(siz: Mark): MarksRow =
    MarksRow(
      id = siz.id.getOrElse(-1),
      shippingItemId = siz.shippingItem.id.get,
      drawingId = siz.drawingId,
      label = siz.label
    )

  implicit def fromMarksRow(siz: (MarksRow, ShippingItemsRow)): Mark =
    Mark(
      id = siz._1.id,
      shippingItem = siz._2,
      drawingId = siz._1.drawingId,
      label = siz._1.label
    )

}
