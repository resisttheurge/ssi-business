package core.view.shipment.modal;


import api.react.ReactDOM;
import js.JQuery;
import api.react.React;
import api.react.ReactMacro.jsx;

class NewShpmntModalComponents {
    private static inline function jt(){return untyped __js__('this');}



    public static var DIVHEADER = untyped React.createClass({
        render: function(){
            return jsx('<h4 className="ui dividing header">${jt().props.value}</h4>');
        }
    });

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
                            placeholder=${p.pholder} onChange=${jt().handleOnChange} value=${p.value}></input>
                    </div>
                ');
        }
    });

    public static var SHIPITEMTABLE = untyped React.createClass({
        getInitialState: function(){
            return {selected: {}, addingItem: false, selCount: 0,
            internalItems: [{label: "RMS-121-1", remarks: "Specialty Bolt", requested: "300"},
                            {label: "RMS-121-2", remarks: "Specialty Bolt", requested: "300"},
                            {label: "RMS-121-3", remarks: "Specialty Bolt", requested: "300"}],
                 newItems: [{label: "RMS-121-0", remarks: "Specialty Bolt", requested: "300"},
                            {label: "RMS-121-1", remarks: "Specialty Bolt", requested: "300"},
                            {label: "RMS-121-2", remarks: "Specialty Bolt", requested: "300"},
                            {label: "RMS-121-3", remarks: "Specialty Bolt", requested: "300"},
                            {label: "RMS-121-4", remarks: "Specialty Bolt", requested: "300"},
                            {label: "RMS-121-5", remarks: "Specialty Bolt", requested: "300"},
                            {label: "RMS-121-6", remarks: "Specialty Bolt", requested: "300"},
                            {label: "RMS-121-7", remarks: "Specialty Bolt", requested: "300"},
                            {label: "RMS-121-8", remarks: "Specialty Bolt", requested: "300"},
                            {label: "RMS-121-9", remarks: "Specialty Bolt", requested: "300"},
                            {label: "RMS-121-91", remarks: "Specialty Bolt", requested: "300"},
                            {label: "RMS-121-12", remarks: "Specialty Bolt", requested: "300"},
                            {label: "RMS-121-23", remarks: "Specialty Bolt", requested: "300"},
                            {label: "RMS-121-34", remarks: "Specialty Bolt", requested: "300"},
                            {label: "RMS-121-45", remarks: "Specialty Bolt", requested: "300"},
                            {label: "RMS-121-56", remarks: "Specialty Bolt", requested: "300"},
                            {label: "RMS-121-67", remarks: "Specialty Bolt", requested: "300"},
                            {label: "RMS-121-78", remarks: "Specialty Bolt", requested: "300"},
                            {label: "RMS-121-89", remarks: "Specialty Bolt", requested: "300"},
                            {label: "RMS-121-10", remarks: "Specialty Bolt", requested: "300"},
                            {label: "RMS-121-11", remarks: "Specialty Bolt", requested: "300"},
                            {label: "RMS-121-22", remarks: "Specialty Bolt", requested: "300"},
                            {label: "RMS-121-33", remarks: "Specialty Bolt", requested: "300"},
                            {label: "RMS-121-44", remarks: "Specialty Bolt", requested: "300"},
                            {label: "RMS-121-55", remarks: "Specialty Bolt", requested: "300"},
                            {label: "RMS-121-66", remarks: "Specialty Bolt", requested: "300"},
                            {label: "RMS-121-77", remarks: "Specialty Bolt", requested: "300"},
                            {label: "RMS-121-88", remarks: "Specialty Bolt", requested: "300"}]}
        },
        handleAddClick: function(e){
            if(jt().state.addingItem == false){
                var items = jt().state.newItems;
                jt().setState({addingItem: true, items: items, selected: {}});
            } else {
                var currItems: Array<Dynamic> = jt().state.items;
                var items: Array<Dynamic> = jt().state.internalItems;

                var count = jt().state.items.length;
                var selected = jt().state.selected;

                var i: Int = 0;
                while(i < count){
                    if(untyped selected[i] == true){
                        items.push(currItems[i]);
                    }

                    i += 1;
                }

                jt().setState({addingItem: false, items: items, selected: {}});
            }
        },
        handleRemoveClick: function(e){
            var selCount = jt().state.selCount;
            var items: Array<Dynamic> = jt().state.internalItems;

            if(jt().state.addingItem == false){
                var count = jt().state.items.length;
                var selected = jt().state.selected;


                var i: Int = 0;
                while(i < count){
                    if(untyped selected[i] == true){
                        items.remove(items[i]);
                        selCount -= 1;
                    }

                    i += 1;
                }
            }

            jt().setState({addingItem: false, selCount: selCount, items: items, selected: {}});
        },
        handleNewItems: function(items: Array<Dynamic>){
            jt().setState({newItems: items});
        },
        handleCheckBox: function(e){
            var index = e.target.dataset.index;
            var selected = jt().state.selected;

            untyped selected[index] = !selected[index];

            var i = jt().state.selCount;

            untyped i += selected[index] ? 1 : -1;


            jt().setState({selected: selected, selCount: i});
        },
        render: function(){
            var tabs = [];
            var page = [];

            untyped console.log(jt().state.selected);

            var items: Array<Dynamic> = jt().state.items;

            if(items == null)
                items = jt().state.internalItems;

            var tabCount = Math.ceil(items.length / 5.0);

            for(i in 0...(tabCount)){
                var rows = [];
                var start = i * 5;

                var index = 0;
                for(item in items.slice(start, start + 5)){
                    var checked = jt().state.selected[index] == true;

                    var key = ${item.label + '-' + index};
                    if(jt().state.addingItem == true) key += "-extra";

                    rows.push(jsx('
                        <tr key=$key>
                            <td className="collapsing">
                                <div className="ui fitted checkbox" onClick=${jt().handleCheckBox}>
                                    <input type="checkbox" data-index=${index++}  value=${checked}/>
                                    <label></label>
                                </div>
                            </td>
                            <td>${item.label}</td>
                            <td>${item.remarks}</td>
                            <td>${item.requested}</td>
                        </tr>
                    '));
                }

                var dataTab = 'sitemtab-$i';

                var tbcls = untyped classNames("ui", "basic", "tab", {active: i == 0}, "segment");
                tabs.push(jsx('
                    <div key=${'tseg-' + dataTab} className=$tbcls data-tab=$dataTab>
                        <table className="ui very basic table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Item ID</th>
                                    <th>Descripiton</th>
                                    <th>Requested</th>
                                </tr>
                            </thead>
                            <tbody>
                                $rows
                            </tbody>
                        </table>
                    </div>
                '));

                var tabInitialize = function(input){
                    if(input == null) return;

                    var tab = new JQuery(input);

                    untyped tab.tab();
                };

                var cls = untyped classNames("item", {active: i == 0});
                page.push(jsx('<a key=${'key-' + dataTab} ref=$tabInitialize className=$cls data-tab=$dataTab>${i + 1}</a>'));
            }

            var addingItem = jt().state.addingItem;
            var selCount = jt().state.selCount;

            var onLoad = function(input, add: Bool){
                if(input == null) return;
                var elem = new JQuery(cast ReactDOM.findDOMNode(input));

                if(add){
                    if(addingItem == true)
                        elem.text("Accept");

                } else {
                    if(addingItem == true)
                        elem.text("Cancel");

                    if(addingItem == true || selCount > 0) elem.removeClass("disabled");
                }
            }

            var addLoad = onLoad.bind(_, true);
            var remLoad = onLoad.bind(_, false);

            return jsx('
                <div className="field">
                    $tabs
                    <div className="ui center aligned container">
                        <div className="ui pagination tabular menu">
                            $page
                        </div>
                    </div>
                    <h5 className="ui dividing header"></h5>
                    <div className="fields">
                        <div className="four wide field"></div>
                        <div className="eight wide field">
                            <div key=${UidGenerator.nextId()}
                                ref=${remLoad} onClick=${jt().handleRemoveClick} className="ui black button disabled">Remove</div>
                            <div key=${UidGenerator.nextId()}
                                ref=${addLoad} onClick=${jt().handleAddClick} className="ui right floated green button">Add</div>
                        </div>
                        <div className="four wide field"></div>
                    </div>
                </div>
            ');
        }
    });

}
