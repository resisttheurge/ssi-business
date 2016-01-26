package core.view.abm.modal;

import core.dataaccess.PersistenceManager;
import core.view.abm.modal.NewAbmModalComponents.*;

import api.react.ReactDOM;
import js.JQuery;
import api.react.ReactComponent;
import api.react.ReactMacro.jsx;


class NewAbmDialog extends ReactComponent {
    private static inline function jt(){return untyped __js__('this');}

    public function new() {
        super();

        this.state = {
            abm: {
                part: {},
                manufacturer: {},
                vendor: {}
            }
        };
    }

    public function handleOnChange(name: String, value: String){
        var state = this.state.abm;

        switch name {
            case "type": untyped state.part.type = value;
            case "number": untyped state.part.number = value;
            case "description": untyped state.part.description = value;
            case "manufacturer": untyped state.manufacturer.label = value;
            case "vendor": untyped state.vendor.label = value;
            default: untyped state[name] = value;
        }

        this.setState({abm: state});
    }

    public override function render():ReactComponent {
        var handleDescChange = function(e){
            handleOnChange("description", e.target.value);
        };
        var handleRemarksChange = function(e){
            handleOnChange("remarks", e.target.value);
        };

        return jsx('
            <div id="add-dwg-modal" className="ui small modal">
                <div className="header">
                    <i className="list layout icon"></i> Create New ABM
                </div>
                <div className="content">
                    <form className="ui form">
                        <div className="fields">
                            <$FIELD className="three wide field" label="Type"  name="type" onChange=$handleOnChange/>
                            <$FIELD className="five wide field" label="Part NO"  name="number" onChange=$handleOnChange/>
                            <$FIELD className="three wide field" label="Quantity"  name="quantity" onChange=$handleOnChange/>
                            <$FIELD className="five wide field" label="Status"  name="status" onChange=$handleOnChange/>
                        </div>
                        <div className="two fields">
                            <div className="field">
                                <$FIELD className="field" label="Manufacturer" name="manufacturer" onChange=$handleOnChange/>
                                <div className="field">
                                    <label>Description</label>
                                    <textarea rows="5" onChange=$handleDescChange></textarea>
                                </div>
                            </div>
                            <div className="field">
                                <$FIELD className="field" label="Released By" name="releasedBy" onChange=$handleOnChange/>
                                <$FIELD className="field" label="Release Date" name="releaseDate" onChange=$handleOnChange/>
                                <$FIELD className="field" label="Requested Date" name="requestDate" onChange=$handleOnChange/>
                            </div>
                        </div>
                        <div className="field">
                            <label>Remarks</label>
                            <textarea rows="5" onChange=$handleRemarksChange></textarea>
                        </div>
                    </form>
                </div>
                <div className="actions">
                    <div className="ui black cancel button">
                        Cancel
                    </div>
                    <div className="ui approve right labeled icon button">
                        Submit ABM
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
              PersistenceManager.saveObject(this.state.abm);
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
