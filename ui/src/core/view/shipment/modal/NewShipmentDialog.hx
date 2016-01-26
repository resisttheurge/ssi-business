package core.view.shipment.modal;

import api.react.ReactDOM;
import js.JQuery;
import api.react.ReactComponent;
import core.view.shipment.modal.NewShpmntModalComponents.*;
import api.react.ReactMacro.jsx;


class NewShipmentDialog extends ReactComponent {
    private static inline function jt(){return untyped __js__('this');}

    public function new() {
        super();

        this.state = {shpmnt: {}};
    }

    public function handleOnChange(name: String, value: String){
        var shpmnt = this.state.shpmnt;
        untyped shpmnt[name] = value;

        jt().setState({shpmnt: shpmnt});
    }

    public override function render():ReactComponent {

        return jsx('
            <div id="add-dwg-modal" className="ui small modal">
                <div className="header">
                    <i className="list layout icon"></i> Add New Shipment
                </div>
                <div className="content">
                    <form className="ui form">

                        <div className="two fields">
                            <$FIELD className="field" name="pk"
                                onChange=$handleOnChange label="Shipment Id" />
                            <$FIELD className="field" name="shipDate" type="date"
                                onChange=$handleOnChange label="Ship Date" />
                        </div>
                        <div className="two fields">
                            <$FIELD className="field" name="shop"
                                onChange=$handleOnChange label="Ship From" />
                            <$FIELD className="field" name="carrier"
                                onChange=$handleOnChange label="Ship Via" />
                        </div>

                        <div className="two fields">
                            <$FIELD className="field" name="billOfLading"
                                onChange=$handleOnChange label="Bill of Lading" />
                            <$FIELD className="field" name="weight"
                                onChange=$handleOnChange label="Weight" />
                        </div>

                        <div className="field">
                            <div className="two fields">
                                <$FIELD className="field" name="contact"
                                    onChange=$handleOnChange label="Contact" />
                                <$FIELD className="field" name="country"
                                    onChange=$handleOnChange label="Country" />
                            </div>
                            <$FIELD className="field" name="line1"
                                onChange=$handleOnChange label="Address 1" />
                            <$FIELD className="field" name="line2"
                                onChange=$handleOnChange label="Address 2" />

                            <div className="three fields">
                                <$FIELD className="field" name="city"
                                    onChange=$handleOnChange label="City" />
                                <$FIELD className="field" name="stateOrProvince"
                                    onChange=$handleOnChange label="State" />
                                <$FIELD className="field" name="postalCode"
                                    onChange=$handleOnChange label="Zip" />
                            </div>
                        </div>
                    </form>
                </div>
                <div className="actions">
                    <div className="ui black cancel button">
                        Cancel
                    </div>
                    <div className="ui approve right labeled icon button">
                        Submit Shipment
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
