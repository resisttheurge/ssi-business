package core.view.abm.modal;

import core.dataaccess.PersistenceManager;
import core.view.abm.modal.NewAbmModalComponents.*;

import api.react.ReactDOM;
import js.JQuery;
import js.html.HtmlElement;
import api.react.ReactComponent;
import api.react.ReactMacro.jsx;

class EditAbmDialog extends ReactComponent {


    public function new(props) {
        super(props);

        var editAbm = props.abm;

        this.state = {
            abm: editAbm
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

        var editAbm = this.state.abm;

        var s = {margin: 0};

        return jsx('
            <div id="add-dwg-modal" className="ui small modal">
                <div className="header">
                    <i className="list layout icon"></i> Edit ABM
                </div>
                <div className="content">
                    <form className="ui form">
                        <div className="fields">
                        <$VENDORDROPDOWN className="three wide dropdown" label="Vendor" value=${editAbm.part.type} name="vendor" onChange=$handleOnChange/>
                        <div className="field">
                          <label>Part NO</label>
                          <$PARTDROPDOWN className="five wide dropdown" label="Part NO" value=${editAbm.part.number} name="number" onChange=$handleOnChange/>
                        </div>
                            <$FIELD key="v3" className="three wide field" label="Quantity" value=${editAbm.quantity}
                                name="quantity" onChange=$handleOnChange/>
                            <$FIELD key="v4" className="five wide field" label="Status" value=${editAbm.status}
                                name="status" onChange=$handleOnChange/>
                        </div>
                        <div className="two fields">
                            <div className="field">
                                <label>Manufacturer</label>
                                <$MFACTDROPDOWN className="dropdown" label="Manufacturer" value=${editAbm.manufacturer.label} name="manufacturer" onChange=$handleOnChange/>
                                <div className="field">
                                    <label>Description</label>
                                    <textarea rows="5" onChange=$handleDescChange
                                            value=${editAbm.part.description}></textarea>
                                </div>
                            </div>
                            <div className="field">
                                <$FIELD className="field" label="Released By" value=${editAbm.releasedBy}
                                        name="releasedBy" onChange=$handleOnChange/>
                                <$FIELD className="field" label="Release Date" value=${editAbm.releaseDate}
                                        name="releaseDate" onChange=$handleOnChange/>
                                <$FIELD className="field" label="Requested Date" value=${editAbm.requestDate}
                                        name="requestDate" onChange=$handleOnChange/>
                            </div>
                        </div>
                        <div className="field">
                            <label>Remarks</label>
                            <textarea rows="5" onChange=$handleRemarksChange value=${editAbm.remarks}></textarea>
                        </div>
                    </form>
                </div>
                <div style=$s className="actions ui basic segment">
                    <div data-type="remove" className="ui left floated red cancel button">
                        Remove
                    </div>
                    <div data-type="cancel" className="ui black cancel button">
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
            onDeny: function(input){
              if(input.context.dataset.type == "remove"){
                  untyped console.log('Removed ABM #${this.state.abm.number}');
              }
            },
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
