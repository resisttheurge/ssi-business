import core.view.job.modal.NewFilterDialog;
import haxe.Json;
import core.view.main.ManageFilterDialog;
import core.view.shipment.modal.EditShipmentDialog;
import core.view.shipment.modal.NewShipmentDialog;
import core.view.abm.modal.EditAbmDialog;
import core.view.abm.modal.NewAbmDialog;
import core.view.rms.modal.EditRmsDialog;
import core.view.rms.modal.NewRmsDialog;
import core.authentication.AuthenticationManager;
import core.view.mark.modal.EditMarkDialog;
import core.view.mark.modal.NewMarkDialog;
import core.view.dwg.modal.EditDwgDialog;
import core.view.dwg.modal.NewDwgDialog;
import core.models.CoreTypes.Job;
import Core;
import js.JQuery;
import api.react.React;
import core.view.job.modal.AddJobFilterDialog;
import core.view.job.modal.ManageJobFilterDialog;
import core.view.UidGenerator;
import core.view.job.modal.EditJobDialog;
import msignal.Slot;
import core.view.main.LoginDialog;
import core.view.main.ViewRegistry;
import core.view.main.ContentManager;
import core.view.job.modal.NewJobDialog;
import api.react.ReactComponent.ReactComponentOfState;
import api.react.ReactComponent;


import core.view.main.SideMenu;
import msignal.Signal.Signal2;
import msignal.Signal.Signal1;
import js.Browser;
import api.react.ReactDOM;
import api.react.ReactMacro.jsx;


class Core extends ReactComponent {
    private static inline function jt(){return untyped __js__('this');}

    public static var viewChange: Signal2<String, Dynamic> = new Signal2<String, Dynamic>();
    public static var modalChange: Signal1<String> = new Signal1<String>();
    public static var jobSelected: Signal1<Job> = new Signal1<Job>();


    public static var application: ReactComponent;

    private var callback: AnySlot;
    private var callback2: AnySlot;

    private static function main() {
        var appElem = Browser.document.getElementById("app");

        application = ReactDOM.render(jsx('<$Core key="core-elem" authenticated=${AuthenticationManager.isLoggedIn()} />'), appElem);
    }

    public function new(props) {
        super(props);

        this.state = {
            menu: ViewRegistry.buildView("homeMenu", null),
            content: ViewRegistry.buildView("homeView", null),
            editJobObj: ContentManager.buildContent("jobView", null)[0],
            currentModal: "",
            authenticated: props.authenticated
        };

        this.callback = viewChange.add(handleViewChange);
        this.callback2 = modalChange.add(handleModalChange);
    }

    public function handleViewChange(view: String, info: Dynamic){
        if(view != "home" && view != "refresh" && state.currentView == view) return;

        var nextView = view != "refresh" ? view : state.currentView;

        var content = ContentManager.buildContent(nextView + "View", info);

        this.setState({
            currentView: nextView,
            menu: ViewRegistry.buildView(nextView + "Menu", content),
            content: ViewRegistry.buildView(nextView + "View", content)
        });
    }

    public function handleModalChange(index: String){
        this.setState({currentModal: index});
        this.forceUpdate();
    }

    public override function render():ReactComponent {
        var modals = [];

        var editJob = null;

        return jsx('
            <div id="beastRoot" key="theRoot">
                <$SideMenu key="sidemenu" authenticated=${state.authenticated}/>
                <div key="container" id="container" className="ui right floated">
                    <div className="ui">
                        ${state.menu}
                    </div>
                    <div className="ui basic segment">
                        ${state.content}
                    </div>
                </div>

            </div>
        ');
    }

    public override function componentDidMount():Void {
        var modalsElem = Browser.document.getElementById("modals");

        var dataObj = {editJobObj: state.editJobObj,
            editJobMainObj: state.editJobMainObj, editObj: state.editObj, structure: state.content.props.structure};

        ReactDOM.render(jsx('<$MODALELEMENT dataObj=$dataObj index=${state.currentModal} />'), modalsElem);
    }

    public override function componentDidUpdate(prevProps:Dynamic, prevState:Dynamic):Void {
        var modalsElem = Browser.document.getElementById("modals");

//        untyped console.log("Structure: " + state.content.props.structure);

        var dataObj = {editJobObj: state.editJobObj,
                editJobMainObj: state.editJobMainObj, editObj: state.editObj, structure: state.content.props.structure};

        ReactDOM.render(jsx('<$MODALELEMENT dataObj=$dataObj index=${state.currentModal} />'), modalsElem);
    }

    public override function componentWillUpdate(nextProps:Dynamic, nextState:Dynamic):Void {

        if(nextState.authenticated == true && AuthenticationManager.isLoggedIn() != true){
            var view = "home";

            var content = ContentManager.buildContent(view + "View", null);

            nextState.authenticated = false;
            nextState.currentView = view;
            nextState.menu = ViewRegistry.buildView(view + "Menu", content);
            nextState.content = ViewRegistry.buildView(view + "View", content);

        }
    }


    public static var MODALELEMENT = untyped React.createClass({
        componentDidMount: function(){
            untyped Core.jobSelected.add(jt().handleJobSelected);
        },
        componentWillUnmount: function(){
            untyped Core.jobSelected.remove(jt().handleJobSelected);
        },
        handleJobSelected: function(job: Job){
            jt().setState({curJob: job});
        },
        render: function(){
            var dataObj = jt().props.dataObj;

            var i = jt().props.index;

            var comp;

            switch i {
                case "login"    :comp = jsx('<$LoginDialog  key="login-dialog" id="login-dialog"/>');
                case "new-job"  :comp = jsx('<$NewJobDialog key="newjob-dialog" id="newjob-dialog" />');
                case "add-job"  :comp = jsx('<$AddJobFilterDialog key="afil-job-dialog" id="afil-job-dialog" />');
                case "mng-job"  :comp = jsx('<$ManageJobFilterDialog key="mfil-job-dialog" id="mfil-job-dialog" />');
                case "edit-job" :comp = jsx('<$EditJobDialog key="editjob-dialog" job=${dataObj.editJobObj}
                                                curJob=${dataObj.editJobMainObj} id="editjob-dialog"/>');
                case "mng-filter"  :comp = jsx('<$ManageFilterDialog key="mfil-job-dialog" id="mfil-job-dialog"
                                                    structure=${dataObj.structure}/>');
                case "new-dwg"  :comp = jsx('<$NewDwgDialog  key="newdwg-dialog" id="newdwg-dialog"/>');
                case "edit-dwg" :comp = jsx('<$EditDwgDialog  key="editdwg-dialog" id="editdwg-dialog"
                                                dwg=${dataObj.editObj} job=${dataObj.curJob} />');
                case "new-mark" :comp = jsx('<$NewMarkDialog  key="newmark-dialog" id="newmark-dialog"/>');
                case "edit-mark":comp = jsx('<$EditMarkDialog  key="editmark-dialog" id="editmark-dialog"
                                                mark=${dataObj.editObj} job=${dataObj.curJob}/>');
                case "new-rms"  :comp = jsx('<$NewRmsDialog  key="newmark-dialog" id="newmark-dialog"/>');
                case "edit-rms" :comp = jsx('<$EditRmsDialog  key="editmark-dialog" id="editmark-dialog"
                                                rms=${dataObj.editObj} job=${dataObj.curJob}/>');
                case "new-abm"  :comp = jsx('<$NewAbmDialog  key="newmark-dialog" id="newmark-dialog"/>');
                case "edit-abm" :comp = jsx('<$EditAbmDialog  key="editmark-dialog" id="editmark-dialog"
                                                abm=${dataObj.editObj} job=${dataObj.curJob}/>');
                case "new-shpmnt"  :comp = jsx('<$NewShipmentDialog  key="newmark-dialog" id="newmark-dialog"/>');
                case "edit-shpmnt" :comp = jsx('<$EditShipmentDialog  key="editmark-dialog" id="editmark-dialog"
                                                shpmnt=${dataObj.editObj} job=${dataObj.curJob}/>');

                case "job-filter" :comp = jsx('<$NewFilterDialog key="newfilter-dialog" id="newfilter-dialog"
                                                structure=${dataObj.structure} />');

                default: comp = jsx('<div />');
            }

            return comp;
        }
    });

    public override function componentWillUnmount():Void {
        untyped console.log("Unmounting Core!");
    }
}
