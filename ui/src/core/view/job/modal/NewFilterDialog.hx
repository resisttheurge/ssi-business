package core.view.job.modal;

import core.sorting.Filter;
import core.view.job.structure.JobTableStructure;
import core.models.CoreTypes.Model;
import core.sorting.Ordering;
import core.structure.TableStructure;
import js.JQuery;
import js.html.HtmlElement;
import api.react.ReactComponent;
import api.react.ReactMacro.jsx;
import core.view.components.ModalComponents.*;


class NewFilterDialog extends ReactComponent {
    private static inline function jt(){return untyped __js__('this');}


    private static var statusTypes = ['ALL', 'INACTIVE', 'ACTIVE', 'COMPLETED', 'CANCELLED', 'DELETED'];
    private static var prefixTypes = ['ALL', 'B', 'F', 'FC', 'FE', 'FR', 'FS', 'M', 'MF', 'MT', 'RG', 'BM', 'LM', 'MM', 'D', 'G', 'DR', 'EE', 'ME', 'MS', 'TM'];

    private var fields: Array<ModelField> = [];
    private var isJob: Bool;

    public function new(props) {
        super(props);

        var structure: TableStructure<Model> = props.structure;

        this.isJob = untyped structure.jobTable ? true : false;

        var ordering: Ordering<Model> = structure.generateDefaultOrder([]);

        this.fields = ordering.fields;

        untyped console.log("Names: " + this.fields);
        untyped console.log("Is Job: " + this.isJob);

        var map = new Map<String, String>();

        this.state = {
            struct: structure,
            filterMap: map,
            filter: new Filter(ordering, map)
        };

    }

    public function handleOnChange(name: String, value: String){
        if(name == "filterName") {
            this.state.filter.setName(value);
        } else {
            var map: Map<String, String> = this.state.filterMap;

            map[name] = value;
        }
    }

    public override function render():ReactComponent {


        var row = new Array<ReactComponent>();

        if(this.isJob) {
            row.push(jsx('<$DROPDOWN key=${UidGenerator.nextId()} label="Staus" items="$statusTypes" title="Status" def="ACTIVE" onChange="$handleOnChange" />'));

            row.push(jsx('<$DROPDOWN key=${UidGenerator.nextId()} label="Prefix" items="$prefixTypes" title="Prefix" def="ALL" onChange="$handleOnChange"/>'));
        }

        var i = 1;
        for (field in this.fields) {
            row.push(jsx('<$FIELD key=${UidGenerator.nextId()} className="sixteen wide field" name="${field.name}" label="${field.rep}" value="" onChange="$handleOnChange"/>'));
        }



        return jsx('
            <div id="content-modal" className="ui small modal">
                <div className="header">
                    <i className="list layout icon"></i> Add New Filter
                </div>
                <div className="content">
                    <div className="ui grid">x
                        <div className="twenty wide center floated column" >
                            <div>
                                <$FIELD key=${UidGenerator.nextId()} name="filterName" label="Filter Name" value="" onChange="$handleOnChange"/>
                            </div>
                            <div className="ui bottom aligned small divided list">
                               $row
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
                this.state.struct.addFilter(this.state.filter);
            },
            onHidden: function(){
                Core.modalChange.dispatch("");
            }
        })
        .modal('setting', 'closable', false)
        .modal('setting', 'transition', 'vertical flip')
        .modal('show');
    }

    public static var FIELD = untyped React.createClass({
        handleOnChange: function(e){
            var value = e.target.value;

            var name = jt().props.name;
            jt().props.onChange(name, value);

            jt().props["value"] = value;
        },
        render: function(){
            var p = jt().props;

            var type = p.type == null ? "text" : p.type;
            var pattern = p.pattern == null ? "" : p.pattern;

            return jsx('
                    <div className=${p.className}>
                        <label>${p.label}</label>
                        <input type=$type ref=${p.mask} name=${p.name} pattern=$pattern
                            placeholder=${p.pholder} onChange=${jt().handleOnChange} value=${jt().props.value}></input>
                    </div>
                ');
        }
    });


    public static var DROPDOWN = untyped React.createClass({
        getInitialState: function(){
            var items = [];

            var rawItems: Array<String> = cast jt().props.items;

            for(abr in rawItems){
                items.push(jsx('
                    <div key=${'static-' + UidGenerator.nextId()} className="item" data-value=${abr}>${abr}</div>
                '));
            }

            var title: String = cast jt().props.title;

            return {itms: items,
                firstSelected: jt().props.def == null ? "default" : jt().props.def,
                title: title
            };
        },
        initialize: function(input: Dynamic){
            if(input == null) return;
            var elem = new JQuery(ReactDOM.findDOMNode(input));

            untyped elem.dropdown({
                onChange: jt().handleOnChange
            }).dropdown("set selected", jt().state.firstSelected);
        },
        handleOnChange: function(value, text, selectedItem){
            var name = jt().props.label;
            jt().props.onChange(name, value);
        },
        render: function(){

            return jsx('
                    <div ref=${jt().initialize} className="ui search selection dropdown">
                        <input type="hidden" name="${jt().state.title}"></input>
                        <i className="dropdown icon"></i>
                        <div className="default text">${jt().state.title}</div>
                        <div className="menu">
                            ${jt().state.itms}
                        </div>
                    </div>
                ');
        }
    });

}