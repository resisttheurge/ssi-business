package core.view.main;

import js.JQuery;
import api.react.ReactDOM;
import api.react.React;
import js.html.HtmlElement;
import api.react.ReactComponent;
import core.view.components.ModalComponents.*;
import api.react.ReactMacro.jsx;

class ManageFilterDialog extends ReactComponent {
    private static inline function jt(){return untyped __js__('this');}

    public function new() {
        super();

    }

    private static var FILTERLISTITEM = untyped React.createClass({
        render: function(){
            var key = 'filter-${jt().props.fid-key}';
            return jsx('
                <div key=$key className="item">
                    <div className="right floated content">
                        <div className="ui mini button">Delete</div>
                    </div>
                    <i className="filter icon"></i>
                    <div className="content">
                        ${jt().props.name}
                    </div>
                </div>
            ');
        }
    });

    public override function render():ReactComponent {
        var openAddFilterDialog = function(){
            Core.modalChange.dispatch("job-filter");
        };

        var initialize = function(input: HtmlElement){
        };

        return jsx('
            <div ref=$initialize id="content-modal" className="ui small modal">
                <div className="header">
                    <i className="list layout icon"></i> Manage Filters
                </div>
                <div className="content">
                    <div className="ui grid">
                        <div className="nine wide right floated column" >
                            <div className="ui bottom aligned small divided list">
                                <$FILTERLISTITEM fid="1" name="Arbitrary Filter Name 1" />
                                <$FILTERLISTITEM fid="2" name="Arbitrary Filter Name 2" />
                                <$FILTERLISTITEM fid="3" name="Arbitrary Filter Name 3" />
                            </div>
                        </div>
                        <div className="six wide column">
                            <div className="ui button" onClick=$openAddFilterDialog>
                                Add New Filter!
                            </div>
                        </div>
                    </div>
                </div>
                <div  className="actions">
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
            onHidden: function(){
                Core.modalChange.dispatch("");
            }
        })
        .modal('setting', 'closable', false)
        .modal('setting', 'transition', 'vertical flip')
        .modal('show');
    }


}
