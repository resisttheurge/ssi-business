package core.view.job;

import js.JQuery;
import api.react.ReactComponent;
import api.react.ReactMacro.jsx;

class JobViewMenu extends ReactComponent{

    public function new() {
        super();
    }

    public override function render():ReactComponent {
        var openNewJobDialog = function(){
            Core.modalChange.dispatch("new-job");
        };
        var openLoginDialog = function(){
        };
        var openManageFilterDialog = function(){
            Core.modalChange.dispatch("mng-filter");
        };
        return jsx('
        <div id="topMenu" className="ui menu">
            <a className="item active" onClick=$openNewJobDialog>
                <i className="add circle icon"></i>
                Add Job
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
