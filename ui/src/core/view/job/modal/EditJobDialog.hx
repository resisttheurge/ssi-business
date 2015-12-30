package core.view.job.modal;

import core.dataaccess.PersistenceManager;
import haxe.Json;
import api.react.ReactDOM;
import core.models.CoreTypes.Job;
import core.view.job.modal.EditJobModalComponents.*;
import core.view.main.FieldMask;
import js.html.HtmlElement;
import js.JQuery;
import api.react.React;
import api.react.ReactComponent;
import api.react.ReactMacro.jsx;

class EditJobDialog extends ReactComponent {
    private static inline function jt(){return untyped __js__('this');}

    private static var options: Array<ReactComponent> = [];
    private static var items: Array<ReactComponent> = [];



    public function new(props) {
        super(props);

        this.state = {currentTab: 1, job: props.job};
    }

    public function handleOnChange(name: String, value){

        var job = this.state.job;

        switch name {
            case "jobInfo": {
                job.contractPrice = value.contractPrice;
                job.start = value.start;
                job.due = value.due;

                job.customer = value.customer;
                job.salesman = value.salesman;

                job.id = value.id;

            };
            case "custInfo":{
                job.addresses.shipping = value.addresses.shipping;
                job.contact = value.contact;

            };
            case "invInfo":{
                job.addresses.invoicing = value;
            };
            case "descInfo":{
                job.description = value;
            };
            case "schInfo":{
                job.schedules = value;
            };
        }

        this.setState({job: job});

    }

    public override function render():ReactComponent {

        var tabInitialize = function(input){
            if(input == null) return;

            var tab = new JQuery(input);

            untyped tab.tab();
        };

        var job: Job = state.job;

        var handleDescChange = function(e){
            handleOnChange("descInfo", e.target.value);
        };

        return jsx('
            <div id="content-modal" className="ui modal">
                <div className="header">
                    <i className="list layout icon"></i> Edit Job
                </div>
                <div className="content">
                    <form className="ui form">
                        <div className="ui top attached tabular menu">
                          <div className="active item" ref=$tabInitialize data-tab="job-tab">Job</div>
                          <div className="item" ref=$tabInitialize data-tab="sched-tab">Schedule</div>
                          <div className="item" ref=$tabInitialize data-tab="cust-tab">Customer</div>
                          <div className="item" ref=$tabInitialize data-tab="inv-tab">Invoice</div>
                        </div>
                        <div className="active ui bottom attached tab segment" data-tab="job-tab">
                            <$DIVHEADER value="Job Information" />
                            <$JOBINFORMATION job=$job onChange=$handleOnChange />
                            <div className="sixteen wide field">
                                <label>Description</label>
                                <textarea rows="6" onChange=$handleDescChange
                                        value=${job.description}></textarea>
                            </div>
                        </div>
                        <div className="ui bottom attached tab segment" data-tab="sched-tab">
                            <$DIVHEADER  value="Schedule Information" />
                            <$SCHEDINFORMATION  job=$job onChange=$handleOnChange />

                            <$DIVHEADER  value="System Type" />
                            <$SYSTYPEINFORMATION  job=$job />
                        </div>
                        <div className="ui bottom attached tab segment" data-tab="cust-tab">
                            <$DIVHEADER  value="Customer Information" />
                            <$CUSTINFORMATION  job=$job onChange=$handleOnChange />
                        </div>
                        <div className="ui bottom attached tab segment" data-tab="inv-tab">
                            <$DIVHEADER  value="Invoice Address" />
                            <$INVADDRINFORMATION  job=$job onChange=$handleOnChange />
                        </div>
                    </form>
                </div>
                <div  className="actions">
                    <div  className="ui black cancel button">
                        Cancel
                    </div>
                    <div  className="ui approve right labeled icon button">
                        Submit Job Changes
                        <i className="checkmark icon"></i>
                    </div>
                </div>
            </div>
        ');
    }

    public override function componentDidMount():Void {
        var elem = untyped new JQuery(ReactDOM.findDOMNode(cast jt()));
        untyped elem
        .modal({
            onApprove: function(){
                PersistenceManager.saveDwg(this.state.job);
            },
            onHidden: function(){
                Core.modalChange.dispatch("");
            }
        })
        .modal('setting', 'closable', false)
        .modal('setting', 'transition', 'vertical flip')
        .modal('show');
    }
}
