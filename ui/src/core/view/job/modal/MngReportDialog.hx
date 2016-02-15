package core.view.job.modal;

import core.reporting.ReportManager;
import js.JQuery;
import api.react.ReactDOM;
import api.react.React;
import js.html.HtmlElement;
import api.react.ReactComponent;
import api.react.ReactMacro.jsx;

class MngReportDialog extends ReactComponent {
    private static inline function jt(){return untyped __js__('this');}

    public function new() {
        super();

    }
    public static var FIELD = untyped React.createClass({
        handleOnChange: function(e){
            var value = e.target.value;

            var name = jt().props.name;
            jt().props.onChange(name, value);
        },
        render: function(){
            var p = jt().props;

            var type = p.type == null ? "text" : p.type;
            var pattern = p.pattern == null ? "" : p.pattern;

            return jsx('
                    <div className=${p.className}>
                        <label>${p.label}</label>
                        <input type=$type ref=${p.mask} name=${p.name} pattern=$pattern
                            placeholder=${p.pholder} onChange=${jt().handleOnChange}
                            defaultValue=${jt().props.defaultValue} value=${jt().props.value}></input>
                    </div>
                ');
        }
    });
    private function handleOnChange(name, value){
        var state: Dynamic = {};

        state[name] = value;

        this.setState(state);
    }

    public override function render():ReactComponent {

        var initialize = function(input: HtmlElement){
        };

        return jsx('
            <div ref=$initialize id="content-modal" className="ui small modal">
                <div className="header">
                    <i className="list layout icon"></i> Management Review Report
                </div>
                <div className="content">
                    <form className="ui form">
                        <div className="two fields">
                            <$FIELD className="field" name="startDate" type="date"
                                onChange=${handleOnChange} label="Start Date" />
                            <$FIELD className="field" name="endDate" type="date"
                                onChange=${handleOnChange} label="End Date" />
                        </div>
                    </form>
                </div>
                <div className="actions">
                    <div className="ui black cancel button">
                        Cancel
                    </div>
                    <div className="ui approve right labeled icon button">
                        Ok
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
                ReportManager.showReport("managementReview", {
                    start: this.state.startDate,
                    end: this.state.endDate
                });
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
