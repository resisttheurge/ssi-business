package core.view.mark;

import api.react.ReactComponent;
import api.react.ReactMacro.jsx;

class MarkViewMenu extends ReactComponent{

    public function new() {
        super();
    }

    public override function render():ReactComponent {
        var openNewMarkDialog = function(){
            Core.modalChange.dispatch("new-mark");
        };
        var openManageFilterDialog = function(){
            Core.modalChange.dispatch("mng-filter");
        };
        return jsx('
        <div id="topMenu" className="ui menu">
            <a className="item active" onClick=$openNewMarkDialog>
                <i className="add circle icon"></i>
                Add Mark
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
