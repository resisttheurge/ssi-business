package core.view.dwg;

import js.JQuery;
import api.react.ReactComponent;
import api.react.ReactMacro.jsx;

class DwgViewMenu extends ReactComponent{

    public function new() {
        super();
    }

    public override function render():ReactComponent {
        var openNewDwgDialog = function(){
            Core.modalChange.dispatch("new-dwg");
        };
        var openLoginDialog = function(){
        };
        var openManageFilterDialog = function(){
            Core.modalChange.dispatch("mng-filter");
        };
        return jsx('
        <div id="topMenu" className="ui menu">
            <a className="item active" onClick=$openNewDwgDialog>
                <i className="add circle icon"></i>
                Add Drawing
            </a>
            <a className="item" onClick=$openManageFilterDialog>
                <i className="filter icon"></i>
                Manage Filters
            </a>
            <a className="item">
                <i className="calendar icon"></i>
                Production Schedule
            </a>
            <a className="right item">
                <i className="refresh icon"></i>
                    Refresh
            </a>
        </div>
        ');
    }

}
