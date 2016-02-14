package core.view.job;

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
        var openReportViewer = function() {
            var w = js.Browser.window.open("pdf/web/viewer.html?file=" + ReportingService.retrieveReport("managementReview"), "_blank", "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no");

            untyped w.document.onpropertychange = function(){
                if (untyped w.event.propertyName == "title") {
                    untyped alert("title changed");
                }
            };
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
            <a className="item" onClick=$openReportViewer>
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
