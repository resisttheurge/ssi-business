package core.models;

#if display
typedef SubTypes = {}
#end

enum AbmStatus {ACTIVE;COMPLETED;CANCELLED;DELETED;}
enum JobPrefix {B; F; FC; FE; FR; FS; M; MF; MT; RG;}
enum JobStatus {DRAFT;ACTIVE;COMPLETED;CANCELLED;DELETED;}
enum DrawingType {DETAIL; LAYOUT;}
enum MarkType {S; W;}
enum PartType {MECH; ELEC;}
enum ShippingItemStatus {FAB;PREFAB;SHPD;RTA;RTS;MACH;MOO;NS;PAINT;SIP;WP;SAMPLE;MEM;FTS;VOID;NEXT;HOLD;}
enum ShipmentStatus {POSTED; ACTIVE; COMPLETE; CANCELLED; DELETED;}

typedef JobId = {
    var prefix: JobPrefix;
    var year: String;
    var label: String;
}

typedef Shop = {
    var pk: String;
    var label: String;
}

typedef SalesPerson = {
    var pk: String;
    var label: String;
}

typedef Customer = {
    var pk: String;
    var label: String;
}

typedef Contact = {
    var pk: String;
    var label: String;
    var phone: String;
    var fax: String;
    var email: String;
}

typedef Carrier = {
    var pk: String;
    var label: String;
}

typedef Schedule = {
    @:optional var start:String; // Date format `yyyy-mm-dd`, missing if empty
    @:optional var complete:String; // Date format `yyyy-mm-dd`, missing if empty
}

typedef JobSchedule = {
    var engineering:Schedule;
    var mechanical:Schedule;
    var electrical:Schedule;
    var shipping:Schedule;
    var installation:Schedule;
}

typedef JobAddresses = {
    var shipping: Address;
    var invoicing: Address;
}

typedef Address = {
    var pk: String;
    var lines: String;
    var city: String;
    var stateOrProvince: String;
    var postalCode: String;
    var country: String;
}

typedef ShippingItemZone = {
    var pk: String;
    var quantity: Int;
}

typedef Zone = {
    var pk: String;
    var jobPk: String;
    var number: String;
    var fieldDate: String;
}

typedef Part = {
    var pk: String;
    var type: PartType;
    var number: String;
    var description: String;
}

typedef Manufacturer = {
    var pk: String;
    var label: String;
}

typedef Vendor = {
    var pk: String;
    var label: String;
}


typedef SystemType = {
    var pk: String;
    var label: String;
}


