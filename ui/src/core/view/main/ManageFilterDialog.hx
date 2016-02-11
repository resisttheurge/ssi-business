package core.view.main;

import core.sorting.Filter;
import core.structure.TableStructure;
import core.models.CoreTypes.Model;
import js.JQuery;
import api.react.ReactDOM;
import api.react.React;
import js.html.HtmlElement;
import api.react.ReactComponent;
import core.view.components.ModalComponents.*;
import api.react.ReactMacro.jsx;

class ManageFilterDialog extends ReactComponent {
    private static inline function jt(){return untyped __js__('this');}

    private var structure: TableStructure<Model>;
    private var filters: Array<Filter<Model>>;
    private var deleteIndexes = new Array<Int>();

    public function new(props) {
        super(props);

        structure = props.structure;
        filters = structure.getFilters();
    }

    private static var FILTERLISTITEM = untyped React.createClass({
        render: function(){
            var onClick = jt().props.onClick;

            return jsx('
                <div key=${'filter-' + UidGenerator.nextId()} className="item" visible="${jt().props.visible}">
                    <div className="right floated content">
                        <div className="ui mini button" onClick="$onClick" filterIndex="${jt().props.fid}" >Delete</div>
                    </div>
                    <i className="filter icon"></i>
                    <div className="content">
                        ${jt().props.name}
                    </div>
                </div>
            ');
        }
    });

    public function onDeleteClick(index: Int) {
        untyped console.log('Delete index: $index');

        this.deleteIndexes.push(index);


    }

    public override function render():ReactComponent {
        var openAddFilterDialog = function(){
            Core.modalChange.dispatch("job-filter");
        };

        var initialize = function(input: HtmlElement){
        };

        var row = new Array<ReactComponent>();

        var size = filters.length;

        for (i in 0...size) {
            if(deleteIndexes.indexOf(i) != -1) {
                continue;
            }
            var f = filters[i];

            row.push(jsx('<$FILTERLISTITEM fid="$i" name="${f.getName()}" visible="${deleteIndexes.indexOf(i) != -1}" onClick="${onDeleteClick.bind(i)}" />'));
        }


        return jsx('
            <div ref=$initialize id="content-modal" className="ui small modal">
                <div className="header">
                    <i className="list layout icon"></i> Manage Filters
                </div>
                <div className="content">
                    <div className="ui grid">
                        <div className="nine wide right floated column" >
                            <div className="ui bottom aligned small divided list">
                                $row
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
            onApprove: function(){

                var filters = this.deleteIndexes.map(function (i) {
                   return this.filters[i];
                });


                for(i in filters) {
                    structure.removeFilter(i);
                }

                structure.saveFilters();
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
