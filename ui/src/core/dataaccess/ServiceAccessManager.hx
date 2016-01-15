package core.dataaccess;

import core.dataaccess.ServiceAccessManager.EndPoint;
import haxe.Http;
import js.JQuery;
import core.authentication.AuthenticationManager.User;

typedef AjaxCallbacks = {
    @optional var error: Dynamic -> Void;
    @optional var success: Dynamic -> Void;
    @optional var done: Dynamic -> Void;
    @optional var fail: Dynamic -> Void;
    @optional var always: Dynamic -> Void;
    @optional var then: Dynamic -> Void;
}

enum EndPoint {CARRIER;CUSTOMER;JOB;JOBDWG;JOBMARK;JOBSHPGRP;JOBITEM;JOBSHPMNT;MFACT;PART;SALESPERSON;SHOP;USER;USERROLE;VENDOR;}
class ServiceAccessManager {/* for Intellij, Ignore or Delete if Necessary */ #if display private var CARRIER: EndPoint;private var CUSTOMER: EndPoint;private var JOB: EndPoint;private var JOBDWG: EndPoint;private var JOBMARK: EndPoint;private var JOBSHPGRP: EndPoint;private var JOBITEM: EndPoint;private var JOBSHPMNT: EndPoint;private var MFACT: EndPoint;private var PART: EndPoint;private var SALESPERSON: EndPoint;private var SHOP: EndPoint;private var USER: EndPoint;private var USERROLE: EndPoint;private var VENDOR: EndPoint; #end
    private static var baseUrl = "";
    private static var contextRoot = "api/";
    private static function urlObj(url: EndPoint, ?data: Dynamic){
        switch url {
            case CARRIER:{if(data == null) return '/carriers';return '/carriers/${data.pk}}';}
            case CUSTOMER:{if(data == null) return '/customers';return '/customers/${data.pk}';}
            case JOB:{if(data == null) return '/jobs';return '/jobs/${data.pk}}';}
            case JOBDWG:{if(data == null) return '/jobs/${data.pk}/drawings';return '/jobs/${data.pk}}/drawings/${data.label}';}
            case JOBMARK:{return '/jobs/${data.pk}/drawings/${data.label}/marks';}
            case JOBSHPGRP:{if(data == null) return '/jobs/${data.pk}}/shipping-groups';return '/jobs/${data.pk}/shipping-groups/${data.label}';}
            case JOBITEM:{return '/jobs/${data.pk}}/shipping-groups/${data.label}/items';}
            case JOBSHPMNT:{if(data == null) return '/jobs/${data.pk}/shipments';return '/jobs/${data.pk}}/shipments/${data.number}';}
            case MFACT:{if(data == null) return '/manufacturers';return '/manufacturers/${data.pk}';}
            case PART:{if(data == null) return '/parts';return '/parts/${data.pk}}';}
            case SALESPERSON:{if(data == null) return '/salespeople';return '/salespeople/${data.pk}';}
            case SHOP:{if(data == null) return '/shops';return '/shops/${data.pk}}';}
            case USER:{if(data == null) return '/users';return '/users/${data.pk}';}
            case USERROLE:{return '/users/${data.pk}}/roles';}
            case VENDOR:{if(data == null) return '/vendors';return '/vendors/${data.pk}';}
        }
    }

    private static inline function ajax(settings: Dynamic): Dynamic{return untyped JQuery.ajax(settings);}

    private static function buildUrl(ep: EndPoint, ?data: Dynamic): String {
        return '$baseUrl$contextRoot${urlObj(ep, data)}';
    }

    public static function getData(ep: EndPoint, callbacks: Dynamic, ?data: Dynamic){
        var url = buildUrl(ep, data);

        return ajax({
            url: url,
            type: 'GET',
            error: callbacks.error,
            success: callbacks.success
        }).always(callbacks.always).fail(callbacks.fail).done(callbacks.done).then(callbacks.then);
    }

    public static function postData(ep: EndPoint, callbacks: Dynamic, data: Dynamic){
        var url = buildUrl(ep, data);

        return ajax({
            url: url,
            type: 'POST',
            content: data.content,
            error: callbacks.error,
            success: callbacks.success
        }).always(callbacks.always).fail(callbacks.fail).done(callbacks.done).then(callbacks.then);
    }


}
