package core.view.shipment.modal;

import core.reporting.ReportManager;
import core.models.CoreTypes.Shipment;
import api.react.ReactDOM;
import core.dataaccess.PersistenceManager;
import js.JQuery;
import js.html.HtmlElement;
import api.react.ReactComponent;
import core.view.shipment.modal.NewShpmntModalComponents.*;
import api.react.ReactMacro.jsx;

class EditShipmentDialog extends ReactComponent {
    public function new(props) {
        super(props);

        this.state = {shipment: props.shpmnt};
    }

    public function handleOnChange(name: String, value: String){
        var shp: Shipment = this.state.shipment;

        var lines = shp.address.lines;

        switch name {
            case "shop": shp.shop.label = value;
            case "carrier": shp.carrier.label = value;
            case "contact": shp.contact.label = value;
            case "country": shp.address.country = value;
            case "line1": shp.address.lines = value + "\n" + lines.split("\n")[1];
            case "line2": shp.address.lines = lines.split("\n")[0] + "\n" + value;
            case "city": shp.address.city = value;
            case "stateOrProvince": shp.address.stateOrProvince;
            case "postalCode": shp.address.postalCode;
            default: untyped shp[name] = value;
        }

        this.setState({shipment: shp});
    }

    public override function render():ReactComponent {

        var tabInitialize = function(input){
            if(input == null) return;

            var tab = new JQuery(input);

            untyped tab.tab();
        };

        var shp = this.state.shipment;

        var shop: Dynamic = shp.shop;
        var carr: Dynamic = shp.carrier;
        var cont: Dynamic = shp.contact;
        var dest: Dynamic = shp.address;

        if(shop == null) shp.shop = {};
        if(carr == null) shp.carrier = {};
        if(cont == null) shp.contact = {};
        if(dest == null) shp.address = {};


        var items = shp.items;

        var style = {margin: 0};

        var openShipmentReport = function(event){
            ReportManager.showReport("shipment", props.shpmnt);
        }

        return jsx('
            <div id="editshp-modal" className="ui modal">
                <div className="header">
                    <i className="list layout icon"></i> Edit Shipment
                </div>
                <div className="content">
                    <form className="ui form">
                        <div className="ui top attached tabular menu">
                          <div className="active item" ref=$tabInitialize data-tab="shp-tab">Shipment</div>
                          <div className="item" ref=$tabInitialize data-tab="itms-tab">Shipped Items</div>
                        </div>
                        <div className="active ui bottom attached tab segment" data-tab="shp-tab">
                            <div className="two fields">
                                <$FIELD className="field" name="pk"
                                    onChange=$handleOnChange label="Shipment Id" value=${shp.pk} />
                                <$FIELD className="field" name="shipDate" type="date"
                                    onChange=$handleOnChange label="Date" value=${shp.shipDate}/>
                            </div>
                            <div className="two fields">
                                <$FIELD className="field" name="shop"
                                    onChange=$handleOnChange label="Ship From" value=${shop.label} />
                                <$FIELD className="field" name="carrier"
                                    onChange=$handleOnChange label="Ship Via" value=${carr.label}/>
                            </div>

                            <div className="two fields">
                                <$FIELD className="field" name="billOfLading"
                                    onChange=$handleOnChange label="Bill of Lading" value=${shp.billOfLading}/>
                                <$FIELD className="field" name="weight"
                                    onChange=$handleOnChange label="Weight" value=${shp.weight}/>
                            </div>

                            <div className="field">
                                <div className="two fields">
                                    <$FIELD className="field" name="contact"
                                        onChange=$handleOnChange label="Contact" value=${cont.label}/>
                                    <$FIELD className="field" name="country"
                                        onChange=$handleOnChange label="Country" value=${dest.country}/>
                                </div>
                                <$FIELD className="field" name="line1"
                                    onChange=$handleOnChange label="Address 1" value=${dest.lines.split('\n')[0]}/>
                                <$FIELD className="field" name="line2"
                                    onChange=$handleOnChange label="Address 2" value=${dest.lines.split('\n')[1]}/>

                                <div className="three fields">
                                    <$FIELD className="field" name="city"
                                        onChange=$handleOnChange label="City" value=${dest.city}/>
                                    <$FIELD className="field" name="stateOrProvince"
                                        onChange=$handleOnChange label="State" value=${dest.stateOrProvince}/>
                                    <$FIELD className="field" name="postalCode"
                                        onChange=$handleOnChange label="Zip" value=${dest.postalCode}/>
                                </div>
                            </div>
                        </div>
                        <div className="ui bottom attached tab segment" data-tab="itms-tab">
                            <$SHIPITEMTABLE />
                        </div>
                    </form>
                </div>
                <div style=$style className="actions ui basic segment">
                    <div className="ui left floated black button" onClick=$openShipmentReport>
                        Shipment Report
                    </div>
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
        var elem = untyped new JQuery(ReactDOM.findDOMNode(cast jt()));
        untyped elem
        .modal({
            onApprove: function(){
                PersistenceManager.saveDwg(this.state.job);
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
