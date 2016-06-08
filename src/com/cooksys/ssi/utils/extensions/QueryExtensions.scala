package com.cooksys.ssi.utils.extensions


import com.cooksys.ssi.models._
import com.cooksys.ssi.utils.conversions._
import shapeless.syntax.std.tuple._
import slick.driver.MySQLDriver.api._
import slick.schema.Tables
import slick.schema.Tables._

object QueryExtensions extends QueryExtensions

trait QueryExtensions {

  implicit class DrawingsQueryExtensions[C[_]](self: Query[Drawings, DrawingsRow, C]) {

    def byId(id: Rep[Int]) = self filter (_.id === id)

    def byJobId(jobId: Rep[Int]) = self filter (_.jobId === jobId)

    def update(drawing: Drawing) =

      self
        .map(r => (r.jobId, r.label, r.drawingType, r.specialtyItemId, r.shippingRequestId))
        .update((drawing: DrawingsRow).tail)

    def withDependents =
      for {
        ((drawing, item), request) <- {
          self
            .joinLeft(SpecialtyItems).on(_.specialtyItemId === _.id)
            .joinLeft(ShippingRequests.withDependents).on(_._1.shippingRequestId === _._1.id)
        }
      } yield
        (drawing, item, request)

  }

  implicit class JobsQueryExtensions[C[_]](self: Query[Jobs, JobsRow, C]) {

    def byId(id: Rep[Int]) = self filter (_.id === id)

    def withDependents =
      for {
        ((((((job, shop), salesperson), customer), contact), jobAddress), address) <- {
          self
            .joinLeft(Shops).on(_.shopId === _.id)
            .joinLeft(Salespeople).on(_._1.salespersonId === _.id)
            .joinLeft(Customers).on(_._1._1.customerId === _.id)
            .joinLeft(Contacts).on(_._1._1._1.contactId === _.id)
            .joinLeft(Tables.JobAddresses).on((left, right) => left._1._1._1._1.id === right.jobId && right.addressType === "SHIPPING")
            .joinLeft(Addresses).on(_._2.map(_.addressId).getOrElse(-1) === _.id)
        }
      } yield
        (job, shop, salesperson, customer, contact, address)

    def update(job: Job) =
      self
        .map(r =>
          (r.prefix, r.year, r.label, r.status, r.description, r.contractPrice, r.startDate, r.dueDate,
            r.shopId, r.salespersonId, r.customerId, r.contactId, r.completeDate)
        )
        .update((job: JobsRow).tail)

  }

  implicit class ShippingGroupsQueryExtensions[C[_]](self: Query[ShippingGroups, ShippingGroupsRow, C]) {

    def byId(id: Rep[Int]) = self filter (_.id === id)

    def byJobId(jobId: Rep[Int]) = self filter (_.jobId === jobId)

    def update(group: ShippingGroup) =
      self
        .map(r => (r.jobId, r.label, r.rush, r.shippingRequestId))
        .update((group: ShippingGroupsRow).tail)

    def withDependents =
      self.joinLeft(ShippingRequests.withDependents).on(_.shippingRequestId === _._1.id)

  }

  implicit class ShippingItemsQueryExtensions[C[_]](self: Query[ShippingItems, ShippingItemsRow, C]) {
    def withDependents =
      self
        .joinLeft(Shops).on(_.shopId === _.id)
  }

  implicit class ShippingRequestsQueryExtensions[C[_]](self: Query[ShippingRequests, ShippingRequestsRow, C]) {

    def byId(id: Rep[Int]) = self filter (_.id === id)

    def update(request: ShippingRequest) =
      self
        .map(r =>
          (r.tagType, r.title, r.revision, r.revisionDate, r.startDate, r.shopDate, r.fieldDate,
            r.requestDate, r.requestedBy, r.preparedBy, r.filePath, r.shopId, r.carrierId, r.contactId, r.addressId)
        )
        .update((request: ShippingRequestsRow).tail)

    def withDependents =
      for {
        ((((request, shop), carrier), contact), address) <- {
          self
            .joinLeft(Shops).on(_.shopId === _.id)
            .joinLeft(Carriers).on(_._1.carrierId === _.id)
            .joinLeft(Contacts).on(_._1._1.contactId === _.id)
            .joinLeft(Addresses).on(_._1._1._1.addressId === _.id)
        }
      } yield
        (request, shop, carrier, contact, address)

  }

  implicit class UsersQueryExtensions[C[_]](self: Query[Users, UsersRow, C]) {
    def byId(id: Int) = self filter (_.id === id)

    def byCredentials(credentials: Credentials) =
      self filter (u => u.username === credentials.username)

    def active = self filter (_.active)

    def inactive = self filterNot (_.active)

    def withRoles = self joinLeft UserRoles.active on (_.id === _.userId)

    def update(user: User) =
      (user.password, user.active) match {
        case (Some(password), Some(active)) =>
          self
            .map(u => (u.username, u.password, u.active))
            .update((user.username, password, active))
        case (Some(password), None) =>
          self
            .map(u => (u.username, u.password))
            .update((user.username, password))
        case (None, Some(active)) =>
          self
            .map(u => (u.username, u.active))
            .update((user.username, active))
        case (None, None) =>
          self
            .map(_.username)
            .update(user.username)
      }
  }

  implicit class UserRolesQueryExtensions[C[_]](self: Query[UserRoles, UserRolesRow, C]) {

    def active = self filter (_.active)

    def inactive = self filterNot (_.active)

    def byUserId(id: Int) = self filter (_.userId === id)

    def byRoles(roles: Seq[UserRoleType]) = self filter (_.role inSet roles.map(r => r: String))

  }

  implicit class PartOrdersQueryExtensions[C[_]](self: Query[PartOrders, PartOrdersRow, C]) {
    def withDependents =
      for {
        ((po, vendor), manufacturer) <- {
          self
            .joinLeft(Vendors).on(_.vendorId === _.id)
            .joinLeft(Manufacturers).on(_._1.manufacturerId === _.id)
        }
      } yield {
        (po, vendor, manufacturer)
      }

  }

  implicit class ShippingItemZonesQueryExtensions[C[_]](self: Query[ShippingItemZones, ShippingItemZonesRow, C]) {
    def withDependents =
      self
        .join(Zones).on(_.zoneId === _.id)

  }

  implicit class ShipmentsQueryExtensions[C[_]](self: Query[Shipments, ShipmentsRow, C]) {
    def withDependents =
      for {
        ((((shipment, shop), carrier), contact), address) <- {
          self
            .joinLeft(Shops).on(_.shopId === _.id)
            .joinLeft(Carriers).on(_._1.carrierId === _.id)
            .joinLeft(Contacts).on(_._1._1.contactId === _.id)
            .joinLeft(Addresses).on(_._1._1._1.addressId === _.id)
        }
      } yield {
        (shipment, shop, carrier, contact, address)
      }
  }

  implicit class ShipmentItemsQueryExtensions[C[_]](self: Query[ShipmentItems, ShipmentItemsRow, C]) {
    def withDependents =
      self
        .join(ShippingItems).on(_.shippingItemId === _.id)

  }

  implicit class ShippingGroupItemsQueryExtensions[C[_]](self: Query[ShippingGroupItems, ShippingGroupItemsRow, C]) {
    def withDependents =
      self
        .join(ShippingItems).on(_.shippingItemId === _.id)

  }

  implicit class MarksQueryExtensions[C[_]](self: Query[Marks, MarksRow, C]) {
    def withDependents =
      self
        .join(ShippingItems).on(_.shippingItemId === _.id)

  }

}
