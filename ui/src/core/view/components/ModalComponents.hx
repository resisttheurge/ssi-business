package core.view.components;


import api.react.ReactDOM;
import core.models.CoreTypes.Job;
import core.view.components.Constants;
import core.view.main.FieldMask;
import js.html.HtmlElement;
import js.JQuery;
import api.react.React;
import api.react.ReactMacro.jsx;

class ModalComponents {
    private static inline function jt(){return untyped __js__('this');}

    public static var JOBINFORMATION = untyped React.createClass({
        initialize: function(){

        },
        render: function(){
            var job: Job = jt().props.job;
            var label: String = job.id.label + ('${job.id.year}'.substr(2, 2));

            var current = job;
            return jsx('
                <div className="field">
                    <div className="inline fields">
                        <$FIELD className="six wide field" label=${'Job'+ String.fromCharCode(160) +'ID'}
                                name="id-prefix" pholder="Prefix" value=${job.id.prefix} />
                        <$FIELD className="ten wide field" name="id-label" pholder="ID" value=$label />
                    </div>
                    <div  className="fields">
                        <$FIELD className="sixteen wide field" name="customer" pholder="Customer" value=${current.customer} />
                    </div>
                    <div  className="two fields">
                        <$FIELD className="field" name="salesman" pholder="Salesman" value=${current.salesperson.label} />
                        <$FIELD className="field" name="customer" pholder="Contract Price" value=${current.contractPrice} />
                    </div>
                    <div  className="two fields">
                        <$FIELD className="field" name="customer" mask=${FieldMask.dateField} pholder="Start Date" value=${current.start} />
                        <$FIELD className="field" name="customer" mask=${FieldMask.dateField} pholder="Due Date" value=${current.due} />
                    </div>
                </div>
            ');
        }
    });
    public static var CUSTINFORMATION = untyped React.createClass({
        initialize: function(){

        },
        render: function(){
            var job: Job = jt().props.job;

            var current = job;
            return jsx('
                <div  className="field">
                    <div  className="two fields">
                        <$FIELD  className="field" name="ph-number" mask=${FieldMask.phoneField}  pholder="Phone" value=${current.contact.phone} />
                        <$FIELD  className="field" name="fax-number" mask=${FieldMask.phoneField} pholder="Fax" value=${current.contact.fax} />
                    </div>
                    <div  className="two fields">
                        <$FIELD  className="field" name="contact"    pholder="Contact"   value=${current.contact.label}/>
                        <$FIELD  className="field" name="email"      pholder="Email"     value=${current.contact.email}/>
                    </div>
                    <$FIELD  className="field" name="add-1"          pholder="Address 1" value=${current.addresses.shipping.lines}/>
                    <$FIELD  className="field" name="add-2"          pholder="Address 2" value=${current.addresses.shipping.lines}/>
                    <div  className="fields">
                        <$FIELD  className="field" name="city" pholder="City" value=${current.addresses.shipping.city} />
                        <div  className="field">
                            <$STATEDROPDOWN value=${current.addresses.shipping.stateOrProvince} />
                        </div>
                        <$FIELD  className="field" name="zip" pholder="Zip Code" value=${current.addresses.shipping.postalCode} />
                    </div>
                </div>
            ');
        }
    });
    public static var SCHEDINFORMATION = untyped React.createClass({
        initialize: function(){

        },
        render: function(){
            var job: Job = jt().props.job;

            var current = job;
            var schedule = current.schedules;
            return jsx('
                <div  className="field">
                    <div  className="inline fields">
                        <label className="six wide field">Engineering</label>

                        <div  className="eight wide field">
                            <input name="ph-number" type="text" placeholder="Start" value=${schedule.engineering.start}/>
                        </div>
                        <div  className="eight wide field">
                            <input name="fax-number" type="text" placeholder="End" value=${schedule.engineering.complete}/>
                        </div>
                    </div>
                    <div  className="inline fields">
                        <label className="six wide field">Mechanical</label>

                        <div  className="eight wide field">
                            <input name="ph-number" type="text" placeholder="Start" value=${schedule.mechanical.start}/>
                        </div>
                        <div  className="eight wide field">
                            <input name="fax-number" type="text" placeholder="End" value=${schedule.mechanical.complete}/>
                        </div>
                    </div>
                    <div  className="inline fields">
                        <label className="six wide field">Electrical</label>

                        <div  className="eight wide field">
                            <input name="ph-number" type="text" placeholder="Start" value=${schedule.electrical.start}/>
                        </div>
                        <div  className="eight wide field">
                            <input name="fax-number" type="text" placeholder="End" value=${schedule.electrical.complete}/>
                        </div>
                    </div>
                    <div  className="inline fields">
                        <label className="six wide field">Shipping</label>

                        <div  className="eight wide field">
                            <input name="ph-number" type="text" placeholder="Start" value=${schedule.shipping.start}/>
                        </div>
                        <div  className="eight wide field">
                            <input name="fax-number" type="text" placeholder="End" value=${schedule.shipping.complete}/>
                        </div>
                    </div>
                    <div  className="inline fields">
                        <label className="six wide field">Installation</label>

                        <div  className="eight wide field">
                            <input name="ph-number" type="text" placeholder="Start" value=${schedule.installation.start}/>
                        </div>
                        <div  className="eight wide field">
                            <input name="fax-number" type="text" placeholder="End" value=${schedule.installation.complete}/>
                        </div>
                    </div>
                </div>
            ');
        }
    });
    public static var SYSTYPEINFORMATION = untyped React.createClass({
        initialize: function(){

        },
        render: function(){
            var job: Job = jt().props.job;

            var current = job;
            return jsx('
                <div  className="inline fields">
                    <div  className="eight wide field">
                        <input type="text" placeholder="Type 1" value=${current.systemTypes[0]}/>
                    </div>
                    <div  className="eight wide field">
                        <input type="text" placeholder="Type 2" value=${current.systemTypes[1]}/>
                    </div>
                </div>
            ');
        }
    });
    public static var INVADDRINFORMATION = untyped React.createClass({
        initialize: function(){

        },
        render: function(){
            var job: Job = jt().props.job;

            var current = job;
            var invoice = current.addresses.invoicing;
            return jsx('
                <div className="field">
                    <$FIELD  className="field" name="inv-add-1" pholder="Address 1" value=${invoice.lines} />
                    <$FIELD  className="field" name="inv-add-2" pholder="Address 2" value=${invoice.lines} />
                    <div  className="fields">
                        <$FIELD  className="field" name="inv-city" pholder="City" value=${invoice.city} />
                        <div  className="field">
                            <$STATEDROPDOWN value=${invoice.stateOrProvince} />
                        </div>
                        <$FIELD  className="field" name="inv-zip" pholder="Zip Code" value=${invoice.postalCode} />
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
        render: function(){
            var isLabel = jt().props.label != null && jt().props.label.length > 0;

            var label =  isLabel ? jsx('<label>${jt().props.label}</label>') : "";

            return jsx('
                    <div key="formfield-mod" className=${jt().props.className}>
                        $label
                        <input key="ff-input-mod" type="text" ref=${jt().props.mask} name=${jt().props.name}
                                    placeholder=${jt().props.pholder} value=${jt().props.value}></input>
                    </div>
                ');
        }
    });

    public static var STATEDROPDOWN = untyped React.createClass({
        getInitialState: function(){
            var options = [];
            var items = [];

            for(abr in Constants.stateAbbrArray){
                options.push(jsx('
                <option key=${'static-' + UidGenerator.nextId()} value=${abr.abbr}>${abr.state}</option>
            '));
            }

            for(abr in Constants.stateAbbrArray){
                items.push(jsx('
                <div key=${'static-' + UidGenerator.nextId()} className="item" data-value=${abr.abbr}>${abr.state}</div>
            '));
            }

            return {opts: options, itms: items};
        },
        initialize: function(input: Dynamic){
            var elem = new JQuery(ReactDOM.findDOMNode(input));

            untyped elem.dropdown("set text", jt().props.value).dropdown();

        },
        render: function(){

            return jsx('
                    <div ref=${untyped __js__('this.initialize')} className="ui search selection dropdown">
                        <input type="hidden" name="state"></input>
                        <select>
                            <option value="">State</option>
                            ${jt().state.opts}
                        </select>
                        <i className="dropdown icon"></i>
                        <input name="state" className="search"></input>
                        <div  className="default text">State</div>
                        <div  className="menu">
                            ${jt().state.itms}
                        </div>
                    </div>
                ');
        }
    });
}
