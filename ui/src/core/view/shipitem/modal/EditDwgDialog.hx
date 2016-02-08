package core.view.shipitem.modal;

import core.dataaccess.PersistenceManager;
import api.react.ReactDOM;
import core.view.dwg.modal.NewDwgModalComponents.*;
import js.JQuery;
import api.react.ReactComponent;

class EditDwgDialog extends ReactComponent {
    private static inline function jt(){return untyped __js__('this');}

    public function new(props) {
        super(props);

        this.state = {drawing: props.dwg, job: props.job};
    }

    public function handleOnChange (name: String, value: String){
        var dwg = this.state.drawing;

        untyped dwg[name] = value;
        this.setState({drawing: dwg});
    }

    public override function render():ReactComponent {
        var dwg = this.state.drawing;

        return jsx('
            <div id="add-dwg-modal" className="ui small modal">
                <div className="header">
                    <i className="list layout icon"></i> Add New Drawing
                </div>
                <div className="content">
                    <form className="ui form">
                        <div className="two fields">
                            <$FIELD className="field" name="label"
                                onChange=$handleOnChange label="Drawing Id" value=${dwg.label} />
                            <div className="field">
                                <label>Drawing Type</label>
                                <$DWGTYPEDROPDOWN name="type" onChange=$handleOnChange value=${dwg.type}/>
                            </div>
                        </div>
                        <$FIELD className="field" name="title"
                                onChange=$handleOnChange label="Title" value=${dwg.title} />
                        <div className="two fields">
                            <$FIELD className="field" name="revision"
                                onChange=$handleOnChange label="Revision" value=${dwg.revision} />
                            <$FIELD className="field" name="revisionDate" type="date"
                                onChange=$handleOnChange label="Rev. Date" value=${dwg.revisionDate} />
                        </div>
                        <div className="three fields">
                            <$FIELD className="field" name="startDate" type="date"
                                onChange=$handleOnChange label="Start Date" value=${dwg.startDate} />
                            <$FIELD className="field" name="shopDate" type="date"
                                onChange=$handleOnChange label="Shop Date" value=${dwg.shopDate} />
                            <$FIELD className="field" name="fieldDate" type="date"
                                onChange=$handleOnChange label="Field Date" value=${dwg.fieldDate} />
                        </div>
                    </form>
                </div>
                <div className="actions">
                    <div className="ui black cancel button">
                        Cancel
                    </div>
                    <div className="ui approve right labeled icon button">
                        Submit Dwg
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
                PersistenceManager.saveDwg(this.state.drawing);
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