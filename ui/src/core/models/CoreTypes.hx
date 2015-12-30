package core.models;

import core.models.SubTypes.JobId;
import core.models.SubTypes.AbmStatus;
import core.models.SubTypes.Shop;
import core.models.SubTypes.SalesPerson;
import core.models.SubTypes.Customer;
import core.models.SubTypes.Contact;
import core.models.SubTypes.Carrier;
import core.models.SubTypes.Schedule;
import core.models.SubTypes.JobSchedule;
import core.models.SubTypes.JobAddresses;
import core.models.SubTypes.Address;
import core.models.SubTypes.Zone;
import core.models.SubTypes.Part;
import core.models.SubTypes.Manufacturer;
import core.models.SubTypes.Vendor;
import core.models.SubTypes.SystemType;
import core.models.SubTypes.JobPrefix;
import core.models.SubTypes.JobStatus;
import core.models.SubTypes.DrawingType;
import core.models.SubTypes.MarkType;
import core.models.SubTypes.PartType;
import core.models.SubTypes.ShippingItemStatus;
import core.models.SubTypes.ShipmentStatus;


// A table representable object;
typedef Model = {}

#if display
// CoreTypes is for Intellij - Ignore
typedef CoreTypes = {}
#end


typedef Job = {
    var pk: String;
    var id: JobId;
    var status: JobStatus;
    var description: String;
    var contractPrice: String;
    var start: String;
    var due: String;


    var shop: Shop;

    var salesperson: SalesPerson;
    var customer: Customer;

    var contact: Contact;

    var schedules: JobSchedule;
    var addresses: JobAddresses;

    var revisions: Array<Revision>;

    var drawings: Array<Drawing>;

    var purchaseOrders: Array<ABM>;

    var systemTypes: Array<SystemType>;

    var shippingGroups: Array<ShippingGroup>;
}

typedef ABM = {
    var pk: Int;
    var drawingPk: String;
    var number: Int;
    var status: AbmStatus;
    var part: Part;
    var manufacturer: Manufacturer;
    var vendor: Vendor;
    var po: String;
    var requestedQuantity: Int;
    var stockQuantity: Int;
    var purchaseQuantity: Int;
    var requestDate: String;
    var purchaseDate: String;
    var releaseDate: String;
    var releasedBy: String;
}

typedef Revision = {
    var label: String;
    var description: String;
    var created: String;
}

typedef Drawing = {
    var label: String;
    var type: DrawingType;
    var title: String;
    var revision: String;
    var revisionDate: String;
    var startDate: String;
    var shopDate: String;
    var fieldDate: String;

    var marks: Array<Mark>;
}

typedef Mark = {
    @optional
    var drawingId: String;
    var label: String;
    var type: MarkType;
    var item: ShippingItem;
}



typedef ShippingGroup = {
    var pk: Int;
    var label: String;
    var rush: Bool;
    var items: Array<ShippingItem>;
    @optional
    var item: ShippingItem;
}


typedef ShippingItem = {
    var pk: Int;
    var label: String;
    var status: ShippingItemStatus;
    var requested: Int;
    var completed: Int;
    var remarks: String;

    var shop: Shop;

    var zones: Array<Zone>;
}

typedef Shipment = {
    var pk: String;
    var jobPk: String;
    var number: String;
    var status: ShipmentStatus;
    var billOfLading: String;
    var weight: String;
    var shipDate: String;

    var shop: Shop;

    var carrier: Carrier;
    var contact: Contact;

    var address: Address;

    var items: Array<ShippingItem>;
}

