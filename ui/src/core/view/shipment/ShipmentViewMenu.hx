package core.view.shipment;

import api.react.ReactComponent;
import api.react.ReactMacro.jsx;

class ShipmentViewMenu extends ReactComponent{

    public function new() {
        super();
    }

    public override function render():ReactComponent {
        var openNewShpmntDialog = function(){
            Core.modalChange.dispatch("new-shpmnt");
        };
        var openLoginDialog = function(){
        };
        var openManageFilterDialog = function(){
            Core.modalChange.dispatch("mng-filter");
        };
        return jsx('
            <div id="topMenu" className="ui menu">
                <a className="item active" onClick=$openNewShpmntDialog>
                    <i className="add circle icon"></i>
                    Add Shipment
                </a>
                <a className="item" onClick=$openManageFilterDialog>
                    <i className="filter icon"></i>
                    Manage Filters
                </a>
                <a className="right item">
                    <i className="refresh icon"></i>
                        Refresh
                </a>
            </div>
        ');
    }

}
