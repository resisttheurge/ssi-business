package core.view.job.modal;


import api.react.ReactDOM;
import core.view.components.Constants;
import js.JQuery;
import api.react.React;
import api.react.ReactMacro.jsx;

class EditJobModalComponents {
    private static inline function jt(){return untyped __js__('this');}

    public static var JOBINFORMATION = untyped React.createClass({
        getInitialState: function(){
            var obj = jt().props.job == null ? {} : jt().props.job;


            var id = obj.id == null ? {} : obj.id;
            var sm = obj.salesperson == null ? {} : obj.salesperson;
            var cu = obj.customer == null ? {} : obj.customer;

            return {obj: obj, id: id, sm: sm, cu: cu};
        },
        submitChange: function(){

            var obj = jt().state.obj;
            var id = jt().state.id;
            var sm = jt().state.sm;
            var cu = jt().state.cu;

            obj.id = id;
            obj.salesperson = sm;
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
            var obj = jt().state.obj;

            var id = obj.id;
            var sm = obj.salesperson == null ? {} : obj.salesperson;
            var cu = obj.customer == null ? {} : obj.customer;

            return jsx('
                <div className="field">
                    <div className="three fields">
                        <$FIELD className="field" name="prefix"
                            onChange=${jt().handleId} label="Prefix"  value=${id.prefix}/>
                        <$FIELD className="field" name="label"
                            onChange=${jt().handleId} label="Id" value=${id.label}/>
                        <$FIELD className="field" name="year" type="number" min="1000" max="9999"
                            onChange=${jt().handleId} label="Year"  value=${id.year}/>
                    </div>
                    <$FIELD className="field" name="label"
                        onChange=${jt().handleCustomer} label="Customer" value=${cu.label}/>
                    <div className="two fields">
                        <$FIELD className="field" name="label"
                            onChange=${jt().handleSalesman} label="Salesman" value=${sm.label}/>
                        <$FIELD className="field" name="contractPrice"
                            onChange=${jt().handleOnChange} label="Contract Price"  value=${obj.contractPrice}/>
                    </div>
                    <div  className="two fields">
                        <$FIELD className="field" name="start" type="date"
                            onChange=${jt().handleOnChange} label="Start Date" value=${obj.start} />
                        <$FIELD className="field" name="due" type="date"
                            onChange=${jt().handleOnChange} label="Due Date" value=${obj.due} />
                    </div>
                </div>
            ');
        }
    });
    public static var CUSTINFORMATION = untyped React.createClass({
        getInitialState: function(){
            var obj = jt().props.job == null ? {} : jt().props.job;

            var addresses = obj.addresses == null ? {} : obj.addresses;
            var ad = addresses.shipping == null ? {} : addresses.shipping;
            var ca = obj.contact == null ? {} : obj.contact;

            return {obj: {addresses: addresses}, ad: ad, ca: ca};
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
        handleAddress: function(name: String, value: String){
            var ad = jt().state.ad;
            if(value != null && value.length > 0){
                if(name == "line1")
                    untyped ad.lines = value + ad.lines.split("\n")[1];
                if(name == "line2")
                    untyped ad.lines = ad.lines.split("\n")[0] + value;
            } else {
                if(ad.lines == null || ad.lines.length < 1)
                    Reflect.deleteField(jt().state.ad, lines);

                var split = ad.lines.split("\n");
                if(split.length < 2)
                    Reflect.deleteField(jt().state.ad, lines);

                if(name == "line1")
                    jt().state.ad.lines = "\n" + split[1];

                if(name == "line2")
                    jt().state.ad.lines = split[0] + "\n";
            }
            jt().submitChange();
        },
        render: function(){
            var obj = jt().state.obj;

            var shp = obj.addresses.shipping;
            var ad = jt().state.ad;
            var ca = jt().state.ca;

            var line1 = shp.lines.split("\n")[0];
            var line2 = shp.lines.split("\n")[1];

            return jsx('
                <div className="field">
                    <div className="two fields">
                        <$FIELD className="field" name="phone"
                            onChange=${jt().handleContact} label="Phone"  value=${ca.phone} />
                        <$FIELD className="field" name="fax"
                            onChange=${jt().handleContact} label="Fax"  value=${ca.fax} />
                    </div>
                    <div className="two fields">
                        <$FIELD className="field" name="label"
                            onChange=${jt().handleContact} label="Contact" value=${ca.label} />
                        <$FIELD className="field" name="email"
                            onChange=${jt().handleContact} label="Email" value=${ca.email} />
                    </div>
                    <$FIELD className="field" name="line1"
                        onChange=${jt().handleAddress} label="Address 1" value=$line1 />
                    <$FIELD className="field" name="line2"
                        onChange=${jt().handleAddress} label="Address 2" value=$line2 />
                    <div className="fields">
                        <$FIELD className="field" name="city"
                            onChange=${jt().handleAddress} label="City" value=${ad.city} />
                        <div className="field">
                            <label>State</label>
                            <$STATEDROPDOWN name="stateOrProvince" def=${ad.stateOrProvince}
                                    onChange=${jt().handleAddress} />
                        </div>
                        <$FIELD className="field" name="postalCode" value=${ad.postalCode}
                            onChange=${jt().handleAddress} label="Zip Code"  />
                    </div>
                </div>
            ');
        }
    });
    public static var INVADDRINFORMATION = untyped React.createClass({
        getInitialState: function(){
            var obj = jt().props.job == null ? {} : jt().props.job;
            if(obj.addresses == null) obj.addresses = {};

            var ad = obj.addresses.invoicing == null ? {} : obj.addresses.invoicing;
            return {obj: ad};
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

            var ad = jt().state.obj;

            var line1 = ad.lines.split("\n")[0];
            var line2 = ad.lines.split("\n")[1];

            return jsx('
                <div className="field">
                    <$FIELD className="field" name="line1"
                        onChange=${jt().handleOnChange} label="Address 1" value=$line1 />
                    <$FIELD className="field" name="line2"
                        onChange=${jt().handleOnChange} label="Address 2" value=$line2 />
                    <div className="fields">
                        <$FIELD className="field" name="city"
                            onChange=${jt().handleOnChange} label="City" value=${ad.city} />
                        <div className="field">
                            <label>State</label>
                            <$STATEDROPDOWN name="stateOrProvince"  def=${ad.stateOrProvince}
                                    onChange=${jt().handleOnChange}/>
                        </div>
                        <$FIELD className="field" name="postalCode"
                            onChange=${jt().handleOnChange} label="Zip Code" value=${ad.postalCode} />
                    </div>
                </div>
            ');
        }
    });

    public static var SCHEDINFORMATION = untyped React.createClass({
        getInitialState: function(){
            var sch = jt().props.job.schedules;
            if (sch == null) sch = {};

            if (sch.engineering == null) sch.engineering = {};
            if (sch.mechanical == null) sch.mechanical = {};
            if (sch.electrical == null) sch.electrical = {};
            if (sch.shipping == null) sch.shipping = {};
            if (sch.installation == null) sch.installation = {};

            untyped console.log(sch);

            return {schedule: sch};
        },
        handleOnChange: function(name: String, value){
            var sch = jt().state.schedule;

            var field = name.split("-")[1];
            switch name.split("-")[0]{
                case "eng": untyped sch.engineering[field] = value;
                case "mech": untyped sch.mechanical[field] = value;
                case "elec": untyped sch.electrical[field] = value;
                case "ship": untyped sch.shipping[field] = value;
                case "inst": untyped sch.installation[field] = value;
            }

            if(jt().props.onChange != null){
                jt().props.onChange("schInfo", sch);
            }

            jt().setState({schedule: sch});
        },
        render: function(){
            var sch = jt().state.schedule;


            return jsx('
                <div  className="field">
                    <div  className="inline fields">
                        <label className="six wide field">Engineering</label>

                        <$FIELD className="eight wide field" name="eng-start" label="Start"
                            onChange=${jt().handleOnChange} value=${sch.engineering.start} />
                        <$FIELD className="eight wide field" name="eng-complete" label="Complete"
                            onChange=${jt().handleOnChange} value=${sch.engineering.complete}/>
                    </div>
                    <div  className="inline fields">
                        <label className="six wide field">Mechanical</label>

                        <$FIELD className="eight wide field" name="mech-start" label="Start"
                            onChange=${jt().handleOnChange} value=${sch.mechanical.start} />
                        <$FIELD className="eight wide field" name="mech-complete" label="Complete"
                            onChange=${jt().handleOnChange} value=${sch.mechanical.complete}/>
                    </div>
                    <div  className="inline fields">
                        <label className="six wide field">Electrical</label>

                        <$FIELD className="eight wide field" name="elec-start" label="Start"
                            onChange=${jt().handleOnChange} value=${sch.electrical.start} />
                        <$FIELD className="eight wide field" name="elec-complete" label="Complete"
                            onChange=${jt().handleOnChange} value=${sch.electrical.complete}/>
                    </div>
                    <div  className="inline fields">
                        <label className="six wide field">Shipping</label>

                        <$FIELD className="eight wide field" name="ship-start" label="Start"
                            onChange=${jt().handleOnChange} value=${sch.shipping.start} />
                        <$FIELD className="eight wide field" name="ship-complete" label="Complete"
                            onChange=${jt().handleOnChange} value=${sch.shipping.complete}/>
                    </div>
                    <div  className="inline fields">
                        <label className="six wide field">Installation</label>

                        <$FIELD className="eight wide field" name="inst-start" label="Start"
                            onChange=${jt().handleOnChange} value=${sch.installation.start} />
                        <$FIELD className="eight wide field" name="inst-complete" label="Complete"
                            onChange=${jt().handleOnChange} value=${sch.installation.complete}/>
                    </div>
                </div>
            ');
        }
    });
    public static var SYSTYPEINFORMATION = untyped React.createClass({
        initialize: function(){

        },
        render: function(){
            return jsx('
                <div  className="inline fields">
                    <div  className="eight wide field">
                        <input type="text" placeholder="Type 1"/>
                    </div>
                    <div  className="eight wide field">
                        <input type="text" placeholder="Type 2"/>
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
                            placeholder=${p.pholder} onChange=${jt().handleOnChange}
                            defaultValue=${jt().props.defaultValue} value=${jt().props.value}></input>
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
}
