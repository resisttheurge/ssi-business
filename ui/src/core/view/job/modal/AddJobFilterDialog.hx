package core.view.job.modal;

import js.JQuery;
import js.html.HtmlElement;
import api.react.ReactComponent;
import api.react.ReactMacro.jsx;
import core.view.components.ModalComponents.*;

class AddJobFilterDialog extends ReactComponent{
    private static inline function jt(){return untyped __js__('this');}

    public function new() {
        super();

    }

    public override function render():ReactComponent {

        var initialize = function(input: HtmlElement){
        };

        return jsx('
            <div ref=$initialize id="content-modal" className="ui xsmall modal">
                <div className="header">
                    <i className="list layout icon"></i> Create Filter
                </div>
                <div className="content">
                    <form className="ui small form">
                        <$FIELD  className="field" name="job-id" label="ID" />
                        <div className="fields">
                            <$FIELD  className="field" name="job-id" label="Start Year" />
                            <$FIELD  className="field" name="job-id" label="End Year" />
                        </div>
                        <$FIELD  className="field" name="job-id" label="Customer" />
                        <div className="fields">
                            <$FIELD  className="field" name="job-id" label="City" />
                            <$FIELD  className="field" name="job-id" label="State"/>
                        </div>
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
