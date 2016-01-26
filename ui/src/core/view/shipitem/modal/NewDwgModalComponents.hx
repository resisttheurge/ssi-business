package core.view.shipitem.modal;


import api.react.ReactDOM;
import js.JQuery;
import api.react.React;

class NewDwgModalComponents {
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

    public static var DWGTYPEDROPDOWN = untyped React.createClass({
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
                        <div className="default text">Drawing Type</div>
                        <div className="menu">
                            <div className="item" data-value="DETAIL">Detail</div>
                            <div className="item" data-value="LAYOUT">Layout</div>
                        </div>
                    </div>
                ');
        }
    });

}
