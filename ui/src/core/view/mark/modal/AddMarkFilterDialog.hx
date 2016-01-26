package core.view.mark.modal;

import js.JQuery;
import js.html.HtmlElement;
import api.react.ReactComponent;
import core.view.components.ModalComponents.*;
import api.react.ReactMacro.jsx;

class AddMarkFilterDialog extends ReactComponent{
    private static inline function jt(){return untyped __js__('this');}

    public function new() {
        super();

    }

    public override function render():ReactComponent {

        var initialize = function(input: HtmlElement){
        };

        return jsx('
            <div ref=$initialize id="content-modal" className="ui modal">
                <div className="header">
                    <i className="list layout icon"></i> Create Filter
                </div>
                <div className="content">
                    <form className="ui form">
                    <$FIELD  className="field" name="job-id" label="ID" />
                    <$FIELD  className="field" name="job-id" label="Start Year" />
                    <$FIELD  className="field" name="job-id" label="End Year" />
                    <$FIELD  className="field" name="job-id" label="Customer" />
                    <$FIELD  className="field" name="job-id" label="City" />
                    <$FIELD  className="field" name="job-id" label="State"/>
                    <$FIELD  className="field" name="job-id" label="Description"/>
                    </form>
                </div>
                <div  className="actions">
                    <div className="ui black cancel button">
                        Cancel
                    </div>
                    <div className="ui approve right labeled icon button">
                        Add Filter
                        <i className="checkmark icon"></i>
                    </div>
                </div>
            </div>
        ');

    }

    public override function componentDidMount():Void {
        var elem = untyped new JQuery(ReactDOM.findDOMNode(cast jt()));
        untyped elem
        .modal({
            onHidden: function(){
                Core.modalChange.dispatch("");
            }
        })
        .modal('setting', 'closable', false)
        .modal('setting', 'transition', 'vertical flip')
        .modal('show');
    }
}
