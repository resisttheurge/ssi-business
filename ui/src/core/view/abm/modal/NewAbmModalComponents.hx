package core.view.abm.modal;


import api.react.ReactDOM;
import js.JQuery;
import api.react.React;
import api.react.ReactMacro.jsx;
import core.dataaccess.ServiceAccessManager;

class NewAbmModalComponents {
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

    public static var MFACTDROPDOWN = untyped React.createClass({
        getInitialState: function(){
            var items = [];
            var mfacts: Array<Dynamic> = [];

            ServiceAccessManager.getData(
              EndPoint.MFACT,
              {
                success: function(res) {
                  mfacts = cast res.data;
                },
                error: function() {}
              }
            );

            for(mfact in mfacts){
                items.push(jsx('
                    <div key=${'static-' + UidGenerator.nextId()} className="item" data-value=${mfact.label}>${mfact.label}</div>
                '));
            }

            return {itms: items, firstSelected: jt().props.def == null ? "default" : jt().props.def};
        },
        initialize: function(input: Dynamic){
            if(input == null) return;
            var elem = new JQuery(ReactDOM.findDOMNode(input));

            untyped elem.dropdown({
                onChange: jt().handleOnChange
            }).dropdown("set selected", jt().state.firstSelected);
        },
        handleOnChange: function(value, text, selectedItem){
            var name = jt().props.name;
            jt().props.onChange(name, value);

            if (value == 'Create New') jt().setState({createNew: true});
        },
        render: function(){
            if (jt().state.createNew) {
              return jsx('<$FIELD className="field" name="manufacturer" onChange=${jt().handleOnChange}/>');
            } else {
              return jsx('
                      <div ref=${jt().initialize} className="ui search selection dropdown">
                          <input type="hidden" name="manufacturer"></input>
                          <i className="dropdown icon"></i>
                          <div className="default text">Manufacturer</div>
                          <div className="menu">
                              ${jt().state.itms}
                              <div className="item" data-value="Create New">Create New</div>
                          </div>
                      </div>
                  ');
            }
        }
    });

    public static var VENDORDROPDOWN = untyped React.createClass({
        getInitialState: function(){
            var items = [];
            var vendors: Array<Dynamic> = [];

            ServiceAccessManager.getData(
              EndPoint.VENDOR,
              {
                success: function(res) {
                  vendors = cast res.data;
                },
                error: function() {}
              }
            );

            for(v in vendors){
                items.push(jsx('
                    <div key=${'static-' + UidGenerator.nextId()} className="item" data-value=${v.label}>${v.label}</div>
                '));
            }

            return {itms: items, firstSelected: jt().props.def == null ? "default" : jt().props.def};
        },
        initialize: function(input: Dynamic){
            if(input == null) return;
            var elem = new JQuery(ReactDOM.findDOMNode(input));

            untyped elem.dropdown({
                onChange: jt().handleOnChange
            }).dropdown("set selected", jt().state.firstSelected);
        },
        handleOnChange: function(value, text, selectedItem){
            var name = jt().props.name;
            jt().props.onChange(name, value);

            if (value == 'Create New') jt().setState({createNew: true});
        },
        render: function(){
          if (jt().state.createNew) {
            return jsx('<$FIELD className="three wide field" label="Vendor" name="vendor" onChange=${jt().handleOnChange}/>');
          } else {
            return jsx('
                  <div className="field">
                    <label>Vendor</label>
                    <div ref=${jt().initialize} className="ui search selection dropdown">
                        <input type="hidden" name="vendor"></input>
                        <i className="dropdown icon"></i>
                        <div className="default text">Vendor</div>
                        <div className="menu">
                            ${jt().state.itms}
                            <div className="item" data-value="Create New">Create New</div>
                        </div>
                    </div>
                  </div>
                ');
          }
        }
    });

    public static var PARTDROPDOWN = untyped React.createClass({
        getInitialState: function(){
            var items = [];
            var parts: Array<Dynamic> = [];

            ServiceAccessManager.getData(
              EndPoint.PART,
              {
                success: function(res) {
                  parts = cast res.data;
                },
                error: function() {}
              }
            );

            for(part in parts){
                items.push(jsx('
                    <div key=${'static-' + UidGenerator.nextId()} className="item" data-value=${part.number}>${part.number}</div>
                '));
            }

            return {itms: items, firstSelected: jt().props.def == null ? "default" : jt().props.def};
        },
        initialize: function(input: Dynamic){
            if(input == null) return;
            var elem = new JQuery(ReactDOM.findDOMNode(input));

            untyped elem.dropdown({
                onChange: jt().handleOnChange
            }).dropdown("set selected", jt().state.firstSelected);
        },
        handleOnChange: function(value, text, selectedItem){
            var name = jt().props.name;
            jt().props.onChange(name, value);
        },
        render: function(){
            return jsx('
                    <div ref=${jt().initialize} className="ui search selection dropdown">
                        <input type="hidden" name="part"></input>
                        <i className="dropdown icon"></i>
                        <div className="default text">Part NO</div>
                        <div className="menu">
                            ${jt().state.itms}
                            <div className="item" data-value="Create New">Create New</div>
                        </div>
                    </div>
                ');
        }
    });


}
