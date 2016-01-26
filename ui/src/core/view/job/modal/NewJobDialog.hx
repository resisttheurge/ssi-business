package core.view.job.modal;

import api.react.ReactDOM;
import js.JQuery;
import api.react.ReactComponent;
import core.view.job.modal.NewJobModalComponents.*;
import core.dataaccess.PersistenceManager;

import api.react.ReactMacro.jsx;


class NewJobDialog extends ReactComponent {
    private static inline function jt(){return untyped __js__('this');}

    public function new() {
        super();

        this.state = {job: {addresses: {}}};
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
        }

        this.setState({job: job});

    }

    public override function render():ReactComponent {
        var onDescChange = function(e){
            handleOnChange("descInfo", e.target.value);
        }
        return jsx('
            <div id="content-modal" className="ui modal">
                <div className="header">
                    <i className="list layout icon"></i> Add New Job
                </div>
                <div className="content">
                    <form className="ui form">
                        <div className="fields">
                            <div className="seven wide field">
                                <$DIVHEADER value="Job Information" />
                                <$JOBINFORMATION onChange=$handleOnChange />
                            </div>
                            <div className="nine wide field">
                                <$DIVHEADER  value="Customer Information" />
                                <$CUSTINFORMATION onChange=$handleOnChange/>
                            </div>
                        </div>
                        <div className="fields">
                            <div className="seven wide field">
                                <$DIVHEADER  value="Description" />
                                <div className="sixteen wide field">
                                    <textarea rows="9" onChange=$onDescChange></textarea>
                                </div>
                            </div>
                            <div className="nine wide field">
                                <$DIVHEADER  value="Invoice Address" />
                                <$INVADDRINFORMATION onChange=$handleOnChange/>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="actions">
                    <div className="ui black cancel button">
                        Cancel
                    </div>
                    <div className="ui approve right labeled icon button">
                        Submit Job
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
                PersistenceManager.saveJob(this.state.job);
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
