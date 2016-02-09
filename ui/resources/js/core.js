(function (console, $global) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var msignal_Signal = function(valueClasses) {
	if(valueClasses == null) valueClasses = [];
	this.valueClasses = valueClasses;
	this.slots = msignal_SlotList.NIL;
	this.priorityBased = false;
};
msignal_Signal.__name__ = true;
msignal_Signal.prototype = {
	add: function(listener) {
		return this.registerListener(listener);
	}
	,addOnce: function(listener) {
		return this.registerListener(listener,true);
	}
	,addWithPriority: function(listener,priority) {
		if(priority == null) priority = 0;
		return this.registerListener(listener,false,priority);
	}
	,addOnceWithPriority: function(listener,priority) {
		if(priority == null) priority = 0;
		return this.registerListener(listener,true,priority);
	}
	,remove: function(listener) {
		var slot = this.slots.find(listener);
		if(slot == null) return null;
		this.slots = this.slots.filterNot(listener);
		return slot;
	}
	,removeAll: function() {
		this.slots = msignal_SlotList.NIL;
	}
	,registerListener: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		if(this.registrationPossible(listener,once)) {
			var newSlot = this.createSlot(listener,once,priority);
			if(!this.priorityBased && priority != 0) this.priorityBased = true;
			if(!this.priorityBased && priority == 0) this.slots = this.slots.prepend(newSlot); else this.slots = this.slots.insertWithPriority(newSlot);
			return newSlot;
		}
		return this.slots.find(listener);
	}
	,registrationPossible: function(listener,once) {
		if(!this.slots.nonEmpty) return true;
		var existingSlot = this.slots.find(listener);
		if(existingSlot == null) return true;
		return false;
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return null;
	}
	,get_numListeners: function() {
		return this.slots.get_length();
	}
	,__class__: msignal_Signal
	,__properties__: {get_numListeners:"get_numListeners"}
};
var msignal_Signal1 = function(type) {
	msignal_Signal.call(this,[type]);
};
msignal_Signal1.__name__ = true;
msignal_Signal1.__super__ = msignal_Signal;
msignal_Signal1.prototype = $extend(msignal_Signal.prototype,{
	dispatch: function(value) {
		var slotsToProcess = this.slots;
		while(slotsToProcess.nonEmpty) {
			slotsToProcess.head.execute(value);
			slotsToProcess = slotsToProcess.tail;
		}
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return new msignal_Slot1(this,listener,once,priority);
	}
	,__class__: msignal_Signal1
});
var msignal_SlotList = function(head,tail) {
	this.nonEmpty = false;
	if(head == null && tail == null) this.nonEmpty = false; else if(head == null) {
	} else {
		this.head = head;
		if(tail == null) this.tail = msignal_SlotList.NIL; else this.tail = tail;
		this.nonEmpty = true;
	}
};
msignal_SlotList.__name__ = true;
msignal_SlotList.prototype = {
	get_length: function() {
		if(!this.nonEmpty) return 0;
		if(this.tail == msignal_SlotList.NIL) return 1;
		var result = 0;
		var p = this;
		while(p.nonEmpty) {
			++result;
			p = p.tail;
		}
		return result;
	}
	,prepend: function(slot) {
		return new msignal_SlotList(slot,this);
	}
	,append: function(slot) {
		if(slot == null) return this;
		if(!this.nonEmpty) return new msignal_SlotList(slot);
		if(this.tail == msignal_SlotList.NIL) return new msignal_SlotList(slot).prepend(this.head);
		var wholeClone = new msignal_SlotList(this.head);
		var subClone = wholeClone;
		var current = this.tail;
		while(current.nonEmpty) {
			subClone = subClone.tail = new msignal_SlotList(current.head);
			current = current.tail;
		}
		subClone.tail = new msignal_SlotList(slot);
		return wholeClone;
	}
	,insertWithPriority: function(slot) {
		if(!this.nonEmpty) return new msignal_SlotList(slot);
		var priority = slot.priority;
		if(priority >= this.head.priority) return this.prepend(slot);
		var wholeClone = new msignal_SlotList(this.head);
		var subClone = wholeClone;
		var current = this.tail;
		while(current.nonEmpty) {
			if(priority > current.head.priority) {
				subClone.tail = current.prepend(slot);
				return wholeClone;
			}
			subClone = subClone.tail = new msignal_SlotList(current.head);
			current = current.tail;
		}
		subClone.tail = new msignal_SlotList(slot);
		return wholeClone;
	}
	,filterNot: function(listener) {
		if(!this.nonEmpty || listener == null) return this;
		if(Reflect.compareMethods(this.head.listener,listener)) return this.tail;
		var wholeClone = new msignal_SlotList(this.head);
		var subClone = wholeClone;
		var current = this.tail;
		while(current.nonEmpty) {
			if(Reflect.compareMethods(current.head.listener,listener)) {
				subClone.tail = current.tail;
				return wholeClone;
			}
			subClone = subClone.tail = new msignal_SlotList(current.head);
			current = current.tail;
		}
		return this;
	}
	,contains: function(listener) {
		if(!this.nonEmpty) return false;
		var p = this;
		while(p.nonEmpty) {
			if(Reflect.compareMethods(p.head.listener,listener)) return true;
			p = p.tail;
		}
		return false;
	}
	,find: function(listener) {
		if(!this.nonEmpty) return null;
		var p = this;
		while(p.nonEmpty) {
			if(Reflect.compareMethods(p.head.listener,listener)) return p.head;
			p = p.tail;
		}
		return null;
	}
	,__class__: msignal_SlotList
	,__properties__: {get_length:"get_length"}
};
var core_view_main_LoginDialog = function() {
	React.Component.call(this);
	this.state = { };
};
core_view_main_LoginDialog.__name__ = true;
core_view_main_LoginDialog.jt = function() {
	return this;
};
core_view_main_LoginDialog.__super__ = React.Component;
core_view_main_LoginDialog.prototype = $extend(React.Component.prototype,{
	render: function() {
		var _g = this;
		var initialize = function(input) {
		};
		var onUnameChange = function(e) {
			var value = e.target.value;
			_g.setState({ uname : value});
		};
		var onPassChange = function(e1) {
			var value1 = e1.target.value;
			_g.setState({ pass : value1});
		};
		var onEnterPress = function(e2) {
			e2.persist();
			if(e2.keyCode == 13) js.JQuery("#login-button").click();
		};
		return React.createElement("div",{ id : "content-modal", ref : initialize, className : "ui xsmall modal"},React.createElement("div",{ className : "login-header header"},React.createElement("i",{ className : "list layout icon"}),"Login"),React.createElement("div",{ className : "content"},React.createElement("form",{ className : "ui small form"},React.createElement("div",{ className : "ui stacked segment"},React.createElement("div",{ className : "field"},React.createElement("div",{ className : "ui left icon input"},React.createElement("i",{ className : "user icon"}),React.createElement("input",{ onChange : onUnameChange, name : "email", type : "text", placeholder : "E-mail address"}))),React.createElement("div",{ className : "field"},React.createElement("div",{ className : "ui left icon input"},React.createElement("i",{ className : "lock icon"}),React.createElement("input",{ onChange : onPassChange, name : "password", onKeyUp : onEnterPress, type : "password", placeholder : "Password"})))),React.createElement("div",{ className : "ui error message"}))),React.createElement("div",{ className : "actions"},React.createElement("div",{ className : "ui black cancel right small button"},"Cancel"),React.createElement("div",{ id : "login-button", className : "ui approve right medium icon button"},"Login")));
	}
	,componentDidMount: function() {
		var _g = this;
		var elem = js.JQuery(ReactDOM.findDOMNode(this));
		elem.modal({ onApprove : function() {
			core_authentication_AuthenticationManager.authenticate(_g.state.uname == null?"":_g.state.uname,_g.state.pass == null?"":_g.state.pass,function(user) {
				Core.application.setState({ authenticated : true});
			});
		}, onHidden : function() {
			Core.modalChange.dispatch("");
		}}).modal("setting","closable",false).modal("setting","transition","vertical flip").modal("show");
	}
	,__class__: core_view_main_LoginDialog
});
var core_view_job_modal_NewJobDialog = function() {
	React.Component.call(this);
	this.state = { job : { addresses : { }}};
};
core_view_job_modal_NewJobDialog.__name__ = true;
core_view_job_modal_NewJobDialog.jt = function() {
	return this;
};
core_view_job_modal_NewJobDialog.__super__ = React.Component;
core_view_job_modal_NewJobDialog.prototype = $extend(React.Component.prototype,{
	handleOnChange: function(name,value) {
		var job = this.state.job;
		switch(name) {
		case "jobInfo":
			job.contractPrice = value.contractPrice;
			job.start = value.start;
			job.due = value.due;
			job.customer = value.customer;
			job.salesman = value.salesman;
			job.id = value.id;
			break;
		case "custInfo":
			job.addresses.shipping = value.addresses.shipping;
			job.contact = value.contact;
			break;
		case "invInfo":
			job.addresses.invoicing = value;
			break;
		case "descInfo":
			job.description = value;
			break;
		}
		this.setState({ job : job});
	}
	,render: function() {
		var _g = this;
		var onDescChange = function(e) {
			_g.handleOnChange("descInfo",e.target.value);
		};
		return React.createElement("div",{ id : "content-modal", className : "ui modal"},React.createElement("div",{ className : "header"},React.createElement("i",{ className : "list layout icon"}),"Add New Job"),React.createElement("div",{ className : "content"},React.createElement("form",{ className : "ui form"},React.createElement("div",{ className : "fields"},React.createElement("div",{ className : "seven wide field"},React.createElement(core_view_job_modal_NewJobModalComponents.DIVHEADER,{ value : "Job Information"}),React.createElement(core_view_job_modal_NewJobModalComponents.JOBINFORMATION,{ onChange : $bind(this,this.handleOnChange)})),React.createElement("div",{ className : "nine wide field"},React.createElement(core_view_job_modal_NewJobModalComponents.DIVHEADER,{ value : "Customer Information"}),React.createElement(core_view_job_modal_NewJobModalComponents.CUSTINFORMATION,{ onChange : $bind(this,this.handleOnChange)}))),React.createElement("div",{ className : "fields"},React.createElement("div",{ className : "seven wide field"},React.createElement(core_view_job_modal_NewJobModalComponents.DIVHEADER,{ value : "Description"}),React.createElement("div",{ className : "sixteen wide field"},React.createElement("textarea",{ onChange : onDescChange, rows : "9"}))),React.createElement("div",{ className : "nine wide field"},React.createElement(core_view_job_modal_NewJobModalComponents.DIVHEADER,{ value : "Invoice Address"}),React.createElement(core_view_job_modal_NewJobModalComponents.INVADDRINFORMATION,{ onChange : $bind(this,this.handleOnChange)}))))),React.createElement("div",{ className : "actions"},React.createElement("div",{ className : "ui black cancel button"},"Cancel"),React.createElement("div",{ className : "ui approve right labeled icon button"},"Submit Job",React.createElement("i",{ className : "checkmark icon"}))));
	}
	,componentDidMount: function() {
		var _g = this;
		var elem = js.JQuery(ReactDOM.findDOMNode(this));
		elem.modal({ onApprove : function() {
			core_dataaccess_PersistenceManager.saveJob(_g.state.job);
		}, onHidden : function() {
			Core.modalChange.dispatch("");
		}}).modal("setting","closable",false).modal("setting","transition","vertical flip").modal("show");
	}
	,__class__: core_view_job_modal_NewJobDialog
});
var core_view_job_modal_AddJobFilterDialog = function() {
	React.Component.call(this);
};
core_view_job_modal_AddJobFilterDialog.__name__ = true;
core_view_job_modal_AddJobFilterDialog.jt = function() {
	return this;
};
core_view_job_modal_AddJobFilterDialog.__super__ = React.Component;
core_view_job_modal_AddJobFilterDialog.prototype = $extend(React.Component.prototype,{
	render: function() {
		var initialize = function(input) {
		};
		return React.createElement("div",{ id : "content-modal", ref : initialize, className : "ui xsmall modal"},React.createElement("div",{ className : "header"},React.createElement("i",{ className : "list layout icon"}),"Create Filter"),React.createElement("div",{ className : "content"},React.createElement("form",{ className : "ui small form"},React.createElement(core_view_components_ModalComponents.FIELD,{ label : "ID", name : "job-id", className : "field"}),React.createElement("div",{ className : "fields"},React.createElement(core_view_components_ModalComponents.FIELD,{ label : "Start Year", name : "job-id", className : "field"}),React.createElement(core_view_components_ModalComponents.FIELD,{ label : "End Year", name : "job-id", className : "field"})),React.createElement(core_view_components_ModalComponents.FIELD,{ label : "Customer", name : "job-id", className : "field"}),React.createElement("div",{ className : "fields"},React.createElement(core_view_components_ModalComponents.FIELD,{ label : "City", name : "job-id", className : "field"}),React.createElement(core_view_components_ModalComponents.FIELD,{ label : "State", name : "job-id", className : "field"})),React.createElement(core_view_components_ModalComponents.FIELD,{ label : "Description", name : "job-id", className : "field"}))),React.createElement("div",{ className : "actions"},React.createElement("div",{ className : "ui black cancel button"},"Cancel"),React.createElement("div",{ className : "ui approve right labeled icon button"},"Add Filter",React.createElement("i",{ className : "checkmark icon"}))));
	}
	,componentDidMount: function() {
		var elem = js.JQuery(ReactDOM.findDOMNode(this));
		elem.modal({ onHidden : function() {
			Core.modalChange.dispatch("");
		}}).modal("setting","closable",false).modal("setting","transition","vertical flip").modal("show");
	}
	,__class__: core_view_job_modal_AddJobFilterDialog
});
var core_view_job_modal_ManageJobFilterDialog = function() {
	React.Component.call(this);
};
core_view_job_modal_ManageJobFilterDialog.__name__ = true;
core_view_job_modal_ManageJobFilterDialog.jt = function() {
	return this;
};
core_view_job_modal_ManageJobFilterDialog.__super__ = React.Component;
core_view_job_modal_ManageJobFilterDialog.prototype = $extend(React.Component.prototype,{
	render: function() {
		var openAddFilterDialog = function() {
			Core.modalChange.dispatch("job-filter");
		};
		var initialize = function(input) {
		};
		return React.createElement("div",{ id : "content-modal", ref : initialize, className : "ui small modal"},React.createElement("div",{ className : "header"},React.createElement("i",{ className : "list layout icon"}),"Manage Filters"),React.createElement("div",{ className : "content"},React.createElement("div",{ className : "ui grid"},React.createElement("div",{ className : "nine wide right floated column"},React.createElement("div",{ className : "ui bottom aligned small divided list"},React.createElement(core_view_job_modal_ManageJobFilterDialog.FILTERLISTITEM,{ name : "Arbitrary Filter Name 1", fid : "1"}),React.createElement(core_view_job_modal_ManageJobFilterDialog.FILTERLISTITEM,{ name : "Arbitrary Filter Name 2", fid : "2"}),React.createElement(core_view_job_modal_ManageJobFilterDialog.FILTERLISTITEM,{ name : "Arbitrary Filter Name 3", fid : "3"}))),React.createElement("div",{ className : "six wide column"},React.createElement("div",{ onClick : openAddFilterDialog, className : "ui button"},"Add New Filter!")))),React.createElement("div",{ className : "actions"},React.createElement("div",{ className : "ui black cancel button"},"Cancel"),React.createElement("div",{ className : "ui approve right labeled icon button"},"Ok",React.createElement("i",{ className : "checkmark icon"}))));
	}
	,componentDidMount: function() {
		var elem = js.JQuery(ReactDOM.findDOMNode(this));
		elem.modal({ onHidden : function() {
			Core.modalChange.dispatch("");
		}}).modal("setting","closable",false).modal("setting","transition","vertical flip").modal("show");
	}
	,__class__: core_view_job_modal_ManageJobFilterDialog
});
var core_view_job_modal_EditJobDialog = function(props) {
	React.Component.call(this,props);
	this.state = { currentTab : 1, job : props.job};
};
core_view_job_modal_EditJobDialog.__name__ = true;
core_view_job_modal_EditJobDialog.jt = function() {
	return this;
};
core_view_job_modal_EditJobDialog.__super__ = React.Component;
core_view_job_modal_EditJobDialog.prototype = $extend(React.Component.prototype,{
	handleOnChange: function(name,value) {
		var job = this.state.job;
		switch(name) {
		case "jobInfo":
			job.contractPrice = value.contractPrice;
			job.start = value.start;
			job.due = value.due;
			job.customer = value.customer;
			job.salesman = value.salesman;
			job.id = value.id;
			break;
		case "custInfo":
			job.addresses.shipping = value.addresses.shipping;
			job.contact = value.contact;
			break;
		case "invInfo":
			job.addresses.invoicing = value;
			break;
		case "descInfo":
			job.description = value;
			break;
		case "schInfo":
			job.schedules = value;
			break;
		}
		this.setState({ job : job});
	}
	,render: function() {
		var _g = this;
		var tabInitialize = function(input) {
			if(input == null) return;
			var tab = js.JQuery(input);
			tab.tab();
		};
		var job = this.state.job;
		var handleDescChange = function(e) {
			_g.handleOnChange("descInfo",e.target.value);
		};
		return React.createElement("div",{ id : "content-modal", className : "ui modal"},React.createElement("div",{ className : "header"},React.createElement("i",{ className : "list layout icon"}),"Edit Job"),React.createElement("div",{ className : "content"},React.createElement("form",{ className : "ui form"},React.createElement("div",{ className : "ui top attached tabular menu"},React.createElement("div",{ 'data-tab' : "job-tab", ref : tabInitialize, className : "active item"},"Job"),React.createElement("div",{ 'data-tab' : "sched-tab", ref : tabInitialize, className : "item"},"Schedule"),React.createElement("div",{ 'data-tab' : "cust-tab", ref : tabInitialize, className : "item"},"Customer"),React.createElement("div",{ 'data-tab' : "inv-tab", ref : tabInitialize, className : "item"},"Invoice")),React.createElement("div",{ 'data-tab' : "job-tab", className : "active ui bottom attached tab segment"},React.createElement(core_view_job_modal_EditJobModalComponents.DIVHEADER,{ value : "Job Information"}),React.createElement(core_view_job_modal_EditJobModalComponents.JOBINFORMATION,{ job : job, onChange : $bind(this,this.handleOnChange)}),React.createElement("div",{ className : "sixteen wide field"},React.createElement("label",null,"Description"),React.createElement("textarea",{ onChange : handleDescChange, value : job.description, rows : "6"}))),React.createElement("div",{ 'data-tab' : "sched-tab", className : "ui bottom attached tab segment"},React.createElement(core_view_job_modal_EditJobModalComponents.DIVHEADER,{ value : "Schedule Information"}),React.createElement(core_view_job_modal_EditJobModalComponents.SCHEDINFORMATION,{ job : job, onChange : $bind(this,this.handleOnChange)}),React.createElement(core_view_job_modal_EditJobModalComponents.DIVHEADER,{ value : "System Type"}),React.createElement(core_view_job_modal_EditJobModalComponents.SYSTYPEINFORMATION,{ job : job})),React.createElement("div",{ 'data-tab' : "cust-tab", className : "ui bottom attached tab segment"},React.createElement(core_view_job_modal_EditJobModalComponents.DIVHEADER,{ value : "Customer Information"}),React.createElement(core_view_job_modal_EditJobModalComponents.CUSTINFORMATION,{ job : job, onChange : $bind(this,this.handleOnChange)})),React.createElement("div",{ 'data-tab' : "inv-tab", className : "ui bottom attached tab segment"},React.createElement(core_view_job_modal_EditJobModalComponents.DIVHEADER,{ value : "Invoice Address"}),React.createElement(core_view_job_modal_EditJobModalComponents.INVADDRINFORMATION,{ job : job, onChange : $bind(this,this.handleOnChange)})))),React.createElement("div",{ className : "actions"},React.createElement("div",{ className : "ui black cancel button"},"Cancel"),React.createElement("div",{ className : "ui approve right labeled icon button"},"Submit Job Changes",React.createElement("i",{ className : "checkmark icon"}))));
	}
	,componentDidMount: function() {
		var _g = this;
		var elem = js.JQuery(ReactDOM.findDOMNode(this));
		elem.modal({ onApprove : function() {
			core_dataaccess_PersistenceManager.saveDwg(_g.state.job);
		}, onHidden : function() {
			Core.modalChange.dispatch("");
		}}).modal("setting","closable",false).modal("setting","transition","vertical flip").modal("show");
	}
	,__class__: core_view_job_modal_EditJobDialog
});
var core_view_main_ManageFilterDialog = function() {
	React.Component.call(this);
};
core_view_main_ManageFilterDialog.__name__ = true;
core_view_main_ManageFilterDialog.jt = function() {
	return this;
};
core_view_main_ManageFilterDialog.__super__ = React.Component;
core_view_main_ManageFilterDialog.prototype = $extend(React.Component.prototype,{
	render: function() {
		var openAddFilterDialog = function() {
			Core.modalChange.dispatch("job-filter");
		};
		var initialize = function(input) {
		};
		return React.createElement("div",{ id : "content-modal", ref : initialize, className : "ui small modal"},React.createElement("div",{ className : "header"},React.createElement("i",{ className : "list layout icon"}),"Manage Filters"),React.createElement("div",{ className : "content"},React.createElement("div",{ className : "ui grid"},React.createElement("div",{ className : "nine wide right floated column"},React.createElement("div",{ className : "ui bottom aligned small divided list"},React.createElement(core_view_main_ManageFilterDialog.FILTERLISTITEM,{ name : "Arbitrary Filter Name 1", fid : "1"}),React.createElement(core_view_main_ManageFilterDialog.FILTERLISTITEM,{ name : "Arbitrary Filter Name 2", fid : "2"}),React.createElement(core_view_main_ManageFilterDialog.FILTERLISTITEM,{ name : "Arbitrary Filter Name 3", fid : "3"}))),React.createElement("div",{ className : "six wide column"},React.createElement("div",{ onClick : openAddFilterDialog, className : "ui button"},"Add New Filter!")))),React.createElement("div",{ className : "actions"},React.createElement("div",{ className : "ui black cancel button"},"Cancel"),React.createElement("div",{ className : "ui approve right labeled icon button"},"Ok",React.createElement("i",{ className : "checkmark icon"}))));
	}
	,componentDidMount: function() {
		var elem = js.JQuery(ReactDOM.findDOMNode(this));
		elem.modal({ onHidden : function() {
			Core.modalChange.dispatch("");
		}}).modal("setting","closable",false).modal("setting","transition","vertical flip").modal("show");
	}
	,__class__: core_view_main_ManageFilterDialog
});
var core_view_dwg_modal_NewDwgDialog = function() {
	React.Component.call(this);
	this.state = { drawing : { }};
};
core_view_dwg_modal_NewDwgDialog.__name__ = true;
core_view_dwg_modal_NewDwgDialog.jt = function() {
	return this;
};
core_view_dwg_modal_NewDwgDialog.__super__ = React.Component;
core_view_dwg_modal_NewDwgDialog.prototype = $extend(React.Component.prototype,{
	handleOnChange: function(name,value) {
		var dwg = this.state.drawing;
		dwg[name] = value;
		this.setState({ drawing : dwg});
	}
	,render: function() {
		return React.createElement("div",{ id : "add-dwg-modal", className : "ui small modal"},React.createElement("div",{ className : "header"},React.createElement("i",{ className : "list layout icon"}),"Add New Drawing"),React.createElement("div",{ className : "content"},React.createElement("form",{ className : "ui form"},React.createElement("div",{ className : "two fields"},React.createElement(core_view_dwg_modal_NewDwgModalComponents.FIELD,{ label : "Drawing Id", onChange : $bind(this,this.handleOnChange), name : "label", className : "field"}),React.createElement("div",{ className : "field"},React.createElement("label",null,"Drawing Type"),React.createElement(core_view_dwg_modal_NewDwgModalComponents.DWGTYPEDROPDOWN,{ onChange : $bind(this,this.handleOnChange), name : "type"}))),React.createElement(core_view_dwg_modal_NewDwgModalComponents.FIELD,{ label : "Title", onChange : $bind(this,this.handleOnChange), name : "title", className : "field"}),React.createElement("div",{ className : "two fields"},React.createElement(core_view_dwg_modal_NewDwgModalComponents.FIELD,{ label : "Revision", onChange : $bind(this,this.handleOnChange), name : "revision", className : "field"}),React.createElement(core_view_dwg_modal_NewDwgModalComponents.FIELD,{ label : "Rev. Date", onChange : $bind(this,this.handleOnChange), name : "revisionDate", type : "date", className : "field"})),React.createElement("div",{ className : "three fields"},React.createElement(core_view_dwg_modal_NewDwgModalComponents.FIELD,{ label : "Start Date", onChange : $bind(this,this.handleOnChange), name : "startDate", type : "date", className : "field"}),React.createElement(core_view_dwg_modal_NewDwgModalComponents.FIELD,{ label : "Shop Date", onChange : $bind(this,this.handleOnChange), name : "shopDate", type : "date", className : "field"}),React.createElement(core_view_dwg_modal_NewDwgModalComponents.FIELD,{ label : "Field Date", onChange : $bind(this,this.handleOnChange), name : "fieldDate", type : "date", className : "field"})))),React.createElement("div",{ className : "actions"},React.createElement("div",{ className : "ui black cancel button"},"Cancel"),React.createElement("div",{ className : "ui approve right labeled icon button"},"Submit Dwg",React.createElement("i",{ className : "checkmark icon"}))));
	}
	,componentDidMount: function() {
		var _g = this;
		var elem = js.JQuery(ReactDOM.findDOMNode(this));
		elem.modal({ onApprove : function() {
			core_dataaccess_PersistenceManager.saveDwg(_g.state.drawing);
		}, onHidden : function() {
			Core.modalChange.dispatch("");
		}}).modal("setting","closable",false).modal("setting","transition","vertical flip").modal("show");
	}
	,__class__: core_view_dwg_modal_NewDwgDialog
});
var core_view_dwg_modal_EditDwgDialog = function(props) {
	React.Component.call(this,props);
	this.state = { drawing : props.dwg, job : props.job};
};
core_view_dwg_modal_EditDwgDialog.__name__ = true;
core_view_dwg_modal_EditDwgDialog.jt = function() {
	return this;
};
core_view_dwg_modal_EditDwgDialog.__super__ = React.Component;
core_view_dwg_modal_EditDwgDialog.prototype = $extend(React.Component.prototype,{
	handleOnChange: function(name,value) {
		var dwg = this.state.drawing;
		dwg[name] = value;
		this.setState({ drawing : dwg});
	}
	,render: function() {
		var dwg = this.state.drawing;
		return React.createElement("div",{ id : "add-dwg-modal", className : "ui small modal"},React.createElement("div",{ className : "header"},React.createElement("i",{ className : "list layout icon"}),"Add New Drawing"),React.createElement("div",{ className : "content"},React.createElement("form",{ className : "ui form"},React.createElement("div",{ className : "two fields"},React.createElement(core_view_dwg_modal_NewDwgModalComponents.FIELD,{ label : "Drawing Id", onChange : $bind(this,this.handleOnChange), name : "label", value : dwg.label, className : "field"}),React.createElement("div",{ className : "field"},React.createElement("label",null,"Drawing Type"),React.createElement(core_view_dwg_modal_NewDwgModalComponents.DWGTYPEDROPDOWN,{ onChange : $bind(this,this.handleOnChange), name : "type", value : dwg.type}))),React.createElement(core_view_dwg_modal_NewDwgModalComponents.FIELD,{ label : "Title", onChange : $bind(this,this.handleOnChange), name : "title", value : dwg.title, className : "field"}),React.createElement("div",{ className : "two fields"},React.createElement(core_view_dwg_modal_NewDwgModalComponents.FIELD,{ label : "Revision", onChange : $bind(this,this.handleOnChange), name : "revision", value : dwg.revision, className : "field"}),React.createElement(core_view_dwg_modal_NewDwgModalComponents.FIELD,{ label : "Rev. Date", onChange : $bind(this,this.handleOnChange), name : "revisionDate", value : dwg.revisionDate, type : "date", className : "field"})),React.createElement("div",{ className : "three fields"},React.createElement(core_view_dwg_modal_NewDwgModalComponents.FIELD,{ label : "Start Date", onChange : $bind(this,this.handleOnChange), name : "startDate", value : dwg.startDate, type : "date", className : "field"}),React.createElement(core_view_dwg_modal_NewDwgModalComponents.FIELD,{ label : "Shop Date", onChange : $bind(this,this.handleOnChange), name : "shopDate", value : dwg.shopDate, type : "date", className : "field"}),React.createElement(core_view_dwg_modal_NewDwgModalComponents.FIELD,{ label : "Field Date", onChange : $bind(this,this.handleOnChange), name : "fieldDate", value : dwg.fieldDate, type : "date", className : "field"})))),React.createElement("div",{ className : "actions"},React.createElement("div",{ className : "ui black cancel button"},"Cancel"),React.createElement("div",{ className : "ui approve right labeled icon button"},"Submit Dwg",React.createElement("i",{ className : "checkmark icon"}))));
	}
	,componentDidMount: function() {
		var _g = this;
		var elem = js.JQuery(ReactDOM.findDOMNode(this));
		elem.modal({ onApprove : function() {
			core_dataaccess_PersistenceManager.saveDwg(_g.state.drawing);
		}, onHidden : function() {
			Core.modalChange.dispatch("");
		}}).modal("setting","closable",false).modal("setting","transition","vertical flip").modal("show");
	}
	,__class__: core_view_dwg_modal_EditDwgDialog
});
var core_view_mark_modal_NewMarkDialog = function() {
	React.Component.call(this);
	this.state = { mark : { }};
};
core_view_mark_modal_NewMarkDialog.__name__ = true;
core_view_mark_modal_NewMarkDialog.jt = function() {
	return this;
};
core_view_mark_modal_NewMarkDialog.__super__ = React.Component;
core_view_mark_modal_NewMarkDialog.prototype = $extend(React.Component.prototype,{
	handleOnChange: function(name,value) {
		var mark = this.state.mark;
		mark[name] = value;
		this.setState({ mark : mark});
	}
	,render: function() {
		var _g = this;
		var handleRemarks = function(e) {
			_g.handleOnChange("remarks",e.target.value);
		};
		return React.createElement("div",{ id : "add-dwg-modal", className : "ui modal"},React.createElement("div",{ className : "header"},React.createElement("i",{ className : "list layout icon"}),"Add New Mark"),React.createElement("div",{ className : "content"},React.createElement("form",{ className : "ui form"},React.createElement("div",{ className : "two fields"},React.createElement(core_view_mark_modal_NewMarkModalComponents.ZONETABLE,null),React.createElement("div",{ className : "field"},React.createElement("div",{ className : "two fields"},React.createElement(core_view_mark_modal_NewMarkModalComponents.FIELD,{ label : "Mark Id", onChange : $bind(this,this.handleOnChange), name : "label", className : "field"}),React.createElement("div",{ className : "field"},React.createElement("label",null,"Mark Type"),React.createElement(core_view_mark_modal_NewMarkModalComponents.MARKTYPEDROPDOWN,{ onChange : handleRemarks, name : "type"}))),React.createElement("div",{ className : "field"},React.createElement("label",null,"Remarks"),React.createElement("textarea",{ onChange : $bind(this,this.handleOnChange), rows : "3"})))))),React.createElement("div",{ className : "actions"},React.createElement("div",{ className : "ui black cancel button"},"Cancel"),React.createElement("div",{ className : "ui approve right labeled icon button"},"Submit Mark",React.createElement("i",{ className : "checkmark icon"}))));
	}
	,componentDidMount: function() {
		var elem = js.JQuery(ReactDOM.findDOMNode(this));
		elem.modal({ onHidden : function() {
			Core.modalChange.dispatch("");
		}}).modal("setting","closable",false).modal("setting","transition","vertical flip").modal("show");
	}
	,__class__: core_view_mark_modal_NewMarkDialog
});
var core_view_mark_modal_EditMarkDialog = function() {
	React.Component.call(this);
};
core_view_mark_modal_EditMarkDialog.__name__ = true;
core_view_mark_modal_EditMarkDialog.__super__ = React.Component;
core_view_mark_modal_EditMarkDialog.prototype = $extend(React.Component.prototype,{
	render: function() {
		var initialize = function(input) {
		};
		return React.createElement("div",{ id : "editdwg-modal", ref : initialize, className : "ui modal"},React.createElement("div",{ className : "header"},React.createElement("i",{ className : "list layout icon"}),"Edit Drawing"),React.createElement("div",{ className : "content"},React.createElement("form",{ className : "ui form"},React.createElement("div",{ 'class' : "two fields"},React.createElement("div",{ 'class' : "field"},React.createElement("label",null,"Drawing Id"),React.createElement("input",{ name : "dwg-id", type : "text"})),React.createElement("div",{ 'class' : "field"},React.createElement("label",null,"Mark Type"),React.createElement("input",{ name : "dwg-type", type : "text"}))),React.createElement("h4",{ 'class' : "ui dividing header"},"Shipping Item"),React.createElement("div",{ 'class' : "two fields"},React.createElement("div",{ 'class' : "field"},React.createElement("label",null,"Drawing Id"),React.createElement("input",{ name : "dwg-id", type : "text"})),React.createElement("div",{ 'class' : "field"},React.createElement("label",null,"Mark Type"),React.createElement("input",{ name : "dwg-type", type : "text"}))),React.createElement("div",{ 'class' : "field"},React.createElement("label",null,"Remarks"),React.createElement("textarea",{ rows : "2"})),React.createElement("div",{ 'class' : "field"},React.createElement("label",null,"Zones"),React.createElement("input",{ name : "dwg-type", type : "text"})))),React.createElement("div",{ className : "actions"},React.createElement("div",{ className : "ui black cancel button"},"Cancel"),React.createElement("div",{ className : "ui approve right labeled icon button"},"Submit Drawing Changes",React.createElement("i",{ className : "checkmark icon"}))));
	}
	,__class__: core_view_mark_modal_EditMarkDialog
});
var core_view_rms_modal_NewRmsDialog = function() {
	React.Component.call(this);
};
core_view_rms_modal_NewRmsDialog.__name__ = true;
core_view_rms_modal_NewRmsDialog.jt = function() {
	return this;
};
core_view_rms_modal_NewRmsDialog.__super__ = React.Component;
core_view_rms_modal_NewRmsDialog.prototype = $extend(React.Component.prototype,{
	render: function() {
		return React.createElement("div",{ id : "add-dwg-modal", className : "ui modal"},React.createElement("div",{ className : "header"},React.createElement("i",{ className : "list layout icon"}),"Add New Job"),React.createElement("div",{ className : "content"}),React.createElement("div",{ className : "actions"},React.createElement("div",{ className : "ui black cancel button"},"Cancel"),React.createElement("div",{ className : "ui approve right labeled icon button"},"Submit Dwg",React.createElement("i",{ className : "checkmark icon"}))));
	}
	,__class__: core_view_rms_modal_NewRmsDialog
});
var core_view_rms_modal_EditRmsDialog = function() {
	React.Component.call(this);
};
core_view_rms_modal_EditRmsDialog.__name__ = true;
core_view_rms_modal_EditRmsDialog.jt = function() {
	return this;
};
core_view_rms_modal_EditRmsDialog.__super__ = React.Component;
core_view_rms_modal_EditRmsDialog.prototype = $extend(React.Component.prototype,{
	render: function() {
		var tabInit = function(input) {
			if(input == null) return;
			js.JQuery.tab();
		};
		var handleResult = function(input1) {
			console.log("Handling Input");
			js.JQuery.tab("change tab","edit-tab");
		};
		var style = { margin : 0};
		return React.createElement("div",{ id : "editdwg-modal", ref : tabInit, className : "ui small modal"},React.createElement("div",{ className : "header"},React.createElement("i",{ className : "list layout icon"}),"Edit RMS"),React.createElement("div",{ className : "content"},React.createElement("div",{ 'data-tab' : "edit-tab", style : style, className : "active ui tab basic segment"},React.createElement("form",{ className : "ui small form"},React.createElement("div",{ className : "field"},React.createElement(core_view_rms_modal_NewRmsModalComponents.SHIPITEMTABLE,null)))),React.createElement("div",{ 'data-tab' : "new-tab", className : "ui tab basic segment"},React.createElement("form",{ className : "ui form"},React.createElement("div",{ className : "field"},React.createElement("div",{ onClick : handleResult, className : "ui black button"},"Cancel"))))),React.createElement("div",{ className : "actions"},React.createElement("div",{ className : "ui black cancel button"},"Cancel"),React.createElement("div",{ className : "ui approve right labeled icon button"},"Submit Drawing Changes",React.createElement("i",{ className : "checkmark icon"}))));
	}
	,componentDidMount: function() {
		var elem = js.JQuery(ReactDOM.findDOMNode(this));
		elem.modal({ onDeny : function() {
			js.JQuery.tab("change tab","edit-tab");
		}, onApprove : function() {
			js.JQuery.tab("change tab","edit-tab");
		}, onHidden : function() {
			Core.modalChange.dispatch("");
		}}).modal("setting","closable",false).modal("setting","transition","vertical flip").modal("show");
	}
	,__class__: core_view_rms_modal_EditRmsDialog
});
var core_view_abm_modal_NewAbmDialog = function() {
	React.Component.call(this);
	this.state = { abm : { part : { }, manufacturer : { }, vendor : { }}};
};
core_view_abm_modal_NewAbmDialog.__name__ = true;
core_view_abm_modal_NewAbmDialog.jt = function() {
	return this;
};
core_view_abm_modal_NewAbmDialog.__super__ = React.Component;
core_view_abm_modal_NewAbmDialog.prototype = $extend(React.Component.prototype,{
	handleOnChange: function(name,value) {
		var state = this.state.abm;
		switch(name) {
		case "type":
			state.part.type = value;
			break;
		case "number":
			state.part.number = value;
			break;
		case "description":
			state.part.description = value;
			break;
		case "manufacturer":
			state.manufacturer.label = value;
			break;
		case "vendor":
			state.vendor.label = value;
			break;
		default:
			state[name] = value;
		}
		this.setState({ abm : state});
	}
	,render: function() {
		var _g = this;
		var handleDescChange = function(e) {
			_g.handleOnChange("description",e.target.value);
		};
		var handleRemarksChange = function(e1) {
			_g.handleOnChange("remarks",e1.target.value);
		};
		return React.createElement("div",{ id : "add-dwg-modal", className : "ui small modal"},React.createElement("div",{ className : "header"},React.createElement("i",{ className : "list layout icon"}),"Create New ABM"),React.createElement("div",{ className : "content"},React.createElement("form",{ className : "ui form"},React.createElement("div",{ className : "fields"},React.createElement(core_view_abm_modal_NewAbmModalComponents.FIELD,{ label : "Type", onChange : $bind(this,this.handleOnChange), name : "type", className : "three wide field"}),React.createElement(core_view_abm_modal_NewAbmModalComponents.FIELD,{ label : "Part NO", onChange : $bind(this,this.handleOnChange), name : "number", className : "five wide field"}),React.createElement(core_view_abm_modal_NewAbmModalComponents.FIELD,{ label : "Quantity", onChange : $bind(this,this.handleOnChange), name : "quantity", className : "three wide field"}),React.createElement(core_view_abm_modal_NewAbmModalComponents.FIELD,{ label : "Status", onChange : $bind(this,this.handleOnChange), name : "status", className : "five wide field"})),React.createElement("div",{ className : "two fields"},React.createElement("div",{ className : "field"},React.createElement(core_view_abm_modal_NewAbmModalComponents.FIELD,{ label : "Manufacturer", onChange : $bind(this,this.handleOnChange), name : "manufacturer", className : "field"}),React.createElement("div",{ className : "field"},React.createElement("label",null,"Description"),React.createElement("textarea",{ onChange : handleDescChange, rows : "5"}))),React.createElement("div",{ className : "field"},React.createElement(core_view_abm_modal_NewAbmModalComponents.FIELD,{ label : "Released By", onChange : $bind(this,this.handleOnChange), name : "releasedBy", className : "field"}),React.createElement(core_view_abm_modal_NewAbmModalComponents.FIELD,{ label : "Release Date", onChange : $bind(this,this.handleOnChange), name : "releaseDate", className : "field"}),React.createElement(core_view_abm_modal_NewAbmModalComponents.FIELD,{ label : "Requested Date", onChange : $bind(this,this.handleOnChange), name : "requestDate", className : "field"}))),React.createElement("div",{ className : "field"},React.createElement("label",null,"Remarks"),React.createElement("textarea",{ onChange : handleRemarksChange, rows : "5"})))),React.createElement("div",{ className : "actions"},React.createElement("div",{ className : "ui black cancel button"},"Cancel"),React.createElement("div",{ className : "ui approve right labeled icon button"},"Submit ABM",React.createElement("i",{ className : "checkmark icon"}))));
	}
	,componentDidMount: function() {
		var _g = this;
		var elem = js.JQuery(ReactDOM.findDOMNode(this));
		elem.modal({ onApprove : function() {
			core_dataaccess_PersistenceManager.saveObject(_g.state.abm);
		}, onHidden : function() {
			Core.modalChange.dispatch("");
		}}).modal("setting","closable",false).modal("setting","transition","vertical flip").modal("show");
	}
	,__class__: core_view_abm_modal_NewAbmDialog
});
var core_view_abm_modal_EditAbmDialog = function(props) {
	React.Component.call(this,props);
	var editAbm = props.abm;
	this.state = { abm : editAbm};
};
core_view_abm_modal_EditAbmDialog.__name__ = true;
core_view_abm_modal_EditAbmDialog.__super__ = React.Component;
core_view_abm_modal_EditAbmDialog.prototype = $extend(React.Component.prototype,{
	handleOnChange: function(name,value) {
		var state = this.state.abm;
		switch(name) {
		case "type":
			state.part.type = value;
			break;
		case "number":
			state.part.number = value;
			break;
		case "description":
			state.part.description = value;
			break;
		case "manufacturer":
			state.manufacturer.label = value;
			break;
		case "vendor":
			state.vendor.label = value;
			break;
		default:
			state[name] = value;
		}
		this.setState({ abm : state});
	}
	,render: function() {
		var _g = this;
		var handleDescChange = function(e) {
			_g.handleOnChange("description",e.target.value);
		};
		var handleRemarksChange = function(e1) {
			_g.handleOnChange("remarks",e1.target.value);
		};
		var editAbm = this.state.abm;
		var s = { margin : 0};
		return React.createElement("div",{ id : "add-dwg-modal", className : "ui small modal"},React.createElement("div",{ className : "header"},React.createElement("i",{ className : "list layout icon"}),"Edit ABM"),React.createElement("div",{ className : "content"},React.createElement("form",{ className : "ui form"},React.createElement("div",{ className : "fields"},React.createElement(core_view_abm_modal_NewAbmModalComponents.FIELD,{ label : "Type", onChange : $bind(this,this.handleOnChange), value : editAbm.part.type, name : "type", key : "v1", className : "three wide field"}),React.createElement(core_view_abm_modal_NewAbmModalComponents.FIELD,{ label : "Part NO", onChange : $bind(this,this.handleOnChange), value : editAbm.part.number, name : "number", key : "v2", className : "five wide field"}),React.createElement(core_view_abm_modal_NewAbmModalComponents.FIELD,{ label : "Quantity", onChange : $bind(this,this.handleOnChange), value : editAbm.quantity, name : "quantity", key : "v3", className : "three wide field"}),React.createElement(core_view_abm_modal_NewAbmModalComponents.FIELD,{ label : "Status", onChange : $bind(this,this.handleOnChange), value : editAbm.status, name : "status", key : "v4", className : "five wide field"})),React.createElement("div",{ className : "two fields"},React.createElement("div",{ className : "field"},React.createElement(core_view_abm_modal_NewAbmModalComponents.FIELD,{ label : "Manufacturer", onChange : $bind(this,this.handleOnChange), value : editAbm.manufacturer.label, name : "manufacturer", className : "field"}),React.createElement("div",{ className : "field"},React.createElement("label",null,"Description"),React.createElement("textarea",{ onChange : handleDescChange, value : editAbm.part.description, rows : "5"}))),React.createElement("div",{ className : "field"},React.createElement(core_view_abm_modal_NewAbmModalComponents.FIELD,{ label : "Released By", onChange : $bind(this,this.handleOnChange), value : editAbm.releasedBy, name : "releasedBy", className : "field"}),React.createElement(core_view_abm_modal_NewAbmModalComponents.FIELD,{ label : "Release Date", onChange : $bind(this,this.handleOnChange), value : editAbm.releaseDate, name : "releaseDate", className : "field"}),React.createElement(core_view_abm_modal_NewAbmModalComponents.FIELD,{ label : "Requested Date", onChange : $bind(this,this.handleOnChange), value : editAbm.requestDate, name : "requestDate", className : "field"}))),React.createElement("div",{ className : "field"},React.createElement("label",null,"Remarks"),React.createElement("textarea",{ onChange : handleRemarksChange, value : editAbm.remarks, rows : "5"})))),React.createElement("div",{ style : s, className : "actions ui basic segment"},React.createElement("div",{ 'data-type' : "remove", className : "ui left floated red cancel button"},"Remove"),React.createElement("div",{ 'data-type' : "cancel", className : "ui black cancel button"},"Cancel"),React.createElement("div",{ className : "ui approve right labeled icon button"},"Submit ABM",React.createElement("i",{ className : "checkmark icon"}))));
	}
	,componentDidMount: function() {
		var _g = this;
		var elem = js.JQuery(ReactDOM.findDOMNode(this));
		elem.modal({ onDeny : function(input) {
			if(input.context.dataset.type == "remove") console.log("Removed ABM #" + Std.string(_g.state.abm.number));
		}, onApprove : function() {
			core_dataaccess_PersistenceManager.saveObject(_g.state.abm);
		}, onHidden : function() {
			Core.modalChange.dispatch("");
		}}).modal("setting","closable",false).modal("setting","transition","vertical flip").modal("show");
	}
	,__class__: core_view_abm_modal_EditAbmDialog
});
var core_view_shipment_modal_NewShipmentDialog = function() {
	React.Component.call(this);
	this.state = { shpmnt : { }};
};
core_view_shipment_modal_NewShipmentDialog.__name__ = true;
core_view_shipment_modal_NewShipmentDialog.jt = function() {
	return this;
};
core_view_shipment_modal_NewShipmentDialog.__super__ = React.Component;
core_view_shipment_modal_NewShipmentDialog.prototype = $extend(React.Component.prototype,{
	handleOnChange: function(name,value) {
		var shpmnt = this.state.shpmnt;
		shpmnt[name] = value;
		this.setState({ shpmnt : shpmnt});
	}
	,render: function() {
		return React.createElement("div",{ id : "add-dwg-modal", className : "ui small modal"},React.createElement("div",{ className : "header"},React.createElement("i",{ className : "list layout icon"}),"Add New Shipment"),React.createElement("div",{ className : "content"},React.createElement("form",{ className : "ui form"},React.createElement("div",{ className : "two fields"},React.createElement(core_view_shipment_modal_NewShpmntModalComponents.FIELD,{ label : "Shipment Id", onChange : $bind(this,this.handleOnChange), name : "pk", className : "field"}),React.createElement(core_view_shipment_modal_NewShpmntModalComponents.FIELD,{ label : "Ship Date", onChange : $bind(this,this.handleOnChange), name : "shipDate", type : "date", className : "field"})),React.createElement("div",{ className : "two fields"},React.createElement(core_view_shipment_modal_NewShpmntModalComponents.FIELD,{ label : "Ship From", onChange : $bind(this,this.handleOnChange), name : "shop", className : "field"}),React.createElement(core_view_shipment_modal_NewShpmntModalComponents.FIELD,{ label : "Ship Via", onChange : $bind(this,this.handleOnChange), name : "carrier", className : "field"})),React.createElement("div",{ className : "two fields"},React.createElement(core_view_shipment_modal_NewShpmntModalComponents.FIELD,{ label : "Bill of Lading", onChange : $bind(this,this.handleOnChange), name : "billOfLading", className : "field"}),React.createElement(core_view_shipment_modal_NewShpmntModalComponents.FIELD,{ label : "Weight", onChange : $bind(this,this.handleOnChange), name : "weight", className : "field"})),React.createElement("div",{ className : "field"},React.createElement("div",{ className : "two fields"},React.createElement(core_view_shipment_modal_NewShpmntModalComponents.FIELD,{ label : "Contact", onChange : $bind(this,this.handleOnChange), name : "contact", className : "field"}),React.createElement(core_view_shipment_modal_NewShpmntModalComponents.FIELD,{ label : "Country", onChange : $bind(this,this.handleOnChange), name : "country", className : "field"})),React.createElement(core_view_shipment_modal_NewShpmntModalComponents.FIELD,{ label : "Address 1", onChange : $bind(this,this.handleOnChange), name : "line1", className : "field"}),React.createElement(core_view_shipment_modal_NewShpmntModalComponents.FIELD,{ label : "Address 2", onChange : $bind(this,this.handleOnChange), name : "line2", className : "field"}),React.createElement("div",{ className : "three fields"},React.createElement(core_view_shipment_modal_NewShpmntModalComponents.FIELD,{ label : "City", onChange : $bind(this,this.handleOnChange), name : "city", className : "field"}),React.createElement(core_view_shipment_modal_NewShpmntModalComponents.FIELD,{ label : "State", onChange : $bind(this,this.handleOnChange), name : "stateOrProvince", className : "field"}),React.createElement(core_view_shipment_modal_NewShpmntModalComponents.FIELD,{ label : "Zip", onChange : $bind(this,this.handleOnChange), name : "postalCode", className : "field"}))))),React.createElement("div",{ className : "actions"},React.createElement("div",{ className : "ui black cancel button"},"Cancel"),React.createElement("div",{ className : "ui approve right labeled icon button"},"Submit Shipment",React.createElement("i",{ className : "checkmark icon"}))));
	}
	,componentDidMount: function() {
		var elem = js.JQuery(ReactDOM.findDOMNode(this));
		elem.modal({ onHidden : function() {
			Core.modalChange.dispatch("");
		}}).modal("setting","closable",false).modal("setting","transition","vertical flip").modal("show");
	}
	,__class__: core_view_shipment_modal_NewShipmentDialog
});
var core_view_shipment_modal_EditShipmentDialog = function(props) {
	React.Component.call(this,props);
	this.state = { shipment : props.shpmnt};
};
core_view_shipment_modal_EditShipmentDialog.__name__ = true;
core_view_shipment_modal_EditShipmentDialog.__super__ = React.Component;
core_view_shipment_modal_EditShipmentDialog.prototype = $extend(React.Component.prototype,{
	handleOnChange: function(name,value) {
		var shp = this.state.shipment;
		var lines = shp.address.lines;
		switch(name) {
		case "shop":
			shp.shop.label = value;
			break;
		case "carrier":
			shp.carrier.label = value;
			break;
		case "contact":
			shp.contact.label = value;
			break;
		case "country":
			shp.address.country = value;
			break;
		case "line1":
			shp.address.lines = value + "\n" + lines.split("\n")[1];
			break;
		case "line2":
			shp.address.lines = lines.split("\n")[0] + "\n" + value;
			break;
		case "city":
			shp.address.city = value;
			break;
		case "stateOrProvince":
			shp.address.stateOrProvince;
			break;
		case "postalCode":
			shp.address.postalCode;
			break;
		default:
			shp[name] = value;
		}
		this.setState({ shipment : shp});
	}
	,render: function() {
		var tabInitialize = function(input) {
			if(input == null) return;
			var tab = js.JQuery(input);
			tab.tab();
		};
		var shp = this.state.shipment;
		var shop = shp.shop;
		var carr = shp.carrier;
		var cont = shp.contact;
		var dest = shp.address;
		if(shop == null) shp.shop = { };
		if(carr == null) shp.carrier = { };
		if(cont == null) shp.contact = { };
		if(dest == null) shp.address = { };
		var items = shp.items;
		return React.createElement("div",{ id : "editshp-modal", className : "ui modal"},React.createElement("div",{ className : "header"},React.createElement("i",{ className : "list layout icon"}),"Edit Shipment"),React.createElement("div",{ className : "content"},React.createElement("form",{ className : "ui form"},React.createElement("div",{ className : "ui top attached tabular menu"},React.createElement("div",{ 'data-tab' : "shp-tab", ref : tabInitialize, className : "active item"},"Shipment"),React.createElement("div",{ 'data-tab' : "itms-tab", ref : tabInitialize, className : "item"},"Shipped Items")),React.createElement("div",{ 'data-tab' : "shp-tab", className : "active ui bottom attached tab segment"},React.createElement("div",{ className : "two fields"},React.createElement(core_view_shipment_modal_NewShpmntModalComponents.FIELD,{ label : "Shipment Id", onChange : $bind(this,this.handleOnChange), name : "pk", value : shp.pk, className : "field"}),React.createElement(core_view_shipment_modal_NewShpmntModalComponents.FIELD,{ label : "Date", onChange : $bind(this,this.handleOnChange), name : "shipDate", value : shp.shipDate, type : "date", className : "field"})),React.createElement("div",{ className : "two fields"},React.createElement(core_view_shipment_modal_NewShpmntModalComponents.FIELD,{ label : "Ship From", onChange : $bind(this,this.handleOnChange), name : "shop", value : shop.label, className : "field"}),React.createElement(core_view_shipment_modal_NewShpmntModalComponents.FIELD,{ label : "Ship Via", onChange : $bind(this,this.handleOnChange), name : "carrier", value : carr.label, className : "field"})),React.createElement("div",{ className : "two fields"},React.createElement(core_view_shipment_modal_NewShpmntModalComponents.FIELD,{ label : "Bill of Lading", onChange : $bind(this,this.handleOnChange), name : "billOfLading", value : shp.billOfLading, className : "field"}),React.createElement(core_view_shipment_modal_NewShpmntModalComponents.FIELD,{ label : "Weight", onChange : $bind(this,this.handleOnChange), name : "weight", value : shp.weight, className : "field"})),React.createElement("div",{ className : "field"},React.createElement("div",{ className : "two fields"},React.createElement(core_view_shipment_modal_NewShpmntModalComponents.FIELD,{ label : "Contact", onChange : $bind(this,this.handleOnChange), name : "contact", value : cont.label, className : "field"}),React.createElement(core_view_shipment_modal_NewShpmntModalComponents.FIELD,{ label : "Country", onChange : $bind(this,this.handleOnChange), name : "country", value : dest.country, className : "field"})),React.createElement(core_view_shipment_modal_NewShpmntModalComponents.FIELD,{ label : "Address 1", onChange : $bind(this,this.handleOnChange), name : "line1", value : dest.lines.split("\n")[0], className : "field"}),React.createElement(core_view_shipment_modal_NewShpmntModalComponents.FIELD,{ label : "Address 2", onChange : $bind(this,this.handleOnChange), name : "line2", value : dest.lines.split("\n")[1], className : "field"}),React.createElement("div",{ className : "three fields"},React.createElement(core_view_shipment_modal_NewShpmntModalComponents.FIELD,{ label : "City", onChange : $bind(this,this.handleOnChange), name : "city", value : dest.city, className : "field"}),React.createElement(core_view_shipment_modal_NewShpmntModalComponents.FIELD,{ label : "State", onChange : $bind(this,this.handleOnChange), name : "stateOrProvince", value : dest.stateOrProvince, className : "field"}),React.createElement(core_view_shipment_modal_NewShpmntModalComponents.FIELD,{ label : "Zip", onChange : $bind(this,this.handleOnChange), name : "postalCode", value : dest.postalCode, className : "field"})))),React.createElement("div",{ 'data-tab' : "itms-tab", className : "ui bottom attached tab segment"},React.createElement(core_view_shipment_modal_NewShpmntModalComponents.SHIPITEMTABLE,null)))),React.createElement("div",{ className : "actions"},React.createElement("div",{ className : "ui black cancel button"},"Cancel"),React.createElement("div",{ className : "ui approve right labeled icon button"},"Submit Drawing Changes",React.createElement("i",{ className : "checkmark icon"}))));
	}
	,componentDidMount: function() {
		var _g = this;
		var elem = js.JQuery(ReactDOM.findDOMNode(this));
		elem.modal({ onApprove : function() {
			core_dataaccess_PersistenceManager.saveDwg(_g.state.job);
		}, onHidden : function() {
			Core.modalChange.dispatch("");
		}}).modal("setting","closable",false).modal("setting","transition","vertical flip").modal("show");
	}
	,__class__: core_view_shipment_modal_EditShipmentDialog
});
var msignal_Signal2 = function(type1,type2) {
	msignal_Signal.call(this,[type1,type2]);
};
msignal_Signal2.__name__ = true;
msignal_Signal2.__super__ = msignal_Signal;
msignal_Signal2.prototype = $extend(msignal_Signal.prototype,{
	dispatch: function(value1,value2) {
		var slotsToProcess = this.slots;
		while(slotsToProcess.nonEmpty) {
			slotsToProcess.head.execute(value1,value2);
			slotsToProcess = slotsToProcess.tail;
		}
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return new msignal_Slot2(this,listener,once,priority);
	}
	,__class__: msignal_Signal2
});
var Core = function(props) {
	React.Component.call(this,props);
	this.state = { menu : core_view_main_ViewRegistry.buildView("homeMenu",null), content : core_view_main_ViewRegistry.buildView("homeView",null), editJobObj : core_view_main_ContentManager.buildContent("jobView",null)[0], currentModal : "", authenticated : props.authenticated};
	this.callback = Core.viewChange.add($bind(this,this.handleViewChange));
	this.callback2 = Core.modalChange.add($bind(this,this.handleModalChange));
};
Core.__name__ = true;
Core.jt = function() {
	return this;
};
Core.main = function() {
	var appElem = window.document.getElementById("app");
	Core.application = ReactDOM.render(React.createElement(Core,{ authenticated : core_authentication_AuthenticationManager.isLoggedIn(), key : "core-elem"}),appElem);
};
Core.__super__ = React.Component;
Core.prototype = $extend(React.Component.prototype,{
	handleViewChange: function(view,info) {
		if(view != "home" && this.state.currentView == view) return;
		var content = core_view_main_ContentManager.buildContent(view + "View",info);
		this.setState({ currentView : view, menu : core_view_main_ViewRegistry.buildView(view + "Menu",content), content : core_view_main_ViewRegistry.buildView(view + "View",content)});
	}
	,handleModalChange: function(index) {
		this.setState({ currentModal : index});
		this.forceUpdate();
	}
	,render: function() {
		var modals = [];
		var editJob = null;
		return React.createElement("div",{ id : "beastRoot", key : "theRoot"},React.createElement(core_view_main_SideMenu,{ authenticated : this.state.authenticated, key : "sidemenu"}),React.createElement("div",{ id : "container", key : "container", className : "ui right floated"},React.createElement("div",{ className : "ui"},this.state.menu),React.createElement("div",{ className : "ui basic segment"},this.state.content)));
	}
	,componentDidMount: function() {
		var modalsElem = window.document.getElementById("modals");
		var dataObj = { editJobObj : this.state.editJobObj, editJobMainObj : this.state.editJobMainObj, editObj : this.state.editObj};
		ReactDOM.render(React.createElement(Core.MODALELEMENT,{ index : this.state.currentModal, dataObj : dataObj}),modalsElem);
	}
	,componentDidUpdate: function(prevProps,prevState) {
		var modalsElem = window.document.getElementById("modals");
		var dataObj = { editJobObj : this.state.editJobObj, editJobMainObj : this.state.editJobMainObj, editObj : this.state.editObj};
		ReactDOM.render(React.createElement(Core.MODALELEMENT,{ index : this.state.currentModal, dataObj : dataObj}),modalsElem);
	}
	,componentWillUpdate: function(nextProps,nextState) {
		if(nextState.authenticated == true && core_authentication_AuthenticationManager.isLoggedIn() != true) {
			var view = "home";
			var content = core_view_main_ContentManager.buildContent(view + "View",null);
			nextState.authenticated = false;
			nextState.currentView = view;
			nextState.menu = core_view_main_ViewRegistry.buildView(view + "Menu",content);
			nextState.content = core_view_main_ViewRegistry.buildView(view + "View",content);
		}
	}
	,componentWillUnmount: function() {
		console.log("Unmounting Core!");
	}
	,__class__: Core
});
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
Math.__name__ = true;
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) return null; else if(o.__properties__ && (tmp = o.__properties__["get_" + field])) return o[tmp](); else return o[field];
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
};
Reflect.deleteField = function(o,field) {
	if(!Object.prototype.hasOwnProperty.call(o,field)) return false;
	delete(o[field]);
	return true;
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = true;
StringBuf.prototype = {
	addSub: function(s,pos,len) {
		if(len == null) this.b += HxOverrides.substr(s,pos,null); else this.b += HxOverrides.substr(s,pos,len);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
};
var Type = function() { };
Type.__name__ = true;
Type.getClass = function(o) {
	if(o == null) return null; else return js_Boot.getClass(o);
};
var api_react_ReactMacro = function() { };
api_react_ReactMacro.__name__ = true;
var core_authentication_Role = { __ename__ : true, __constructs__ : ["Admin","User","Annon"] };
core_authentication_Role.Admin = ["Admin",0];
core_authentication_Role.Admin.toString = $estr;
core_authentication_Role.Admin.__enum__ = core_authentication_Role;
core_authentication_Role.User = ["User",1];
core_authentication_Role.User.toString = $estr;
core_authentication_Role.User.__enum__ = core_authentication_Role;
core_authentication_Role.Annon = ["Annon",2];
core_authentication_Role.Annon.toString = $estr;
core_authentication_Role.Annon.__enum__ = core_authentication_Role;
var core_authentication_AuthenticationManager = function() { };
core_authentication_AuthenticationManager.__name__ = true;
core_authentication_AuthenticationManager.hash = function(password) {
	return bcrypt.hashSync(password,bcrypt.genSaltSync());
};
core_authentication_AuthenticationManager.authenticate = function(username,password,onSuccess,onError) {
	core_authentication_AuthenticationManager.currentUser = { username : username, role : core_authentication_Role.Admin, token : password};
	core_dataaccess_PersistenceManager.store("user",core_authentication_AuthenticationManager.currentUser);
	onSuccess(core_authentication_AuthenticationManager.currentUser);
};
core_authentication_AuthenticationManager.getCurrentUser = function() {
	if(!core_authentication_AuthenticationManager.initialized) core_authentication_AuthenticationManager.currentUser = core_dataaccess_PersistenceManager.get("user");
	core_authentication_AuthenticationManager.initialized = core_authentication_AuthenticationManager.currentUser != null;
	return core_authentication_AuthenticationManager.currentUser;
};
core_authentication_AuthenticationManager.isUserAdmin = function() {
	return core_authentication_AuthenticationManager.getUserRole() == core_authentication_Role.Admin;
};
core_authentication_AuthenticationManager.isUserUser = function() {
	return core_authentication_AuthenticationManager.getUserRole() == core_authentication_Role.User;
};
core_authentication_AuthenticationManager.getUserRole = function() {
	if(core_authentication_AuthenticationManager.getCurrentUser() == null) return core_authentication_Role.Annon; else return core_authentication_AuthenticationManager.getCurrentUser().role;
};
core_authentication_AuthenticationManager.isLoggedIn = function() {
	return core_authentication_AuthenticationManager.getCurrentUser() != null;
};
core_authentication_AuthenticationManager.logout = function() {
	core_authentication_AuthenticationManager.currentUser = null;
	core_authentication_AuthenticationManager.initialized = false;
	core_dataaccess_PersistenceManager.store("user",core_authentication_AuthenticationManager.currentUser);
};
var js_Browser = function() { };
js_Browser.__name__ = true;
js_Browser.getLocalStorage = function() {
	try {
		var s = window.localStorage;
		s.getItem("");
		return s;
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
js_Browser.getSessionStorage = function() {
	try {
		var s = window.sessionStorage;
		s.getItem("");
		return s;
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
var core_dataaccess_PersistenceManager = function() { };
core_dataaccess_PersistenceManager.__name__ = true;
core_dataaccess_PersistenceManager.supportedClient = function() {
	return core_dataaccess_PersistenceManager.sessionStorage != null && core_dataaccess_PersistenceManager.localStorage != null;
};
core_dataaccess_PersistenceManager.store = function(key,obj,session) {
	if(session == null) session = true;
	var storage;
	if(session) storage = core_dataaccess_PersistenceManager.sessionStorage; else storage = core_dataaccess_PersistenceManager.localStorage;
	if(obj == null) storage.removeItem(key);
	var data = JSON.stringify(obj);
	if(data == null || !core_dataaccess_PersistenceManager.supportedClient()) return false;
	storage.setItem(key,data);
	return true;
};
core_dataaccess_PersistenceManager.get = function(key,session) {
	if(session == null) session = true;
	if(!core_dataaccess_PersistenceManager.supportedClient()) return null;
	var storage;
	if(session) storage = core_dataaccess_PersistenceManager.sessionStorage; else storage = core_dataaccess_PersistenceManager.localStorage;
	if(key == null || key == "") return null;
	var data = storage.getItem(key);
	if(data == null) return null;
	return JSON.parse(data);
};
core_dataaccess_PersistenceManager.saveObject = function(obj) {
	console.log(JSON.stringify(obj));
};
core_dataaccess_PersistenceManager.saveJob = function(obj) {
	core_dataaccess_PersistenceManager.saveObject(obj);
};
core_dataaccess_PersistenceManager.saveDwg = function(obj) {
	core_dataaccess_PersistenceManager.saveObject(obj);
};
var core_dataaccess_EndPoint = { __ename__ : true, __constructs__ : ["CARRIER","CUSTOMER","JOB","JOBDWG","JOBMARK","JOBSHPGRP","JOBITEM","JOBSHPMNT","MFACT","PART","SALESPERSON","SHOP","USER","USERROLE","VENDOR"] };
core_dataaccess_EndPoint.CARRIER = ["CARRIER",0];
core_dataaccess_EndPoint.CARRIER.toString = $estr;
core_dataaccess_EndPoint.CARRIER.__enum__ = core_dataaccess_EndPoint;
core_dataaccess_EndPoint.CUSTOMER = ["CUSTOMER",1];
core_dataaccess_EndPoint.CUSTOMER.toString = $estr;
core_dataaccess_EndPoint.CUSTOMER.__enum__ = core_dataaccess_EndPoint;
core_dataaccess_EndPoint.JOB = ["JOB",2];
core_dataaccess_EndPoint.JOB.toString = $estr;
core_dataaccess_EndPoint.JOB.__enum__ = core_dataaccess_EndPoint;
core_dataaccess_EndPoint.JOBDWG = ["JOBDWG",3];
core_dataaccess_EndPoint.JOBDWG.toString = $estr;
core_dataaccess_EndPoint.JOBDWG.__enum__ = core_dataaccess_EndPoint;
core_dataaccess_EndPoint.JOBMARK = ["JOBMARK",4];
core_dataaccess_EndPoint.JOBMARK.toString = $estr;
core_dataaccess_EndPoint.JOBMARK.__enum__ = core_dataaccess_EndPoint;
core_dataaccess_EndPoint.JOBSHPGRP = ["JOBSHPGRP",5];
core_dataaccess_EndPoint.JOBSHPGRP.toString = $estr;
core_dataaccess_EndPoint.JOBSHPGRP.__enum__ = core_dataaccess_EndPoint;
core_dataaccess_EndPoint.JOBITEM = ["JOBITEM",6];
core_dataaccess_EndPoint.JOBITEM.toString = $estr;
core_dataaccess_EndPoint.JOBITEM.__enum__ = core_dataaccess_EndPoint;
core_dataaccess_EndPoint.JOBSHPMNT = ["JOBSHPMNT",7];
core_dataaccess_EndPoint.JOBSHPMNT.toString = $estr;
core_dataaccess_EndPoint.JOBSHPMNT.__enum__ = core_dataaccess_EndPoint;
core_dataaccess_EndPoint.MFACT = ["MFACT",8];
core_dataaccess_EndPoint.MFACT.toString = $estr;
core_dataaccess_EndPoint.MFACT.__enum__ = core_dataaccess_EndPoint;
core_dataaccess_EndPoint.PART = ["PART",9];
core_dataaccess_EndPoint.PART.toString = $estr;
core_dataaccess_EndPoint.PART.__enum__ = core_dataaccess_EndPoint;
core_dataaccess_EndPoint.SALESPERSON = ["SALESPERSON",10];
core_dataaccess_EndPoint.SALESPERSON.toString = $estr;
core_dataaccess_EndPoint.SALESPERSON.__enum__ = core_dataaccess_EndPoint;
core_dataaccess_EndPoint.SHOP = ["SHOP",11];
core_dataaccess_EndPoint.SHOP.toString = $estr;
core_dataaccess_EndPoint.SHOP.__enum__ = core_dataaccess_EndPoint;
core_dataaccess_EndPoint.USER = ["USER",12];
core_dataaccess_EndPoint.USER.toString = $estr;
core_dataaccess_EndPoint.USER.__enum__ = core_dataaccess_EndPoint;
core_dataaccess_EndPoint.USERROLE = ["USERROLE",13];
core_dataaccess_EndPoint.USERROLE.toString = $estr;
core_dataaccess_EndPoint.USERROLE.__enum__ = core_dataaccess_EndPoint;
core_dataaccess_EndPoint.VENDOR = ["VENDOR",14];
core_dataaccess_EndPoint.VENDOR.toString = $estr;
core_dataaccess_EndPoint.VENDOR.__enum__ = core_dataaccess_EndPoint;
var core_dataaccess_ServiceAccessManager = function() { };
core_dataaccess_ServiceAccessManager.__name__ = true;
core_dataaccess_ServiceAccessManager.urlObj = function(url,data) {
	switch(url[1]) {
	case 0:
		if(data == null) return "/carriers";
		return "/carriers/" + Std.string(data.pk) + "}";
	case 1:
		if(data == null) return "/customers";
		return "/customers/" + Std.string(data.pk);
	case 2:
		if(data == null) return "/jobs";
		return "/jobs/" + Std.string(data.pk) + "}";
	case 3:
		if(data == null) return "/jobs/" + Std.string(data.pk) + "/drawings";
		return "/jobs/" + Std.string(data.pk) + "}/drawings/" + Std.string(data.label);
	case 4:
		return "/jobs/" + Std.string(data.pk) + "/drawings/" + Std.string(data.label) + "/marks";
	case 5:
		if(data == null) return "/jobs/" + Std.string(data.pk) + "}/shipping-groups";
		return "/jobs/" + Std.string(data.pk) + "/shipping-groups/" + Std.string(data.label);
	case 6:
		return "/jobs/" + Std.string(data.pk) + "}/shipping-groups/" + Std.string(data.label) + "/items";
	case 7:
		if(data == null) return "/jobs/" + Std.string(data.pk) + "/shipments";
		return "/jobs/" + Std.string(data.pk) + "}/shipments/" + Std.string(data.number);
	case 8:
		if(data == null) return "/manufacturers";
		return "/manufacturers/" + Std.string(data.pk);
	case 9:
		if(data == null) return "/parts";
		return "/parts/" + Std.string(data.pk) + "}";
	case 10:
		if(data == null) return "/salespeople";
		return "/salespeople/" + Std.string(data.pk);
	case 11:
		if(data == null) return "/shops";
		return "/shops/" + Std.string(data.pk) + "}";
	case 12:
		if(data == null) return "/users";
		return "/users/" + Std.string(data.pk);
	case 13:
		return "/users/" + Std.string(data.pk) + "}/roles";
	case 14:
		if(data == null) return "/vendors";
		return "/vendors/" + Std.string(data.pk);
	}
};
core_dataaccess_ServiceAccessManager.ajax = function(settings) {
	return js.JQuery.ajax(settings);
};
core_dataaccess_ServiceAccessManager.buildUrl = function(ep,data) {
	return "" + core_dataaccess_ServiceAccessManager.baseUrl + core_dataaccess_ServiceAccessManager.contextRoot + core_dataaccess_ServiceAccessManager.urlObj(ep,data);
};
core_dataaccess_ServiceAccessManager.getData = function(ep,callbacks,data) {
	var url = core_dataaccess_ServiceAccessManager.buildUrl(ep,data);
	return js.JQuery.ajax({ url : url, type : "GET", error : callbacks.error, success : callbacks.success}).always(callbacks.always).fail(callbacks.fail).done(callbacks.done).then(callbacks.then);
};
core_dataaccess_ServiceAccessManager.postData = function(ep,callbacks,data) {
	var url = core_dataaccess_ServiceAccessManager.buildUrl(ep,data);
	return js.JQuery.ajax({ url : url, type : "POST", content : data.content, error : callbacks.error, success : callbacks.success}).always(callbacks.always).fail(callbacks.fail).done(callbacks.done).then(callbacks.then);
};
var core_models_AbmStatus = { __ename__ : true, __constructs__ : ["ACTIVE","COMPLETED","CANCELLED","DELETED"] };
core_models_AbmStatus.ACTIVE = ["ACTIVE",0];
core_models_AbmStatus.ACTIVE.toString = $estr;
core_models_AbmStatus.ACTIVE.__enum__ = core_models_AbmStatus;
core_models_AbmStatus.COMPLETED = ["COMPLETED",1];
core_models_AbmStatus.COMPLETED.toString = $estr;
core_models_AbmStatus.COMPLETED.__enum__ = core_models_AbmStatus;
core_models_AbmStatus.CANCELLED = ["CANCELLED",2];
core_models_AbmStatus.CANCELLED.toString = $estr;
core_models_AbmStatus.CANCELLED.__enum__ = core_models_AbmStatus;
core_models_AbmStatus.DELETED = ["DELETED",3];
core_models_AbmStatus.DELETED.toString = $estr;
core_models_AbmStatus.DELETED.__enum__ = core_models_AbmStatus;
var core_models_JobPrefix = { __ename__ : true, __constructs__ : ["B","F","FC","FE","FR","FS","M","MF","MT","RG"] };
core_models_JobPrefix.B = ["B",0];
core_models_JobPrefix.B.toString = $estr;
core_models_JobPrefix.B.__enum__ = core_models_JobPrefix;
core_models_JobPrefix.F = ["F",1];
core_models_JobPrefix.F.toString = $estr;
core_models_JobPrefix.F.__enum__ = core_models_JobPrefix;
core_models_JobPrefix.FC = ["FC",2];
core_models_JobPrefix.FC.toString = $estr;
core_models_JobPrefix.FC.__enum__ = core_models_JobPrefix;
core_models_JobPrefix.FE = ["FE",3];
core_models_JobPrefix.FE.toString = $estr;
core_models_JobPrefix.FE.__enum__ = core_models_JobPrefix;
core_models_JobPrefix.FR = ["FR",4];
core_models_JobPrefix.FR.toString = $estr;
core_models_JobPrefix.FR.__enum__ = core_models_JobPrefix;
core_models_JobPrefix.FS = ["FS",5];
core_models_JobPrefix.FS.toString = $estr;
core_models_JobPrefix.FS.__enum__ = core_models_JobPrefix;
core_models_JobPrefix.M = ["M",6];
core_models_JobPrefix.M.toString = $estr;
core_models_JobPrefix.M.__enum__ = core_models_JobPrefix;
core_models_JobPrefix.MF = ["MF",7];
core_models_JobPrefix.MF.toString = $estr;
core_models_JobPrefix.MF.__enum__ = core_models_JobPrefix;
core_models_JobPrefix.MT = ["MT",8];
core_models_JobPrefix.MT.toString = $estr;
core_models_JobPrefix.MT.__enum__ = core_models_JobPrefix;
core_models_JobPrefix.RG = ["RG",9];
core_models_JobPrefix.RG.toString = $estr;
core_models_JobPrefix.RG.__enum__ = core_models_JobPrefix;
var core_models_JobStatus = { __ename__ : true, __constructs__ : ["DRAFT","ACTIVE","COMPLETED","CANCELLED","DELETED"] };
core_models_JobStatus.DRAFT = ["DRAFT",0];
core_models_JobStatus.DRAFT.toString = $estr;
core_models_JobStatus.DRAFT.__enum__ = core_models_JobStatus;
core_models_JobStatus.ACTIVE = ["ACTIVE",1];
core_models_JobStatus.ACTIVE.toString = $estr;
core_models_JobStatus.ACTIVE.__enum__ = core_models_JobStatus;
core_models_JobStatus.COMPLETED = ["COMPLETED",2];
core_models_JobStatus.COMPLETED.toString = $estr;
core_models_JobStatus.COMPLETED.__enum__ = core_models_JobStatus;
core_models_JobStatus.CANCELLED = ["CANCELLED",3];
core_models_JobStatus.CANCELLED.toString = $estr;
core_models_JobStatus.CANCELLED.__enum__ = core_models_JobStatus;
core_models_JobStatus.DELETED = ["DELETED",4];
core_models_JobStatus.DELETED.toString = $estr;
core_models_JobStatus.DELETED.__enum__ = core_models_JobStatus;
var core_models_DrawingType = { __ename__ : true, __constructs__ : ["DETAIL","LAYOUT"] };
core_models_DrawingType.DETAIL = ["DETAIL",0];
core_models_DrawingType.DETAIL.toString = $estr;
core_models_DrawingType.DETAIL.__enum__ = core_models_DrawingType;
core_models_DrawingType.LAYOUT = ["LAYOUT",1];
core_models_DrawingType.LAYOUT.toString = $estr;
core_models_DrawingType.LAYOUT.__enum__ = core_models_DrawingType;
var core_models_MarkType = { __ename__ : true, __constructs__ : ["S","W"] };
core_models_MarkType.S = ["S",0];
core_models_MarkType.S.toString = $estr;
core_models_MarkType.S.__enum__ = core_models_MarkType;
core_models_MarkType.W = ["W",1];
core_models_MarkType.W.toString = $estr;
core_models_MarkType.W.__enum__ = core_models_MarkType;
var core_models_PartType = { __ename__ : true, __constructs__ : ["MECH","ELEC"] };
core_models_PartType.MECH = ["MECH",0];
core_models_PartType.MECH.toString = $estr;
core_models_PartType.MECH.__enum__ = core_models_PartType;
core_models_PartType.ELEC = ["ELEC",1];
core_models_PartType.ELEC.toString = $estr;
core_models_PartType.ELEC.__enum__ = core_models_PartType;
var core_models_ShippingItemStatus = { __ename__ : true, __constructs__ : ["FAB","PREFAB","SHPD","RTA","RTS","MACH","MOO","NS","PAINT","SIP","WP","SAMPLE","MEM","FTS","VOID","NEXT","HOLD"] };
core_models_ShippingItemStatus.FAB = ["FAB",0];
core_models_ShippingItemStatus.FAB.toString = $estr;
core_models_ShippingItemStatus.FAB.__enum__ = core_models_ShippingItemStatus;
core_models_ShippingItemStatus.PREFAB = ["PREFAB",1];
core_models_ShippingItemStatus.PREFAB.toString = $estr;
core_models_ShippingItemStatus.PREFAB.__enum__ = core_models_ShippingItemStatus;
core_models_ShippingItemStatus.SHPD = ["SHPD",2];
core_models_ShippingItemStatus.SHPD.toString = $estr;
core_models_ShippingItemStatus.SHPD.__enum__ = core_models_ShippingItemStatus;
core_models_ShippingItemStatus.RTA = ["RTA",3];
core_models_ShippingItemStatus.RTA.toString = $estr;
core_models_ShippingItemStatus.RTA.__enum__ = core_models_ShippingItemStatus;
core_models_ShippingItemStatus.RTS = ["RTS",4];
core_models_ShippingItemStatus.RTS.toString = $estr;
core_models_ShippingItemStatus.RTS.__enum__ = core_models_ShippingItemStatus;
core_models_ShippingItemStatus.MACH = ["MACH",5];
core_models_ShippingItemStatus.MACH.toString = $estr;
core_models_ShippingItemStatus.MACH.__enum__ = core_models_ShippingItemStatus;
core_models_ShippingItemStatus.MOO = ["MOO",6];
core_models_ShippingItemStatus.MOO.toString = $estr;
core_models_ShippingItemStatus.MOO.__enum__ = core_models_ShippingItemStatus;
core_models_ShippingItemStatus.NS = ["NS",7];
core_models_ShippingItemStatus.NS.toString = $estr;
core_models_ShippingItemStatus.NS.__enum__ = core_models_ShippingItemStatus;
core_models_ShippingItemStatus.PAINT = ["PAINT",8];
core_models_ShippingItemStatus.PAINT.toString = $estr;
core_models_ShippingItemStatus.PAINT.__enum__ = core_models_ShippingItemStatus;
core_models_ShippingItemStatus.SIP = ["SIP",9];
core_models_ShippingItemStatus.SIP.toString = $estr;
core_models_ShippingItemStatus.SIP.__enum__ = core_models_ShippingItemStatus;
core_models_ShippingItemStatus.WP = ["WP",10];
core_models_ShippingItemStatus.WP.toString = $estr;
core_models_ShippingItemStatus.WP.__enum__ = core_models_ShippingItemStatus;
core_models_ShippingItemStatus.SAMPLE = ["SAMPLE",11];
core_models_ShippingItemStatus.SAMPLE.toString = $estr;
core_models_ShippingItemStatus.SAMPLE.__enum__ = core_models_ShippingItemStatus;
core_models_ShippingItemStatus.MEM = ["MEM",12];
core_models_ShippingItemStatus.MEM.toString = $estr;
core_models_ShippingItemStatus.MEM.__enum__ = core_models_ShippingItemStatus;
core_models_ShippingItemStatus.FTS = ["FTS",13];
core_models_ShippingItemStatus.FTS.toString = $estr;
core_models_ShippingItemStatus.FTS.__enum__ = core_models_ShippingItemStatus;
core_models_ShippingItemStatus.VOID = ["VOID",14];
core_models_ShippingItemStatus.VOID.toString = $estr;
core_models_ShippingItemStatus.VOID.__enum__ = core_models_ShippingItemStatus;
core_models_ShippingItemStatus.NEXT = ["NEXT",15];
core_models_ShippingItemStatus.NEXT.toString = $estr;
core_models_ShippingItemStatus.NEXT.__enum__ = core_models_ShippingItemStatus;
core_models_ShippingItemStatus.HOLD = ["HOLD",16];
core_models_ShippingItemStatus.HOLD.toString = $estr;
core_models_ShippingItemStatus.HOLD.__enum__ = core_models_ShippingItemStatus;
var core_models_ShipmentStatus = { __ename__ : true, __constructs__ : ["POSTED","ACTIVE","COMPLETE","CANCELLED","DELETED"] };
core_models_ShipmentStatus.POSTED = ["POSTED",0];
core_models_ShipmentStatus.POSTED.toString = $estr;
core_models_ShipmentStatus.POSTED.__enum__ = core_models_ShipmentStatus;
core_models_ShipmentStatus.ACTIVE = ["ACTIVE",1];
core_models_ShipmentStatus.ACTIVE.toString = $estr;
core_models_ShipmentStatus.ACTIVE.__enum__ = core_models_ShipmentStatus;
core_models_ShipmentStatus.COMPLETE = ["COMPLETE",2];
core_models_ShipmentStatus.COMPLETE.toString = $estr;
core_models_ShipmentStatus.COMPLETE.__enum__ = core_models_ShipmentStatus;
core_models_ShipmentStatus.CANCELLED = ["CANCELLED",3];
core_models_ShipmentStatus.CANCELLED.toString = $estr;
core_models_ShipmentStatus.CANCELLED.__enum__ = core_models_ShipmentStatus;
core_models_ShipmentStatus.DELETED = ["DELETED",4];
core_models_ShipmentStatus.DELETED.toString = $estr;
core_models_ShipmentStatus.DELETED.__enum__ = core_models_ShipmentStatus;
var core_sorting_Filter = function() {
};
core_sorting_Filter.__name__ = true;
core_sorting_Filter.prototype = {
	filter: function(data) {
		return false;
	}
	,__class__: core_sorting_Filter
};
var core_sorting_Ordering = function(fArray,prefix) {
	this.fields = [];
	var i = 0;
	var _g = 0;
	while(_g < fArray.length) {
		var field = fArray[_g];
		++_g;
		this.fields.push({ index : i++, rep : field.rep, name : field.name});
	}
	this.subObject = prefix;
};
core_sorting_Ordering.__name__ = true;
core_sorting_Ordering.prototype = {
	orderData: function(data) {
		var result = [];
		var org = data;
		if(this.subObject.length > 0) {
			var _g = 0;
			var _g1 = this.subObject.split(".");
			while(_g < _g1.length) {
				var s = _g1[_g];
				++_g;
				data = Reflect.getProperty(data,s);
			}
		}
		var _g2 = 0;
		var _g11 = this.fields;
		while(_g2 < _g11.length) {
			var field = _g11[_g2];
			++_g2;
			var name = field.name;
			if(field.name.split(".").length > 1) name = field.name.split(".")[0];
			result.push({ field : field, data : Reflect.getProperty(data,name), original : org});
		}
		return result;
	}
	,__class__: core_sorting_Ordering
};
var core_structure_TableStructure = function() {
	this.filterMap = [];
};
core_structure_TableStructure.__name__ = true;
core_structure_TableStructure.prototype = {
	addFilter: function(filter) {
		this.filterMap.push(filter);
	}
	,removeFilter: function(filter) {
		HxOverrides.remove(this.filterMap,filter);
	}
	,filterData: function(data) {
		var _g = this;
		return data.filter(function(d) {
			if(_g.filterMap.length == 0) return true;
			var _g1 = 0;
			var _g2 = _g.filterMap;
			while(_g1 < _g2.length) {
				var f = _g2[_g1];
				++_g1;
				if(f.filter(d)) return true;
			}
			return false;
		});
	}
	,init: function(parent) {
		this.parentTable = parent;
	}
	,generateDefaultOrder: function(data) {
		throw new js__$Boot_HaxeError("You must override generateDefaultOrder in ${Type.getClassName(Type.getClass(this))}.");
	}
	,generateRows: function(job,children) {
		throw new js__$Boot_HaxeError("You must override generateRow in ${Type.getClassName(Type.getClass(this))}.");
	}
	,generateHeader: function(ord) {
		throw new js__$Boot_HaxeError("You must override generateHeader in ${Type.getClassName(Type.getClass(this))}.");
	}
	,cellFormatter: function(data,ord) {
		throw new js__$Boot_HaxeError("You must override cellFormatter in ${Type.getClassName(Type.getClass(this))}.");
	}
	,__class__: core_structure_TableStructure
};
var core_view_UidGenerator = function() { };
core_view_UidGenerator.__name__ = true;
core_view_UidGenerator.nextId = function() {
	if(core_view_UidGenerator.label == 16777215) core_view_UidGenerator.label = 0;
	var result = core_view_UidGenerator.prefix + StringTools.hex(core_view_UidGenerator.label,8);
	core_view_UidGenerator.label += 1;
	return result;
};
core_view_UidGenerator.reset = function() {
	core_view_UidGenerator.label = 0;
};
var core_view_abm_AbmViewMenu = function() {
	React.Component.call(this);
};
core_view_abm_AbmViewMenu.__name__ = true;
core_view_abm_AbmViewMenu.__super__ = React.Component;
core_view_abm_AbmViewMenu.prototype = $extend(React.Component.prototype,{
	render: function() {
		var openNewAbmDialog = function() {
			Core.modalChange.dispatch("new-abm");
		};
		var openManageFilterDialog = function() {
			Core.modalChange.dispatch("mng-filter");
		};
		return React.createElement("div",{ id : "topMenu", className : "ui menu"},React.createElement("a",{ onClick : openNewAbmDialog, className : "item active"},React.createElement("i",{ className : "add circle icon"}),"Add ABM"),React.createElement("a",{ onClick : openManageFilterDialog, className : "item"},React.createElement("i",{ className : "filter icon"}),"Manage Filters"),React.createElement("a",{ className : "right item"},React.createElement("i",{ className : "refresh icon"}),"Refresh"));
	}
	,__class__: core_view_abm_AbmViewMenu
});
var core_view_abm_modal_NewAbmModalComponents = function() { };
core_view_abm_modal_NewAbmModalComponents.__name__ = true;
core_view_abm_modal_NewAbmModalComponents.jt = function() {
	return this;
};
var core_view_abm_structure_AbmTableStructure = function() {
	core_structure_TableStructure.call(this);
};
core_view_abm_structure_AbmTableStructure.__name__ = true;
core_view_abm_structure_AbmTableStructure.jt = function() {
	return this;
};
core_view_abm_structure_AbmTableStructure.__super__ = core_structure_TableStructure;
core_view_abm_structure_AbmTableStructure.prototype = $extend(core_structure_TableStructure.prototype,{
	generateDefaultOrder: function(data) {
		var arr = [];
		arr.push({ rep : "ABM #", name : "number"});
		arr.push({ rep : "Type", name : "part.type"});
		arr.push({ rep : "Description", name : "part.description"});
		arr.push({ rep : "Manufacturer", name : "manufacturer.label"});
		arr.push({ rep : "Vendor", name : "vendor.label"});
		arr.push({ rep : "PO", name : "po"});
		arr.push({ rep : "Required Qty.", name : "requestedQuantity"});
		arr.push({ rep : "Qty. In Stock", name : "stockQuantity"});
		arr.push({ rep : "Qty. to Purchase", name : "purchaseQuantity"});
		var order = new core_sorting_Ordering(arr,"");
		return order;
	}
	,generateData: function(data,ord) {
		var org = data.original;
		var _g = data.field.name;
		var f = _g;
		if(f.split(".").length > 1) {
			var obj = data.data;
			var _g1 = 0;
			var _g2 = f.split(".").slice(1);
			while(_g1 < _g2.length) {
				var s = _g2[_g1];
				++_g1;
				obj = obj[s];
			}
			return obj;
		} else return data.data;
	}
	,cellFormatter: function(data,ord) {
		data = this.generateData(data,ord);
		return React.createElement("td",{ key : core_view_UidGenerator.nextId()},data);
	}
	,generateRows: function(abm,children) {
		var array = [];
		var handleDoubleClick = function() {
			Core.application.setState({ editObj : abm},function() {
				Core.modalChange.dispatch("edit-abm");
			});
		};
		array.push(React.createElement("tr",{ onDoubleClick : handleDoubleClick, key : core_view_UidGenerator.nextId()},children));
		return array;
	}
	,generateHeader: function(ord) {
		var cols = ord.fields.length;
		var row = [];
		var i = 1;
		var _g = 0;
		var _g1 = ord.fields;
		while(_g < _g1.length) {
			var field = _g1[_g];
			++_g;
			row.push(React.createElement("th",{ key : core_view_UidGenerator.nextId()},field.rep));
		}
		return React.createElement("thead",{ className : "full-width"},React.createElement("tr",{ key : core_view_UidGenerator.nextId()},row));
	}
	,__class__: core_view_abm_structure_AbmTableStructure
});
var core_view_components_Constants = function() { };
core_view_components_Constants.__name__ = true;
var core_view_main_FieldMask = function() { };
core_view_main_FieldMask.__name__ = true;
core_view_main_FieldMask.maskField = function(elem,mask) {
	js.JQuery(elem).mask(mask);
};
var core_view_components_ModalComponents = function() { };
core_view_components_ModalComponents.__name__ = true;
core_view_components_ModalComponents.jt = function() {
	return this;
};
var core_view_components_TableComponent = function() {
	React.Component.call(this);
	this.state = { rows : [], subrows : [], rowtoggled : [], displayed : []};
};
core_view_components_TableComponent.__name__ = true;
core_view_components_TableComponent.__super__ = React.Component;
core_view_components_TableComponent.prototype = $extend(React.Component.prototype,{
	render: function() {
		var structure = this.props.structure;
		var order = this.props.ordering;
		var data = structure.filterData(this.props.data);
		structure.init(this);
		var rows = [];
		var _g = 0;
		while(_g < data.length) {
			var d = data[_g];
			++_g;
			var children = [];
			var _g1 = 0;
			var _g2 = order.orderData(d);
			while(_g1 < _g2.length) {
				var fd = _g2[_g1];
				++_g1;
				var child = structure.cellFormatter(fd,order);
				children.push(child);
			}
			rows = rows.concat(structure.generateRows(d,children));
		}
		var cls = classNames("ui","single","line","unstackable","small",this.props.classes,"celled","table");
		return React.createElement("table",{ id : "mainTable", className : cls},structure.generateHeader(order),React.createElement("tbody",null,rows));
	}
	,__class__: core_view_components_TableComponent
});
var core_view_dwg_DwgViewMenu = function() {
	React.Component.call(this);
};
core_view_dwg_DwgViewMenu.__name__ = true;
core_view_dwg_DwgViewMenu.__super__ = React.Component;
core_view_dwg_DwgViewMenu.prototype = $extend(React.Component.prototype,{
	render: function() {
		var openNewDwgDialog = function() {
			Core.modalChange.dispatch("new-dwg");
		};
		var openLoginDialog = function() {
		};
		var openManageFilterDialog = function() {
			Core.modalChange.dispatch("mng-filter");
		};
		return React.createElement("div",{ id : "topMenu", className : "ui menu"},React.createElement("a",{ onClick : openNewDwgDialog, className : "item active"},React.createElement("i",{ className : "add circle icon"}),"Add Drawing"),React.createElement("a",{ onClick : openManageFilterDialog, className : "item"},React.createElement("i",{ className : "filter icon"}),"Manage Filters"),React.createElement("a",{ className : "item"},React.createElement("i",{ className : "calendar icon"}),"Production Schedule"),React.createElement("a",{ className : "right item"},React.createElement("i",{ className : "refresh icon"}),"Refresh"));
	}
	,__class__: core_view_dwg_DwgViewMenu
});
var core_view_dwg_modal_NewDwgModalComponents = function() { };
core_view_dwg_modal_NewDwgModalComponents.__name__ = true;
core_view_dwg_modal_NewDwgModalComponents.jt = function() {
	return this;
};
var core_view_dwg_structure_DwgTableStructure = function() {
	core_structure_TableStructure.call(this);
};
core_view_dwg_structure_DwgTableStructure.__name__ = true;
core_view_dwg_structure_DwgTableStructure.jt = function() {
	return this;
};
core_view_dwg_structure_DwgTableStructure.__super__ = core_structure_TableStructure;
core_view_dwg_structure_DwgTableStructure.prototype = $extend(core_structure_TableStructure.prototype,{
	generateDefaultOrder: function(data) {
		var arr = [];
		arr.push({ rep : "Id", name : "label"});
		arr.push({ rep : "Title", name : "title"});
		arr.push({ rep : "Type", name : "type"});
		arr.push({ rep : "Revision", name : "revision"});
		arr.push({ rep : "Revision Date", name : "revisionDate"});
		arr.push({ rep : "Start Date", name : "startDate"});
		arr.push({ rep : "Shop Date", name : "shopDate"});
		arr.push({ rep : "Field Date", name : "fieldDate"});
		var order = new core_sorting_Ordering(arr,"");
		return order;
	}
	,generateData: function(data,ord) {
		var org = data.original;
		var _g = data.field.name;
		return data.data;
	}
	,cellFormatter: function(data,ord) {
		data = this.generateData(data,ord);
		return React.createElement("td",{ key : core_view_UidGenerator.nextId()},data);
	}
	,generateRows: function(dwg,children) {
		var array = [];
		var handleDblClick = function(e) {
			Core.application.setState({ editObj : dwg},function() {
				Core.modalChange.dispatch("edit-dwg");
			});
		};
		array.push(React.createElement("tr",{ onDoubleClick : handleDblClick, key : core_view_UidGenerator.nextId()},children));
		return array;
	}
	,generateHeader: function(ord) {
		var cols = ord.fields.length;
		var row = [];
		var i = 1;
		var _g = 0;
		var _g1 = ord.fields;
		while(_g < _g1.length) {
			var field = _g1[_g];
			++_g;
			row.push(React.createElement("th",{ key : core_view_UidGenerator.nextId()},field.rep));
		}
		return React.createElement("thead",{ className : "full-width"},React.createElement("tr",{ key : core_view_UidGenerator.nextId()},row));
	}
	,__class__: core_view_dwg_structure_DwgTableStructure
});
var core_view_job_JobViewMenu = function() {
	React.Component.call(this);
};
core_view_job_JobViewMenu.__name__ = true;
core_view_job_JobViewMenu.__super__ = React.Component;
core_view_job_JobViewMenu.prototype = $extend(React.Component.prototype,{
	render: function() {
		var openNewJobDialog = function() {
			Core.modalChange.dispatch("new-job");
		};
		var openLoginDialog = function() {
		};
		var openManageFilterDialog = function() {
			Core.modalChange.dispatch("mng-filter");
		};
		return React.createElement("div",{ id : "topMenu", className : "ui menu"},React.createElement("a",{ onClick : openNewJobDialog, className : "item active"},React.createElement("i",{ className : "add circle icon"}),"Add Job"),React.createElement("a",{ onClick : openManageFilterDialog, className : "item"},React.createElement("i",{ className : "filter icon"}),"Manage Filters"),React.createElement("a",{ className : "item"},React.createElement("i",{ className : "calendar icon"}),"Production Schedule"),React.createElement("a",{ className : "right item"},React.createElement("i",{ className : "refresh icon"}),"Refresh"));
	}
	,__class__: core_view_job_JobViewMenu
});
var core_view_job_modal_EditJobModalComponents = function() { };
core_view_job_modal_EditJobModalComponents.__name__ = true;
core_view_job_modal_EditJobModalComponents.jt = function() {
	return this;
};
var core_view_job_modal_NewJobModalComponents = function() { };
core_view_job_modal_NewJobModalComponents.__name__ = true;
core_view_job_modal_NewJobModalComponents.jt = function() {
	return this;
};
var core_view_job_structure_JobTableStructure = function(jobTable) {
	if(jobTable == null) jobTable = true;
	this.revIndex = 0;
	this.jobTable = true;
	core_structure_TableStructure.call(this);
	this.jobTable = jobTable;
};
core_view_job_structure_JobTableStructure.__name__ = true;
core_view_job_structure_JobTableStructure.jt = function() {
	return this;
};
core_view_job_structure_JobTableStructure.__super__ = core_structure_TableStructure;
core_view_job_structure_JobTableStructure.prototype = $extend(core_structure_TableStructure.prototype,{
	init: function(parent) {
		core_structure_TableStructure.prototype.init.call(this,parent);
		this.jobTable = this.parentTable.props.revTable != true;
	}
	,generateDefaultOrder: function(data) {
		var arr = [];
		if(this.jobTable) {
			arr.push({ rep : "Id", name : "id"});
			arr.push({ rep : "Customer", name : "customer"});
			arr.push({ rep : "City", name : "addresses.shipping.city"});
			arr.push({ rep : "State", name : "addresses.shipping.stateOrProvince"});
		} else {
			arr.push({ rep : "Revision", name : "id"});
			arr.push({ rep : "Description", name : "revisions"});
		}
		var order = new core_sorting_Ordering(arr,"");
		return order;
	}
	,generateData: function(data,ord) {
		var org = data.original;
		var _g = data.field.name;
		var f = _g;
		if(f.split(".").length > 1) {
			var obj = data.data;
			var _g1 = 0;
			var _g2 = f.split(".").slice(1);
			while(_g1 < _g2.length) {
				var s = _g2[_g1];
				++_g1;
				obj = obj[s];
			}
			return obj;
		} else switch(_g) {
		case "id":
			if(!this.jobTable) return this.revIndex + 1;
			var jid = org.id;
			var id = new StringBuf();
			id.b += Std.string(jid.prefix);
			id.b += "-";
			id.addSub(jid.year == null?"null":"" + jid.year,2,2);
			id.b += "-";
			if(jid.label == null) id.b += "null"; else id.b += "" + jid.label;
			return id.b;
		case "shipping":
			var add = org.addresses.shipping;
			return "[" + add.lines + "] " + add.city + ", " + add.stateOrProvince;
		case "invoicing":
			var add1 = org.addresses.invoicing;
			return "[" + add1.lines + "] " + add1.city + ", " + add1.stateOrProvince;
		case "salesperson":
			return org.salesperson.label;
		case "shop":
			return org.shop.label;
		case "systemTypes":
			return "[" + org.systemTypes.map(function(s1) {
				return s1.label;
			}).join(", ") + "]";
		case "schedule":
			var sch = org.schedules;
			var electricalDate = "[Start: " + sch.electrical.start + ", Complete: " + sch.electrical.complete;
			var engineeringDate = "[Start: " + sch.engineering.start + ", Complete: " + sch.engineering.complete;
			var mechanicalDate = "[Start: " + sch.mechanical.start + ", Complete: " + sch.mechanical.complete;
			var shippingDate = "[Start: " + sch.shipping.start + ", Complete: " + sch.shipping.complete;
			var installationDate = "[Start: " + sch.installation.start + ", Complete: " + sch.installation.complete;
			return "Elec: " + electricalDate + ", Eng: " + engineeringDate + ", Mech: " + mechanicalDate + ", Ship: " + shippingDate + ", Inst: " + installationDate;
		case "status":
			return "" + Std.string(org.status);
		case "customer":
			return "" + org.customer.label;
		case "revisions":
			var rev = org.revisions[this.revIndex];
			if(rev == null) return null;
			return rev.description;
		default:
			return data.data;
		}
	}
	,cellFormatter: function(data,ord) {
		var _g = this;
		var cls = classNames({ collapsing : data.field.name == "id", noselect : !this.jobTable});
		var job = data.original;
		data = this.generateData(data,ord);
		if(!this.jobTable && data == null) return null;
		var onclick = function() {
			if(!_g.jobTable) return;
			Core.jobSelected.dispatch(job);
		};
		return React.createElement("td",{ onClick : onclick, key : core_view_UidGenerator.nextId(), className : cls},data);
	}
	,generateRows: function(job,children) {
		var _g = this;
		var rows = [];
		var key = "" + Std.string(job.id.prefix) + "-" + HxOverrides.substr(job.id.year,2,2) + "-" + job.id.label;
		var revs = job.revisions != null && job.revisions.length > 0;
		revs = revs && this.jobTable;
		if(this.jobTable) rows.push(React.createElement(core_view_job_structure_JobTableStructure.mainJobRow,{ key : "" + key + "-parent", revisions : revs, clicked : this.parentTable.state.subrows["" + key + "-sub"] == true, toggleSubRow : function() {
			var displayed = _g.parentTable.state.subrows["" + key + "-sub"];
			var subrows = _g.parentTable.state.subrows;
			var toggled = _g.parentTable.state.rowtoggled;
			subrows["" + key + "-sub"] = !displayed;
			toggled = "" + key + "-sub";
			_g.parentTable.setState({ subrows : subrows, rowtoggled : toggled});
		}, onClick : function() {
			Core.application.setState({ editJobObj : job, editJobMainObj : _g.parentTable.props.realjob},function() {
				Core.modalChange.dispatch("edit-job");
			});
		}},children)); else {
			rows.push(React.createElement(core_view_job_structure_JobTableStructure.mainJobRow,{ key : "" + key + "-" + (this.revIndex + 1) + "-sub", revTable : !this.jobTable, toggleSubRow : function() {
			}, onClick : function() {
			}},children));
			this.revIndex += 1;
		}
		if(revs && this.jobTable) {
			var content = [];
			var _g1 = 0;
			var _g11 = job.revisions;
			while(_g1 < _g11.length) {
				var j = _g11[_g1];
				++_g1;
				content.push(job);
			}
			var structure = new core_view_job_structure_JobTableStructure(false);
			var order = structure.generateDefaultOrder(content);
			var revisionTable = React.createElement(Type.getClass(this.parentTable),{ structure : structure, ordering : order, data : content, classes : ["very","basic"], realjob : job, revTable : true});
			var shouldDisplay = this.parentTable.state.subrows["" + key + "-sub"];
			var shouldTransition = this.parentTable.state.rowtoggled;
			rows.push(React.createElement(core_view_job_structure_JobTableStructure.subJobRow,{ id : "" + key + "-sub", key : "" + key + "-sub", ref : function(input) {
				if(input == null || !(shouldTransition == "" + key + "-sub" || shouldTransition == "all")) return;
				if(shouldDisplay || shouldTransition == "" + key + "-sub") {
					var elem = js.JQuery(ReactDOM.findDOMNode(input));
					elem.transition({ animation : "slide down", duration : "400ms"});
					_g.parentTable.state.rowtoggled = "all";
				}
			}},revisionTable));
		}
		return rows;
	}
	,generateHeader: function(ord) {
		var cols = ord.fields.length;
		var row = [];
		var cls = classNames({ noselect : !this.jobTable});
		var i = 1;
		var _g = 0;
		var _g1 = ord.fields;
		while(_g < _g1.length) {
			var field = _g1[_g];
			++_g;
			row.push(React.createElement("th",{ key : core_view_UidGenerator.nextId(), className : cls},field.rep));
		}
		var exCol = null;
		if(this.jobTable) exCol = React.createElement("th",{ key : core_view_UidGenerator.nextId()});
		return React.createElement("thead",{ className : "full-width"},React.createElement("tr",{ key : core_view_UidGenerator.nextId()},exCol,row));
	}
	,__class__: core_view_job_structure_JobTableStructure
});
var core_view_main_ContentManager = function() { };
core_view_main_ContentManager.__name__ = true;
core_view_main_ContentManager.buildContent = function(viewId,info) {
	if(core_view_main_ContentManager.contentMap[viewId] == null) return null;
	return core_view_main_ContentManager.contentMap[viewId](info);
};
var core_view_main_SideMenu = function() {
	React.Component.call(this);
	this.state = { transitionState : false};
};
core_view_main_SideMenu.__name__ = true;
core_view_main_SideMenu.jt = function() {
	return this;
};
core_view_main_SideMenu.__super__ = React.Component;
core_view_main_SideMenu.prototype = $extend(React.Component.prototype,{
	render: function() {
		var _g = this;
		var mask = function(input) {
			js.JQuery(input).mask("99/99/9999");
		};
		var style = { backgroundColor : "black", padding : "0"};
		var jobId = "No Job Selected";
		if(this.state.selectedJob != null) {
			var jid = this.state.selectedJob.id;
			jobId = "" + Std.string(jid.prefix) + "-" + HxOverrides.substr(jid.year,2,2) + "-" + jid.label;
		}
		var editSelectedJob = function() {
			if(_g.state.selectedJob == null) return;
			Core.application.setState({ editJobObj : _g.state.selectedJob},function() {
				Core.modalChange.dispatch("edit-job");
			});
		};
		var login = { display : this.props.authenticated?"none":""};
		var logout = { display : this.props.authenticated?"":"none"};
		var item = ["item"];
		var canDisable = [{ disabled : !this.props.authenticated},item];
		var canHide = [canDisable,"transition","hidden"];
		var cls = classNames;
		var popup = function(input1) {
			if(input1 == null) return;
			var elem = js.JQuery(ReactDOM.findDOMNode(input1));
			if(_g.state.transitionState == true && _g.state.shouldTransition == true) elem.popup(); else if(_g.state.transitionState == false && _g.state.shouldTransition == true || _g.state.cleanup == true) elem.popup("destroy");
			if(_g.state.newJob == true) {
				elem.transition({ animation : "pulse"});
				_g.state.newJob = false;
			}
		};
		var transition = function(input2) {
			if(input2 == null || _g.state.shouldTransition != true) return;
			var elem1 = js.JQuery(ReactDOM.findDOMNode(input2));
			elem1.transition({ animation : "slide down", duration : "400ms"});
		};
		return React.createElement("div",{ id : "mainMenu", className : "ui blue menu inverted vertical left fixed"},React.createElement("div",{ className : "item"},React.createElement("img",{ src : "img/ssi_logo.svg", className : "ui logo middle aligned centered medium image"})),React.createElement("a",{ style : login, onClick : $bind(this,this.toggleLoginDialog), className : "item"},"Login"),React.createElement("a",{ style : logout, onClick : $bind(this,this.toggleLogout), className : "item"},"Logout"),React.createElement("a",{ onClick : (function(f,a1) {
			return function(e) {
				f(a1,e);
			};
		})($bind(this,this.toggleView),"job"), className : cls(canDisable)},"Job"),React.createElement("a",{ onDoubleClick : editSelectedJob, style : style, className : cls(canDisable)},React.createElement("div",{ id : "selectedJob", 'data-content' : "Double click to edit this job.", 'data-variation' : "mini inverted", ref : popup, className : "ui center aligned basic segment"},jobId)),React.createElement("a",{ onClick : (function(f1,a11) {
			return function(e1) {
				f1(a11,e1);
			};
		})($bind(this,this.toggleView),"dwg"), ref : transition, className : cls(canHide)},"Drawing"),React.createElement("div",{ ref : transition, className : cls(canHide)},"Shippable",React.createElement("div",{ className : "menu"},React.createElement("a",{ onClick : (function(f2,a12) {
			return function(e2) {
				f2(a12,e2);
			};
		})($bind(this,this.toggleView),"mark"), ref : transition, className : cls(canHide)},"Mark"),React.createElement("a",{ onClick : (function(f3,a13) {
			return function(e3) {
				f3(a13,e3);
			};
		})($bind(this,this.toggleView),"rms"), ref : transition, className : cls(canHide)},"RMS"))),React.createElement("a",{ onClick : (function(f4,a14) {
			return function(e4) {
				f4(a14,e4);
			};
		})($bind(this,this.toggleView),"abm"), ref : transition, className : cls(canHide)},"ABM"),React.createElement("a",{ onClick : (function(f5,a15) {
			return function(e5) {
				f5(a15,e5);
			};
		})($bind(this,this.toggleView),"shpmnt"), ref : transition, className : cls(canHide)},"Shipment"));
	}
	,toggleLoginDialog: function() {
		Core.modalChange.dispatch("login");
	}
	,toggleLogout: function() {
		core_authentication_AuthenticationManager.logout();
		this.setState({ cleanup : true, selectedJob : null, transitionState : false, shouldTransition : false});
		Core.viewChange.dispatch("home",null);
	}
	,toggleView: function(view,e) {
		if(!this.props.authenticated) return;
		var data;
		switch(view) {
		case "job":
			data = null;
			break;
		case "dwg":
			data = this.state.selectedJob;
			break;
		case "mark":
			data = this.state.selectedJob;
			break;
		case "rms":
			data = this.state.selectedJob;
			break;
		case "abm":
			data = this.state.selectedJob;
			break;
		case "shpmnt":
			data = this.state.selectedJob;
			break;
		default:
			data = null;
		}
		Core.viewChange.dispatch(view,data);
		js.JQuery("#mainMenu .item.active").removeClass("active");
		js.JQuery(e.target).addClass("active");
	}
	,toggleActivation: function(transitionState,f) {
		var _g = this;
		if(transitionState != this.state.transitionState) {
			if(transitionState) js.JQuery("#selectedJob").popup(); else js.JQuery("#selectedJob").popup("destroy");
			js.JQuery("#mainMenu .hiddenMenuItem").transition({ animation : "slide down", duration : "400ms", onComplete : function() {
				if(f != null) f();
				_g.setState({ transitionState : transitionState});
			}});
		}
	}
	,handleJobSelected: function(job) {
		var transitionState = job != null;
		this.setState({ selectedJob : job, transitionState : transitionState, shouldTransition : this.state.transitionState != transitionState, newJob : transitionState});
	}
	,componentDidMount: function() {
		Core.jobSelected.add($bind(this,this.handleJobSelected));
	}
	,componentWillUpdate: function(nextProps,nextState) {
		if(nextState.shouldTransition == true && this.state.shouldTransition == true && nextState.transitionState == this.state.transitionState) nextState.shouldTransition = false;
		if(this.state.cleanup == true && nextState.cleanup == true) nextState.cleanup == false;
	}
	,componentWillUnmount: function() {
		Core.jobSelected.remove($bind(this,this.handleJobSelected));
	}
	,__class__: core_view_main_SideMenu
});
var core_view_shipment_ShipmentViewMenu = function() {
	React.Component.call(this);
};
core_view_shipment_ShipmentViewMenu.__name__ = true;
core_view_shipment_ShipmentViewMenu.__super__ = React.Component;
core_view_shipment_ShipmentViewMenu.prototype = $extend(React.Component.prototype,{
	render: function() {
		var openNewShpmntDialog = function() {
			Core.modalChange.dispatch("new-shpmnt");
		};
		var openLoginDialog = function() {
		};
		var openManageFilterDialog = function() {
			Core.modalChange.dispatch("mng-filter");
		};
		return React.createElement("div",{ id : "topMenu", className : "ui menu"},React.createElement("a",{ onClick : openNewShpmntDialog, className : "item active"},React.createElement("i",{ className : "add circle icon"}),"Add Shipment"),React.createElement("a",{ onClick : openManageFilterDialog, className : "item"},React.createElement("i",{ className : "filter icon"}),"Manage Filters"),React.createElement("a",{ className : "right item"},React.createElement("i",{ className : "refresh icon"}),"Refresh"));
	}
	,__class__: core_view_shipment_ShipmentViewMenu
});
var core_view_shipment_structure_ShipmentTableStructure = function() {
	core_structure_TableStructure.call(this);
};
core_view_shipment_structure_ShipmentTableStructure.__name__ = true;
core_view_shipment_structure_ShipmentTableStructure.jt = function() {
	return this;
};
core_view_shipment_structure_ShipmentTableStructure.__super__ = core_structure_TableStructure;
core_view_shipment_structure_ShipmentTableStructure.prototype = $extend(core_structure_TableStructure.prototype,{
	generateDefaultOrder: function(data) {
		var arr = [];
		arr.push({ rep : "Shipment Id", name : "pk"});
		arr.push({ rep : "Shipped From", name : "shop.label"});
		arr.push({ rep : "Shipped Via", name : "carrier.label"});
		arr.push({ rep : "Weight", name : "weight"});
		arr.push({ rep : "Bill Of Lading", name : "billOfLading"});
		arr.push({ rep : "Date", name : "shipDate"});
		arr.push({ rep : "Status", name : "status"});
		var order = new core_sorting_Ordering(arr,"");
		return order;
	}
	,generateData: function(data,ord) {
		var org = data.original;
		var _g = data.field.name;
		var f = _g;
		if(f.split(".").length > 1) {
			var obj = data.data;
			var _g1 = 0;
			var _g2 = f.split(".").slice(1);
			while(_g1 < _g2.length) {
				var s = _g2[_g1];
				++_g1;
				obj = obj[s];
			}
			return obj;
		} else return data.data;
	}
	,cellFormatter: function(data,ord) {
		data = this.generateData(data,ord);
		return React.createElement("td",{ key : core_view_UidGenerator.nextId()},data);
	}
	,generateRows: function(shpment,children) {
		var array = [];
		var onClick = function() {
			Core.application.setState({ editObj : shpment},function() {
				Core.modalChange.dispatch("edit-shpmnt");
			});
		};
		array.push(React.createElement("tr",{ onDoubleClick : onClick, key : core_view_UidGenerator.nextId()},children));
		return array;
	}
	,generateHeader: function(ord) {
		var cols = ord.fields.length;
		var row = [];
		var i = 1;
		var _g = 0;
		var _g1 = ord.fields;
		while(_g < _g1.length) {
			var field = _g1[_g];
			++_g;
			row.push(React.createElement("th",{ key : core_view_UidGenerator.nextId()},field.rep));
		}
		return React.createElement("thead",{ className : "full-width"},React.createElement("tr",{ key : core_view_UidGenerator.nextId()},row));
	}
	,__class__: core_view_shipment_structure_ShipmentTableStructure
});
var core_view_mark_MarkViewMenu = function() {
	React.Component.call(this);
};
core_view_mark_MarkViewMenu.__name__ = true;
core_view_mark_MarkViewMenu.__super__ = React.Component;
core_view_mark_MarkViewMenu.prototype = $extend(React.Component.prototype,{
	render: function() {
		var openNewMarkDialog = function() {
			Core.modalChange.dispatch("new-mark");
		};
		var openManageFilterDialog = function() {
			Core.modalChange.dispatch("mng-filter");
		};
		return React.createElement("div",{ id : "topMenu", className : "ui menu"},React.createElement("a",{ onClick : openNewMarkDialog, className : "item active"},React.createElement("i",{ className : "add circle icon"}),"Add Mark"),React.createElement("a",{ onClick : openManageFilterDialog, className : "item"},React.createElement("i",{ className : "filter icon"}),"Manage Filters"),React.createElement("a",{ className : "item"},React.createElement("i",{ className : "calendar icon"}),"Production Schedule"),React.createElement("a",{ className : "right item"},React.createElement("i",{ className : "refresh icon"}),"Refresh"));
	}
	,__class__: core_view_mark_MarkViewMenu
});
var core_view_mark_structure_MarkTableStructure = function() {
	core_structure_TableStructure.call(this);
};
core_view_mark_structure_MarkTableStructure.__name__ = true;
core_view_mark_structure_MarkTableStructure.jt = function() {
	return this;
};
core_view_mark_structure_MarkTableStructure.__super__ = core_structure_TableStructure;
core_view_mark_structure_MarkTableStructure.prototype = $extend(core_structure_TableStructure.prototype,{
	generateDefaultOrder: function(data) {
		var arr = [];
		arr.push({ rep : "Id", name : "label"});
		arr.push({ rep : "Dwg Id", name : "drawingId"});
		arr.push({ rep : "Type", name : "type"});
		arr.push({ rep : "Status", name : "item.status"});
		arr.push({ rep : "Qty Req.", name : "item.requested"});
		arr.push({ rep : "Qty Comp.", name : "item.completed"});
		arr.push({ rep : "Remarks", name : "item.remarks"});
		var order = new core_sorting_Ordering(arr,"");
		return order;
	}
	,generateData: function(data,ord) {
		var org = data.original;
		var _g = data.field.name;
		var f = _g;
		if(f.split(".").length > 1) {
			var obj = data.data;
			var _g1 = 0;
			var _g2 = f.split(".").slice(1);
			while(_g1 < _g2.length) {
				var s = _g2[_g1];
				++_g1;
				if(obj == null) return null;
				obj = obj[s];
			}
			return obj;
		} else return data.data;
	}
	,cellFormatter: function(data,ord) {
		data = this.generateData(data,ord);
		return React.createElement("td",{ key : core_view_UidGenerator.nextId()},data);
	}
	,generateRows: function(dwg,children) {
		var array = [];
		array.push(React.createElement("tr",null,children));
		return array;
	}
	,generateHeader: function(ord) {
		var cols = ord.fields.length;
		var row = [];
		var i = 1;
		var _g = 0;
		var _g1 = ord.fields;
		while(_g < _g1.length) {
			var field = _g1[_g];
			++_g;
			row.push(React.createElement("th",{ key : core_view_UidGenerator.nextId()},field.rep));
		}
		return React.createElement("thead",{ className : "full-width"},React.createElement("tr",{ key : core_view_UidGenerator.nextId()},row));
	}
	,__class__: core_view_mark_structure_MarkTableStructure
});
var core_view_rms_RmsViewMenu = function() {
	React.Component.call(this);
};
core_view_rms_RmsViewMenu.__name__ = true;
core_view_rms_RmsViewMenu.__super__ = React.Component;
core_view_rms_RmsViewMenu.prototype = $extend(React.Component.prototype,{
	render: function() {
		var openNewDwgDialog = function() {
			Core.modalChange.dispatch("new-rms");
		};
		var openLoginDialog = function() {
		};
		var openManageFilterDialog = function() {
			Core.modalChange.dispatch("mng-filter");
		};
		return React.createElement("div",{ id : "topMenu", className : "ui menu"},React.createElement("a",{ className : "item active"},React.createElement("i",{ className : "add circle icon"}),"Create RMS"),React.createElement("a",{ onClick : openManageFilterDialog, className : "item"},React.createElement("i",{ className : "filter icon"}),"Manage Filters"),React.createElement("a",{ className : "right item"},React.createElement("i",{ className : "refresh icon"}),"Refresh"));
	}
	,__class__: core_view_rms_RmsViewMenu
});
var core_view_rms_structure_RmsTableStructure = function() {
	core_structure_TableStructure.call(this);
};
core_view_rms_structure_RmsTableStructure.__name__ = true;
core_view_rms_structure_RmsTableStructure.jt = function() {
	return this;
};
core_view_rms_structure_RmsTableStructure.__super__ = core_structure_TableStructure;
core_view_rms_structure_RmsTableStructure.prototype = $extend(core_structure_TableStructure.prototype,{
	generateDefaultOrder: function(data) {
		var arr = [];
		arr.push({ rep : "Rms #", name : "label"});
		arr.push({ rep : "Type", name : "rush"});
		arr.push({ rep : "Total Qty Req.", name : "requested"});
		arr.push({ rep : "Total Qty Comp.", name : "completed"});
		var order = new core_sorting_Ordering(arr,"");
		return order;
	}
	,generateData: function(data,ord) {
		var org = data.original;
		var _g = data.field.name;
		var f = _g;
		switch(_g) {
		case "rush":
			if(org.rush == true) return "Rush"; else return "Normal";
			break;
		case "requested":
			if(org.items == null) return "None";
			var i = 0;
			var _g1 = 0;
			var _g2 = org.items;
			while(_g1 < _g2.length) {
				var item = _g2[_g1];
				++_g1;
				i += item.requested;
			}
			return i;
		case "completed":
			if(org.items == null) return "None";
			var i1 = 0;
			var _g11 = 0;
			var _g21 = org.items;
			while(_g11 < _g21.length) {
				var item1 = _g21[_g11];
				++_g11;
				i1 += item1.completed;
			}
			return i1;
		default:
			if(f.split(".").length > 1) {
				var obj = data.data;
				var _g12 = 0;
				var _g22 = f.split(".").slice(1);
				while(_g12 < _g22.length) {
					var s = _g22[_g12];
					++_g12;
					obj = obj[s];
				}
				return obj;
			} else return data.data;
		}
	}
	,cellFormatter: function(data,ord) {
		data = this.generateData(data,ord);
		return React.createElement("td",{ key : core_view_UidGenerator.nextId()},data);
	}
	,generateRows: function(shpGrp,children) {
		var _g = this;
		var array = [];
		var exCol = null;
		var key = "tble-rms" + shpGrp.pk;
		var pKey = "" + key + "-parent";
		var cKey = "" + key + "-child";
		if(this.parentTable.state.displayed[cKey] == null) this.parentTable.state.displayed[cKey] = { displayed : false, state : false};
		var displayed = this.parentTable.state.displayed[cKey].displayed == true;
		var items = shpGrp.items != null && shpGrp.items.length > 0;
		var clsIcon = classNames("toggle",{ right : displayed == false, down : displayed == true},"icon",{ disabled : !items});
		var handleClickEvent = function() {
			var displayed1 = _g.parentTable.state.displayed;
			var bool = displayed1[cKey].displayed == true;
			displayed1[cKey].displayed = !bool;
			_g.parentTable.setState({ displayed : displayed1});
		};
		var handleDoubleClick = function() {
			Core.application.setState({ editObj : shpGrp},function() {
				Core.modalChange.dispatch("edit-rms");
			});
		};
		exCol = React.createElement("td",{ onClick : handleClickEvent, className : "collapsing"},React.createElement("i",{ id : "icon1", className : clsIcon}));
		array.push(React.createElement("tr",{ onDoubleClick : handleDoubleClick, key : pKey},exCol,children));
		var subrowTransition = function(input) {
			if(input == null) return;
			var elem = js.JQuery(ReactDOM.findDOMNode(input));
			var ds = _g.parentTable.state.displayed;
			var displayed2 = ds[cKey].displayed == true;
			var state = ds[cKey].state == true;
			if(state != displayed2) {
				elem.transition({ animation : "slide down", duration : "400ms"});
				ds[cKey].state = !state;
				_g.parentTable.setState({ displayed : ds});
			} else if(state == true) elem.removeClass("hidden");
		};
		if(shpGrp.items != null && shpGrp.items.length > 0) {
			var rows = [];
			var s = { backgroundColor : "lightgray !important", color : "black !important"};
			var _g1 = 0;
			var _g11 = shpGrp.items;
			while(_g1 < _g11.length) {
				var item = _g11[_g1];
				++_g1;
				rows.push(React.createElement("tr",{ style : s, key : "rwItem" + item.pk},React.createElement("td",null,item.label),React.createElement("td",null,item.status),React.createElement("td",null,item.requested),React.createElement("td",null,item.completed),React.createElement("td",null,item.remarks),React.createElement("td",null,item.shop)));
			}
			array.push(React.createElement("tr",{ style : s, ref : subrowTransition, key : cKey, className : "transition hidden"},React.createElement("td",{ colSpan : "16"},React.createElement("table",{ className : "ui very basic table"},React.createElement("thead",null,React.createElement("tr",{ style : s},React.createElement("th",null,"Item #"),React.createElement("th",null,"Status"),React.createElement("th",null,"Requested"),React.createElement("th",null,"Completed"),React.createElement("th",null,"Remarks"),React.createElement("th",null,"Shop"))),React.createElement("tbody",null,rows)))));
		}
		return array;
	}
	,generateHeader: function(ord) {
		var cols = ord.fields.length;
		var row = [];
		var i = 1;
		var _g = 0;
		var _g1 = ord.fields;
		while(_g < _g1.length) {
			var field = _g1[_g];
			++_g;
			row.push(React.createElement("th",{ key : core_view_UidGenerator.nextId()},field.rep));
		}
		return React.createElement("thead",{ className : "full-width"},React.createElement("tr",{ key : core_view_UidGenerator.nextId()},React.createElement("th",null),row));
	}
	,__class__: core_view_rms_structure_RmsTableStructure
});
var core_view_main_ViewRegistry = function() { };
core_view_main_ViewRegistry.__name__ = true;
core_view_main_ViewRegistry.buildView = function(viewId,content) {
	if(core_view_main_ViewRegistry.views[viewId] == null) {
		if(viewId.lastIndexOf("Menu") >= 0) viewId = "homeMenu"; else throw new js__$Boot_HaxeError("View by the id " + viewId + " does not exist.");
	}
	var view = core_view_main_ViewRegistry.views[viewId](content);
	var anim = function(input) {
		if(input == null || input == false) return;
		var elem = js.JQuery(ReactDOM.findDOMNode(input));
		if(elem.hasClass("transition") && elem.hasClass("visible")) return;
		elem.addClass("transition hidden");
		elem.ready(function(e) {
			elem.transition({ animation : "scale", duration : ".5s"});
		});
	};
	return React.cloneElement(view,{ ref : anim});
};
core_view_main_ViewRegistry.registerView = function(id,view) {
	core_view_main_ViewRegistry.views[id] = view;
};
var core_view_mark_modal_NewMarkModalComponents = function() { };
core_view_mark_modal_NewMarkModalComponents.__name__ = true;
core_view_mark_modal_NewMarkModalComponents.jt = function() {
	return this;
};
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var core_view_rms_modal_NewRmsModalComponents = function() { };
core_view_rms_modal_NewRmsModalComponents.__name__ = true;
core_view_rms_modal_NewRmsModalComponents.jt = function() {
	return this;
};
var core_view_shipment_modal_NewShpmntModalComponents = function() { };
core_view_shipment_modal_NewShpmntModalComponents.__name__ = true;
core_view_shipment_modal_NewShpmntModalComponents.jt = function() {
	return this;
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var msignal_Signal0 = function() {
	msignal_Signal.call(this);
};
msignal_Signal0.__name__ = true;
msignal_Signal0.__super__ = msignal_Signal;
msignal_Signal0.prototype = $extend(msignal_Signal.prototype,{
	dispatch: function() {
		var slotsToProcess = this.slots;
		while(slotsToProcess.nonEmpty) {
			slotsToProcess.head.execute();
			slotsToProcess = slotsToProcess.tail;
		}
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return new msignal_Slot0(this,listener,once,priority);
	}
	,__class__: msignal_Signal0
});
var msignal_Slot = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	this.signal = signal;
	this.set_listener(listener);
	this.once = once;
	this.priority = priority;
	this.enabled = true;
};
msignal_Slot.__name__ = true;
msignal_Slot.prototype = {
	remove: function() {
		this.signal.remove(this.listener);
	}
	,set_listener: function(value) {
		return this.listener = value;
	}
	,__class__: msignal_Slot
	,__properties__: {set_listener:"set_listener"}
};
var msignal_Slot0 = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	msignal_Slot.call(this,signal,listener,once,priority);
};
msignal_Slot0.__name__ = true;
msignal_Slot0.__super__ = msignal_Slot;
msignal_Slot0.prototype = $extend(msignal_Slot.prototype,{
	execute: function() {
		if(!this.enabled) return;
		if(this.once) this.remove();
		this.listener();
	}
	,__class__: msignal_Slot0
});
var msignal_Slot1 = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	msignal_Slot.call(this,signal,listener,once,priority);
};
msignal_Slot1.__name__ = true;
msignal_Slot1.__super__ = msignal_Slot;
msignal_Slot1.prototype = $extend(msignal_Slot.prototype,{
	execute: function(value1) {
		if(!this.enabled) return;
		if(this.once) this.remove();
		if(this.param != null) value1 = this.param;
		this.listener(value1);
	}
	,__class__: msignal_Slot1
});
var msignal_Slot2 = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	msignal_Slot.call(this,signal,listener,once,priority);
};
msignal_Slot2.__name__ = true;
msignal_Slot2.__super__ = msignal_Slot;
msignal_Slot2.prototype = $extend(msignal_Slot.prototype,{
	execute: function(value1,value2) {
		if(!this.enabled) return;
		if(this.once) this.remove();
		if(this.param1 != null) value1 = this.param1;
		if(this.param2 != null) value2 = this.param2;
		this.listener(value1,value2);
	}
	,__class__: msignal_Slot2
});
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
msignal_SlotList.NIL = new msignal_SlotList(null,null);
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
if(Array.prototype.map == null) Array.prototype.map = function(f) {
	var a = [];
	var _g1 = 0;
	var _g = this.length;
	while(_g1 < _g) {
		var i = _g1++;
		a[i] = f(this[i]);
	}
	return a;
};
if(Array.prototype.filter == null) Array.prototype.filter = function(f1) {
	var a1 = [];
	var _g11 = 0;
	var _g2 = this.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		var e = this[i1];
		if(f1(e)) a1.push(e);
	}
	return a1;
};
var q = window.jQuery;
var js = js || {}
js.JQuery = q;
core_view_main_LoginDialog.displayName = "LoginDialog";
core_view_job_modal_NewJobDialog.displayName = "NewJobDialog";
core_view_job_modal_AddJobFilterDialog.displayName = "AddJobFilterDialog";
core_view_job_modal_ManageJobFilterDialog.FILTERLISTITEM = React.createClass({ render : function() {
	var key = "filter-" + (this.props.fid - key);
	return React.createElement("div",{ key : key, className : "item"},React.createElement("div",{ className : "right floated content"},React.createElement("div",{ className : "ui mini button"},"Delete")),React.createElement("i",{ className : "filter icon"}),React.createElement("div",{ className : "content"},this.props.name));
}});
core_view_job_modal_ManageJobFilterDialog.displayName = "ManageJobFilterDialog";
core_view_job_modal_EditJobDialog.options = [];
core_view_job_modal_EditJobDialog.items = [];
core_view_job_modal_EditJobDialog.displayName = "EditJobDialog";
core_view_main_ManageFilterDialog.FILTERLISTITEM = React.createClass({ render : function() {
	var key = "filter-" + (this.props.fid - key);
	return React.createElement("div",{ key : key, className : "item"},React.createElement("div",{ className : "right floated content"},React.createElement("div",{ className : "ui mini button"},"Delete")),React.createElement("i",{ className : "filter icon"}),React.createElement("div",{ className : "content"},this.props.name));
}});
core_view_main_ManageFilterDialog.displayName = "ManageFilterDialog";
core_view_dwg_modal_NewDwgDialog.displayName = "NewDwgDialog";
core_view_dwg_modal_EditDwgDialog.displayName = "EditDwgDialog";
core_view_mark_modal_NewMarkDialog.displayName = "NewMarkDialog";
core_view_mark_modal_EditMarkDialog.displayName = "EditMarkDialog";
core_view_rms_modal_NewRmsDialog.displayName = "NewRmsDialog";
core_view_rms_modal_EditRmsDialog.displayName = "EditRmsDialog";
core_view_abm_modal_NewAbmDialog.displayName = "NewAbmDialog";
core_view_abm_modal_EditAbmDialog.displayName = "EditAbmDialog";
core_view_shipment_modal_NewShipmentDialog.displayName = "NewShipmentDialog";
core_view_shipment_modal_EditShipmentDialog.displayName = "EditShipmentDialog";
Core.viewChange = new msignal_Signal2();
Core.modalChange = new msignal_Signal1();
Core.jobSelected = new msignal_Signal1();
Core.MODALELEMENT = React.createClass({ componentDidMount : function() {
	Core.jobSelected.add(this.handleJobSelected);
}, componentWillUnmount : function() {
	Core.jobSelected.remove(($_=this,$bind($_,$_.handleJobSelected)));
}, handleJobSelected : function(job) {
	this.setState({ curJob : job});
}, render : function() {
	var dataObj = this.props.dataObj;
	var i = this.props.index;
	var comp;
	switch(i) {
	case "login":
		comp = React.createElement(core_view_main_LoginDialog,{ id : "login-dialog", key : "login-dialog"});
		break;
	case "new-job":
		comp = React.createElement(core_view_job_modal_NewJobDialog,{ id : "newjob-dialog", key : "newjob-dialog"});
		break;
	case "add-job":
		comp = React.createElement(core_view_job_modal_AddJobFilterDialog,{ id : "afil-job-dialog", key : "afil-job-dialog"});
		break;
	case "mng-job":
		comp = React.createElement(core_view_job_modal_ManageJobFilterDialog,{ id : "mfil-job-dialog", key : "mfil-job-dialog"});
		break;
	case "edit-job":
		comp = React.createElement(core_view_job_modal_EditJobDialog,{ job : dataObj.editJobObj, id : "editjob-dialog", curJob : dataObj.editJobMainObj, key : "editjob-dialog"});
		break;
	case "mng-filter":
		comp = React.createElement(core_view_main_ManageFilterDialog,{ id : "mfil-job-dialog", key : "mfil-job-dialog"});
		break;
	case "new-dwg":
		comp = React.createElement(core_view_dwg_modal_NewDwgDialog,{ id : "newdwg-dialog", key : "newdwg-dialog"});
		break;
	case "edit-dwg":
		comp = React.createElement(core_view_dwg_modal_EditDwgDialog,{ job : dataObj.curJob, id : "editdwg-dialog", dwg : dataObj.editObj, key : "editdwg-dialog"});
		break;
	case "new-mark":
		comp = React.createElement(core_view_mark_modal_NewMarkDialog,{ id : "newmark-dialog", key : "newmark-dialog"});
		break;
	case "edit-mark":
		comp = React.createElement(core_view_mark_modal_EditMarkDialog,{ job : dataObj.curJob, id : "editmark-dialog", mark : dataObj.editObj, key : "editmark-dialog"});
		break;
	case "new-rms":
		comp = React.createElement(core_view_rms_modal_NewRmsDialog,{ id : "newmark-dialog", key : "newmark-dialog"});
		break;
	case "edit-rms":
		comp = React.createElement(core_view_rms_modal_EditRmsDialog,{ job : dataObj.curJob, id : "editmark-dialog", rms : dataObj.editObj, key : "editmark-dialog"});
		break;
	case "new-abm":
		comp = React.createElement(core_view_abm_modal_NewAbmDialog,{ id : "newmark-dialog", key : "newmark-dialog"});
		break;
	case "edit-abm":
		comp = React.createElement(core_view_abm_modal_EditAbmDialog,{ job : dataObj.curJob, id : "editmark-dialog", key : "editmark-dialog", abm : dataObj.editObj});
		break;
	case "new-shpmnt":
		comp = React.createElement(core_view_shipment_modal_NewShipmentDialog,{ id : "newmark-dialog", key : "newmark-dialog"});
		break;
	case "edit-shpmnt":
		comp = React.createElement(core_view_shipment_modal_EditShipmentDialog,{ job : dataObj.curJob, id : "editmark-dialog", shpmnt : dataObj.editObj, key : "editmark-dialog"});
		break;
	default:
		comp = React.createElement("div",null);
	}
	return comp;
}});
Core.displayName = "Core";
core_authentication_AuthenticationManager.initialized = false;
core_dataaccess_PersistenceManager.localStorage = js_Browser.getLocalStorage();
core_dataaccess_PersistenceManager.sessionStorage = js_Browser.getSessionStorage();
core_dataaccess_ServiceAccessManager.baseUrl = "";
core_dataaccess_ServiceAccessManager.contextRoot = "api/";
core_view_UidGenerator.prefix = "UID-";
core_view_UidGenerator.label = 0;
core_view_abm_AbmViewMenu.displayName = "AbmViewMenu";
core_view_abm_modal_NewAbmModalComponents.DIVHEADER = React.createClass({ render : function() {
	return React.createElement("h4",{ className : "ui dividing header"},this.props.value);
}});
core_view_abm_modal_NewAbmModalComponents.FIELD = React.createClass({ handleOnChange : function(e) {
	var value = e.target.value;
	var name = this.props.name;
	this.props.onChange(name,value);
}, render : function() {
	var p = this.props;
	var type;
	if(p.type == null) type = "text"; else type = p.type;
	var pattern;
	if(p.pattern == null) pattern = ""; else pattern = p.pattern;
	return React.createElement("div",{ className : p.className},React.createElement("label",null,p.label),React.createElement("input",{ onChange : this.handleOnChange, name : p.name, value : p.value, type : type, ref : p.mask, placeholder : p.pholder, pattern : pattern}));
}});
core_view_components_Constants.stateAbbrArray = [{ abbr : "AL", state : "Alabama"},{ abbr : "AK", state : "Alaska"},{ abbr : "AZ", state : "Arizona"},{ abbr : "AR", state : "Arkansas"},{ abbr : "CA", state : "California"},{ abbr : "CO", state : "Colorado"},{ abbr : "CT", state : "Connecticut"},{ abbr : "DE", state : "Delaware"},{ abbr : "DC", state : "District Of Columbia"},{ abbr : "FL", state : "Florida"},{ abbr : "GA", state : "Georgia"},{ abbr : "HI", state : "Hawaii"},{ abbr : "ID", state : "Idaho"},{ abbr : "IL", state : "Illinois"},{ abbr : "IN", state : "Indiana"},{ abbr : "IA", state : "Iowa"},{ abbr : "KS", state : "Kansas"},{ abbr : "KY", state : "Kentucky"},{ abbr : "LA", state : "Louisiana"},{ abbr : "ME", state : "Maine"},{ abbr : "MD", state : "Maryland"},{ abbr : "MA", state : "Massachusetts"},{ abbr : "MI", state : "Michigan"},{ abbr : "MN", state : "Minnesota"},{ abbr : "MS", state : "Mississippi"},{ abbr : "MO", state : "Missouri"},{ abbr : "MT", state : "Montana"},{ abbr : "NE", state : "Nebraska"},{ abbr : "NV", state : "Nevada"},{ abbr : "NH", state : "New Hampshire"},{ abbr : "NJ", state : "New Jersey"},{ abbr : "NM", state : "New Mexico"},{ abbr : "NY", state : "New York"},{ abbr : "NC", state : "North Carolina"},{ abbr : "ND", state : "North Dakota"},{ abbr : "OH", state : "Ohio"},{ abbr : "OK", state : "Oklahoma"},{ abbr : "OR", state : "Oregon"},{ abbr : "PA", state : "Pennsylvania"},{ abbr : "RI", state : "Rhode Island"},{ abbr : "SC", state : "South Carolina"},{ abbr : "SD", state : "South Dakota"},{ abbr : "TN", state : "Tennessee"},{ abbr : "TX", state : "Texas"},{ abbr : "UT", state : "Utah"},{ abbr : "VT", state : "Vermont"},{ abbr : "VA", state : "Virginia"},{ abbr : "WA", state : "Washington"},{ abbr : "WV", state : "West Virginia"},{ abbr : "WI", state : "Wisconsin"},{ abbr : "WY", state : "Wyoming"}];
core_view_main_FieldMask.dateField = (function(f,a2) {
	return function(a1) {
		f(a1,a2);
	};
})(core_view_main_FieldMask.maskField,"99/99/9999");
core_view_main_FieldMask.phoneField = (function(f,a2) {
	return function(a1) {
		f(a1,a2);
	};
})(core_view_main_FieldMask.maskField,"(999) 999-9999");
core_view_main_FieldMask.jobIdField = (function(f,a2) {
	return function(a1) {
		f(a1,a2);
	};
})(core_view_main_FieldMask.maskField,"a-&-*");
core_view_components_ModalComponents.JOBINFORMATION = React.createClass({ initialize : function() {
}, render : function() {
	var job = this.props.job;
	var label = job.id.label + HxOverrides.substr("" + job.id.year,2,2);
	var current = job;
	return React.createElement("div",{ className : "field"},React.createElement("div",{ className : "inline fields"},React.createElement(core_view_components_ModalComponents.FIELD,{ label : "Job" + String.fromCharCode(160) + "ID", name : "id-prefix", value : job.id.prefix, pholder : "Prefix", className : "six wide field"}),React.createElement(core_view_components_ModalComponents.FIELD,{ name : "id-label", value : label, pholder : "ID", className : "ten wide field"})),React.createElement("div",{ className : "fields"},React.createElement(core_view_components_ModalComponents.FIELD,{ name : "customer", value : current.customer, pholder : "Customer", className : "sixteen wide field"})),React.createElement("div",{ className : "two fields"},React.createElement(core_view_components_ModalComponents.FIELD,{ name : "salesman", value : current.salesperson.label, pholder : "Salesman", className : "field"}),React.createElement(core_view_components_ModalComponents.FIELD,{ name : "customer", value : current.contractPrice, pholder : "Contract Price", className : "field"})),React.createElement("div",{ className : "two fields"},React.createElement(core_view_components_ModalComponents.FIELD,{ mask : core_view_main_FieldMask.dateField, name : "customer", value : current.start, pholder : "Start Date", className : "field"}),React.createElement(core_view_components_ModalComponents.FIELD,{ mask : core_view_main_FieldMask.dateField, name : "customer", value : current.due, pholder : "Due Date", className : "field"})));
}});
core_view_components_ModalComponents.CUSTINFORMATION = React.createClass({ initialize : function() {
}, render : function() {
	var job = this.props.job;
	var current = job;
	return React.createElement("div",{ className : "field"},React.createElement("div",{ className : "two fields"},React.createElement(core_view_components_ModalComponents.FIELD,{ mask : core_view_main_FieldMask.phoneField, name : "ph-number", value : current.contact.phone, pholder : "Phone", className : "field"}),React.createElement(core_view_components_ModalComponents.FIELD,{ mask : core_view_main_FieldMask.phoneField, name : "fax-number", value : current.contact.fax, pholder : "Fax", className : "field"})),React.createElement("div",{ className : "two fields"},React.createElement(core_view_components_ModalComponents.FIELD,{ name : "contact", value : current.contact.label, pholder : "Contact", className : "field"}),React.createElement(core_view_components_ModalComponents.FIELD,{ name : "email", value : current.contact.email, pholder : "Email", className : "field"})),React.createElement(core_view_components_ModalComponents.FIELD,{ name : "add-1", value : current.addresses.shipping.lines, pholder : "Address 1", className : "field"}),React.createElement(core_view_components_ModalComponents.FIELD,{ name : "add-2", value : current.addresses.shipping.lines, pholder : "Address 2", className : "field"}),React.createElement("div",{ className : "fields"},React.createElement(core_view_components_ModalComponents.FIELD,{ name : "city", value : current.addresses.shipping.city, pholder : "City", className : "field"}),React.createElement("div",{ className : "field"},React.createElement(core_view_components_ModalComponents.STATEDROPDOWN,{ value : current.addresses.shipping.stateOrProvince})),React.createElement(core_view_components_ModalComponents.FIELD,{ name : "zip", value : current.addresses.shipping.postalCode, pholder : "Zip Code", className : "field"})));
}});
core_view_components_ModalComponents.SCHEDINFORMATION = React.createClass({ initialize : function() {
}, render : function() {
	var job = this.props.job;
	var current = job;
	var schedule = current.schedules;
	return React.createElement("div",{ className : "field"},React.createElement("div",{ className : "inline fields"},React.createElement("label",{ className : "six wide field"},"Engineering"),React.createElement("div",{ className : "eight wide field"},React.createElement("input",{ name : "ph-number", value : schedule.engineering.start, type : "text", placeholder : "Start"})),React.createElement("div",{ className : "eight wide field"},React.createElement("input",{ name : "fax-number", value : schedule.engineering.complete, type : "text", placeholder : "End"}))),React.createElement("div",{ className : "inline fields"},React.createElement("label",{ className : "six wide field"},"Mechanical"),React.createElement("div",{ className : "eight wide field"},React.createElement("input",{ name : "ph-number", value : schedule.mechanical.start, type : "text", placeholder : "Start"})),React.createElement("div",{ className : "eight wide field"},React.createElement("input",{ name : "fax-number", value : schedule.mechanical.complete, type : "text", placeholder : "End"}))),React.createElement("div",{ className : "inline fields"},React.createElement("label",{ className : "six wide field"},"Electrical"),React.createElement("div",{ className : "eight wide field"},React.createElement("input",{ name : "ph-number", value : schedule.electrical.start, type : "text", placeholder : "Start"})),React.createElement("div",{ className : "eight wide field"},React.createElement("input",{ name : "fax-number", value : schedule.electrical.complete, type : "text", placeholder : "End"}))),React.createElement("div",{ className : "inline fields"},React.createElement("label",{ className : "six wide field"},"Shipping"),React.createElement("div",{ className : "eight wide field"},React.createElement("input",{ name : "ph-number", value : schedule.shipping.start, type : "text", placeholder : "Start"})),React.createElement("div",{ className : "eight wide field"},React.createElement("input",{ name : "fax-number", value : schedule.shipping.complete, type : "text", placeholder : "End"}))),React.createElement("div",{ className : "inline fields"},React.createElement("label",{ className : "six wide field"},"Installation"),React.createElement("div",{ className : "eight wide field"},React.createElement("input",{ name : "ph-number", value : schedule.installation.start, type : "text", placeholder : "Start"})),React.createElement("div",{ className : "eight wide field"},React.createElement("input",{ name : "fax-number", value : schedule.installation.complete, type : "text", placeholder : "End"}))));
}});
core_view_components_ModalComponents.SYSTYPEINFORMATION = React.createClass({ initialize : function() {
}, render : function() {
	var job = this.props.job;
	var current = job;
	return React.createElement("div",{ className : "inline fields"},React.createElement("div",{ className : "eight wide field"},React.createElement("input",{ value : current.systemTypes[0], type : "text", placeholder : "Type 1"})),React.createElement("div",{ className : "eight wide field"},React.createElement("input",{ value : current.systemTypes[1], type : "text", placeholder : "Type 2"})));
}});
core_view_components_ModalComponents.INVADDRINFORMATION = React.createClass({ initialize : function() {
}, render : function() {
	var job = this.props.job;
	var current = job;
	var invoice = current.addresses.invoicing;
	return React.createElement("div",{ className : "field"},React.createElement(core_view_components_ModalComponents.FIELD,{ name : "inv-add-1", value : invoice.lines, pholder : "Address 1", className : "field"}),React.createElement(core_view_components_ModalComponents.FIELD,{ name : "inv-add-2", value : invoice.lines, pholder : "Address 2", className : "field"}),React.createElement("div",{ className : "fields"},React.createElement(core_view_components_ModalComponents.FIELD,{ name : "inv-city", value : invoice.city, pholder : "City", className : "field"}),React.createElement("div",{ className : "field"},React.createElement(core_view_components_ModalComponents.STATEDROPDOWN,{ value : invoice.stateOrProvince})),React.createElement(core_view_components_ModalComponents.FIELD,{ name : "inv-zip", value : invoice.postalCode, pholder : "Zip Code", className : "field"})));
}});
core_view_components_ModalComponents.DIVHEADER = React.createClass({ render : function() {
	return React.createElement("h4",{ className : "ui dividing header"},this.props.value);
}});
core_view_components_ModalComponents.FIELD = React.createClass({ render : function() {
	var isLabel = this.props.label != null && this.props.label.length > 0;
	var label;
	if(isLabel) label = React.createElement("label",null,this.props.label); else label = "";
	return React.createElement("div",{ key : "formfield-mod", className : this.props.className},label,React.createElement("input",{ name : this.props.name, value : this.props.value, type : "text", ref : this.props.mask, key : "ff-input-mod", placeholder : this.props.pholder}));
}});
core_view_components_ModalComponents.STATEDROPDOWN = React.createClass({ getInitialState : function() {
	var options = [];
	var items = [];
	var _g = 0;
	var _g1 = core_view_components_Constants.stateAbbrArray;
	while(_g < _g1.length) {
		var abr = _g1[_g];
		++_g;
		options.push(React.createElement("option",{ value : abr.abbr, key : "static-" + core_view_UidGenerator.nextId()},abr.state));
	}
	var _g2 = 0;
	var _g11 = core_view_components_Constants.stateAbbrArray;
	while(_g2 < _g11.length) {
		var abr1 = _g11[_g2];
		++_g2;
		items.push(React.createElement("div",{ 'data-value' : abr1.abbr, key : "static-" + core_view_UidGenerator.nextId(), className : "item"},abr1.state));
	}
	return { opts : options, itms : items};
}, initialize : function(input) {
	var elem = js.JQuery(ReactDOM.findDOMNode(input));
	elem.dropdown("set text",this.props.value).dropdown();
}, render : function() {
	return React.createElement("div",{ ref : this.initialize, className : "ui search selection dropdown"},React.createElement("input",{ name : "state", type : "hidden"}),React.createElement("select",null,React.createElement("option",{ value : ""},"State"),this.state.opts),React.createElement("i",{ className : "dropdown icon"}),React.createElement("input",{ name : "state", className : "search"}),React.createElement("div",{ className : "default text"},"State"),React.createElement("div",{ className : "menu"},this.state.itms));
}});
core_view_components_TableComponent.displayName = "TableComponent";
core_view_dwg_DwgViewMenu.displayName = "DwgViewMenu";
core_view_dwg_modal_NewDwgModalComponents.DIVHEADER = React.createClass({ render : function() {
	return React.createElement("h4",{ className : "ui dividing header"},this.props.value);
}});
core_view_dwg_modal_NewDwgModalComponents.FIELD = React.createClass({ handleOnChange : function(e) {
	var value = e.target.value;
	var name = this.props.name;
	this.props.onChange(name,value);
}, render : function() {
	var p = this.props;
	var type;
	if(p.type == null) type = "text"; else type = p.type;
	var pattern;
	if(p.pattern == null) pattern = ""; else pattern = p.pattern;
	return React.createElement("div",{ className : p.className},React.createElement("label",null,p.label),React.createElement("input",{ onChange : this.handleOnChange, name : p.name, value : p.value, type : type, ref : p.mask, placeholder : p.pholder, pattern : pattern}));
}});
core_view_dwg_modal_NewDwgModalComponents.DWGTYPEDROPDOWN = React.createClass({ initialize : function(input) {
	if(input == null) return;
	var elem = js.JQuery(ReactDOM.findDOMNode(input));
	var value = this.props.value;
	if(value == null) value = "default";
	elem.dropdown({ onChange : this.handleOnChange}).dropdown("set selected",value);
}, handleOnChange : function(value1,text,selectedItem) {
	var name = this.props.name;
	this.props.onChange(name,value1);
}, render : function() {
	return React.createElement("div",{ ref : this.initialize, className : "ui selection dropdown"},React.createElement("input",{ name : "dwg-type", type : "hidden"}),React.createElement("i",{ className : "dropdown icon"}),React.createElement("div",{ className : "default text"},"Drawing Type"),React.createElement("div",{ className : "menu"},React.createElement("div",{ 'data-value' : "DETAIL", className : "item"},"Detail"),React.createElement("div",{ 'data-value' : "LAYOUT", className : "item"},"Layout")));
}});
core_view_job_JobViewMenu.displayName = "JobViewMenu";
core_view_job_modal_EditJobModalComponents.JOBINFORMATION = React.createClass({ getInitialState : function() {
	var obj;
	if(this.props.job == null) obj = { }; else obj = this.props.job;
	var id;
	if(obj.id == null) id = { }; else id = obj.id;
	var sm;
	if(obj.salesperson == null) sm = { }; else sm = obj.salesperson;
	var cu;
	if(obj.customer == null) cu = { }; else cu = obj.customer;
	return { obj : obj, id : id, sm : sm, cu : cu};
}, submitChange : function() {
	var obj1 = this.state.obj;
	var id1 = this.state.id;
	var sm1 = this.state.sm;
	var cu1 = this.state.cu;
	obj1.id = id1;
	obj1.salesperson = sm1;
	obj1.customer = cu1;
	if(this.props.onChange != null) this.props.onChange("jobInfo",obj1);
	this.setState(obj1);
}, handleOnChange : function(name,value) {
	if(value != null && value.length > 0) this.state.obj[name] = value; else Reflect.deleteField(this.state.obj,name);
	this.submitChange();
}, handleCustomer : function(name1,value1) {
	if(value1 != null && value1.length > 0) this.state.cu[name1] = value1; else Reflect.deleteField(this.state.cu,name1);
	this.submitChange();
}, handleSalesman : function(name2,value2) {
	if(value2 != null && value2.length > 0) this.state.sm[name2] = value2; else Reflect.deleteField(this.state.sm,name2);
	this.submitChange();
}, handleId : function(name3,value3) {
	if(value3 != null && value3.length > 0) this.state.id[name3] = value3; else Reflect.deleteField(this.state.id,name3);
	this.submitChange();
}, render : function() {
	var obj2 = this.state.obj;
	var id2 = obj2.id;
	var sm2;
	if(obj2.salesperson == null) sm2 = { }; else sm2 = obj2.salesperson;
	var cu2;
	if(obj2.customer == null) cu2 = { }; else cu2 = obj2.customer;
	return React.createElement("div",{ className : "field"},React.createElement("div",{ className : "three fields"},React.createElement(core_view_job_modal_EditJobModalComponents.FIELD,{ label : "Prefix", onChange : this.handleId, name : "prefix", value : id2.prefix, className : "field"}),React.createElement(core_view_job_modal_EditJobModalComponents.FIELD,{ label : "Id", onChange : this.handleId, name : "label", value : id2.label, className : "field"}),React.createElement(core_view_job_modal_EditJobModalComponents.FIELD,{ label : "Year", onChange : this.handleId, name : "year", value : id2.year, min : "1000", type : "number", max : "9999", className : "field"})),React.createElement(core_view_job_modal_EditJobModalComponents.FIELD,{ label : "Customer", onChange : this.handleCustomer, name : "label", value : cu2.label, className : "field"}),React.createElement("div",{ className : "two fields"},React.createElement(core_view_job_modal_EditJobModalComponents.FIELD,{ label : "Salesman", onChange : this.handleSalesman, name : "label", value : sm2.label, className : "field"}),React.createElement(core_view_job_modal_EditJobModalComponents.FIELD,{ label : "Contract Price", onChange : this.handleOnChange, name : "contractPrice", value : obj2.contractPrice, className : "field"})),React.createElement("div",{ className : "two fields"},React.createElement(core_view_job_modal_EditJobModalComponents.FIELD,{ label : "Start Date", onChange : this.handleOnChange, name : "start", value : obj2.start, type : "date", className : "field"}),React.createElement(core_view_job_modal_EditJobModalComponents.FIELD,{ label : "Due Date", onChange : this.handleOnChange, name : "due", value : obj2.due, type : "date", className : "field"})));
}});
core_view_job_modal_EditJobModalComponents.CUSTINFORMATION = React.createClass({ getInitialState : function() {
	var obj;
	if(this.props.job == null) obj = { }; else obj = this.props.job;
	var addresses;
	if(obj.addresses == null) addresses = { }; else addresses = obj.addresses;
	var ad;
	if(addresses.shipping == null) ad = { }; else ad = addresses.shipping;
	var ca;
	if(obj.contact == null) ca = { }; else ca = obj.contact;
	return { obj : { addresses : addresses}, ad : ad, ca : ca};
}, submitChange : function() {
	var obj1 = this.state.obj;
	var ad1 = this.state.ad;
	var ca1 = this.state.ca;
	obj1.contact = ca1;
	obj1.addresses.shipping = ad1;
	if(this.props.onChange != null) this.props.onChange("custInfo",obj1);
	this.setState(obj1);
}, handleOnChange : function(name,value) {
	if(value != null && value.length > 0) this.state.obj[name] = value; else Reflect.deleteField(this.state.obj,name);
	this.submitChange();
}, handleContact : function(name1,value1) {
	if(value1 != null && value1.length > 0) this.state.ca[name1] = value1; else Reflect.deleteField(this.state.ca,name1);
	this.submitChange();
}, handleAddress : function(name2,value2) {
	var ad2 = this.state.ad;
	if(value2 != null && value2.length > 0) {
		if(name2 == "line1") ad2.lines = value2 + ad2.lines.split("\n")[1];
		if(name2 == "line2") ad2.lines = ad2.lines.split("\n")[0] + value2;
	} else {
		if(ad2.lines == null || ad2.lines.length < 1) Reflect.deleteField(this.state.ad,lines);
		var split = ad2.lines.split("\n");
		if(split.length < 2) Reflect.deleteField(this.state.ad,lines);
		if(name2 == "line1") this.state.ad.lines = "\n" + split[1];
		if(name2 == "line2") this.state.ad.lines = split[0] + "\n";
	}
	this.submitChange();
}, render : function() {
	var obj2 = this.state.obj;
	var shp = obj2.addresses.shipping;
	var ad3 = this.state.ad;
	var ca2 = this.state.ca;
	var line1 = shp.lines.split("\n")[0];
	var line2 = shp.lines.split("\n")[1];
	return React.createElement("div",{ className : "field"},React.createElement("div",{ className : "two fields"},React.createElement(core_view_job_modal_EditJobModalComponents.FIELD,{ label : "Phone", onChange : this.handleContact, name : "phone", value : ca2.phone, className : "field"}),React.createElement(core_view_job_modal_EditJobModalComponents.FIELD,{ label : "Fax", onChange : this.handleContact, name : "fax", value : ca2.fax, className : "field"})),React.createElement("div",{ className : "two fields"},React.createElement(core_view_job_modal_EditJobModalComponents.FIELD,{ label : "Contact", onChange : this.handleContact, name : "label", value : ca2.label, className : "field"}),React.createElement(core_view_job_modal_EditJobModalComponents.FIELD,{ label : "Email", onChange : this.handleContact, name : "email", value : ca2.email, className : "field"})),React.createElement(core_view_job_modal_EditJobModalComponents.FIELD,{ label : "Address 1", onChange : this.handleAddress, name : "line1", value : line1, className : "field"}),React.createElement(core_view_job_modal_EditJobModalComponents.FIELD,{ label : "Address 2", onChange : this.handleAddress, name : "line2", value : line2, className : "field"}),React.createElement("div",{ className : "fields"},React.createElement(core_view_job_modal_EditJobModalComponents.FIELD,{ label : "City", onChange : this.handleAddress, name : "city", value : ad3.city, className : "field"}),React.createElement("div",{ className : "field"},React.createElement("label",null,"State"),React.createElement(core_view_job_modal_EditJobModalComponents.STATEDROPDOWN,{ def : ad3.stateOrProvince, onChange : this.handleAddress, name : "stateOrProvince"})),React.createElement(core_view_job_modal_EditJobModalComponents.FIELD,{ label : "Zip Code", onChange : this.handleAddress, name : "postalCode", value : ad3.postalCode, className : "field"})));
}});
core_view_job_modal_EditJobModalComponents.INVADDRINFORMATION = React.createClass({ getInitialState : function() {
	var obj;
	if(this.props.job == null) obj = { }; else obj = this.props.job;
	if(obj.addresses == null) obj.addresses = { };
	var ad;
	if(obj.addresses.invoicing == null) ad = { }; else ad = obj.addresses.invoicing;
	return { obj : ad};
}, submitChange : function() {
	var obj1 = this.state.obj;
	if(this.props.onChange != null) this.props.onChange("invInfo",obj1);
	this.setState(obj1);
}, handleOnChange : function(name,value) {
	if(value != null && value.length > 0) this.state.obj[name] = value; else Reflect.deleteField(this.state.obj,name);
	this.submitChange();
}, render : function() {
	var ad1 = this.state.obj;
	var line1 = ad1.lines.split("\n")[0];
	var line2 = ad1.lines.split("\n")[1];
	return React.createElement("div",{ className : "field"},React.createElement(core_view_job_modal_EditJobModalComponents.FIELD,{ label : "Address 1", onChange : this.handleOnChange, name : "line1", value : line1, className : "field"}),React.createElement(core_view_job_modal_EditJobModalComponents.FIELD,{ label : "Address 2", onChange : this.handleOnChange, name : "line2", value : line2, className : "field"}),React.createElement("div",{ className : "fields"},React.createElement(core_view_job_modal_EditJobModalComponents.FIELD,{ label : "City", onChange : this.handleOnChange, name : "city", value : ad1.city, className : "field"}),React.createElement("div",{ className : "field"},React.createElement("label",null,"State"),React.createElement(core_view_job_modal_EditJobModalComponents.STATEDROPDOWN,{ def : ad1.stateOrProvince, onChange : this.handleOnChange, name : "stateOrProvince"})),React.createElement(core_view_job_modal_EditJobModalComponents.FIELD,{ label : "Zip Code", onChange : this.handleOnChange, name : "postalCode", value : ad1.postalCode, className : "field"})));
}});
core_view_job_modal_EditJobModalComponents.SCHEDINFORMATION = React.createClass({ getInitialState : function() {
	var sch = this.props.job.schedules;
	if(sch == null) sch = { };
	if(sch.engineering == null) sch.engineering = { };
	if(sch.mechanical == null) sch.mechanical = { };
	if(sch.electrical == null) sch.electrical = { };
	if(sch.shipping == null) sch.shipping = { };
	if(sch.installation == null) sch.installation = { };
	console.log(sch);
	return { schedule : sch};
}, handleOnChange : function(name,value) {
	var sch1 = this.state.schedule;
	var field = name.split("-")[1];
	var _g = name.split("-")[0];
	switch(_g) {
	case "eng":
		sch1.engineering[field] = value;
		break;
	case "mech":
		sch1.mechanical[field] = value;
		break;
	case "elec":
		sch1.electrical[field] = value;
		break;
	case "ship":
		sch1.shipping[field] = value;
		break;
	case "inst":
		sch1.installation[field] = value;
		break;
	}
	if(this.props.onChange != null) this.props.onChange("schInfo",sch1);
	this.setState({ schedule : sch1});
}, render : function() {
	var sch2 = this.state.schedule;
	return React.createElement("div",{ className : "field"},React.createElement("div",{ className : "inline fields"},React.createElement("label",{ className : "six wide field"},"Engineering"),React.createElement(core_view_job_modal_EditJobModalComponents.FIELD,{ label : "Start", onChange : this.handleOnChange, name : "eng-start", value : sch2.engineering.start, className : "eight wide field"}),React.createElement(core_view_job_modal_EditJobModalComponents.FIELD,{ label : "Complete", onChange : this.handleOnChange, name : "eng-complete", value : sch2.engineering.complete, className : "eight wide field"})),React.createElement("div",{ className : "inline fields"},React.createElement("label",{ className : "six wide field"},"Mechanical"),React.createElement(core_view_job_modal_EditJobModalComponents.FIELD,{ label : "Start", onChange : this.handleOnChange, name : "mech-start", value : sch2.mechanical.start, className : "eight wide field"}),React.createElement(core_view_job_modal_EditJobModalComponents.FIELD,{ label : "Complete", onChange : this.handleOnChange, name : "mech-complete", value : sch2.mechanical.complete, className : "eight wide field"})),React.createElement("div",{ className : "inline fields"},React.createElement("label",{ className : "six wide field"},"Electrical"),React.createElement(core_view_job_modal_EditJobModalComponents.FIELD,{ label : "Start", onChange : this.handleOnChange, name : "elec-start", value : sch2.electrical.start, className : "eight wide field"}),React.createElement(core_view_job_modal_EditJobModalComponents.FIELD,{ label : "Complete", onChange : this.handleOnChange, name : "elec-complete", value : sch2.electrical.complete, className : "eight wide field"})),React.createElement("div",{ className : "inline fields"},React.createElement("label",{ className : "six wide field"},"Shipping"),React.createElement(core_view_job_modal_EditJobModalComponents.FIELD,{ label : "Start", onChange : this.handleOnChange, name : "ship-start", value : sch2.shipping.start, className : "eight wide field"}),React.createElement(core_view_job_modal_EditJobModalComponents.FIELD,{ label : "Complete", onChange : this.handleOnChange, name : "ship-complete", value : sch2.shipping.complete, className : "eight wide field"})),React.createElement("div",{ className : "inline fields"},React.createElement("label",{ className : "six wide field"},"Installation"),React.createElement(core_view_job_modal_EditJobModalComponents.FIELD,{ label : "Start", onChange : this.handleOnChange, name : "inst-start", value : sch2.installation.start, className : "eight wide field"}),React.createElement(core_view_job_modal_EditJobModalComponents.FIELD,{ label : "Complete", onChange : this.handleOnChange, name : "inst-complete", value : sch2.installation.complete, className : "eight wide field"})));
}});
core_view_job_modal_EditJobModalComponents.SYSTYPEINFORMATION = React.createClass({ initialize : function() {
}, render : function() {
	return React.createElement("div",{ className : "inline fields"},React.createElement("div",{ className : "eight wide field"},React.createElement("input",{ type : "text", placeholder : "Type 1"})),React.createElement("div",{ className : "eight wide field"},React.createElement("input",{ type : "text", placeholder : "Type 2"})));
}});
core_view_job_modal_EditJobModalComponents.DIVHEADER = React.createClass({ render : function() {
	return React.createElement("h4",{ className : "ui dividing header"},this.props.value);
}});
core_view_job_modal_EditJobModalComponents.FIELD = React.createClass({ handleOnChange : function(e) {
	var value = e.target.value;
	var name = this.props.name;
	this.props.onChange(name,value);
}, render : function() {
	var p = this.props;
	var type;
	if(p.type == null) type = "text"; else type = p.type;
	var pattern;
	if(p.pattern == null) pattern = ""; else pattern = p.pattern;
	return React.createElement("div",{ className : p.className},React.createElement("label",null,p.label),React.createElement("input",{ onChange : this.handleOnChange, name : p.name, value : this.props.value, type : type, ref : p.mask, placeholder : p.pholder, pattern : pattern}));
}});
core_view_job_modal_EditJobModalComponents.STATEDROPDOWN = React.createClass({ getInitialState : function() {
	var items = [];
	var _g = 0;
	var _g1 = core_view_components_Constants.stateAbbrArray;
	while(_g < _g1.length) {
		var abr = _g1[_g];
		++_g;
		items.push(React.createElement("div",{ 'data-value' : abr.abbr, key : "static-" + core_view_UidGenerator.nextId(), className : "item"},abr.state));
	}
	return { itms : items, firstSelected : this.props.def == null?"default":this.props.def};
}, initialize : function(input) {
	if(input == null) return;
	var elem = js.JQuery(ReactDOM.findDOMNode(input));
	elem.dropdown({ onChange : this.handleOnChange}).dropdown("set selected",this.state.firstSelected);
}, handleOnChange : function(value,text,selectedItem) {
	var name = this.props.name;
	this.props.onChange(name,value);
}, render : function() {
	return React.createElement("div",{ ref : this.initialize, className : "ui search selection dropdown"},React.createElement("input",{ name : "state", type : "hidden"}),React.createElement("i",{ className : "dropdown icon"}),React.createElement("div",{ className : "default text"},"State"),React.createElement("div",{ className : "menu"},this.state.itms));
}});
core_view_job_modal_NewJobModalComponents.JOBINFORMATION = React.createClass({ getInitialState : function() {
	return { obj : { }, id : { }, sm : { }, cu : { }};
}, submitChange : function() {
	var obj = this.state.obj;
	var id = this.state.id;
	var sm = this.state.sm;
	var cu = this.state.cu;
	obj.id = id;
	obj.salesman = sm;
	obj.customer = cu;
	if(this.props.onChange != null) this.props.onChange("jobInfo",obj);
	this.setState(obj);
}, handleOnChange : function(name,value) {
	if(value != null && value.length > 0) this.state.obj[name] = value; else Reflect.deleteField(this.state.obj,name);
	this.submitChange();
}, handleCustomer : function(name1,value1) {
	if(value1 != null && value1.length > 0) this.state.cu[name1] = value1; else Reflect.deleteField(this.state.cu,name1);
	this.submitChange();
}, handleSalesman : function(name2,value2) {
	if(value2 != null && value2.length > 0) this.state.sm[name2] = value2; else Reflect.deleteField(this.state.sm,name2);
	this.submitChange();
}, handleId : function(name3,value3) {
	if(value3 != null && value3.length > 0) this.state.id[name3] = value3; else Reflect.deleteField(this.state.id,name3);
	this.submitChange();
}, render : function() {
	return React.createElement("div",{ className : "field"},React.createElement("div",{ className : "three fields"},React.createElement(core_view_job_modal_NewJobModalComponents.FIELD,{ label : "Prefix", onChange : this.handleId, name : "prefix", className : "field"}),React.createElement(core_view_job_modal_NewJobModalComponents.FIELD,{ label : "Id", onChange : this.handleId, name : "label", className : "field"}),React.createElement(core_view_job_modal_NewJobModalComponents.FIELD,{ label : "Year", onChange : this.handleId, name : "year", min : "1000", type : "number", max : "9999", className : "field"})),React.createElement(core_view_job_modal_NewJobModalComponents.FIELD,{ label : "Customer", onChange : this.handleCustomer, name : "customer", className : "field"}),React.createElement("div",{ className : "two fields"},React.createElement(core_view_job_modal_NewJobModalComponents.FIELD,{ label : "Salesman", onChange : this.handleSalesman, name : "salesman", className : "field"}),React.createElement(core_view_job_modal_NewJobModalComponents.FIELD,{ label : "Contract Price", onChange : this.handleOnChange, name : "customer", className : "field"})),React.createElement("div",{ className : "two fields"},React.createElement(core_view_job_modal_NewJobModalComponents.FIELD,{ label : "Start Date", onChange : this.handleOnChange, name : "start", type : "date", className : "field"}),React.createElement(core_view_job_modal_NewJobModalComponents.FIELD,{ label : "Due Date", onChange : this.handleOnChange, name : "due", type : "date", className : "field"})));
}});
core_view_job_modal_NewJobModalComponents.CUSTINFORMATION = React.createClass({ getInitialState : function() {
	return { obj : { addresses : { }}, ad : { }, ca : { }};
}, submitChange : function() {
	var obj = this.state.obj;
	var ad = this.state.ad;
	var ca = this.state.ca;
	obj.contact = ca;
	obj.addresses.shipping = ad;
	if(this.props.onChange != null) this.props.onChange("custInfo",obj);
	this.setState(obj);
}, handleOnChange : function(name,value) {
	if(value != null && value.length > 0) this.state.obj[name] = value; else Reflect.deleteField(this.state.obj,name);
	this.submitChange();
}, handleContact : function(name1,value1) {
	if(value1 != null && value1.length > 0) this.state.ca[name1] = value1; else Reflect.deleteField(this.state.ca,name1);
	this.submitChange();
}, handleAddress : function(name2,value2) {
	if(value2 != null && value2.length > 0) this.state.ad[name2] = value2; else Reflect.deleteField(this.state.ad,name2);
	this.submitChange();
}, render : function() {
	return React.createElement("div",{ className : "field"},React.createElement("div",{ className : "two fields"},React.createElement(core_view_job_modal_NewJobModalComponents.FIELD,{ label : "Phone", onChange : this.handleContact, name : "phone", className : "field"}),React.createElement(core_view_job_modal_NewJobModalComponents.FIELD,{ label : "Fax", onChange : this.handleContact, name : "fax", className : "field"})),React.createElement("div",{ className : "two fields"},React.createElement(core_view_job_modal_NewJobModalComponents.FIELD,{ label : "Contact", onChange : this.handleContact, name : "contact", className : "field"}),React.createElement(core_view_job_modal_NewJobModalComponents.FIELD,{ label : "Email", onChange : this.handleContact, name : "email", className : "field"})),React.createElement(core_view_job_modal_NewJobModalComponents.FIELD,{ label : "Address 1", onChange : this.handleAddress, name : "line1", className : "field"}),React.createElement(core_view_job_modal_NewJobModalComponents.FIELD,{ label : "Address 2", onChange : this.handleAddress, name : "line2", className : "field"}),React.createElement("div",{ className : "fields"},React.createElement(core_view_job_modal_NewJobModalComponents.FIELD,{ label : "City", onChange : this.handleAddress, name : "city", className : "field"}),React.createElement("div",{ className : "field"},React.createElement("label",null,"State"),React.createElement(core_view_job_modal_NewJobModalComponents.STATEDROPDOWN,{ onChange : this.handleAddress, name : "stateOrProvince"})),React.createElement(core_view_job_modal_NewJobModalComponents.FIELD,{ label : "Zip Code", onChange : this.handleAddress, name : "postalCode", className : "field"})));
}});
core_view_job_modal_NewJobModalComponents.INVADDRINFORMATION = React.createClass({ getInitialState : function() {
	return { obj : { }};
}, submitChange : function() {
	var obj = this.state.obj;
	if(this.props.onChange != null) this.props.onChange("invInfo",obj);
	this.setState(obj);
}, handleOnChange : function(name,value) {
	if(value != null && value.length > 0) this.state.obj[name] = value; else Reflect.deleteField(this.state.obj,name);
	this.submitChange();
}, render : function() {
	return React.createElement("div",{ className : "field"},React.createElement(core_view_job_modal_NewJobModalComponents.FIELD,{ label : "Address 1", onChange : this.handleOnChange, name : "line1", className : "field"}),React.createElement(core_view_job_modal_NewJobModalComponents.FIELD,{ label : "Address 2", onChange : this.handleOnChange, name : "line2", className : "field"}),React.createElement("div",{ className : "fields"},React.createElement(core_view_job_modal_NewJobModalComponents.FIELD,{ label : "City", onChange : this.handleOnChange, name : "city", className : "field"}),React.createElement("div",{ className : "field"},React.createElement("label",null,"State"),React.createElement(core_view_job_modal_NewJobModalComponents.STATEDROPDOWN,{ onChange : this.handleOnChange, name : "stateOrProvince"})),React.createElement(core_view_job_modal_NewJobModalComponents.FIELD,{ label : "Zip Code", onChange : this.handleOnChange, name : "postalCode", className : "field"})));
}});
core_view_job_modal_NewJobModalComponents.DIVHEADER = React.createClass({ render : function() {
	return React.createElement("h4",{ className : "ui dividing header"},this.props.value);
}});
core_view_job_modal_NewJobModalComponents.FIELD = React.createClass({ handleOnChange : function(e) {
	var value = e.target.value;
	var name = this.props.name;
	this.props.onChange(name,value);
}, render : function() {
	var p = this.props;
	var type;
	if(p.type == null) type = "text"; else type = p.type;
	var pattern;
	if(p.pattern == null) pattern = ""; else pattern = p.pattern;
	return React.createElement("div",{ className : p.className},React.createElement("label",null,p.label),React.createElement("input",{ onChange : this.handleOnChange, name : p.name, type : type, ref : p.mask, placeholder : p.pholder, pattern : pattern}));
}});
core_view_job_modal_NewJobModalComponents.STATEDROPDOWN = React.createClass({ getInitialState : function() {
	var items = [];
	var _g = 0;
	var _g1 = core_view_components_Constants.stateAbbrArray;
	while(_g < _g1.length) {
		var abr = _g1[_g];
		++_g;
		items.push(React.createElement("div",{ 'data-value' : abr.abbr, key : "static-" + core_view_UidGenerator.nextId(), className : "item"},abr.state));
	}
	return { itms : items};
}, initialize : function(input) {
	if(input == null) return;
	var elem = js.JQuery(ReactDOM.findDOMNode(input));
	elem.dropdown({ onChange : this.handleOnChange});
}, handleOnChange : function(value,text,selectedItem) {
	var name = this.props.name;
	this.props.onChange(name,value);
}, render : function() {
	return React.createElement("div",{ ref : this.initialize, className : "ui search selection dropdown"},React.createElement("input",{ name : "state", type : "hidden"}),React.createElement("i",{ className : "dropdown icon"}),React.createElement("div",{ className : "default text"},"State"),React.createElement("div",{ className : "menu"},this.state.itms));
}});
core_view_job_structure_JobTableStructure.mainJobRow = React.createClass({ getInitialState : function() {
	return { clicked : this.props.clicked};
}, handleClickEvent : function() {
	if(this.props.revisions == false) return;
	this.props.toggleSubRow();
	this.setState({ clicked : !this.state.clicked});
}, render : function() {
	var clicked = this.state.clicked;
	var s1 = { display : clicked == false?"":"none"};
	var s2 = { display : clicked == true?"":"none"};
	var rightIcon = classNames("toggle","right","icon",{ disabled : this.props.revisions == false});
	var downIcon = classNames("toggle","down","icon",{ disabled : this.props.revisions == false});
	var exCol = null;
	if(this.props.revTable != true) exCol = React.createElement("td",{ onClick : this.handleClickEvent, className : "collapsing"},React.createElement("i",{ id : "icon1", style : s1, className : rightIcon}),React.createElement("i",{ id : "icon2", style : s2, className : downIcon}));
	return React.createElement("tr",{ onDoubleClick : this.props.onClick},exCol,this.props.children);
}});
core_view_job_structure_JobTableStructure.subJobRow = React.createClass({ render : function() {
	var s = { backgroundColor : "lightgray !important", color : "black !important"};
	return React.createElement("tr",{ style : s, className : "transition hidden"},React.createElement("td",{ colSpan : "16"},this.props.children));
}});
core_view_main_ContentManager.STATICJOB = "\r\n        {\r\n          \"pk\": \"26486\",\r\n          \"id\": {\r\n            \"prefix\": \"F\",\r\n            \"year\": \"2015\",\r\n            \"label\": \"A123\"\r\n          },\r\n          \"status\": \"DELETED\",\r\n          \"description\": \"BlankString0\",\r\n          \"start\": \"2015-01-01\",\r\n          \"due\": \"2015-01-01\",\r\n          \"shop\": {\r\n            \"pk\": \"1235\",\r\n            \"label\": \"BlankString1\"\r\n          },\r\n          \"salesperson\": {\r\n            \"pk\": \"589\",\r\n            \"label\": \"BlankString2\"\r\n          },\r\n          \"customer\": {\r\n            \"pk\": \"456\",\r\n            \"label\": \"BlankString3\"\r\n          },\r\n          \"contact\": {\r\n            \"pk\": \"76\",\r\n            \"label\": \"BlankString4\",\r\n            \"phone\": \"(901) 555-1234\",\r\n            \"fax\": \"(901) 555-1234\",\r\n            \"email\": \"BlankString5\"\r\n          },\r\n          \"schedules\": {\r\n            \"engineering\": {\r\n              \"start\": \"2015-01-01\",\r\n              \"complete\": \"2015-01-01\"\r\n            },\r\n            \"mechanical\": {\r\n              \"start\": \"2015-01-01\",\r\n              \"complete\": \"2015-01-01\"\r\n            },\r\n            \"electrical\": {\r\n              \"start\": \"2015-01-01\",\r\n              \"complete\": \"2015-01-01\"\r\n            },\r\n            \"shipping\": {\r\n              \"start\": \"2015-01-01\",\r\n              \"complete\": \"2015-01-01\"\r\n            },\r\n            \"installation\": {\r\n              \"start\": \"2015-01-01\",\r\n              \"complete\": \"2015-01-01\"\r\n            }\r\n          },\r\n          \"addresses\": {\r\n            \"shipping\": {\r\n              \"pk\": \"3456\",\r\n              \"lines\": \"123 Main St \\n APT 1\",\r\n              \"city\": \"memphis\",\r\n              \"stateOrProvince\": \"TN\",\r\n              \"postalCode\": \"38104\",\r\n              \"country\": \"USA\"\r\n            },\r\n            \"invoicing\": {\r\n              \"pk\": \"998\",\r\n              \"lines\": \"123 Main St \\n APT 1\",\r\n              \"city\": \"memphis\",\r\n              \"stateOrProvince\": \"TN\",\r\n              \"postalCode\": \"38104\",\r\n              \"country\": \"USA\"\r\n            }\r\n          },\r\n          \"revisions\": [\r\n            {\r\n              \"label\": \"R3\",\r\n              \"description\": \"BlankString6\",\r\n              \"created\": \"2015-01-01 00:00:00\"\r\n            },\r\n            {\r\n              \"label\": \"R2\",\r\n              \"description\": \"BlankString7\",\r\n              \"created\": \"2015-01-01 00:00:00\"\r\n            },\r\n            {\r\n              \"label\": \"R1\",\r\n              \"description\": \"BlankString8\",\r\n              \"created\": \"2015-01-01 00:00:00\"\r\n            }\r\n          ],\r\n           \"drawings\": [\r\n            {\r\n              \"label\": \"D123\",\r\n              \"type\": \"LAYOUT\",\r\n              \"startDate\": \"2015-01-01\",\r\n              \"shopDate\": \"2015-01-01\",\r\n              \"fieldDate\": \"2015-01-01\",\r\n              \"marks\": [\r\n                {\r\n                  \"label\": \"A-D123\",\r\n                  \"type\": \"S\"\r\n                },\r\n                {\r\n                  \"label\": \"B-D123-1\",\r\n                  \"type\": \"S\"\r\n                },\r\n                {\r\n                  \"label\": \"B-D123-2\",\r\n                  \"type\": \"S\"\r\n                }\r\n              ]\r\n            }\r\n          ],\r\n          \"purchaseOrders\": [\r\n            {\r\n              \"pk\": 15948,\r\n              \"number\": 1,\r\n              \"drawingPk\": \"D123\",\r\n              \"part\": {\r\n                \"pk\": \"5481\",\r\n                \"type\": \"MECH\",\r\n                \"number\": \"LO34507823\",\r\n                \"description\": \"BlankString9\"\r\n              },\r\n              \"manufacturer\": {\r\n                \"pk\": \"6194\",\r\n                \"label\": \"BlankString10\"\r\n              },\r\n              \"vendor\": {\r\n                \"pk\": \"26156\",\r\n                \"label\": \"BlankString11\"\r\n              },\r\n              \"po\": \"BlankString12\",\r\n              \"requestedQuantity\": 100,\r\n              \"stockQuantity\": 50,\r\n              \"purchaseQuantity\": 50,\r\n              \"requestDate\": \"2015-01-01\",\r\n              \"purchaseDate\": \"2015-01-01\",\r\n              \"releaseDate\": \"2015-01-01\",\r\n              \"releasedBy\": \"BlankString13\"\r\n            }\r\n          ]\r\n        }\r\n    ";
core_view_main_ContentManager.STATICSHIPMENT = "\r\n        {\r\n           \"pk\":1,\r\n           \"jobPk\":1,\r\n           \"number\":1,\r\n           \"status\":\"ACTIVE|COMPLETE|CANCELLED|DELETED\",\r\n           \"billOfLading\":\"alphanum\",\r\n           \"weight\":100,\r\n           \"shipDate\":\"yyyy/mm/dd\",\r\n           \"shop\":{\r\n              \"pk\":1,\r\n              \"label\":\"MEM\"\r\n           },\r\n           \"carrier\":{\r\n              \"pk\":1,\r\n              \"label\":\"FedEx\"\r\n           },\r\n           \"contact\":{\r\n              \"pk\":1,\r\n              \"label\":\"Steve Thundthighs\",\r\n              \"phone\":\"(XXX) XXX-XXXX\",\r\n              \"fax\":\"(XXX) XXX-XXXX\",\r\n              \"email\":\"blah@blah.com\"\r\n           },\r\n           \"address\":{\r\n              \"pk\":1,\r\n              \"lines\":\"123 Main St \\n APT 1\",\r\n              \"city\":\"memphis\",\r\n              \"stateOrProvince\":\"tennessee\",\r\n              \"postalCode\":\"38104\",\r\n              \"country\":\"USA\"\r\n           },\r\n           \"items\":[\r\n              {\r\n                 \"pk\":1,\r\n                 \"quantity\":100,\r\n                 \"item\":{\r\n                    \"pk\":1,\r\n                    \"status\":\"FAB|PREFAB|SHPD|RTA|RTS|MACH|MOO|NS|PAINT|SIP|WP|SAMPLE|MEM|FTS|VOID|NEXT|HOLD\",\r\n                    \"requested\":100,\r\n                    \"completed\":100,\r\n                    \"remarks\":\"blah blah blah\",\r\n                    \"shop\":{\r\n                       \"pk\":1,\r\n                       \"label\":\"MEM\"\r\n                    },\r\n                    \"zones\":[\r\n                       {\r\n                          \"pk\":1,\r\n                          \"quantity\":100,\r\n                          \"zone\":{\r\n                             \"pk\":1,\r\n                             \"jobPk\":1,\r\n                             \"number\":1,\r\n                             \"fieldDate\":\"yyyy-mm-dd\"\r\n                          }\r\n                       }\r\n                    ]\r\n                 }\r\n              }\r\n           ]\r\n        }\r\n    ";
core_view_main_ContentManager.contentMap = { jobView : function(info) {
	var jobArray = [];
	var a = JSON.parse(core_view_main_ContentManager.STATICJOB);
	var b = JSON.parse(core_view_main_ContentManager.STATICJOB);
	var c = JSON.parse(core_view_main_ContentManager.STATICJOB);
	b.id.label = a.id.label + "2";
	c.id.label = a.id.label + "3";
	a.id.label += "1";
	jobArray = jobArray.concat([a,b,c]);
	return jobArray;
}, dwgView : function(info1) {
	var job = info1;
	return job.drawings;
}, abmView : function(info2) {
	var job1 = info2;
	if(job1.purchaseOrders == null) job1.purchaseOrders = [];
	return job1.purchaseOrders;
}, shpmntView : function(info3) {
	var job2 = info3;
	var a0 = JSON.parse(core_view_main_ContentManager.STATICSHIPMENT);
	var b0 = JSON.parse(core_view_main_ContentManager.STATICSHIPMENT);
	var c0 = JSON.parse(core_view_main_ContentManager.STATICSHIPMENT);
	var a1 = JSON.parse(core_view_main_ContentManager.STATICSHIPMENT);
	var b1 = JSON.parse(core_view_main_ContentManager.STATICSHIPMENT);
	var c1 = JSON.parse(core_view_main_ContentManager.STATICSHIPMENT);
	var a2 = JSON.parse(core_view_main_ContentManager.STATICSHIPMENT);
	var b2 = JSON.parse(core_view_main_ContentManager.STATICSHIPMENT);
	var c2 = JSON.parse(core_view_main_ContentManager.STATICSHIPMENT);
	return [a0,b0,c0,a1,b1,c1,a2,b2,c2];
}, markView : function(info4) {
	var job3 = info4;
	var markArray = [];
	if(job3.drawings == null) job3.drawings = [];
	var _g = 0;
	var _g1 = job3.drawings;
	while(_g < _g1.length) {
		var dwg = _g1[_g];
		++_g;
		var _g2 = 0;
		var _g3 = dwg.marks;
		while(_g2 < _g3.length) {
			var mk = _g3[_g2];
			++_g2;
			mk.drawingId = dwg.label;
		}
		markArray = markArray.concat(dwg.marks);
	}
	return markArray;
}, rmsView : function(info5) {
	var job4 = info5;
	var s = "\r\n            {\r\n              \"pk\": 1,\r\n              \"jobPk\": 1,\r\n              \"label\": \"RMS-456\",\r\n              \"rush\": false,\r\n              \"items\": [\r\n                  {\r\n                    \"pk\": 3,\r\n                    \"status\": \"PREFAB\",\r\n                    \"label\": \"SI-30\",\r\n                    \"requested\": 300,\r\n                    \"completed\": 20,\r\n                    \"remarks\": \"Things\",\r\n                    \"shop\": \"MEM\",\r\n                    \"zones\":\r\n                        {\r\n                          \"pk\": 1,\r\n                          \"quantity\": \"420\",\r\n                          \"zone\":{}\r\n\r\n                        }\r\n                  }\r\n              ]\r\n            }";
	var a01 = JSON.parse(s);
	var a11 = JSON.parse(s);
	var a21 = JSON.parse(s);
	var a3 = JSON.parse(s);
	a01.pk = 1;
	a11.pk = 2;
	a21.pk = 3;
	a3.pk = 4;
	var rmsArray = [a01,a11,a21,a3];
	return rmsArray;
}};
core_view_main_SideMenu.displayName = "SideMenu";
core_view_shipment_ShipmentViewMenu.displayName = "ShipmentViewMenu";
core_view_mark_MarkViewMenu.displayName = "MarkViewMenu";
core_view_rms_RmsViewMenu.displayName = "RmsViewMenu";
core_view_main_ViewRegistry.views = { jobView : function(content) {
	var structure = new core_view_job_structure_JobTableStructure();
	var order = structure.generateDefaultOrder(content);
	var cls = ["selectable"];
	return React.createElement(core_view_components_TableComponent,{ ordering : order, classes : cls, structure : structure, data : content});
}, jobMenu : function() {
	return React.createElement(core_view_job_JobViewMenu,null);
}, homeView : function() {
	return React.createElement("div",{ className : "ui"},React.createElement("h3",{ className : "ui dividing header"},"Welcome to SSI Job Management Suite"),React.createElement("p",null,"Please Login to Begin."));
}, homeMenu : function() {
	return React.createElement("div",{ id : "topMenu", className : "ui menu"});
}, dwgMenu : function() {
	return React.createElement(core_view_dwg_DwgViewMenu,null);
}, dwgView : function(content1) {
	var structure1 = new core_view_dwg_structure_DwgTableStructure();
	var order1 = structure1.generateDefaultOrder(content1);
	var cls1 = ["selectable"];
	return React.createElement(core_view_components_TableComponent,{ ordering : order1, classes : cls1, structure : structure1, data : content1});
}, shpmntMenu : function() {
	return React.createElement(core_view_shipment_ShipmentViewMenu,null);
}, shpmntView : function(content2) {
	var structure2 = new core_view_shipment_structure_ShipmentTableStructure();
	var order2 = structure2.generateDefaultOrder(content2);
	var cls2 = ["selectable"];
	return React.createElement(core_view_components_TableComponent,{ ordering : order2, classes : cls2, structure : structure2, data : content2});
}, abmMenu : function() {
	return React.createElement(core_view_abm_AbmViewMenu,null);
}, abmView : function(content3) {
	var structure3 = new core_view_abm_structure_AbmTableStructure();
	var order3 = structure3.generateDefaultOrder(content3);
	var cls3 = ["selectable"];
	return React.createElement(core_view_components_TableComponent,{ ordering : order3, classes : cls3, structure : structure3, data : content3});
}, markMenu : function() {
	return React.createElement(core_view_mark_MarkViewMenu,null);
}, markView : function(content4) {
	var structure4 = new core_view_mark_structure_MarkTableStructure();
	var order4 = structure4.generateDefaultOrder(content4);
	var cls4 = ["selectable"];
	return React.createElement(core_view_components_TableComponent,{ ordering : order4, classes : cls4, structure : structure4, data : content4});
}, rmsMenu : function() {
	return React.createElement(core_view_rms_RmsViewMenu,null);
}, rmsView : function(content5) {
	var structure5 = new core_view_rms_structure_RmsTableStructure();
	var order5 = structure5.generateDefaultOrder(content5);
	var cls5 = ["selectable"];
	return React.createElement(core_view_components_TableComponent,{ ordering : order5, classes : cls5, structure : structure5, data : content5});
}};
core_view_mark_modal_NewMarkModalComponents.DIVHEADER = React.createClass({ render : function() {
	return React.createElement("h4",{ className : "ui dividing header"},this.props.value);
}});
core_view_mark_modal_NewMarkModalComponents.ZONETABLE = React.createClass({ getInitialState : function() {
	return { zones : [{ zone : "Zone 1", qty : "300", checked : false}], checked : 0};
}, handleOnChange : function(e) {
	var value = e.target.value;
	var name = this.props.name;
	this.props.onChange(name,value);
}, handleRemoveClick : function() {
	var curZones = this.state.zones;
	var i = this.state.checked;
	curZones = curZones.filter(function(z) {
		var b = z.checked != null && z.checked != true;
		if(!b) i -= 1;
		return b;
	});
	this.setState({ zones : curZones, checked : i});
}, handleAddClick : function() {
	var curZones1 = this.state.zones;
	if(this.state.newZone == true) curZones1.map(function(z1) {
		if(z1.checked == null) z1.checked = false;
		return z1;
	}); else curZones1.push({ });
	this.setState({ zones : curZones1});
}, checked : function(e1) {
	var curZones2 = this.state.zones;
	var z2 = curZones2[e1.target.dataset.zone];
	z2.checked = !z2.checked;
	curZones2[e1.target.dataset.zone] = z2;
	var i1;
	if(z2.checked == true) i1 = this.state.checked + 1; else i1 = this.state.checked - 1;
	this.setState({ zones : curZones2, checked : i1});
}, render : function() {
	var p = this.props;
	var type;
	if(p.type == null) type = "text"; else type = p.type;
	var pattern;
	if(p.pattern == null) pattern = ""; else pattern = p.pattern;
	var curZones3 = this.state.zones;
	var ss = this.setState;
	var zones = [];
	var newZone = false;
	var index = 0;
	var _g = 0;
	while(_g < curZones3.length) {
		var z3 = [curZones3[_g]];
		++_g;
		newZone = newZone || (z3[0].zone == null || z3[0].qty == null);
		var a1 = { display : z3[0].zone == null?"none":""};
		var a2 = { display : z3[0].zone != null?"none":""};
		var b1 = { display : z3[0].qty == null?"none":""};
		var b2 = { display : z3[0].qty != null?"none":""};
		var onChange = (function(z3) {
			return function(input,text) {
				if(input == "zone") z3[0].zone = text;
				if(input.target != null) z3[0].qty = input.target.value;
			};
		})(z3);
		var zoneStr;
		if(z3[0].zone != null) zoneStr = z3[0].zone; else zoneStr = "empty";
		zoneStr = zoneStr.split(" ").join("-").toLowerCase() + "-";
		zones.push(React.createElement("tr",{ key : "zone-" + zoneStr + index},React.createElement("td",{ key : "inner-zone-" + zoneStr + index, className : "collapsing"},React.createElement("div",{ onClick : this.checked, className : "ui checkbox"},React.createElement("input",{ value : z3[0].checked, type : "checkbox", 'data-zone' : index++}),React.createElement("label",null))),React.createElement("td",{ key : "inner"},React.createElement("div",{ style : a1},z3[0].zone),React.createElement("div",{ style : a2},React.createElement(core_view_mark_modal_NewMarkModalComponents.ZONEDROPDOWN,{ onChange : onChange}))),React.createElement("td",{ key : core_view_UidGenerator.nextId()},React.createElement("div",{ style : b1},z3[0].qty),React.createElement("div",{ style : b2},React.createElement("input",{ type : "number", onBlur : onChange})))));
	}
	this.state.newZone = newZone;
	var cancel;
	if(newZone) cancel = "Cancel"; else cancel = "Remove";
	var accept;
	if(newZone) accept = "Accept"; else accept = "Add";
	var cancelCls;
	cancelCls = "ui black button" + (newZone || this.state.checked > 0?"":" disabled");
	return React.createElement("div",{ className : "field"},React.createElement("table",{ className : "ui very basic table"},React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",null),React.createElement("th",null,"Zone"),React.createElement("th",null,"Requested"))),React.createElement("tbody",null,zones)),React.createElement("div",{ className : "fields"},React.createElement("div",{ className : "three wide field"}),React.createElement("div",{ className : "ten wide field"},React.createElement("div",{ onClick : this.handleRemoveClick, className : cancelCls},cancel),React.createElement("div",{ onClick : this.handleAddClick, className : "ui right floated green button"},accept)),React.createElement("div",{ className : "three wide field"})));
}});
core_view_mark_modal_NewMarkModalComponents.FIELD = React.createClass({ handleOnChange : function(e) {
	var value = e.target.value;
	var name = this.props.name;
	this.props.onChange(name,value);
}, render : function() {
	var p = this.props;
	var type;
	if(p.type == null) type = "text"; else type = p.type;
	var pattern;
	if(p.pattern == null) pattern = ""; else pattern = p.pattern;
	return React.createElement("div",{ className : p.className},React.createElement("label",null,p.label),React.createElement("input",{ onChange : this.handleOnChange, name : p.name, value : p.value, type : type, ref : p.mask, placeholder : p.pholder, pattern : pattern}));
}});
core_view_mark_modal_NewMarkModalComponents.MARKTYPEDROPDOWN = React.createClass({ initialize : function(input) {
	if(input == null) return;
	var elem = js.JQuery(ReactDOM.findDOMNode(input));
	var value = this.props.value;
	if(value == null) value = "default";
	elem.dropdown({ onChange : this.handleOnChange}).dropdown("set selected",value);
}, handleOnChange : function(value1,text,selectedItem) {
	var name = this.props.name;
	this.props.onChange(name,value1);
}, render : function() {
	return React.createElement("div",{ ref : this.initialize, className : "ui selection dropdown"},React.createElement("input",{ name : "dwg-type", type : "hidden"}),React.createElement("i",{ className : "dropdown icon"}),React.createElement("div",{ className : "default text"},"Mark Type"),React.createElement("div",{ className : "menu"},React.createElement("div",{ 'data-value' : "S", className : "item"},"S"),React.createElement("div",{ 'data-value' : "W", className : "item"},"W")));
}});
core_view_mark_modal_NewMarkModalComponents.ZONEDROPDOWN = React.createClass({ initialize : function(input) {
	if(input == null) return;
	var elem = js.JQuery(ReactDOM.findDOMNode(input));
	elem.dropdown({ onChange : this.handleOnChange});
}, handleOnChange : function(value,text) {
	this.props.onChange("zone",text);
}, render : function() {
	return React.createElement("div",{ ref : this.initialize, className : "ui selection dropdown"},React.createElement("input",{ name : "zone", type : "hidden"}),React.createElement("i",{ className : "dropdown icon"}),React.createElement("div",{ className : "default text"},"Pick Zone"),React.createElement("div",{ className : "menu"},React.createElement("div",{ 'data-value' : "1", className : "item"},"Zone 1"),React.createElement("div",{ 'data-value' : "2", className : "item"},"Zone 2")));
}});
js_Boot.__toStr = {}.toString;
core_view_rms_modal_NewRmsModalComponents.DIVHEADER = React.createClass({ render : function() {
	return React.createElement("h5",{ className : "ui dividing header"},this.props.value);
}});
core_view_rms_modal_NewRmsModalComponents.FIELD = React.createClass({ handleOnChange : function(e) {
	var value = e.target.value;
	var name = this.props.name;
	this.props.onChange(name,value);
}, render : function() {
	var p = this.props;
	var type;
	if(p.type == null) type = "text"; else type = p.type;
	var pattern;
	if(p.pattern == null) pattern = ""; else pattern = p.pattern;
	return React.createElement("div",{ className : p.className},React.createElement("label",null,p.label),React.createElement("input",{ onChange : this.handleOnChange, name : p.name, value : p.value, type : type, ref : p.mask, placeholder : p.pholder, pattern : pattern}));
}});
core_view_rms_modal_NewRmsModalComponents.SHIPITEMTABLE = React.createClass({ getInitialState : function() {
	return { selected : { }, addingItem : false, selCount : 0, items : [{ label : "RMS-121-1", remarks : "Specialty Bolt", requested : "300"},{ label : "RMS-121-2", remarks : "Specialty Bolt", requested : "300"},{ label : "RMS-121-3", remarks : "Specialty Bolt", requested : "300"}]};
}, handleAddClick : function(e) {
	console.log("Click");
	js.JQuery.tab("change tab","new-tab");
}, handleRemoveClick : function(e1) {
	var selCount = this.state.selCount;
	var items = this.state.items;
	var count = this.state.items.length;
	var selected = this.state.selected;
	var i = 0;
	while(i < count) {
		if(selected[i] == true) {
			var x = items[i];
			HxOverrides.remove(items,x);
			selCount -= 1;
		}
		i += 1;
	}
	this.setState({ selCount : selCount, items : items, selected : { }});
}, handleCheckBox : function(e2) {
	var index = e2.target.dataset.index;
	var selected1 = this.state.selected;
	selected1[index] = !selected1[index];
	var i1 = this.state.selCount;
	if(selected1[index]) i1 += 1; else i1 += -1;
	this.setState({ selected : selected1, selCount : i1});
}, render : function() {
	var tabs = [];
	var page = [];
	console.log(this.state.selected);
	var items1 = this.state.items;
	if(items1 == null) items1 = this.state.internalItems;
	var tabCount = Math.ceil(items1.length / 5.0);
	var _g1 = 0;
	var _g = tabCount;
	while(_g1 < _g) {
		var i2 = _g1++;
		var rows = [];
		var start = i2 * 5;
		var index1 = 0;
		var _g2 = 0;
		var _g3 = items1.slice(start,start + 5);
		while(_g2 < _g3.length) {
			var item = _g3[_g2];
			++_g2;
			var checked = this.state.selected[index1] == true;
			var key = Std.string(item.label) + "-" + index1;
			if(this.state.addingItem == true) key += "-extra";
			rows.push(React.createElement("tr",{ key : key},React.createElement("td",{ className : "collapsing"},React.createElement("div",{ onClick : this.handleCheckBox, className : "ui fitted checkbox"},React.createElement("input",{ value : checked, type : "checkbox", 'data-index' : index1++}),React.createElement("label",null))),React.createElement("td",null,item.label),React.createElement("td",null,item.remarks),React.createElement("td",null,item.requested)));
		}
		var dataTab = "sitemtab-" + i2;
		var tbcls = classNames("ui","basic","tab",{ active : i2 == 0},"segment");
		tabs.push(React.createElement("div",{ 'data-tab' : dataTab, key : "tseg-" + dataTab, className : tbcls},React.createElement("table",{ className : "ui very basic table"},React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",null),React.createElement("th",null,"Item ID"),React.createElement("th",null,"Descripiton"),React.createElement("th",null,"Requested"))),React.createElement("tbody",null,rows))));
		var tabInitialize = function(input1) {
			if(input1 == null) return;
			var tab = js.JQuery(input1);
			tab.tab();
		};
		var cls = classNames("item",{ active : i2 == 0});
		page.push(React.createElement("a",{ 'data-tab' : dataTab, ref : tabInitialize, key : "key-" + dataTab, className : cls},i2 + 1));
	}
	var addingItem = this.state.addingItem;
	var selCount1 = this.state.selCount;
	var onLoad = function(input,add) {
		if(input == null) return;
		var elem = js.JQuery(ReactDOM.findDOMNode(input));
		if(selCount1 > 0) elem.removeClass("disabled");
	};
	return React.createElement("div",{ className : "field"},tabs,React.createElement("div",{ className : "ui center aligned container"},React.createElement("div",{ className : "ui pagination tabular menu"},page)),React.createElement("h5",{ className : "ui dividing header"}),React.createElement("div",{ className : "fields"},React.createElement("div",{ className : "four wide field"}),React.createElement("div",{ className : "eight wide field"},React.createElement("div",{ onClick : this.handleRemoveClick, ref : onLoad, key : core_view_UidGenerator.nextId(), className : "ui black button disabled"},"Remove"),React.createElement("div",{ onClick : this.handleAddClick, key : core_view_UidGenerator.nextId(), className : "ui right floated green button"},"Add")),React.createElement("div",{ className : "four wide field"})));
}});
core_view_rms_modal_NewRmsModalComponents.ZONETABLE = React.createClass({ getInitialState : function() {
	return { zones : [{ zone : "Zone 1", qty : "300", checked : false}], checked : 0};
}, handleOnChange : function(e) {
	var value = e.target.value;
	var name = this.props.name;
	this.props.onChange(name,value);
}, handleRemoveClick : function() {
	var curZones = this.state.zones;
	var i = this.state.checked;
	curZones = curZones.filter(function(z) {
		var b = z.checked != null && z.checked != true;
		if(!b) i -= 1;
		return b;
	});
	this.setState({ zones : curZones, checked : i});
}, handleAddClick : function() {
	var curZones1 = this.state.zones;
	if(this.state.newZone == true) curZones1.map(function(z1) {
		if(z1.checked == null) z1.checked = false;
		return z1;
	}); else curZones1.push({ });
	this.setState({ zones : curZones1});
}, checked : function(e1) {
	var curZones2 = this.state.zones;
	var z2 = curZones2[e1.target.dataset.zone];
	z2.checked = !z2.checked;
	curZones2[e1.target.dataset.zone] = z2;
	var i1;
	if(z2.checked == true) i1 = this.state.checked + 1; else i1 = this.state.checked - 1;
	this.setState({ zones : curZones2, checked : i1});
}, render : function() {
	var p = this.props;
	var type;
	if(p.type == null) type = "text"; else type = p.type;
	var pattern;
	if(p.pattern == null) pattern = ""; else pattern = p.pattern;
	var curZones3 = this.state.zones;
	var ss = this.setState;
	var zones = [];
	var newZone = false;
	var index = 0;
	var _g = 0;
	while(_g < curZones3.length) {
		var z3 = [curZones3[_g]];
		++_g;
		newZone = newZone || (z3[0].zone == null || z3[0].qty == null);
		var a1 = { display : z3[0].zone == null?"none":""};
		var a2 = { display : z3[0].zone != null?"none":""};
		var b1 = { display : z3[0].qty == null?"none":""};
		var b2 = { display : z3[0].qty != null?"none":""};
		var onChange = (function(z3) {
			return function(input,text) {
				if(input == "zone") z3[0].zone = text;
				if(input.target != null) z3[0].qty = input.target.value;
			};
		})(z3);
		var zoneStr;
		if(z3[0].zone != null) zoneStr = z3[0].zone; else zoneStr = "empty";
		zoneStr = zoneStr.split(" ").join("-").toLowerCase() + "-";
		zones.push(React.createElement("tr",{ key : "zone-" + zoneStr + index},React.createElement("td",{ key : "inner-zone-" + zoneStr + index, className : "collapsing"},React.createElement("div",{ onClick : this.checked, className : "ui checkbox"},React.createElement("input",{ value : z3[0].checked, type : "checkbox", 'data-zone' : index++}),React.createElement("label",null))),React.createElement("td",{ key : "inner"},React.createElement("div",{ style : a1},z3[0].zone),React.createElement("div",{ style : a2},React.createElement(core_view_rms_modal_NewRmsModalComponents.ZONEDROPDOWN,{ onChange : onChange}))),React.createElement("td",{ key : core_view_UidGenerator.nextId()},React.createElement("div",{ style : b1},z3[0].qty),React.createElement("div",{ style : b2},React.createElement("input",{ type : "number", onBlur : onChange})))));
	}
	this.state.newZone = newZone;
	var cancel;
	if(newZone) cancel = "Cancel"; else cancel = "Remove";
	var accept;
	if(newZone) accept = "Accept"; else accept = "Add";
	var cancelCls;
	cancelCls = "ui black button" + (newZone || this.state.checked > 0?"":" disabled");
	return React.createElement("div",{ className : "field"},React.createElement("table",{ className : "ui very basic table"},React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",null),React.createElement("th",null,"Zone"),React.createElement("th",null,"Requested"))),React.createElement("tbody",null,zones)),React.createElement("div",{ className : "fields"},React.createElement("div",{ className : "three wide field"}),React.createElement("div",{ className : "ten wide field"},React.createElement("div",{ onClick : this.handleRemoveClick, className : cancelCls},cancel),React.createElement("div",{ onClick : this.handleAddClick, className : "ui right floated green button"},accept)),React.createElement("div",{ className : "three wide field"})));
}});
core_view_rms_modal_NewRmsModalComponents.ZONEDROPDOWN = React.createClass({ initialize : function(input) {
	if(input == null) return;
	var elem = js.JQuery(ReactDOM.findDOMNode(input));
	elem.dropdown({ onChange : this.handleOnChange});
}, handleOnChange : function(value,text) {
	this.props.onChange("zone",text);
}, render : function() {
	return React.createElement("div",{ ref : this.initialize, className : "ui selection dropdown"},React.createElement("input",{ name : "zone", type : "hidden"}),React.createElement("i",{ className : "dropdown icon"}),React.createElement("div",{ className : "default text"},"Pick Zone"),React.createElement("div",{ className : "menu"},React.createElement("div",{ 'data-value' : "1", className : "item"},"Zone 1"),React.createElement("div",{ 'data-value' : "2", className : "item"},"Zone 2")));
}});
core_view_shipment_modal_NewShpmntModalComponents.DIVHEADER = React.createClass({ render : function() {
	return React.createElement("h4",{ className : "ui dividing header"},this.props.value);
}});
core_view_shipment_modal_NewShpmntModalComponents.FIELD = React.createClass({ handleOnChange : function(e) {
	var value = e.target.value;
	var name = this.props.name;
	this.props.onChange(name,value);
}, render : function() {
	var p = this.props;
	var type;
	if(p.type == null) type = "text"; else type = p.type;
	var pattern;
	if(p.pattern == null) pattern = ""; else pattern = p.pattern;
	return React.createElement("div",{ className : p.className},React.createElement("label",null,p.label),React.createElement("input",{ onChange : this.handleOnChange, name : p.name, value : p.value, type : type, ref : p.mask, placeholder : p.pholder, pattern : pattern}));
}});
core_view_shipment_modal_NewShpmntModalComponents.SHIPITEMTABLE = React.createClass({ getInitialState : function() {
	return { selected : { }, addingItem : false, selCount : 0, internalItems : [{ label : "RMS-121-1", remarks : "Specialty Bolt", requested : "300"},{ label : "RMS-121-2", remarks : "Specialty Bolt", requested : "300"},{ label : "RMS-121-3", remarks : "Specialty Bolt", requested : "300"}], newItems : [{ label : "RMS-121-0", remarks : "Specialty Bolt", requested : "300"},{ label : "RMS-121-1", remarks : "Specialty Bolt", requested : "300"},{ label : "RMS-121-2", remarks : "Specialty Bolt", requested : "300"},{ label : "RMS-121-3", remarks : "Specialty Bolt", requested : "300"},{ label : "RMS-121-4", remarks : "Specialty Bolt", requested : "300"},{ label : "RMS-121-5", remarks : "Specialty Bolt", requested : "300"},{ label : "RMS-121-6", remarks : "Specialty Bolt", requested : "300"},{ label : "RMS-121-7", remarks : "Specialty Bolt", requested : "300"},{ label : "RMS-121-8", remarks : "Specialty Bolt", requested : "300"},{ label : "RMS-121-9", remarks : "Specialty Bolt", requested : "300"},{ label : "RMS-121-91", remarks : "Specialty Bolt", requested : "300"},{ label : "RMS-121-12", remarks : "Specialty Bolt", requested : "300"},{ label : "RMS-121-23", remarks : "Specialty Bolt", requested : "300"},{ label : "RMS-121-34", remarks : "Specialty Bolt", requested : "300"},{ label : "RMS-121-45", remarks : "Specialty Bolt", requested : "300"},{ label : "RMS-121-56", remarks : "Specialty Bolt", requested : "300"},{ label : "RMS-121-67", remarks : "Specialty Bolt", requested : "300"},{ label : "RMS-121-78", remarks : "Specialty Bolt", requested : "300"},{ label : "RMS-121-89", remarks : "Specialty Bolt", requested : "300"},{ label : "RMS-121-10", remarks : "Specialty Bolt", requested : "300"},{ label : "RMS-121-11", remarks : "Specialty Bolt", requested : "300"},{ label : "RMS-121-22", remarks : "Specialty Bolt", requested : "300"},{ label : "RMS-121-33", remarks : "Specialty Bolt", requested : "300"},{ label : "RMS-121-44", remarks : "Specialty Bolt", requested : "300"},{ label : "RMS-121-55", remarks : "Specialty Bolt", requested : "300"},{ label : "RMS-121-66", remarks : "Specialty Bolt", requested : "300"},{ label : "RMS-121-77", remarks : "Specialty Bolt", requested : "300"},{ label : "RMS-121-88", remarks : "Specialty Bolt", requested : "300"}]};
}, handleAddClick : function(e) {
	if(this.state.addingItem == false) {
		var items = this.state.newItems;
		this.setState({ addingItem : true, items : items, selected : { }});
	} else {
		var currItems = this.state.items;
		var items1 = this.state.internalItems;
		var count = this.state.items.length;
		var selected = this.state.selected;
		var i = 0;
		while(i < count) {
			if(selected[i] == true) items1.push(currItems[i]);
			i += 1;
		}
		this.setState({ addingItem : false, items : items1, selected : { }});
	}
}, handleRemoveClick : function(e1) {
	var selCount = this.state.selCount;
	var items2 = this.state.internalItems;
	if(this.state.addingItem == false) {
		var count1 = this.state.items.length;
		var selected1 = this.state.selected;
		var i1 = 0;
		while(i1 < count1) {
			if(selected1[i1] == true) {
				var x = items2[i1];
				HxOverrides.remove(items2,x);
				selCount -= 1;
			}
			i1 += 1;
		}
	}
	this.setState({ addingItem : false, selCount : selCount, items : items2, selected : { }});
}, handleNewItems : function(items3) {
	this.setState({ newItems : items3});
}, handleCheckBox : function(e2) {
	var index = e2.target.dataset.index;
	var selected2 = this.state.selected;
	selected2[index] = !selected2[index];
	var i2 = this.state.selCount;
	if(selected2[index]) i2 += 1; else i2 += -1;
	this.setState({ selected : selected2, selCount : i2});
}, render : function() {
	var tabs = [];
	var page = [];
	console.log(this.state.selected);
	var items4 = this.state.items;
	if(items4 == null) items4 = this.state.internalItems;
	var tabCount = Math.ceil(items4.length / 5.0);
	var _g1 = 0;
	var _g = tabCount;
	while(_g1 < _g) {
		var i3 = _g1++;
		var rows = [];
		var start = i3 * 5;
		var index1 = 0;
		var _g2 = 0;
		var _g3 = items4.slice(start,start + 5);
		while(_g2 < _g3.length) {
			var item = _g3[_g2];
			++_g2;
			var checked = this.state.selected[index1] == true;
			var key = Std.string(item.label) + "-" + index1;
			if(this.state.addingItem == true) key += "-extra";
			rows.push(React.createElement("tr",{ key : key},React.createElement("td",{ className : "collapsing"},React.createElement("div",{ onClick : this.handleCheckBox, className : "ui fitted checkbox"},React.createElement("input",{ value : checked, type : "checkbox", 'data-index' : index1++}),React.createElement("label",null))),React.createElement("td",null,item.label),React.createElement("td",null,item.remarks),React.createElement("td",null,item.requested)));
		}
		var dataTab = "sitemtab-" + i3;
		var tbcls = classNames("ui","basic","tab",{ active : i3 == 0},"segment");
		tabs.push(React.createElement("div",{ 'data-tab' : dataTab, key : "tseg-" + dataTab, className : tbcls},React.createElement("table",{ className : "ui very basic table"},React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",null),React.createElement("th",null,"Item ID"),React.createElement("th",null,"Descripiton"),React.createElement("th",null,"Requested"))),React.createElement("tbody",null,rows))));
		var tabInitialize = function(input1) {
			if(input1 == null) return;
			var tab = js.JQuery(input1);
			tab.tab();
		};
		var cls = classNames("item",{ active : i3 == 0});
		page.push(React.createElement("a",{ 'data-tab' : dataTab, ref : tabInitialize, key : "key-" + dataTab, className : cls},i3 + 1));
	}
	var addingItem = this.state.addingItem;
	var selCount1 = this.state.selCount;
	var onLoad = function(input,add) {
		if(input == null) return;
		var elem = js.JQuery(ReactDOM.findDOMNode(input));
		if(add) {
			if(addingItem == true) elem.text("Accept");
		} else {
			if(addingItem == true) elem.text("Cancel");
			if(addingItem == true || selCount1 > 0) elem.removeClass("disabled");
		}
	};
	var addLoad = (function(f,a2) {
		return function(a1) {
			f(a1,a2);
		};
	})(onLoad,true);
	var remLoad = (function(f1,a21) {
		return function(a11) {
			f1(a11,a21);
		};
	})(onLoad,false);
	return React.createElement("div",{ className : "field"},tabs,React.createElement("div",{ className : "ui center aligned container"},React.createElement("div",{ className : "ui pagination tabular menu"},page)),React.createElement("h5",{ className : "ui dividing header"}),React.createElement("div",{ className : "fields"},React.createElement("div",{ className : "four wide field"}),React.createElement("div",{ className : "eight wide field"},React.createElement("div",{ onClick : this.handleRemoveClick, ref : remLoad, key : core_view_UidGenerator.nextId(), className : "ui black button disabled"},"Remove"),React.createElement("div",{ onClick : this.handleAddClick, ref : addLoad, key : core_view_UidGenerator.nextId(), className : "ui right floated green button"},"Add")),React.createElement("div",{ className : "four wide field"})));
}});
Core.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
