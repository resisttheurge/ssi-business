package core.view.job.modal;

import core.reporting.ReportManager;
import js.JQuery;
import api.react.ReactDOM;
import api.react.React;
import js.html.HtmlElement;
import api.react.ReactComponent;
import api.react.ReactMacro.jsx;
import core.view.job.modal.EditJobModalComponents.*;

class ProdReportDialog extends ReactComponent {
    private static inline function jt(){return untyped __js__('this');}

    public function new() {
        super();

        var now = Date.now();
        var nextSunday = 7 - now.getDay();
        var weekEnd = DateTools.delta(now, DateTools.days(nextSunday));

        this.state = {
            weeksEnd: DateTools.format(weekEnd, "%Y-%m-%d")
        };
    }

    private function handleOnChange(name, value){
        var state: Dynamic = {};

        var now = Date.fromString(value);
        var nextSunday = 7 - now.getDay();
        var weekEnd = DateTools.delta(now, DateTools.days(nextSunday));

        this.state = {
            weeksEnd: DateTools.format(weekEnd, "%Y-%m-%d")
        };

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
                        <$FIELD className="field" name="weeksEnd" type="date"
                            onChange=${handleOnChange} label="Weeks End" value=${this.state.weeksEnd}/>
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
                ReportManager.showReport("productionSchedule", {
                    weekEnding: this.state.weeksEnd
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
