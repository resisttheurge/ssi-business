package core.view.mark.modal;

import js.html.HtmlElement;
import api.react.ReactComponent;
import api.react.ReactMacro.jsx;

class EditMarkDialog extends ReactComponent {


    public function new() {
        super();
    }

    public override function render():ReactComponent {

        var initialize = function(input: HtmlElement){

        };

        return jsx('
            <div ref=$initialize id="editdwg-modal" className="ui modal">
                <div className="header">
                    <i className="list layout icon"></i> Edit Drawing
                </div>
                <div className="content">
                    <form className="ui form">
                        <div class="two fields">
                            <div class="field">
                                <label>Drawing Id</label>
                                <input name="dwg-id" type="text" />
                            </div>
                            <div class="field">
                                <label>Mark Type</label>
                                <input name="dwg-type" type="text" />
                            </div>
                        </div>
                        <h4 class="ui dividing header">Shipping Item</h4>
                        <div class="two fields">
                            <div class="field">
                                <label>Drawing Id</label>
                                <input name="dwg-id" type="text" />
                            </div>
                            <div class="field">
                                <label>Mark Type</label>
                                <input name="dwg-type" type="text" />
                            </div>
                        </div>
                        <div class="field" >
                            <label>Remarks</label>
                            <textarea rows="2"></textarea>
                        </div>
                        <div class="field">
                            <label>Zones</label>
                            <input name="dwg-type" type="text" />
                        </div>
                    </form>
                </div>
                <div  className="actions">
                    <div className="ui black cancel button">
                        Cancel
                    </div>
                    <div className="ui approve right labeled icon button">
                        Submit Drawing Changes
                        <i className="checkmark icon"></i>
                    </div>
                </div>
            </div>
        ');
    }

}
