package core.authentication;

import core.dataaccess.ServiceAccessManager.EndPoint;
import core.dataaccess.ServiceAccessManager;
import core.dataaccess.PersistenceManager;


enum Role {Admin; User; Annon;
}

typedef User = {
    var username:String;
    var role:Role;
    var token:String;
}

class AuthenticationManager {
    private static var initialized:Bool = false;
    private static var currentUser:User;

    public static function hash(password:String):String {
        return untyped bcrypt.hashSync(password, bcrypt.genSaltSync());
    }


    public static function authenticate(username: String, password: String, onSuccess: User -> Void, ?onError: Dynamic -> Void):Void {
      currentUser = {username: username, role: Admin, token: password};
      PersistenceManager.store("user", currentUser);
      onSuccess(currentUser);
    }

    public static function getCurrentUser():User {
        if (!initialized)
            currentUser = PersistenceManager.get("user");

        initialized = currentUser != null;

        return currentUser;
    }

    public static function isUserAdmin():Bool {return getUserRole() == Role.Admin;}

    public static function isUserUser():Bool {return getUserRole() == Role.User;}

    public static function getUserRole():Role {

        return getCurrentUser() == null ? Role.Annon : getCurrentUser().role;
    }

    public static function isLoggedIn():Bool { return getCurrentUser() != null;}

    public static function logout() {
        currentUser = null; initialized = false;

        PersistenceManager.store("user", currentUser);
    }

}
