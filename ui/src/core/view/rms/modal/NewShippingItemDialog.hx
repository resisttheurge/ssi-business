package core.view.rms.modal;

import api.react.ReactDOM;
import js.JQuery;
import api.react.ReactComponent;


class NewShippingItemDialog extends ReactComponent {
    private static inline function jt(){return untyped __js__('this');}

    public function new() {
        super();

    }

    public override function render():ReactComponent {

        return jsx('
            <div id="add-dwg-modal" className="ui modal">
                <div className="header">
                    <i className="list layout icon"></i> Add New Job
                </div>
                <div className="content">
                    <form className="ui form">
                        <div class="two fields">
                            <div class="field">
                                <label>Drawing Id</label>
                                <input name="dwg-id" type="text" />
                            </div>
                            <div class="field">
                                <label>Mark Type</label>
                                <input name="dwg-type" type="text" />
                            </div>
                        </div>
                        <div class="field" >
                            <label>Remarks</label>
                            <textarea rows="2"></textarea>
                        </div>
                        <div class="field">
                            <label>Zones</label>
                            <input name="dwg-type" type="text" />
                        </div>
                    </form>
                </div>
                <div className="actions">
                    <div className="ui black cancel button">
                        Cancel
                    </div>
                    <div className="ui approve right labeled icon button">
                        Submit Dwg
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
