package core.view.rms;

import api.react.ReactComponent;
import api.react.ReactMacro.jsx;

class RmsViewMenu extends ReactComponent{

    public function new() {
        super();
    }

    public override function render():ReactComponent {
        var openNewDwgDialog = function(){
            Core.modalChange.dispatch("new-rms");
        };
        var openLoginDialog = function(){
        };
        var openManageFilterDialog = function(){
            Core.modalChange.dispatch("mng-filter");
        };
        return jsx('
        <div id="topMenu" className="ui menu">
            <a className="item active">
                <i className="add circle icon"></i>
                Create RMS
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
