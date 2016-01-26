package core.view.rms.modal;


import api.react.ReactDOM;
import js.JQuery;
import api.react.React;
import api.react.ReactMacro.jsx;

class NewRmsModalComponents {
    private static inline function jt(): Dynamic {return untyped __js__('this');}

    public static var DIVHEADER = untyped React.createClass({
        render: function(){
            return jsx('<h5 className="ui dividing header">${jt().props.value}</h5>');
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
                items: [{label: "RMS-121-1", remarks: "Specialty Bolt", requested: "300"},
                {label: "RMS-121-2", remarks: "Specialty Bolt", requested: "300"},
                {label: "RMS-121-3", remarks: "Specialty Bolt", requested: "300"}]
            };
        },
        handleAddClick: function(e){
            untyped console.log("Click");
            untyped JQuery.tab("change tab", "new-tab");
        },
        handleRemoveClick: function(e){
            var selCount = jt().state.selCount;
            var items: Array<Dynamic> = jt().state.items;

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

            jt().setState({selCount: selCount, items: items, selected: {}});
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

                if(selCount > 0) elem.removeClass("disabled");
            }

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
                            <div key=${UidGenerator.nextId()} ref=$onLoad
                                onClick=${jt().handleRemoveClick} className="ui black button disabled">Remove</div>
                            <div key=${UidGenerator.nextId()}
                                onClick=${jt().handleAddClick} className="ui right floated green button">Add</div>
                        </div>
                        <div className="four wide field"></div>
                    </div>
                </div>
            ');
        }
    });

    public static var ZONETABLE = untyped React.createClass({
        getInitialState: function(){
            return {zones: [{zone: "Zone 1", qty: "300", checked: false}], checked: 0};
        },
        handleOnChange: function(e){
            var value = e.target.value;

            var name = jt().props.name;
            jt().props.onChange(name, value);
        },
        handleRemoveClick: function(){
            var curZones: Array<Dynamic> = jt().state.zones;

            var i = jt().state.checked;

            curZones = curZones.filter(
                function(z){
                    var b = z.checked != null && z.checked != true;

                    if(!b) i -= 1;

                    return b;
                });

            jt().setState({zones: curZones , checked: i});
        },
        handleAddClick: function(){
            var curZones: Array<Dynamic> = jt().state.zones;
            if(jt().state.newZone == true){
                curZones.map(function(z){if(z.checked == null) z.checked = false; return z;});
            } else {
                curZones.push({});
            }
            jt().setState({zones: curZones});
        },
        checked: function(e){
            var curZones = jt().state.zones;
            var z = curZones[e.target.dataset.zone];

            z.checked = !z.checked;

            curZones[e.target.dataset.zone] = z;


            var i = z.checked == true ? jt().state.checked + 1 : jt().state.checked - 1;

            jt().setState({zones: curZones, checked: i});
        },
        render: function(){
            var p = jt().props;

            var type = p.type == null ? "text" : p.type;
            var pattern = p.pattern == null ? "" : p.pattern;

            var curZones: Array<Dynamic> = jt().state.zones;

            var ss = jt().setState;

            var zones = [];
            var newZone = false;
            var index = 0;
            for(z in curZones){
                newZone = newZone || (z.zone == null || z.qty == null);

                var a1 = {display: z.zone == null ? "none" : ""}
                var a2 = {display: z.zone != null ? "none" : ""}

                var b1 = {display: z.qty == null ? "none" : ""}
                var b2 = {display: z.qty != null ? "none" : ""}

                var onChange = function(input, text){
                    if(input == "zone")
                        z.zone = text;
                    if(input.target != null)
                        z.qty = input.target.value;
                }

                var zoneStr:String = z.zone != null ? z.zone : "empty";

                zoneStr = zoneStr.split(" ").join("-").toLowerCase() + '-';

                zones.push(jsx('
                    <tr key=${'zone-' + zoneStr + index}>
                        <td key=${'inner-zone-' + zoneStr + index} className="collapsing">
                            <div className="ui checkbox" onClick=${jt().checked}>
                                <input type="checkbox" data-zone=${index++} value=${z.checked}/>
                                <label></label>
                            </div>
                        </td>
                        <td key="inner">
                            <div style=$a1>${z.zone}</div>
                            <div style=$a2><$ZONEDROPDOWN onChange=$onChange /></div>
                        </td>
                        <td key=${UidGenerator.nextId()}>
                            <div style=$b1>${z.qty}</div>
                            <div style=$b2><input type="number" onBlur=$onChange /></div>
                        </td>
                    </tr>
                '));
            }

            jt().state.newZone = newZone;

            var cancel = newZone ? "Cancel" : "Remove";
            var accept = newZone ? "Accept" : "Add";

            var cancelCls = 'ui black button' + ((newZone || jt().state.checked > 0)? "" : " disabled" );

            return jsx('
                <div className="field">
                    <table className="ui very basic table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Zone</th>
                                <th>Requested</th>
                            </tr>
                        </thead>
                        <tbody>
                            $zones
                        </tbody>
                    </table>
                    <div className="fields">
                        <div className="three wide field"></div>
                        <div className="ten wide field">
                            <div className=$cancelCls onClick=${jt().handleRemoveClick}>
                                $cancel
                            </div>
                            <div className="ui right floated green button" onClick=${jt().handleAddClick}>
                                $accept
                            </div>
                        </div>
                        <div className="three wide field"></div>
                    </div>
                </div>
            ');
        }
    });

    public static var ZONEDROPDOWN = untyped React.createClass({
        initialize: function(input: Dynamic){
            if(input == null) return;
            var elem = new JQuery(ReactDOM.findDOMNode(input));

            untyped elem.dropdown({
                onChange: jt().handleOnChange
            });
        },
        handleOnChange: function(value, text){
            jt().props.onChange("zone", text);
        },
        render: function(){

            return jsx('
                    <div ref=${jt().initialize} className="ui selection dropdown">
                        <input type="hidden" name="zone"></input>
                        <i className="dropdown icon"></i>
                        <div className="default text">Pick Zone</div>
                        <div className="menu">
                            <div className="item" data-value="1">Zone 1</div>
                            <div className="item" data-value="2">Zone 2</div>
                        </div>
                    </div>
                ');
        }
    });
}
