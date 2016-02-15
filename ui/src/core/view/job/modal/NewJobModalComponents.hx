package core.view.job.modal;


import api.react.ReactDOM;
import core.models.CoreTypes.Job;
import core.view.components.Constants;
import core.view.main.FieldMask;
import js.JQuery;
import api.react.React;
import api.react.ReactMacro.jsx;
import core.dataaccess.ServiceAccessManager;

class NewJobModalComponents {
    private static inline function jt(){return untyped __js__('this');}

    public static var JOBINFORMATION = untyped React.createClass({
        getInitialState: function(){
            return {obj: {}, id: {}, sm: {}, cu: {}};
        },
        submitChange: function(){

            var obj = jt().state.obj;
            var id = jt().state.id;
            var sm = jt().state.sm;
            var cu = jt().state.cu;

            obj.id = id;
            obj.salesman = sm;
            obj.customer = cu;

            if(jt().props.onChange != null){
                jt().props.onChange("jobInfo", obj);
            }

            jt().setState(obj);
        },
        handleOnChange: function(name: String, value){
            if(value != null && value.length > 0){
                untyped jt().state.obj[name] = value;
            } else {
                Reflect.deleteField(jt().state.obj, name);
            }
            jt().submitChange();
        },
        handleCustomer: function(name: String, value){
            if(value != null && value.length > 0){
                untyped jt().state.cu[name] = value;
            } else {
                Reflect.deleteField(jt().state.cu, name);
            }
            jt().submitChange();
        },
        handleSalesman: function(name: String, value){
            if(value != null && value.length > 0){
                untyped jt().state.sm[name] = value;
            } else {
                Reflect.deleteField(jt().state.sm, name);
            }
            jt().submitChange();
        },
        handleId: function(name: String, value){
            if(value != null && value.length > 0){
                untyped jt().state.id[name] = value;
            } else {
                Reflect.deleteField(jt().state.id, name);
            }
            jt().submitChange();
        },

        render: function(){
            return jsx('
                <div className="field">
                    <div className="three fields">
                        <$FIELD className="field" name="prefix"
                            onChange=${jt().handleId} label="Prefix" />
                        <$FIELD className="field" name="label"
                            onChange=${jt().handleId} label="Id"/>
                        <$FIELD className="field" name="year" type="number" min="1000" max="9999"
                            onChange=${jt().handleId} label="Year" />
                    </div>
                    <$CUSTDROPDOWN className="field" name="customer"
                        onChange=${jt().handleCustomer} label="Customer"/>
                    <div className="two fields">
                        <$SALESDROPDOWN className="field" name="salesman"
                            onChange=${jt().handleSalesman} label="Salesman"/>
                        <$FIELD className="field" name="customer"
                            onChange=${jt().handleOnChange} label="Contract Price"  />
                    </div>
                    <div  className="two fields">
                        <$FIELD className="field" name="start" type="date"
                            onChange=${jt().handleOnChange} label="Start Date"  />
                        <$FIELD className="field" name="due" type="date"
                            onChange=${jt().handleOnChange} label="Due Date"  />
                    </div>
                </div>
            ');
        }
    });
    public static var CUSTINFORMATION = untyped React.createClass({
        getInitialState: function(){
            return {obj: {addresses: {}}, ad: {}, ca: {}};
        },
        submitChange: function(){

            var obj = jt().state.obj;
            var ad = jt().state.ad;
            var ca = jt().state.ca;

            obj.contact = ca;
            obj.addresses.shipping = ad;

            if(jt().props.onChange != null){
                jt().props.onChange("custInfo", obj);
            }

            jt().setState(obj);
        },
        handleOnChange: function(name: String, value){
            if(value != null && value.length > 0){
                untyped jt().state.obj[name] = value;
            } else {
                Reflect.deleteField(jt().state.obj, name);
            }
            jt().submitChange();
        },
        handleContact: function(name: String, value){
            if(value != null && value.length > 0){
                untyped jt().state.ca[name] = value;
            } else {
                Reflect.deleteField(jt().state.ca, name);
            }
            jt().submitChange();
        },
        handleAddress: function(name: String, value){
            if(value != null && value.length > 0){
                untyped jt().state.ad[name] = value;
            } else {
                Reflect.deleteField(jt().state.ad, name);
            }
            jt().submitChange();
        },
        render: function(){
            return jsx('
                <div className="field">
                    <div className="two fields">
                        <$FIELD className="field" name="phone"
                            onChange=${jt().handleContact} label="Phone"  />
                        <$FIELD className="field" name="fax"
                            onChange=${jt().handleContact} label="Fax"  />
                    </div>
                    <div className="two fields">
                        <$FIELD className="field" name="contact"
                            onChange=${jt().handleContact} label="Contact" />
                        <$FIELD className="field" name="email"
                            onChange=${jt().handleContact} label="Email" />
                    </div>
                    <$FIELD className="field" name="line1"
                        onChange=${jt().handleAddress} label="Address 1" />
                    <$FIELD className="field" name="line2"
                        onChange=${jt().handleAddress} label="Address 2" />
                    <div className="fields">
                        <$FIELD className="field" name="city"
                            onChange=${jt().handleAddress} label="City"  />
                        <div className="field">
                            <label>State</label>
                            <$STATEDROPDOWN name="stateOrProvince" onChange=${jt().handleAddress} />
                        </div>
                        <$FIELD className="field" name="postalCode"
                            onChange=${jt().handleAddress} label="Zip Code"  />
                    </div>
                </div>
            ');
        }
    });
    public static var INVADDRINFORMATION = untyped React.createClass({
        getInitialState: function(){
            return {obj: {}};
        },
        submitChange: function(){

            var obj = jt().state.obj;

            if(jt().props.onChange != null){
                jt().props.onChange("invInfo", obj);
            }

            jt().setState(obj);
        },
        handleOnChange: function(name: String, value){
            if(value != null && value.length > 0){
                untyped jt().state.obj[name] = value;
            } else {
                Reflect.deleteField(jt().state.obj, name);
            }
            jt().submitChange();
        },
        render: function(){
            return jsx('
                <div className="field">
                    <$FIELD className="field" name="line1"
                        onChange=${jt().handleOnChange} label="Address 1" />
                    <$FIELD className="field" name="line2"
                        onChange=${jt().handleOnChange} label="Address 2" />
                    <div className="fields">
                        <$FIELD className="field" name="city"
                            onChange=${jt().handleOnChange} label="City" />
                        <div className="field">
                            <label>State</label>
                            <$STATEDROPDOWN name="stateOrProvince" onChange=${jt().handleOnChange}/>
                        </div>
                        <$FIELD className="field" name="postalCode"
                            onChange=${jt().handleOnChange} label="Zip Code" />
                    </div>
                </div>
            ');
        }
    });

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
                            placeholder=${p.pholder} onChange=${jt().handleOnChange}></input>
                    </div>
                ');
        }
    });

    public static var STATEDROPDOWN = untyped React.createClass({
        getInitialState: function(){
            var items = [];


            for(abr in Constants.stateAbbrArray){
                items.push(jsx('
                    <div key=${'static-' + UidGenerator.nextId()} className="item" data-value=${abr.abbr}>${abr.state}</div>
                '));
            }

            return {itms: items};
        },
        initialize: function(input: Dynamic){
            if(input == null) return;
            var elem = new JQuery(ReactDOM.findDOMNode(input));

            untyped elem.dropdown({
                onChange: jt().handleOnChange
            });
        },
        handleOnChange: function(value, text, selectedItem){
            var name = jt().props.name;
            jt().props.onChange(name, value);
        },
        render: function(){

            return jsx('
                    <div ref=${jt().initialize} className="ui search selection dropdown">
                        <input type="hidden" name="state"></input>
                        <i className="dropdown icon"></i>
                        <div className="default text">State</div>
                        <div className="menu">
                            ${jt().state.itms}
                        </div>
                    </div>
                ');
        }
    });

    public static var CUSTDROPDOWN = untyped React.createClass({
        getInitialState: function(){
            var items = [];
            var customers: Array<Dynamic> = [];

            ServiceAccessManager.getData(
              EndPoint.CUSTOMER,
              {
                success: function(res) {
                  customers = cast res.data;
                },
                error: function() {}
              }
            );

            for(customer in customers){
                items.push(jsx('
                    <div key=${'static-' + UidGenerator.nextId()} className="item" data-value=${customer.label}>${customer.label}</div>
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
              return jsx('<$FIELD className="field" name="label"
                  onChange=${jt().handleCustomer} label="Customer" />');
            } else {
              return jsx('
                  <div className="field">
                    <label>Customer</label>
                      <div ref=${jt().initialize} className="ui search selection dropdown">
                          <input type="hidden" name="customer"></input>
                          <i className="dropdown icon"></i>
                          <div className="default text">Customer</div>
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

    public static var SALESDROPDOWN = untyped React.createClass({
        getInitialState: function(){
            var items = [];
            var salesmen: Array<Dynamic> = [];

            ServiceAccessManager.getData(
              EndPoint.SALESPERSON,
              {
                success: function(res) {
                  salesmen = cast res.data;
                },
                error: function() {}
              }
            );

            for(salesman in salesmen){
                items.push(jsx('
                    <div key=${'static-' + UidGenerator.nextId()} className="item" data-value=${salesman.label}>${salesman.label}</div>
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
              return jsx('<$FIELD className="field" name="label"
                  onChange=${jt().handleSalesman} label="Salesman" />');
            } else {
              return jsx('
                  <div className="field">
                    <label>Salesman</label>
                      <div ref=${jt().initialize} className="ui search selection dropdown">
                          <input type="hidden" name="salesman"></input>
                          <i className="dropdown icon"></i>
                          <div className="default text">Salesman</div>
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
}
