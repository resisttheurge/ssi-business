package core.reporting;


class ReportManager {


    public static function showReport(reportId: String, ?data: Dynamic){
        var target = "";
        var settings = "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no";

        var baseUrl = "pdf/web/viewer.html?file=";
        var reportViewerUrl = baseUrl + ReportingService.retrieveReport("productionSchedule");
        js.Browser.window.open(reportViewerUrl , target, settings);
    }
}