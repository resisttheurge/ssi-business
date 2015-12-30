package core.view.mark.modal;


import api.react.ReactDOM;
import js.JQuery;
import api.react.React;
import api.react.ReactMacro.jsx;

class NewMarkModalComponents {
    private static inline function jt(){return untyped __js__('this');}



    public static var DIVHEADER = untyped React.createClass({
        render: function(){
            return jsx('<h4 className="ui dividing header">${jt().props.value}</h4>');
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


            var i: Int = z.checked == true ? jt().state.checked + 1 : jt().state.checked - 1;

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

    public static var MARKTYPEDROPDOWN = untyped React.createClass({
        initialize: function(input: Dynamic){
            if(input == null) return;
            var elem = new JQuery(ReactDOM.findDOMNode(input));

            var value = jt().props.value;

            if(value == null) value = "default";

            untyped elem.dropdown({
                onChange: jt().handleOnChange
            }).dropdown("set selected", value);
        },
        handleOnChange: function(value, text, selectedItem){
            var name = jt().props.name;

            jt().props.onChange(name, value);
        },
        render: function(){

            return jsx('
                    <div ref=${jt().initialize} className="ui selection dropdown">
                        <input type="hidden" name="dwg-type"></input>
                        <i className="dropdown icon"></i>
                        <div className="default text">Mark Type</div>
                        <div className="menu">
                            <div className="item" data-value="S">S</div>
                            <div className="item" data-value="W">W</div>
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
