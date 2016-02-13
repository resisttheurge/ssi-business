package com.cooksys.ssi.utils.conversions

import java.sql.{Date, Timestamp}
import java.util.Calendar

import com.cooksys.ssi.models._
import slick.schema.Tables._

object RowConversions extends RowConversions

trait RowConversions {

  implicit def fromAddendaRow(row: AddendaRow): Addendum =
    Addendum(
      id = Some(row.id),
      jobId = row.jobId,
      label = row.label,
      description = row.description,
      contractPrice = row.contractPrice,
      created = Some(row.created)
    )

  implicit def toAddendaRow(addendum: Addendum): AddendaRow =
    AddendaRow(
      id = addendum.id.getOrElse(-1),
      jobId = addendum.jobId,
      label = addendum.label,
      description = addendum.description,
      contractPrice = addendum.contractPrice,
      salespersonId = addendum.salesperson.flatMap(_.id),
      contactId = addendum.contact.flatMap(_.id),
      created = addendum.created.getOrElse(new Timestamp(Calendar.getInstance().getTimeInMillis))
    )

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
      year = {
        val cal = Calendar.getInstance()
        cal.set(Calendar.YEAR, job.identifier.year)
        new Date(cal.getTime.getTime)
      },
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
        year = {
          val cal = Calendar.getInstance()
          cal.setTime(row.year)
          cal.get(Calendar.YEAR)
        },
        label = row.label
      ),
      status = row.status,
      description = row.description,
      contractPrice = row.contractPrice,
      startDate = row.startDate,
      dueDate = row.dueDate,
      completeDate = row.completeDate
    )

  implicit def fromJobsRowWithDependents(row: (JobsRow, Option[ShopsRow], Option[SalespeopleRow], Option[CustomersRow], Option[ContactsRow])): Job =
    Job(
      id = Some(row._1.id),
      identifier = JobIdentifier(
        prefix = row._1.prefix,
        year = {
          val cal = Calendar.getInstance()
          cal.setTime(row._1.year)
          cal.get(Calendar.YEAR)
        },
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
      contact = row._5.map(c => c: Contact)
    )

  implicit def toManufacturersRow(manufacturer: Manufacturer): ManufacturersRow =
    ManufacturersRow(if (manufacturer.id.isDefined) manufacturer.id.get else -1, manufacturer.label)

  implicit def fromManufacturersRow(manufacturersRow: ManufacturersRow): Manufacturer =
    Manufacturer(Option(manufacturersRow.id), manufacturersRow.label)

  implicit def toPartsRow(part: Part): PartsRow =
    PartsRow(if (part.id.isDefined) part.id.get else -1, part.partType)

  implicit def fromPartsRow(partsRow: PartsRow): Part =
    Part(Option(partsRow.id), partsRow.`type`, partsRow.number, partsRow.description)

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

}
