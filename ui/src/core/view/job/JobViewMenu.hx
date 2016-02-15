package core.view.job;

import core.reporting.ReportManager;
import js.JQuery;
import api.react.ReactComponent;
import api.react.ReactMacro.jsx;
import core.reporting.ReportingService;

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
        var openManagementReviewReport = function() {
            Core.modalChange.dispatch("mr-report");
//            ReportManager.showReport("managementReview");
        };
        var openProductionScheduleReport = function() {
            Core.modalChange.dispatch("ps-report");
//            ReportManager.showReport("productionSchedule");
        };
        var forceUpdate = function(){
            Core.viewChange.dispatch("refresh", null);
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
            <a className="item" onClick=$openManagementReviewReport>
                <i className="suitcase icon"></i>
                Management Review
            </a>
            <a className="item" onClick=$openProductionScheduleReport>
                <i className="calendar icon"></i>
                Production Schedule
            </a>
            <a className="right item" onClick=$forceUpdate>
                <i className="refresh icon"></i>
                    Refresh
            </a>
        </div>
        ');
    }

}
