package app.db

import slick.driver.MySQLDriver.api._
import slick.schema.Tables._

object Queries {

  object users extends TableQuery(new Users(_))
  object userRoles extends TableQuery(new UserRoles(_))
  object userTokens extends TableQuery(new UserTokens(_))

  object addenda extends TableQuery(new Addenda(_))
  object addresses extends TableQuery(new Addresses(_))
  object carriers extends TableQuery(new Carriers(_))
  object contacts extends TableQuery(new Contacts(_))
  object customers extends TableQuery(new Customers(_))
  object drawings extends TableQuery(new Drawings(_))
  object jobs extends TableQuery(new Jobs(_)) {

    def findById(id: Rep[Int]) = this.filter(_.id === id)

  }

  object jobAddresses extends TableQuery(new JobAddresses(_))
  object manufacturers extends TableQuery(new Manufacturers(_))
  object marks extends TableQuery(new Marks(_))
  object partOrders extends TableQuery(new PartOrders(_))
  object parts extends TableQuery(new Parts(_))
  object salespeople extends TableQuery(new Salespeople(_))
  object schedules extends TableQuery(new Schedules(_))
  object shipmentItems extends TableQuery(new ShipmentItems(_))
  object shipments extends TableQuery(new Shipments(_))
  object shippingGroupItems extends TableQuery(new ShippingGroupItems(_))
  object shippingGroups extends TableQuery(new ShippingGroups(_))
  object shippingItems extends TableQuery(new ShippingItems(_))
  object shippingItemZones extends TableQuery(new ShippingItemZones(_))
  object shops extends TableQuery(new Shops(_))
  object vendors extends TableQuery(new Vendors(_))
  object zones extends TableQuery(new Zones(_))

  object audit {

    object revInfo extends TableQuery(new RevInfo(_))

    object addenda extends TableQuery(new AddendaAudit(_))
    object addresses extends TableQuery(new AddressesAudit(_))
    object carriers extends TableQuery(new CarriersAudit(_))
    object contacts extends TableQuery(new ContactsAudit(_))
    object customers extends TableQuery(new CustomersAudit(_))
    object drawings extends TableQuery(new DrawingsAudit(_))
    object jobs extends TableQuery(new JobsAudit(_))
    object jobAddresses extends TableQuery(new JobAddressesAudit(_))
    object manufacturers extends TableQuery(new ManufacturersAudit(_))
    object marks extends TableQuery(new MarksAudit(_))
    object partOrders extends TableQuery(new PartOrdersAudit(_))
    object parts extends TableQuery(new PartsAudit(_))
    object salespeople extends TableQuery(new SalespeopleAudit(_))
    object schedules extends TableQuery(new SchedulesAudit(_))
    object shipmentItems extends TableQuery(new ShipmentItemsAudit(_))
    object shipments extends TableQuery(new Shipments(_))
    object shippingGroupItems extends TableQuery(new ShippingGroupItemsAudit(_))
    object shippingGroups extends TableQuery(new ShippingGroupsAudit(_))
    object shippingItems extends TableQuery(new ShippingItemsAudit(_))
    object shippingItemZones extends TableQuery(new ShippingItemZonesAudit(_))
    object shops extends TableQuery(new ShopsAudit(_))
    object vendors extends TableQuery(new VendorsAudit(_))
    object zones extends TableQuery(new ZonesAudit(_))

  }

}
