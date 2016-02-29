package core.authentication;

import core.dataaccess.ServiceAccessManager.EndPoint;
import core.dataaccess.ServiceAccessManager.EndPoint;
import core.dataaccess.ServiceAccessManager;
import core.dataaccess.PersistenceManager;


enum Role {ADMIN; EMPLOYEE; Annon;
}

typedef User = {
    var username:String;
    var roles:Array<Role>;
}

class AuthenticationManager {
    private static var initialized:Bool = false;
    private static var currentUser:User;

    public static function hash(password:String):String {
        return untyped bcrypt.hashSync(password, bcrypt.genSaltSync());
    }


    public static function authenticate(username:String, password:String, onSuccess:User -> Void, ?onError:Dynamic -> Void):Void {
        ServiceAccessManager.postData(
            EndPoint.AUTH,
            {
                username: username,
                password: password
            },
            {
                success: function(response:Response<User>) {
                    untyped console.log('received response: $response');
                    if (response.success) {
                        PersistenceManager.store("user", response.data);
                        onSuccess(response.data);
                    } else {

                    }
                }
            }
        );
    }

    public static function getCurrentUser():User {
        if (!initialized)
            currentUser = PersistenceManager.get("user");

        initialized = currentUser != null;

        return currentUser;
    }

    public static function isUserAdmin():Bool {
        return (getUserRoles().filter(function(role: Role) {return role == Role.ADMIN;}).length != 0);
    }

    public static function isUserEmployee():Bool {
        return (getUserRoles().filter(function(role: Role) {return role == Role.EMPLOYEE;}).length != 0);
    }

    public static function getUserRoles():Array<Role> {

        return getCurrentUser() == null ? [Role.Annon] : getCurrentUser().roles;
    }

    public static function isLoggedIn():Bool { return getCurrentUser() != null;}

    public static function logout() {
        currentUser = null; initialized = false;

        PersistenceManager.store("user", currentUser);
    }

}
