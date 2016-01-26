package core.view.abm;

import api.react.ReactComponent;
import api.react.ReactMacro.jsx;

class AbmViewMenu extends ReactComponent{

    public function new() {
        super();
    }

    public override function render():ReactComponent {
        var openNewAbmDialog = function(){
            Core.modalChange.dispatch("new-abm");
        };
        var openManageFilterDialog = function(){
            Core.modalChange.dispatch("mng-filter");
        };
        return jsx('
        <div id="topMenu" className="ui menu">
            <a className="item active" onClick=$openNewAbmDialog>
                <i className="add circle icon"></i>
                Add ABM
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
