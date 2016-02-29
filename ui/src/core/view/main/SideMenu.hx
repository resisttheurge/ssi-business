package core.view.main;

import core.reporting.ReportManager;
import core.reporting.ReportingService;
import api.react.ReactDOM;
import core.authentication.AuthenticationManager;
import core.view.main.ContentManager.Content;
import core.models.CoreTypes.Job;
import core.models.SubTypes.JobId;
import js.Browser;
import js.JQuery;
import js.html.HtmlElement;
import api.react.ReactComponent.ReactComponentOfPropsAndState;
import msignal.Slot;
import msignal.Signal;
import js.html.Event;
import api.react.ReactComponent;
import api.react.ReactComponent.*;
import api.react.ReactMacro.jsx;

class SideMenu extends ReactComponent{
    private static inline function jt(){return untyped __js__('this');}

    public function new() {
        super();

        this.state = {transitionState: false};
    }

    public override function render():ReactComponent {
        var mask = function(input: HtmlElement){
            untyped new JQuery(input).mask("99/99/9999");
        };

        var style = {backgroundColor: "black", padding: "0"};

        var jobId = "No Job Selected";

        if (state.selectedJob != null){
            var jid: JobId = state.selectedJob.id;

            jobId = '${jid.prefix}-${jid.year.substr(2, 2)}-${jid.label}';
        }

        var editSelectedJob = function(){
            if(state.selectedJob == null) return;

            Core.app.setState({editJobObj: state.selectedJob}, function(){
                Core.modalChange.dispatch("edit-job");
            });
        }

        var login = {display: props.authenticated ? "none" : ""};
        var logout = {display: props.authenticated ? "" : "none"};

        var item             : Array<Dynamic> = ['item'];
        var canDisable       : Array<Dynamic> = [{disabled: !props.authenticated}, item];
        var canHide          : Array<Dynamic> = [canDisable, 'transition', 'hidden'];
        var canHideDropdown  : Array<Dynamic> = [canHide, 'dropdown', 'ui'];

        var cls: Dynamic -> String = untyped classNames;
        var popup = function(input){
            if(input == null) return;
            var elem = new JQuery(ReactDOM.findDOMNode(input));

            if(state.transitionState == true && state.shouldTransition == true){
                untyped elem.popup();
            } else if((state.transitionState == false && state.shouldTransition == true) || state.cleanup == true){
                untyped elem.popup("destroy");
            }

            if(state.newJob == true){
                untyped elem.transition({
                    animation  : 'pulse'
                });
                state.newJob = false;
            }
        };
        var transition = function(input){
            if(input == null || state.shouldTransition != true) return;
            var elem = new JQuery(ReactDOM.findDOMNode(input));

            if(elem.hasClass("dropdown")) untyped elem.dropdown();

            untyped elem.transition({
                animation  : 'slide down',
                duration   : '400ms'
            });

        };

        var openReport = function(reportId: String, event){
            ReportManager.showReport(reportId, jobId);
        };

        return jsx('
        <div id="mainMenu" className="ui blue menu inverted vertical left fixed">
            <div className="item">
                <img className="ui logo middle aligned centered medium image" src="img/ssi_logo.svg"></img>
            </div>
            <a className="item" style=$login onClick=$toggleLoginDialog>Login</a>
            <a className="item" style=$logout onClick=$toggleLogout>Logout</a>
            <a className=${cls(canDisable)} onClick=${toggleView.bind('job', _)}>Job</a>
            <a style=$style className=${cls(canDisable)} onDoubleClick=$editSelectedJob>
                <div id="selectedJob" ref=$popup className="ui center aligned basic segment"
                    data-content="Double click to edit this job." data-variation="mini inverted">$jobId</div>
            </a>
            <div ref=$transition className="${cls(canHideDropdown)}" tabIndex="0">
                <i className="dropdown icon"></i>
                    Job Reports
                <div className="menu" tabIndex="-1">
                    <a className="item" onClick=${openReport.bind('specialtyItems', _)}>Specialty Items</a>
                    <a className="item" onClick=${openReport.bind('layoutDrawing', _)}>Layout Drawing</a>
                    <a className="item" onClick=${openReport.bind('detailDrawing', _)}>Detail Drawing</a>
                    <a className="item" onClick=${openReport.bind('computerDrawing', _)}>Computer Drawing</a>
                    <a className="item" onClick=${openReport.bind('zone', _)}>Zone</a>
                    <a className="item" onClick=${openReport.bind('materialShipper', _)}>Material Shipper</a>
                    <a className="item" onClick=${openReport.bind('shipVia', _)}>Ship Via</a>
                    <a className="item" onClick=${openReport.bind('jobShipments', _)}>Job Shipments</a>
                </div>
            </div>
            <a ref=$transition className=${cls(canHide)} onClick=${toggleView.bind('dwg', _)}>Drawing</a>
            <div ref=$transition className=${cls(canHide)}>
                Shippable
                <div className="menu">
                    <a ref=$transition className=${cls(canHide)} onClick=${toggleView.bind('mark', _)}>Mark</a>
                    <a ref=$transition className=${cls(canHide)} onClick=${toggleView.bind('rms', _)}>RMS</a>
                </div>
            </div>
            <a ref=$transition className=${cls(canHide)} onClick=${toggleView.bind('abm', _)}>ABM</a>
            <a ref=$transition className=${cls(canHide)} onClick=${toggleView.bind('shpmnt', _)}>Shipment</a>
        </div>
        ');
    }

    private function toggleLoginDialog(){
        Core.modalChange.dispatch("login");
    }

    private function toggleLogout(){
        AuthenticationManager.logout();

        this.setState({
            cleanup: true,
            selectedJob: null,
            transitionState: false,
            shouldTransition: false
        });

        Core.viewChange.dispatch("home", null);
    }

    private function toggleView(view: String, ?e){
        if(!props.authenticated) return;
        var data =
        switch view {
            case "job": null;
            case "dwg": state.selectedJob;
            case "mark": state.selectedJob;
            case "rms": state.selectedJob;
            case "abm": state.selectedJob;
            case "shpmnt": state.selectedJob;
            default: null;
        };

        Core.viewChange.dispatch(view, data);

        untyped new JQuery("#mainMenu .item.active").removeClass("active");
        untyped new JQuery(e.target).addClass("active");
    }


    public function toggleActivation(transitionState: Bool, ?f){
        if(transitionState != state.transitionState){

            if(transitionState){
                untyped new JQuery("#selectedJob").popup();
            }else{
                untyped new JQuery("#selectedJob").popup('destroy');
            }

            untyped new JQuery("#mainMenu .hiddenMenuItem").transition({
                animation  : 'slide down',
                duration   : '400ms',
                onComplete : function() {
                    if(f != null) f();

                    this.setState({transitionState: transitionState});
                }
            });

        }
    }


    public function handleJobSelected(job: Job){
        var transitionState = job != null;

        this.setState({
            selectedJob: job,
            transitionState: transitionState,
            shouldTransition: state.transitionState != transitionState,
            newJob: transitionState
        });
    }

    public override function componentDidMount():Void {
        Core.jobSelected.add(handleJobSelected);

    }

    public override function componentWillUpdate(nextProps:Dynamic, nextState:Dynamic):Void {
        if(nextState.shouldTransition == true && this.state.shouldTransition == true
            && (nextState.transitionState ==  this.state.transitionState))
            nextState.shouldTransition = false;

        if(state.cleanup == true && nextState.cleanup == true) nextState.cleanup == false;

    }


//    public override function componentDidUpdate(prevProps:Dynamic, prevState:Dynamic):Void {
//        if(this.state.shouldTransition)
//            this.setState({shouldTransition: false});
//    }


    public override function componentWillUnmount():Void {
        Core.jobSelected.remove(handleJobSelected);
    }


}
