package core.view.main;

import core.models.CoreTypes.Job;
import core.authentication.AuthenticationManager.User;
import core.view.main.SideMenu.MenuOption;
import api.react.ReactComponent;

typedef AppState = {
    var status: AppStatus;
    var auth:AuthState;
    var view:ViewState;
    var job:JobState;
}

typedef AppProps = {
    var endpointUrl: String;
}

typedef AppStatus = {
    var error: Bool;
    var loading: Bool;
    @optional
    var message: String;
}

typedef AuthState = {
    var authenticated:Bool;
    @optional
    var user:User;
}

typedef ViewState = {
    @optional
    var currentView: String;
    var menu:ReactComponent;
    var content:ReactComponent;
    var modal: ModalProps;
}

typedef ModalProps = {
    @optional
    var index: String;
    @optional
    var dataObject:Dynamic;
}

typedef JobState = {
    var index:Array<Job>;
    @optional
    var selected:Job;
}