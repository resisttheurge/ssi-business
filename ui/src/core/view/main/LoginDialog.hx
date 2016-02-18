package core.view.main;

import core.dataaccess.PersistenceManager;
import core.authentication.AuthenticationManager;
import api.react.ReactDOM;
import js.JQuery;
import js.html.HtmlElement;
import api.react.ReactComponent;
import api.react.ReactMacro.jsx;


class LoginDialog extends ReactComponent {
    private static inline function jt(){return untyped __js__('this');}

    public function new() {
        super();
        this.state = {};
    }

    public override function render():ReactComponent {
        var initialize = function(input: HtmlElement){
        };

        var onUnameChange = function(e){
            var value = e.target.value;

            this.setState({uname: value});
        };

        var onPassChange = function(e){
            var value = e.target.value;

            this.setState({pass: value});
        };

        var onEnterPress = function(e){
            e.persist();

            if(e.keyCode == 13)
                new JQuery("#login-button").click();
        };

        return jsx('
            <div ref=$initialize id="content-modal" className="ui xsmall modal">
                <div className="login-header header">
                    <i className="list layout icon"></i>
                    Login
                </div>
                <div className="content">
                    <form className="ui small form">
                        <div className="ui stacked segment">
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="user icon"></i>
                                    <input type="text" name="email" onChange=$onUnameChange placeholder="E-mail address"></input>
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon"></i>
                                    <input type="password" name="password" onChange=$onPassChange onKeyUp=$onEnterPress
                                            placeholder="Password"></input>
                                </div>
                            </div>

                        </div>
                        <div className="ui error message"></div>
                    </form>
                </div>
                <div className="actions">
                    <div className="ui black cancel right small button">
                        Cancel
                    </div>
                    <div id="login-button" className="ui approve right medium icon button">
                        Login
                    </div>
                </div>
            </div>
        ');
    }

    public override function componentDidMount():Void {
        var elem: JQuery = untyped new JQuery(ReactDOM.findDOMNode(cast jt()));
        untyped elem
        .modal({
            onApprove: function(){
                AuthenticationManager.authenticate(
                    this.state.uname == null? "":this.state.uname,
                    this.state.pass == null? "":this.state.pass,
                    function(user: User){
                        Core.app.setState({authenticated: true});
                    }
                );
            },
            onHidden: function(){
                Core.modalChange.dispatch("");
            }
        })
        .modal('setting', 'closable', false)
        .modal('setting', 'transition', 'vertical flip')
        .modal('show');
    }

}
