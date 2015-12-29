package app.db

import app.models.User.{Index, ByPk, ByUsername}
import app.models._
import slick.driver.MySQLDriver.api._
import slick.schema.Tables.JobAddresses
import slick.schema.Tables._

object Queries {

  object users extends TableQuery(new Users(_)) {

    def find(data: User.Find) =
      data match {
        case Index(active) =>
          active match {
            case Some(active) => this.filter(_.active === active)
            case None => this
          }
        case ByUsername(username, active) =>
          active match {
            case Some(active) => this.filter(_.active === active)
            case None => this
          }
        case ByPk(pk, active) =>
          active match {
            case Some(active) => this.filter(_.active === active)
            case None => this
          }
      }

    def create(data: User.Create) =
      (this
        returning this.map(_.id)
        into ((user, id) => User(id, user.username, user.password, user.active))) +=
        UsersRow(-1, data.username, data.password, data.active.getOrElse(true))

    def update(data: User) =
      this
        .filter(_.id === data.pk)
        .map(u => (u.username, u.password, u.active))
        .update((data.username, data.password, data.active))

    def delete(user: User) =
      this
        .filter(_.id === user.pk)
        .delete

  }

  object userRoles extends TableQuery(new UserRoles(_))

  object userTokens extends TableQuery(new UserTokens(_))

  object addenda extends TableQuery(new Addenda(_))

  object addresses extends TableQuery(new Addresses(_)) {

    def create(address: Address) =
      (this
        returning this.map(_.id)
        into (
        (address, id) =>
          Address(
            Some(id),
            address.lines.getOrElse(""),
            address.city.getOrElse(""),
            address.stateorprovince.getOrElse(""),
            address.postalCode.getOrElse(""),
            address.country.getOrElse("")
          )
        )) +=
        AddressesRow(
          -1,
          if (address.lines.isEmpty) None else Some(address.lines),
          if (address.city.isEmpty) None else Some(address.city),
          if (address.stateOrProvince.isEmpty) None else Some(address.stateOrProvince),
          if (address.postalCode.isEmpty) None else Some(address.postalCode),
          if (address.country.isEmpty) None else Some(address.country)
        )

    def update(address: Address) =
      this
        .filter(_.id === address.pk.getOrElse(-1))
        .map(a => (a.lines, a.city, a.stateorprovince, a.postalCode, a.country))
        .update((
          if (address.lines.isEmpty) None else Some(address.lines),
          if (address.city.isEmpty) None else Some(address.city),
          if (address.stateOrProvince.isEmpty) None else Some(address.stateOrProvince),
          if (address.postalCode.isEmpty) None else Some(address.postalCode),
          if (address.country.isEmpty) None else Some(address.country)
          ))

    def delete(address: Address) =
      this
        .filter(_.id === address.pk.getOrElse(-1))
        .delete

  }

  object carriers extends TableQuery(new Carriers(_)) {

    def create(carrier: Carrier) =
      (this
        returning this.map(_.id)
        into ((carrier, id) => Carrier(Some(id), carrier.label))) +=
        CarriersRow(-1, carrier.label)

    def update(carrier: Carrier) =
      this
        .filter(_.id === carrier.pk.getOrElse(-1))
        .map(c => c.label)
        .update(carrier.label)

    def delete(carrier: Carrier) =
      this
        .filter(_.id === carrier.pk.getOrElse(-1))
        .delete

  }

  object contacts extends TableQuery(new Contacts(_))

  object customers extends TableQuery(new Customers(_)) {
    
    def create(customer: Customer) =
      (this
        returning this.map(_.id)
        into ((customer, id) => Customer(Some(id), customer.label))) +=
        CustomersRow(-1, customer.label)

    def update(customer: Customer) =
      this
        .filter(_.id === customer.pk.getOrElse(-1))
        .map(c => c.label)
        .update(customer.label)

    def delete(customer: Customer) =
      this
        .filter(_.id === customer.pk.getOrElse(-1))
        .delete
    
  }

  object drawings extends TableQuery(new Drawings(_))

  object jobs extends TableQuery(new Jobs(_)) {

    def findById(id: Rep[Int]) = this.filter(_.id === id)

  }

  object jobAddresses extends TableQuery(new JobAddresses(_))

  object manufacturers extends TableQuery(new Manufacturers(_)) {

    def create(manufacturer: Manufacturer) =
      (this
        returning this.map(_.id)
        into ((manufacturer, id) => Manufacturer(Some(id), manufacturer.label))) +=
        ManufacturersRow(-1, manufacturer.label)

    def update(manufacturer: Manufacturer) =
      this
        .filter(_.id === manufacturer.pk.getOrElse(-1))
        .map(m => m.label)
        .update(manufacturer.label)

    def delete(manufacturer: Manufacturer) =
      this
        .filter(_.id === manufacturer.pk.getOrElse(-1))
        .delete
    
  }

  object marks extends TableQuery(new Marks(_))

  object partOrders extends TableQuery(new PartOrders(_))

  object parts extends TableQuery(new Parts(_))

  object salespeople extends TableQuery(new Salespeople(_)) {

    def create(salesperson: Salesperson) =
      (this
        returning this.map(_.id)
        into ((salesperson, id) => Salesperson(Some(id), salesperson.label))) +=
        SalespeopleRow(-1, salesperson.label)

    def update(salesperson: Salesperson) =
      this
        .filter(_.id === salesperson.pk.getOrElse(-1))
        .map(s => s.label)
        .update(salesperson.label)

    def delete(salesperson: Salesperson) =
      this
        .filter(_.id === salesperson.pk.getOrElse(-1))
        .delete
    
  }

  object schedules extends TableQuery(new Schedules(_)) {

    def create(jobId: Int, scheduleType: ScheduleType, schedule: Schedule) =
      (this
        returning this.map(_.id)
        into ((schedule, id) => Schedule(Some(id), schedule.startDate, schedule.completeDate))) +=
        SchedulesRow(-1, jobId, scheduleType.toString, schedule.startDate, schedule.completeDate)

    def update(schedule: Schedule) =
      this
        .filter(_.id === schedule.pk.getOrElse(-1))
        .map(s => (s.startDate, s.completeDate))
        .update(schedule.startDate, schedule.completeDate)

    def delete(salesperson: Salesperson) =
      this
        .filter(_.id === salesperson.pk.getOrElse(-1))
        .delete

  }

  object shipmentItems extends TableQuery(new ShipmentItems(_))

  object shipments extends TableQuery(new Shipments(_))

  object shippingGroupItems extends TableQuery(new ShippingGroupItems(_))

  object shippingGroups extends TableQuery(new ShippingGroups(_))

  object shippingItems extends TableQuery(new ShippingItems(_))

  object shippingItemZones extends TableQuery(new ShippingItemZones(_))

  object shops extends TableQuery(new Shops(_)) {

    def create(shop: Shop) =
      (this
        returning this.map(_.id)
        into ((shop, id) => Shop(Some(id), shop.label))) +=
        ShopsRow(-1, shop.label)

    def update(shop: Shop) =
      this
        .filter(_.id === shop.pk.getOrElse(-1))
        .map(s => s.label)
        .update(shop.label)

    def delete(shop: Shop) =
      this
        .filter(_.id === shop.pk.getOrElse(-1))
        .delete
    
  }

  object vendors extends TableQuery(new Vendors(_)) {

    def create(vendor: Vendor) =
      (this
        returning this.map(_.id)
        into ((vendor, id) => Vendor(Some(id), vendor.label))) +=
        VendorsRow(-1, vendor.label)

    def update(vendor: Vendor) =
      this
        .filter(_.id === vendor.pk.getOrElse(-1))
        .map(v => v.label)
        .update(vendor.label)

    def delete(vendor: Vendor) =
      this
        .filter(_.id === vendor.pk.getOrElse(-1))
        .delete
    
  }

  object zones extends TableQuery(new Zones(_)) {
    
    def create(zone: Zone) =
      (this
        returning this.map(_.id)
        into (
        (zone, id) =>
          Zone(
            Some(id),
            zone.jobId,
            zone.number,
            zone.fieldDate
          )
        )) +=
        ZonesRow(
          -1,
          zone.jobPk,
          zone.number,
          zone.fieldDate
        )

    def update(zone: Zone) =
      this
        .filter(_.id === zone.pk.getOrElse(-1))
        .map(z => (z.jobId, z.number, z.fieldDate))
        .update((zone.jobPk, zone.number, zone.fieldDate))

    def delete(zone: Zone) =
      this
        .filter(_.id === zone.pk.getOrElse(-1))
        .delete
    
  }

}
