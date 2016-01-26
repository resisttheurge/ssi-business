package core.view.mark.modal;

import api.react.ReactDOM;
import js.JQuery;
import api.react.ReactComponent;
import core.view.mark.modal.NewMarkModalComponents.*;
import api.react.ReactMacro.jsx;


class NewMarkDialog extends ReactComponent {
    private static inline function jt(){return untyped __js__('this');}

    public function new() {
        super();

        this.state = {mark: {}};
    }

    public function handleOnChange (name: String, value: String){
        var mark = this.state.mark;

        untyped mark[name] = value;

        this.setState({mark: mark});
    }

    public override function render():ReactComponent {
        var handleRemarks = function(e){
            handleOnChange("remarks", e.target.value);
        }

        return jsx('
            <div id="add-dwg-modal" className="ui modal">
                <div className="header">
                    <i className="list layout icon"></i> Add New Mark
                </div>
                <div className="content">
                    <form className="ui form">
                        <div className="two fields" >
                            <$ZONETABLE />
                            <div className="field" >
                                <div className="two fields" >
                                    <$FIELD className="field" name="label"
                                        onChange=$handleOnChange label="Mark Id" />
                                    <div className="field" >
                                        <label>Mark Type</label>
                                        <$MARKTYPEDROPDOWN name="type" onChange=$handleRemarks />
                                    </div>
                                </div>
                                <div className="field" >
                                    <label>Remarks</label>
                                    <textarea rows="3" onChange=$handleOnChange ></textarea>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="actions">
                    <div className="ui black cancel button">
                        Cancel
                    </div>
                    <div className="ui approve right labeled icon button">
                        Submit Mark
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
            onHidden: function(){
                Core.modalChange.dispatch("");
            }
        })
        .modal('setting', 'closable', false)
        .modal('setting', 'transition', 'vertical flip')
        .modal('show');
    }

}
