package core.view.rms.modal;

import api.react.React;
import js.JQuery;
import api.react.ReactDOM;
import core.dataaccess.PersistenceManager;
import js.html.HtmlElement;
import core.view.rms.modal.NewRmsModalComponents.*;
import api.react.ReactComponent;
import api.react.ReactMacro.jsx;

class EditRmsDialog extends ReactComponent {
    private static inline function jt(){return untyped __js__('this');}
    private var input: Dynamic;

    public function new() {
        super();
    }

    public override function render():ReactComponent {

        var tabInit = function(input){
            if(input == null) return;

            untyped JQuery.tab();
        };

        var handleResult = function(input){
                untyped console.log("Handling Input");
                untyped JQuery.tab("change tab", "edit-tab");
        };

        var style = {margin: 0};

        return jsx('
            <div ref=$tabInit id="editdwg-modal" className="ui small modal">
                <div className="header">
                    <i className="list layout icon"></i> Edit RMS
                </div>
                <div className="content">
                    <div style=$style className="active ui tab basic segment" data-tab="edit-tab">
                        <form className="ui small form">
                            <div className="field">
                                <$SHIPITEMTABLE />
                            </div>
                        </form>
                    </div>
                    <div className="ui tab basic segment" data-tab="new-tab">
                        <form className="ui form">
                            <div className="field" >
                                <div className="ui black button" onClick=$handleResult>
                                    Cancel
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div  className="actions">
                    <div className="ui black cancel button">
                        Cancel
                    </div>
                    <div className="ui approve right labeled icon button">
                        Submit Drawing Changes
                        <i className="checkmark icon"></i>
                    </div>
                </div>
            </div>
        ');
    }

    public override function componentDidMount():Void {
        var elem = new JQuery(cast ReactDOM.findDOMNode(cast jt()));
        untyped elem
        .modal({
            onDeny: function(){
                untyped JQuery.tab("change tab", "edit-tab");
            },
            onApprove: function(){
                untyped JQuery.tab("change tab", "edit-tab");
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
