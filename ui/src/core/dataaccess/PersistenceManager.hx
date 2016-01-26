package core.dataaccess;

import js.html.Storage;
import haxe.Json;
import js.Browser;

class PersistenceManager {
    private static var localStorage = Browser.getLocalStorage();
    private static var sessionStorage = Browser.getSessionStorage();

    public static function supportedClient(): Bool {return sessionStorage != null && localStorage != null;}

    public static function store(key: String, obj: Dynamic, session: Bool = true): Bool{
        var storage: Storage = session ? sessionStorage : localStorage;

        if(obj == null) storage.removeItem(key);

        var data = Json.stringify(obj);

        if(data == null || !supportedClient()) return false;

        storage.setItem(key, data);

        return true;
    }

    public static function get(key: String, session: Bool = true): Dynamic{
        if(!supportedClient()) return null;

        var storage: Storage = session ? sessionStorage : localStorage;

        if(key == null || key == "") return null;

        var data = storage.getItem(key);
        if(data == null) return null;

        return Json.parse(data);
    }

    public static function saveObject(obj: Dynamic){
        untyped console.log(Json.stringify(obj));
    }
    public static function saveJob(obj: Dynamic){
        saveObject(obj);
    }
    public static function saveDwg(obj: Dynamic){
        saveObject(obj);
    }

}
