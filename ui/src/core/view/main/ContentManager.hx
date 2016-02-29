package core.view.main;

import core.dataaccess.ServiceAccessManager;
import core.models.CoreTypes.Job;
import core.models.CoreTypes.ShippingGroup;

typedef Content = Dynamic -> Dynamic;

class ContentManager {

    private static var STATICJOB = '
        {
          "pk": "26486",
          "id": {
            "prefix": "F",
            "year": "2015",
            "label": "A123"
          },
          "status": "DELETED",
          "description": "BlankString0",
          "start": "2015-01-01",
          "due": "2015-01-01",
          "shop": {
            "pk": "1235",
            "label": "BlankString1"
          },
          "salesperson": {
            "pk": "589",
            "label": "BlankString2"
          },
          "customer": {
            "pk": "456",
            "label": "BlankString3"
          },
          "contact": {
            "pk": "76",
            "label": "BlankString4",
            "phone": "(901) 555-1234",
            "fax": "(901) 555-1234",
            "email": "BlankString5"
          },
          "schedules": {
            "engineering": {
              "start": "2015-01-01",
              "complete": "2015-01-01"
            },
            "mechanical": {
              "start": "2015-01-01",
              "complete": "2015-01-01"
            },
            "electrical": {
              "start": "2015-01-01",
              "complete": "2015-01-01"
            },
            "shipping": {
              "start": "2015-01-01",
              "complete": "2015-01-01"
            },
            "installation": {
              "start": "2015-01-01",
              "complete": "2015-01-01"
            }
          },
          "addresses": {
            "shipping": {
              "pk": "3456",
              "lines": "123 Main St \\n APT 1",
              "city": "memphis",
              "stateOrProvince": "TN",
              "postalCode": "38104",
              "country": "USA"
            },
            "invoicing": {
              "pk": "998",
              "lines": "123 Main St \\n APT 1",
              "city": "memphis",
              "stateOrProvince": "TN",
              "postalCode": "38104",
              "country": "USA"
            }
          },
          "revisions": [
            {
              "label": "R3",
              "description": "BlankString6",
              "created": "2015-01-01 00:00:00"
            },
            {
              "label": "R2",
              "description": "BlankString7",
              "created": "2015-01-01 00:00:00"
            },
            {
              "label": "R1",
              "description": "BlankString8",
              "created": "2015-01-01 00:00:00"
            }
          ],
           "drawings": [
            {
              "label": "D123",
              "type": "LAYOUT",
              "startDate": "2015-01-01",
              "shopDate": "2015-01-01",
              "fieldDate": "2015-01-01",
              "marks": [
                {
                  "label": "A-D123",
                  "type": "S"
                },
                {
                  "label": "B-D123-1",
                  "type": "S"
                },
                {
                  "label": "B-D123-2",
                  "type": "S"
                }
              ]
            }
          ],
          "purchaseOrders": [
            {
              "pk": 15948,
              "number": 1,
              "drawingPk": "D123",
              "part": {
                "pk": "5481",
                "type": "MECH",
                "number": "LO34507823",
                "description": "BlankString9"
              },
              "manufacturer": {
                "pk": "6194",
                "label": "BlankString10"
              },
              "vendor": {
                "pk": "26156",
                "label": "BlankString11"
              },
              "po": "BlankString12",
              "requestedQuantity": 100,
              "stockQuantity": 50,
              "purchaseQuantity": 50,
              "requestDate": "2015-01-01",
              "purchaseDate": "2015-01-01",
              "releaseDate": "2015-01-01",
              "releasedBy": "BlankString13"
            }
          ]
        }
    ';

    private static var STATICSHIPMENT = '
        {
           "pk":1,
           "jobPk":1,
           "number":1,
           "status":"ACTIVE|COMPLETE|CANCELLED|DELETED",
           "billOfLading":"alphanum",
           "weight":100,
           "shipDate":"yyyy/mm/dd",
           "shop":{
              "pk":1,
              "label":"MEM"
           },
           "carrier":{
              "pk":1,
              "label":"FedEx"
           },
           "contact":{
              "pk":1,
              "label":"Steve Thundthighs",
              "phone":"(XXX) XXX-XXXX",
              "fax":"(XXX) XXX-XXXX",
              "email":"blah@blah.com"
           },
           "address":{
              "pk":1,
              "lines":"123 Main St \\n APT 1",
              "city":"memphis",
              "stateOrProvince":"tennessee",
              "postalCode":"38104",
              "country":"USA"
           },
           "items":[
              {
                 "pk":1,
                 "quantity":100,
                 "item":{
                    "pk":1,
                    "status":"FAB|PREFAB|SHPD|RTA|RTS|MACH|MOO|NS|PAINT|SIP|WP|SAMPLE|MEM|FTS|VOID|NEXT|HOLD",
                    "requested":100,
                    "completed":100,
                    "remarks":"blah blah blah",
                    "shop":{
                       "pk":1,
                       "label":"MEM"
                    },
                    "zones":[
                       {
                          "pk":1,
                          "quantity":100,
                          "zone":{
                             "pk":1,
                             "jobPk":1,
                             "number":1,
                             "fieldDate":"yyyy-mm-dd"
                          }
                       }
                    ]
                 }
              }
           ]
        }
    ';

    private static var contentMap = {
        jobView: function(info, callback){

            ServiceAccessManager.getData(
                EndPoint.JOB,
                {
                    success: function(response: Response<Array<Job>>){
                        if(response.success){
                            callback(response.data);
                        }
                    }
                }
            );
        }//,
//        dwgView: function(info, callback){
//            var job: Job = info;
//
//            return callback(job.drawings);
//        },
//        abmView: function(info, callback){
//            var job: Job = info;
//
//            if(job.purchaseOrders == null) job.purchaseOrders = [];
//
//            return callback(job.purchaseOrders);
//        },
//        shpmntView: function(info, callback){
//            var job: Job = info;
//            var a0 = haxe.Json.parse(STATICSHIPMENT);
//            var b0 = haxe.Json.parse(STATICSHIPMENT);
//            var c0 = haxe.Json.parse(STATICSHIPMENT);
//            var a1 = haxe.Json.parse(STATICSHIPMENT);
//            var b1 = haxe.Json.parse(STATICSHIPMENT);
//            var c1 = haxe.Json.parse(STATICSHIPMENT);
//            var a2 = haxe.Json.parse(STATICSHIPMENT);
//            var b2 = haxe.Json.parse(STATICSHIPMENT);
//            var c2 = haxe.Json.parse(STATICSHIPMENT);
//
//            return callback([a0,b0,c0,a1,b1,c1,a2,b2,c2]);
//        },
//        markView: function(info, callback){
//            var job: Job = info;
//
//            var markArray = [];
//
//            if(job.drawings == null) job.drawings = [];
//
//            for(dwg in job.drawings){
//                for(mk in dwg.marks) mk.drawingId = dwg.label;
//
//                markArray = markArray.concat(dwg.marks);
//            }
//
//            return callback(markArray);
//        },
//        rmsView: function(info, callback){
//            var job: Job = info;
//
//            var s = '
//            {
//              "pk": 1,
//              "jobPk": 1,
//              "label": "RMS-456",
//              "rush": false,
//              "items": [
//                  {
//                    "pk": 3,
//                    "status": "PREFAB",
//                    "label": "SI-30",
//                    "requested": 300,
//                    "completed": 20,
//                    "remarks": "Things",
//                    "shop": "MEM",
//                    "zones":
//                        {
//                          "pk": 1,
//                          "quantity": "420",
//                          "zone":{}
//
//                        }
//                  }
//              ]
//            }';
//
//            var a0: ShippingGroup = haxe.Json.parse(s);
//            var a1: ShippingGroup = haxe.Json.parse(s);
//            var a2: ShippingGroup = haxe.Json.parse(s);
//            var a3: ShippingGroup = haxe.Json.parse(s);
//
//            a0.pk = 1; a1.pk = 2; a2.pk = 3; a3.pk = 4;
//
//            var rmsArray = [a0,a1,a2,a3];
//
//            return callback(rmsArray);
//        }
    };



    public static function buildContent(viewId: String, info: Dynamic, callback): Dynamic{
        if(untyped contentMap[viewId] == null) return null;
        return untyped contentMap[viewId](info, callback);
    }
}
