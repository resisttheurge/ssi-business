package core.authentication;

import core.dataaccess.PersistenceManager;
enum Role {Admin; User; Annon;}

typedef User = {
    var username: String;
    var role: Role;
    var token: String;
}

class AuthenticationManager {
    private static var initialized: Bool = false;
    private static var currentUser: User;


    public static function authenticate(username: String, password: String): Bool{
        //TODO Implement This

        var success = (username == "test" && password == "pass");

        if(success) {
            currentUser = {username: "Test", role: Role.Admin, token: "blahblahblah"}
        } else {
            currentUser == null;
        }

        PersistenceManager.store("user", currentUser);

        initialized == success;

        return success;
    }

    public static function getCurrentUser(): User {
        if(!initialized)
            currentUser = PersistenceManager.get("user");

        initialized = currentUser != null;

        return currentUser;
    }

    public static function isUserAdmin(): Bool {return getUserRole() == Role.Admin;}
    public static function isUserUser(): Bool {return getUserRole() == Role.User;}

    public static function getUserRole(): Role {

        return getCurrentUser() == null ? Role.Annon : getCurrentUser().role;
    }

    public static function isLoggedIn():Bool{ return getCurrentUser() != null;}

    public static function logout(){
        currentUser = null; initialized = false;

        PersistenceManager.store("user", currentUser);
    }

}
