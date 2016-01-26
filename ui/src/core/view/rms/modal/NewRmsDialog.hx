package core.view.rms.modal;

import api.react.ReactDOM;
import js.JQuery;
import core.view.rms.modal.NewRmsModalComponents.*;
import api.react.ReactComponent;
import api.react.ReactMacro.jsx;


class NewRmsDialog extends ReactComponent {
    private static inline function jt(){return untyped __js__('this');}

    public function new() {
        super();

    }

    public override function render():ReactComponent {

        return jsx('
            <div id="add-dwg-modal" className="ui modal">
                <div className="header">
                    <i className="list layout icon"></i> Add New Job
                </div>
                <div className="content">

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
}
