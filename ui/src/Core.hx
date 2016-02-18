import core.dataaccess.ServiceAccessManager.Response;
import js.JQuery;
import js.JQuery.JQueryHelper;
import core.view.main.AppState;
import core.view.job.modal.ProdReportDialog;
import core.view.job.modal.MngReportDialog;
import core.view.job.modal.NewFilterDialog;
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
import api.react.React;
import core.view.job.modal.AddJobFilterDialog;
import core.view.job.modal.ManageJobFilterDialog;
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
    private static inline function jt() {return untyped __js__('this');}

    public static var viewChange:Signal2<String, Dynamic> = new Signal2<String, Dynamic>();
    public static var modalChange:Signal1<String> = new Signal1<String>();
    public static var jobSelected:Signal1<Job> = new Signal1<Job>();

    public static var app:ReactComponent;

    private static function main() {
        app = ReactDOM.render(jsx('<$Core key="core-elem" />'), Browser.document.getElementById("app"));
    }

    public var viewChangeSlot:AnySlot;
    public var modalChangeSlot:AnySlot;
    public var jobSelectedSlot:AnySlot;

    public function new(props) {
        super(props);
    }

    public function onModalChange(index:String) {
        untyped console.log('modal change signalled. index: $index');
        jt().setState(
            function(state:AppState, props) {
                state.view.modal.index = index;
                return {view: state.view};
            }
        );
    }

    public function onViewChange(view:String, info:Dynamic) {
        untyped console.log('view change signalled. view: $view');
        if (view != "home" && view != "refresh" && state.view.currentView == view) return;
        jt().setState(
            function(state:AppState, props) {
                state.view.currentView = view != "refresh" ? view : state.view.currentView;
                return {view: state.view};
            }
        )
    }

    public function onJobSelected(job:Job) {
        untyped console.log('job selection signalled. job: $job');
        if (state.job.selected != job) {
            untyped console.log('new job selected. updating state.');
            jt().setState(
                function(state:AppState, props) {
                    state.job.selected = job;
                    return {job: state.job};
                }
            )
        }
    }

    public function loadJobs() {
        jt().setState(
            {
                status: {
                    error: false,
                    loading: true
                }
            },
            function() {
                JQuery.ajax({
                    url: '${jt().props.endpointUrl}api/jobs/',
                    method: 'GET',
                    success: function(response:Response<Array<Job>>, code, jqXHR) {

                        untyped console.log('get api/jobs requested succeeded');
                        untyped console.log('status code: $code');
                        untyped console.log('error message: $response');
                        untyped console.log('jQuery XHR: $jqXHR}');

                        if (response.success) {
                            jt().setState({
                                status: {
                                    error: false,
                                    loading: false
                                },
                                job: {
                                    index: response.data
                                }
                            });
                        } else {
                            jt().setState({
                                status: {
                                    error: true,
                                    loading: false,
                                    message: 'Failed to load job index. ${response.message ? 'Cause: ${response.message}' : ''}'
                                }
                            });
                        }

                    },
                    error: function(jqXHR, code, message) {

                        untyped console.log('get api/jobs requested failed');
                        untyped console.log('status code: $code');
                        untyped console.log('error message: $message');
                        untyped console.log('jQuery XHR: $jqXHR}');

                        jt().setState({
                            status: {
                                error: true,
                                loading: false,
                                message: 'Failed to load job index. ${message ? 'Cause: ${message}' : ''}'
                            }
                        });

                    }
                });
            }
        )
    }

    public override function getDefaultProps():AppProps {
        return {
            endpointUrl: 'http://localhost/'
        };
    }

    public override function getInitialState():AppState {

        var authenticated = AuthenticationManager.isLoggedIn();
        var defaultMenu = ViewRegistry.buildView("homeMenu", null);
        var defaultContent = ViewRegistry.buildView("homeView", null);

        return {
            status: {
                error: false,
                loading: false
            },
            auth: {
                authenticated: authenticated
            },
            view: {
                menu: defaultMenu,
                content: defaultContent,
                modal: {data: {

                }}
            },
            job: {
                index: []
            }
        };

    }

    public override function componentWillMount():Void {
        jt().viewChangeSlot = viewChange.add(jt().onViewChange);
        jt().modalChangeSlot = modalChange.add(jt().onModalChange);
        jt().jobSelectedSlot = jobSelected.add(jt().onJobSelectedChange);
    }

    public override function componentDidMount():Void {
        jt().loadJobs();
    }


    public override function componentWillUnmount():Void {
        jt().viewChangeSlot = viewChange.remove(jt().handleViewChange);
        jt().modalChangeSlot = modalChange.remove(jt().handleModalChange);
        jt().jobSelectedSlot = jobSelected.remove(jt().onJobSelected);
    }

    public override function render():ReactComponent {
        return jsx('
            <div>
                <div id="beastRoot" key="theRoot">
                    <$SideMenu key="sidemenu" authenticated=${jt().state.auth.authenticated}/>
                    <div key="container" id="container" className="ui right floated">
                        <div className="ui">
                            ${jt().state.view.menu}
                        </div>
                        <div className="ui basic segment">
                            ${jt().state.view.content}
                        </div>
                    </div>
                </div>
                <div key="magical-dimmer" id="full-screen-dimmer" className="ui dimmer">
                    <div className="ui indeterminate loader"></div>
                </div>
                <$MODALELEMENT className="ui dimmer modals page" index=${jt().state.view.modal.index} data=${jt().state.view.modal.data}, job=${jt().state.job.selected} />
            </div>
        ');
    }

    public override function componentWillUpdate(nextProps:Dynamic, nextState:Dynamic):Void {

        if (nextState.authenticated == true && AuthenticationManager.isLoggedIn() != true) {
            var view = "home";

            ContentManager.buildContent(view + "View", null, function(content) {
                nextState.authenticated = false;
                nextState.currentView = view;
                nextState.menu = ViewRegistry.buildView(view + "Menu", content);
                nextState.content = ViewRegistry.buildView(view + "View", content);
            });
        }
    }


    public static var MODALELEMENT = untyped React.createClass({
        componentDidMount: function() {
            untyped Core.jobSelected.add(jt().handleJobSelected);
        },
        componentWillUnmount: function() {
            untyped Core.jobSelected.remove(jt().handleJobSelected);
        },
        handleJobSelected: function(job:Job) {
            jt().setState({curJob: job});
        },
        render: function() {
            var data = jt().props.data;
            var index = jt().props.index;
            var selected = jt().props.selected;

            var comp;

            switch i {
                case "login" :comp = jsx('<$LoginDialog  key="login-dialog" id="login-dialog"/>');
                case "new-job" :comp = jsx('<$NewJobDialog key="newjob-dialog" id="newjob-dialog" />');
                case "add-job" :comp = jsx('<$AddJobFilterDialog key="afil-job-dialog" id="afil-job-dialog" />');
                case "mng-job" :comp = jsx('<$ManageJobFilterDialog key="mfil-job-dialog" id="mfil-job-dialog" />');
                case "edit-job" :comp = jsx('<$EditJobDialog key="editjob-dialog" job=${dataObj.editJobObj}
                                                curJob=${dataObj.editJobMainObj} id="editjob-dialog"/>');
                case "mng-filter" :comp = jsx('<$ManageFilterDialog key="mfil-job-dialog" id="mfil-job-dialog"
                                                    structure=${dataObj.structure}/>');
                case "new-dwg" :comp = jsx('<$NewDwgDialog  key="newdwg-dialog" id="newdwg-dialog"/>');
                case "edit-dwg" :comp = jsx('<$EditDwgDialog  key="editdwg-dialog" id="editdwg-dialog"
                                                dwg=${dataObj.editObj} job=${dataObj.curJob} />');
                case "new-mark" :comp = jsx('<$NewMarkDialog  key="newmark-dialog" id="newmark-dialog"/>');
                case "edit-mark":comp = jsx('<$EditMarkDialog  key="editmark-dialog" id="editmark-dialog"
                                                mark=${dataObj.editObj} job=${dataObj.curJob}/>');
                case "new-rms" :comp = jsx('<$NewRmsDialog  key="newmark-dialog" id="newmark-dialog"/>');
                case "edit-rms" :comp = jsx('<$EditRmsDialog  key="editmark-dialog" id="editmark-dialog"
                                                rms=${dataObj.editObj} job=${dataObj.curJob}/>');
                case "new-abm" :comp = jsx('<$NewAbmDialog  key="newmark-dialog" id="newmark-dialog"/>');
                case "edit-abm" :comp = jsx('<$EditAbmDialog  key="editmark-dialog" id="editmark-dialog"
                                                abm=${dataObj.editObj} job=${dataObj.curJob}/>');
                case "new-shpmnt" :comp = jsx('<$NewShipmentDialog  key="newmark-dialog" id="newmark-dialog"/>');
                case "edit-shpmnt" :comp = jsx('<$EditShipmentDialog  key="editmark-dialog" id="editmark-dialog"
                                                shpmnt=${dataObj.editObj} job=${dataObj.curJob}/>');

                case "job-filter" :comp = jsx('<$NewFilterDialog key="newfilter-dialog" id="newfilter-dialog"
                                                structure=${dataObj.structure} />');

                case "mr-report" :comp = jsx('<$MngReportDialog  key="mr-report-dialog" id="mr-report-dialog"/>');
                case "ps-report" :comp = jsx('<$ProdReportDialog  key="ps-report-dialog" id="ps-report-dialog"/>');
                default: comp = jsx('<div />');
            }

            return comp;
        }
    });

    public override function componentWillUnmount():Void {
        untyped console.log("Unmounting Core!");
    }
}
