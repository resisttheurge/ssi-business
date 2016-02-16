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
		case "descInfo":
			job.description = value;
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
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.lpad = function(s,c,l) {
	if(c.length <= 0) return s;
	while(s.length < l) s = c + s;
	return s;
};
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
var core_view_main_ManageFilterDialog = function(props) {
	React.Component.call(this,props);
	this.structure = props.structure;
	this.filters = this.structure.getFilters();
	this.state = { deleteIndexes : []};
};
core_view_main_ManageFilterDialog.__name__ = true;
core_view_main_ManageFilterDialog.jt = function() {
	return this;
};
core_view_main_ManageFilterDialog.__super__ = React.Component;
core_view_main_ManageFilterDialog.prototype = $extend(React.Component.prototype,{
	onDeleteClick: function(index) {
		console.log("Delete index: " + index);
		var deleteIndexes = this.state.deleteIndexes;
		deleteIndexes.push(index);
		this.setState({ deleteIndexes : deleteIndexes});
	}
	,render: function() {
		var openAddFilterDialog = function() {
			Core.modalChange.dispatch("job-filter");
		};
		var initialize = function(input) {
		};
		var row = [];
		var size = this.filters.length;
		var _g = 0;
		while(_g < size) {
			var i = _g++;
			if(this.state.deleteIndexes.indexOf(i) != -1) continue;
			var f = this.filters[i];
			row.push(React.createElement(core_view_main_ManageFilterDialog.FILTERLISTITEM,{ name : f.getName(), fid : i, visible : this.state.deleteIndexes.indexOf(i) != -1, onClick : (function(f1,a1) {
				return function() {
					f1(a1);
				};
			})($bind(this,this.onDeleteClick),i)}));
		}
		return React.createElement("div",{ id : "content-modal", ref : initialize, className : "ui small modal"},React.createElement("div",{ className : "header"},React.createElement("i",{ className : "list layout icon"}),"Manage Filters"),React.createElement("div",{ className : "content"},React.createElement("div",{ className : "ui grid"},React.createElement("div",{ className : "nine wide right floated column"},React.createElement("div",{ className : "ui bottom aligned small divided list"},row)),React.createElement("div",{ className : "six wide column"},React.createElement("div",{ onClick : openAddFilterDialog, className : "ui button"},"Add New Filter!")))),React.createElement("div",{ className : "actions"},React.createElement("div",{ className : "ui black cancel button"},"Cancel"),React.createElement("div",{ className : "ui approve right labeled icon button"},"Ok",React.createElement("i",{ className : "checkmark icon"}))));
	}
	,componentDidMount: function() {
		var _g = this;
		var elem = js.JQuery(ReactDOM.findDOMNode(this));
		elem.modal({ onApprove : function() {
			var deleteIndexes = _g.state.deleteIndexes;
			var filters = deleteIndexes.map(function(i) {
				return _g.filters[i];
			});
			var _g1 = 0;
			while(_g1 < filters.length) {
				var i1 = filters[_g1];
				++_g1;
				_g.structure.removeFilter(i1);
			}
			_g.structure.saveFilters();
		}, onHidden : function() {
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
		var _g = this;
		var tabInit = function(input) {
			if(input == null) return;
			js.JQuery.tab();
		};
		var handleResult = function(input1) {
			console.log("Handling Input");
			js.JQuery.tab("change tab","edit-tab");
		};
		var style = { margin : 0};
		var openRMSReport = function(event) {
			core_reporting_ReportManager.showReport("rms",_g.props.rms);
		};
		return React.createElement("div",{ id : "editdwg-modal", ref : tabInit, className : "ui small modal"},React.createElement("div",{ className : "header"},React.createElement("i",{ className : "list layout icon"}),"Edit RMS"),React.createElement("div",{ className : "content"},React.createElement("div",{ 'data-tab' : "edit-tab", style : style, className : "active ui tab basic segment"},React.createElement("form",{ className : "ui small form"},React.createElement("div",{ className : "field"},React.createElement(core_view_rms_modal_NewRmsModalComponents.SHIPITEMTABLE,null)))),React.createElement("div",{ 'data-tab' : "new-tab", className : "ui tab basic segment"},React.createElement("form",{ className : "ui form"},React.createElement("div",{ className : "field"},React.createElement("div",{ onClick : handleResult, className : "ui black button"},"Cancel"))))),React.createElement("div",{ style : style, className : "actions ui basic segment"},React.createElement("div",{ onClick : openRMSReport, className : "ui black left floated button"},"RMS Report"),React.createElement("div",{ className : "ui black cancel button"},"Cancel"),React.createElement("div",{ className : "ui approve right floated labeled icon button"},"Submit Drawing Changes",React.createElement("i",{ className : "checkmark icon"}))));
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
		return React.createElement("div",{ id : "add-dwg-modal", className : "ui small modal"},React.createElement("div",{ className : "header"},React.createElement("i",{ className : "list layout icon"}),"Create New ABM"),React.createElement("div",{ className : "content"},React.createElement("form",{ className : "ui form"},React.createElement("div",{ className : "fields"},React.createElement(core_view_abm_modal_NewAbmModalComponents.VENDORDROPDOWN,{ label : "Vendor", onChange : $bind(this,this.handleOnChange), name : "vendor", className : "three wide dropdown"}),React.createElement("div",{ className : "field"},React.createElement("label",null,"Part NO"),React.createElement(core_view_abm_modal_NewAbmModalComponents.PARTDROPDOWN,{ label : "Part NO", onChange : $bind(this,this.handleOnChange), name : "number", className : "five wide dropdown"})),React.createElement(core_view_abm_modal_NewAbmModalComponents.FIELD,{ label : "Quantity", onChange : $bind(this,this.handleOnChange), name : "quantity", className : "three wide field"}),React.createElement(core_view_abm_modal_NewAbmModalComponents.FIELD,{ label : "Status", onChange : $bind(this,this.handleOnChange), name : "status", className : "five wide field"})),React.createElement("div",{ className : "two fields"},React.createElement("div",{ className : "field"},React.createElement("label",null,"Manufacturer"),React.createElement(core_view_abm_modal_NewAbmModalComponents.MFACTDROPDOWN,{ label : "Manufacturer", onChange : $bind(this,this.handleOnChange), name : "manufacturer", className : "dropdown"}),React.createElement("div",{ className : "field"},React.createElement("label",null,"Description"),React.createElement("textarea",{ onChange : handleDescChange, rows : "5"}))),React.createElement("div",{ className : "field"},React.createElement(core_view_abm_modal_NewAbmModalComponents.FIELD,{ label : "Released By", onChange : $bind(this,this.handleOnChange), name : "releasedBy", className : "field"}),React.createElement(core_view_abm_modal_NewAbmModalComponents.FIELD,{ label : "Release Date", onChange : $bind(this,this.handleOnChange), name : "releaseDate", className : "field"}),React.createElement(core_view_abm_modal_NewAbmModalComponents.FIELD,{ label : "Requested Date", onChange : $bind(this,this.handleOnChange), name : "requestDate", className : "field"}))),React.createElement("div",{ className : "field"},React.createElement("label",null,"Remarks"),React.createElement("textarea",{ onChange : handleRemarksChange, rows : "5"})))),React.createElement("div",{ className : "actions"},React.createElement("div",{ className : "ui black cancel button"},"Cancel"),React.createElement("div",{ className : "ui approve right labeled icon button"},"Submit ABM",React.createElement("i",{ className : "checkmark icon"}))));
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
		return React.createElement("div",{ id : "add-dwg-modal", className : "ui small modal"},React.createElement("div",{ className : "header"},React.createElement("i",{ className : "list layout icon"}),"Edit ABM"),React.createElement("div",{ className : "content"},React.createElement("form",{ className : "ui form"},React.createElement("div",{ className : "fields"},React.createElement(core_view_abm_modal_NewAbmModalComponents.VENDORDROPDOWN,{ label : "Vendor", onChange : $bind(this,this.handleOnChange), value : editAbm.part.type, name : "vendor", className : "three wide dropdown"}),React.createElement("div",{ className : "field"},React.createElement("label",null,"Part NO"),React.createElement(core_view_abm_modal_NewAbmModalComponents.PARTDROPDOWN,{ label : "Part NO", onChange : $bind(this,this.handleOnChange), value : editAbm.part.number, name : "number", className : "five wide dropdown"})),React.createElement(core_view_abm_modal_NewAbmModalComponents.FIELD,{ label : "Quantity", onChange : $bind(this,this.handleOnChange), value : editAbm.quantity, name : "quantity", key : "v3", className : "three wide field"}),React.createElement(core_view_abm_modal_NewAbmModalComponents.FIELD,{ label : "Status", onChange : $bind(this,this.handleOnChange), value : editAbm.status, name : "status", key : "v4", className : "five wide field"})),React.createElement("div",{ className : "two fields"},React.createElement("div",{ className : "field"},React.createElement("label",null,"Manufacturer"),React.createElement(core_view_abm_modal_NewAbmModalComponents.MFACTDROPDOWN,{ label : "Manufacturer", onChange : $bind(this,this.handleOnChange), value : editAbm.manufacturer.label, name : "manufacturer", className : "dropdown"}),React.createElement("div",{ className : "field"},React.createElement("label",null,"Description"),React.createElement("textarea",{ onChange : handleDescChange, value : editAbm.part.description, rows : "5"}))),React.createElement("div",{ className : "field"},React.createElement(core_view_abm_modal_NewAbmModalComponents.FIELD,{ label : "Released By", onChange : $bind(this,this.handleOnChange), value : editAbm.releasedBy, name : "releasedBy", className : "field"}),React.createElement(core_view_abm_modal_NewAbmModalComponents.FIELD,{ label : "Release Date", onChange : $bind(this,this.handleOnChange), value : editAbm.releaseDate, name : "releaseDate", className : "field"}),React.createElement(core_view_abm_modal_NewAbmModalComponents.FIELD,{ label : "Requested Date", onChange : $bind(this,this.handleOnChange), value : editAbm.requestDate, name : "requestDate", className : "field"}))),React.createElement("div",{ className : "field"},React.createElement("label",null,"Remarks"),React.createElement("textarea",{ onChange : handleRemarksChange, value : editAbm.remarks, rows : "5"})))),React.createElement("div",{ style : s, className : "actions ui basic segment"},React.createElement("div",{ 'data-type' : "remove", className : "ui left floated red cancel button"},"Remove"),React.createElement("div",{ 'data-type' : "cancel", className : "ui black cancel button"},"Cancel"),React.createElement("div",{ className : "ui approve right labeled icon button"},"Submit ABM",React.createElement("i",{ className : "checkmark icon"}))));
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
		var _g = this;
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
		var style = { margin : 0};
		var openShipmentReport = function(event) {
			core_reporting_ReportManager.showReport("shipment",_g.props.shpmnt);
		};
		return React.createElement("div",{ id : "editshp-modal", className : "ui modal"},React.createElement("div",{ className : "header"},React.createElement("i",{ className : "list layout icon"}),"Edit Shipment"),React.createElement("div",{ className : "content"},React.createElement("form",{ className : "ui form"},React.createElement("div",{ className : "ui top attached tabular menu"},React.createElement("div",{ 'data-tab' : "shp-tab", ref : tabInitialize, className : "active item"},"Shipment"),React.createElement("div",{ 'data-tab' : "itms-tab", ref : tabInitialize, className : "item"},"Shipped Items")),React.createElement("div",{ 'data-tab' : "shp-tab", className : "active ui bottom attached tab segment"},React.createElement("div",{ className : "two fields"},React.createElement(core_view_shipment_modal_NewShpmntModalComponents.FIELD,{ label : "Shipment Id", onChange : $bind(this,this.handleOnChange), name : "pk", value : shp.pk, className : "field"}),React.createElement(core_view_shipment_modal_NewShpmntModalComponents.FIELD,{ label : "Date", onChange : $bind(this,this.handleOnChange), name : "shipDate", value : shp.shipDate, type : "date", className : "field"})),React.createElement("div",{ className : "two fields"},React.createElement(core_view_shipment_modal_NewShpmntModalComponents.FIELD,{ label : "Ship From", onChange : $bind(this,this.handleOnChange), name : "shop", value : shop.label, className : "field"}),React.createElement(core_view_shipment_modal_NewShpmntModalComponents.FIELD,{ label : "Ship Via", onChange : $bind(this,this.handleOnChange), name : "carrier", value : carr.label, className : "field"})),React.createElement("div",{ className : "two fields"},React.createElement(core_view_shipment_modal_NewShpmntModalComponents.FIELD,{ label : "Bill of Lading", onChange : $bind(this,this.handleOnChange), name : "billOfLading", value : shp.billOfLading, className : "field"}),React.createElement(core_view_shipment_modal_NewShpmntModalComponents.FIELD,{ label : "Weight", onChange : $bind(this,this.handleOnChange), name : "weight", value : shp.weight, className : "field"})),React.createElement("div",{ className : "field"},React.createElement("div",{ className : "two fields"},React.createElement(core_view_shipment_modal_NewShpmntModalComponents.FIELD,{ label : "Contact", onChange : $bind(this,this.handleOnChange), name : "contact", value : cont.label, className : "field"}),React.createElement(core_view_shipment_modal_NewShpmntModalComponents.FIELD,{ label : "Country", onChange : $bind(this,this.handleOnChange), name : "country", value : dest.country, className : "field"})),React.createElement(core_view_shipment_modal_NewShpmntModalComponents.FIELD,{ label : "Address 1", onChange : $bind(this,this.handleOnChange), name : "line1", value : dest.lines.split("\n")[0], className : "field"}),React.createElement(core_view_shipment_modal_NewShpmntModalComponents.FIELD,{ label : "Address 2", onChange : $bind(this,this.handleOnChange), name : "line2", value : dest.lines.split("\n")[1], className : "field"}),React.createElement("div",{ className : "three fields"},React.createElement(core_view_shipment_modal_NewShpmntModalComponents.FIELD,{ label : "City", onChange : $bind(this,this.handleOnChange), name : "city", value : dest.city, className : "field"}),React.createElement(core_view_shipment_modal_NewShpmntModalComponents.FIELD,{ label : "State", onChange : $bind(this,this.handleOnChange), name : "stateOrProvince", value : dest.stateOrProvince, className : "field"}),React.createElement(core_view_shipment_modal_NewShpmntModalComponents.FIELD,{ label : "Zip", onChange : $bind(this,this.handleOnChange), name : "postalCode", value : dest.postalCode, className : "field"})))),React.createElement("div",{ 'data-tab' : "itms-tab", className : "ui bottom attached tab segment"},React.createElement(core_view_shipment_modal_NewShpmntModalComponents.SHIPITEMTABLE,null)))),React.createElement("div",{ style : style, className : "actions ui basic segment"},React.createElement("div",{ onClick : openShipmentReport, className : "ui left floated black button"},"Shipment Report"),React.createElement("div",{ className : "ui black cancel button"},"Cancel"),React.createElement("div",{ className : "ui approve right labeled icon button"},"Submit Drawing Changes",React.createElement("i",{ className : "checkmark icon"}))));
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
var core_view_job_modal_NewFilterDialog = function(props) {
	this.fields = [];
	React.Component.call(this,props);
	var structure = props.structure;
	if(structure.jobTable) this.isJob = true; else this.isJob = false;
	var ordering = structure.generateDefaultOrder([]);
	this.fields = ordering.fields;
	console.log("Names: " + Std.string(this.fields));
	console.log("Is Job: " + Std.string(this.isJob));
	var map = new haxe_ds_StringMap();
	this.state = { struct : structure, filterMap : map, filter : new core_sorting_Filter(ordering,map)};
};
core_view_job_modal_NewFilterDialog.__name__ = true;
core_view_job_modal_NewFilterDialog.jt = function() {
	return this;
};
core_view_job_modal_NewFilterDialog.__super__ = React.Component;
core_view_job_modal_NewFilterDialog.prototype = $extend(React.Component.prototype,{
	handleOnChange: function(name,value) {
		if(name == "filterName") this.state.filter.setName(value); else {
			var map = this.state.filterMap;
			{
				if(__map_reserved[name] != null) map.setReserved(name,value); else map.h[name] = value;
				value;
			}
		}
	}
	,render: function() {
		var row = [];
		if(this.isJob) {
			row.push(React.createElement(core_view_job_modal_NewFilterDialog.DROPDOWN,{ label : "Staus", items : core_view_job_modal_NewFilterDialog.statusTypes, def : "ACTIVE", onChange : $bind(this,this.handleOnChange), key : core_view_UidGenerator.nextId(), title : "Status"}));
			row.push(React.createElement(core_view_job_modal_NewFilterDialog.DROPDOWN,{ label : "Prefix", items : core_view_job_modal_NewFilterDialog.prefixTypes, def : "ALL", onChange : $bind(this,this.handleOnChange), key : core_view_UidGenerator.nextId(), title : "Prefix"}));
		}
		var i = 1;
		var _g = 0;
		var _g1 = this.fields;
		while(_g < _g1.length) {
			var field = _g1[_g];
			++_g;
			row.push(React.createElement(core_view_job_modal_NewFilterDialog.FIELD,{ label : field.rep, onChange : $bind(this,this.handleOnChange), name : field.name, value : "", key : core_view_UidGenerator.nextId(), className : "sixteen wide field"}));
		}
		return React.createElement("div",{ id : "content-modal", className : "ui small modal"},React.createElement("div",{ className : "header"},React.createElement("i",{ className : "list layout icon"}),"Add New Filter"),React.createElement("div",{ className : "content"},React.createElement("div",{ className : "ui grid"},"x",React.createElement("div",{ className : "twenty wide center floated column"},React.createElement("div",null,React.createElement(core_view_job_modal_NewFilterDialog.FIELD,{ label : "Filter Name", onChange : $bind(this,this.handleOnChange), name : "filterName", value : "", key : core_view_UidGenerator.nextId()})),React.createElement("div",{ className : "ui bottom aligned small divided list"},row)))),React.createElement("div",{ className : "actions"},React.createElement("div",{ className : "ui black cancel button"},"Cancel"),React.createElement("div",{ className : "ui approve right labeled icon button"},"Ok",React.createElement("i",{ className : "checkmark icon"}))));
	}
	,componentDidMount: function() {
		var _g = this;
		var elem = js.JQuery(ReactDOM.findDOMNode(this));
		elem.modal({ onApprove : function() {
			_g.state.struct.addFilter(_g.state.filter);
		}, onHidden : function() {
			Core.modalChange.dispatch("");
		}}).modal("setting","closable",false).modal("setting","transition","vertical flip").modal("show");
	}
	,__class__: core_view_job_modal_NewFilterDialog
});
var core_view_job_modal_MngReportDialog = function() {
	React.Component.call(this);
};
core_view_job_modal_MngReportDialog.__name__ = true;
core_view_job_modal_MngReportDialog.jt = function() {
	return this;
};
core_view_job_modal_MngReportDialog.__super__ = React.Component;
core_view_job_modal_MngReportDialog.prototype = $extend(React.Component.prototype,{
	handleOnChange: function(name,value) {
		var state = { };
		state[name] = value;
		this.setState(state);
	}
	,render: function() {
		var initialize = function(input) {
		};
		return React.createElement("div",{ id : "content-modal", ref : initialize, className : "ui small modal"},React.createElement("div",{ className : "header"},React.createElement("i",{ className : "list layout icon"}),"Management Review Report"),React.createElement("div",{ className : "content"},React.createElement("form",{ className : "ui form"},React.createElement("div",{ className : "two fields"},React.createElement(core_view_job_modal_MngReportDialog.FIELD,{ label : "Start Date", onChange : $bind(this,this.handleOnChange), name : "startDate", type : "date", className : "field"}),React.createElement(core_view_job_modal_MngReportDialog.FIELD,{ label : "End Date", onChange : $bind(this,this.handleOnChange), name : "endDate", type : "date", className : "field"})))),React.createElement("div",{ className : "actions"},React.createElement("div",{ className : "ui black cancel button"},"Cancel"),React.createElement("div",{ className : "ui approve right labeled icon button"},"Ok",React.createElement("i",{ className : "checkmark icon"}))));
	}
	,componentDidMount: function() {
		var _g = this;
		var elem = js.JQuery(ReactDOM.findDOMNode(this));
		elem.modal({ onApprove : function() {
			core_reporting_ReportManager.showReport("managementReview",{ start : _g.state.startDate, end : _g.state.endDate});
		}, onHidden : function() {
			Core.modalChange.dispatch("");
		}}).modal("setting","closable",false).modal("setting","transition","vertical flip").modal("show");
	}
	,__class__: core_view_job_modal_MngReportDialog
});
var core_view_job_modal_ProdReportDialog = function() {
	React.Component.call(this);
	var now = new Date();
	var nextSunday = 7 - now.getDay();
	var weekEnd = DateTools.delta(now,nextSunday * 24.0 * 60.0 * 60.0 * 1000.0);
	this.state = { weeksEnd : DateTools.format(weekEnd,"%Y-%m-%d")};
};
core_view_job_modal_ProdReportDialog.__name__ = true;
core_view_job_modal_ProdReportDialog.jt = function() {
	return this;
};
core_view_job_modal_ProdReportDialog.__super__ = React.Component;
core_view_job_modal_ProdReportDialog.prototype = $extend(React.Component.prototype,{
	handleOnChange: function(name,value) {
		var state = { };
		var now = HxOverrides.strDate(value);
		var nextSunday = 7 - now.getDay();
		var weekEnd = DateTools.delta(now,nextSunday * 24.0 * 60.0 * 60.0 * 1000.0);
		this.state = { weeksEnd : DateTools.format(weekEnd,"%Y-%m-%d")};
		state[name] = value;
		this.setState(state);
	}
	,render: function() {
		var initialize = function(input) {
		};
		return React.createElement("div",{ id : "content-modal", ref : initialize, className : "ui small modal"},React.createElement("div",{ className : "header"},React.createElement("i",{ className : "list layout icon"}),"Management Review Report"),React.createElement("div",{ className : "content"},React.createElement("form",{ className : "ui form"},React.createElement(core_view_job_modal_ProdReportDialog.FIELD,{ label : "Weeks End", onChange : $bind(this,this.handleOnChange), name : "weeksEnd", value : this.state.weeksEnd, type : "date", className : "field"}))),React.createElement("div",{ className : "actions"},React.createElement("div",{ className : "ui black cancel button"},"Cancel"),React.createElement("div",{ className : "ui approve right labeled icon button"},"Ok",React.createElement("i",{ className : "checkmark icon"}))));
	}
	,componentDidMount: function() {
		var _g = this;
		var elem = js.JQuery(ReactDOM.findDOMNode(this));
		elem.modal({ onApprove : function() {
			core_reporting_ReportManager.showReport("productionSchedule",{ weekEnding : _g.state.weeksEnd});
		}, onHidden : function() {
			Core.modalChange.dispatch("");
		}}).modal("setting","closable",false).modal("setting","transition","vertical flip").modal("show");
	}
	,__class__: core_view_job_modal_ProdReportDialog
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
	var _g = this;
	React.Component.call(this,props);
	this.state = { menu : core_view_main_ViewRegistry.buildView("homeMenu",null), content : core_view_main_ViewRegistry.buildView("homeView",null), currentModal : "", authenticated : props.authenticated};
	this.callback = Core.viewChange.add($bind(this,this.handleViewChange));
	this.callback2 = Core.modalChange.add($bind(this,this.handleModalChange));
	core_view_main_ContentManager.buildContent("jobView",null,function(content) {
		_g.setState({ menu : core_view_main_ViewRegistry.buildView("homeMenu",null), content : core_view_main_ViewRegistry.buildView("homeView",null), editJobObj : content[0], currentModal : "", authenticated : props.authenticated});
	});
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
		var _g = this;
		if(view != "home" && view != "refresh" && this.state.currentView == view) return;
		var nextView;
		if(view != "refresh") nextView = view; else nextView = this.state.currentView;
		core_view_main_ContentManager.buildContent(nextView + "View",info,function(content) {
			_g.setState({ currentView : nextView, menu : core_view_main_ViewRegistry.buildView(nextView + "Menu",content), content : core_view_main_ViewRegistry.buildView(nextView + "View",content)});
		});
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
		var dataObj = { editJobObj : this.state.editJobObj, editJobMainObj : this.state.editJobMainObj, editObj : this.state.editObj, structure : this.state.content.props.structure};
		ReactDOM.render(React.createElement(Core.MODALELEMENT,{ index : this.state.currentModal, dataObj : dataObj}),modalsElem);
	}
	,componentDidUpdate: function(prevProps,prevState) {
		var modalsElem = window.document.getElementById("modals");
		var dataObj = { editJobObj : this.state.editJobObj, editJobMainObj : this.state.editJobMainObj, editObj : this.state.editObj, structure : this.state.content.props.structure};
		ReactDOM.render(React.createElement(Core.MODALELEMENT,{ index : this.state.currentModal, dataObj : dataObj}),modalsElem);
	}
	,componentWillUpdate: function(nextProps,nextState) {
		if(nextState.authenticated == true && core_authentication_AuthenticationManager.isLoggedIn() != true) {
			var view = "home";
			core_view_main_ContentManager.buildContent(view + "View",null,function(content) {
				nextState.authenticated = false;
				nextState.currentView = view;
				nextState.menu = core_view_main_ViewRegistry.buildView(view + "Menu",content);
				nextState.content = core_view_main_ViewRegistry.buildView(view + "View",content);
			});
		}
	}
	,componentWillUnmount: function() {
		console.log("Unmounting Core!");
	}
	,__class__: Core
});
var DateTools = function() { };
DateTools.__name__ = true;
DateTools.__format_get = function(d,e) {
	switch(e) {
	case "%":
		return "%";
	case "C":
		return StringTools.lpad(Std.string(Std["int"](d.getFullYear() / 100)),"0",2);
	case "d":
		return StringTools.lpad(Std.string(d.getDate()),"0",2);
	case "D":
		return DateTools.__format(d,"%m/%d/%y");
	case "e":
		return Std.string(d.getDate());
	case "F":
		return DateTools.__format(d,"%Y-%m-%d");
	case "H":case "k":
		return StringTools.lpad(Std.string(d.getHours()),e == "H"?"0":" ",2);
	case "I":case "l":
		var hour = d.getHours() % 12;
		return StringTools.lpad(Std.string(hour == 0?12:hour),e == "I"?"0":" ",2);
	case "m":
		return StringTools.lpad(Std.string(d.getMonth() + 1),"0",2);
	case "M":
		return StringTools.lpad(Std.string(d.getMinutes()),"0",2);
	case "n":
		return "\n";
	case "p":
		if(d.getHours() > 11) return "PM"; else return "AM";
		break;
	case "r":
		return DateTools.__format(d,"%I:%M:%S %p");
	case "R":
		return DateTools.__format(d,"%H:%M");
	case "s":
		return Std.string(Std["int"](d.getTime() / 1000));
	case "S":
		return StringTools.lpad(Std.string(d.getSeconds()),"0",2);
	case "t":
		return "\t";
	case "T":
		return DateTools.__format(d,"%H:%M:%S");
	case "u":
		var t = d.getDay();
		if(t == 0) return "7"; else if(t == null) return "null"; else return "" + t;
		break;
	case "w":
		return Std.string(d.getDay());
	case "y":
		return StringTools.lpad(Std.string(d.getFullYear() % 100),"0",2);
	case "Y":
		return Std.string(d.getFullYear());
	default:
		throw new js__$Boot_HaxeError("Date.format %" + e + "- not implemented yet.");
	}
};
DateTools.__format = function(d,f) {
	var r = new StringBuf();
	var p = 0;
	while(true) {
		var np = f.indexOf("%",p);
		if(np < 0) break;
		r.addSub(f,p,np - p);
		r.add(DateTools.__format_get(d,HxOverrides.substr(f,np + 1,1)));
		p = np + 2;
	}
	r.addSub(f,p,f.length - p);
	return r.b;
};
DateTools.format = function(d,f) {
	return DateTools.__format(d,f);
};
DateTools.delta = function(d,t) {
	var t1 = d.getTime() + t;
	var d1 = new Date();
	d1.setTime(t1);
	return d1;
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.strDate = function(s) {
	var _g = s.length;
	switch(_g) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k1 = s.split("-");
		return new Date(k1[0],k1[1] - 1,k1[2],0,0,0);
	case 19:
		var k2 = s.split(" ");
		var y = k2[0].split("-");
		var t = k2[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw new js__$Boot_HaxeError("Invalid date format : " + s);
	}
};
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
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
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
Std["int"] = function(x) {
	return x | 0;
};
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = true;
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,addSub: function(s,pos,len) {
		if(len == null) this.b += HxOverrides.substr(s,pos,null); else this.b += HxOverrides.substr(s,pos,len);
	}
	,__class__: StringBuf
};
var Type = function() { };
Type.__name__ = true;
Type.getClass = function(o) {
	if(o == null) return null; else return js_Boot.getClass(o);
};
var api_react_ReactMacro = function() { };
api_react_ReactMacro.__name__ = true;
var core_authentication_Role = { __ename__ : true, __constructs__ : ["ADMIN","EMPLOYEE","Annon"] };
core_authentication_Role.ADMIN = ["ADMIN",0];
core_authentication_Role.ADMIN.toString = $estr;
core_authentication_Role.ADMIN.__enum__ = core_authentication_Role;
core_authentication_Role.EMPLOYEE = ["EMPLOYEE",1];
core_authentication_Role.EMPLOYEE.toString = $estr;
core_authentication_Role.EMPLOYEE.__enum__ = core_authentication_Role;
core_authentication_Role.Annon = ["Annon",2];
core_authentication_Role.Annon.toString = $estr;
core_authentication_Role.Annon.__enum__ = core_authentication_Role;
var core_authentication_AuthenticationManager = function() { };
core_authentication_AuthenticationManager.__name__ = true;
core_authentication_AuthenticationManager.hash = function(password) {
	return bcrypt.hashSync(password,bcrypt.genSaltSync());
};
core_authentication_AuthenticationManager.authenticate = function(username,password,onSuccess,onError) {
	core_dataaccess_ServiceAccessManager.postData(core_dataaccess_EndPoint.AUTH,{ username : username, password : password},{ success : function(response) {
		console.log("received response: " + Std.string(response));
		if(response.success) {
			core_dataaccess_PersistenceManager.store("user",response.data);
			onSuccess(response.data);
		} else {
		}
	}});
};
core_authentication_AuthenticationManager.getCurrentUser = function() {
	if(!core_authentication_AuthenticationManager.initialized) core_authentication_AuthenticationManager.currentUser = core_dataaccess_PersistenceManager.get("user");
	core_authentication_AuthenticationManager.initialized = core_authentication_AuthenticationManager.currentUser != null;
	return core_authentication_AuthenticationManager.currentUser;
};
core_authentication_AuthenticationManager.isUserAdmin = function() {
	return core_authentication_AuthenticationManager.getUserRoles().filter(function(role) {
		return role == core_authentication_Role.ADMIN;
	}).length != 0;
};
core_authentication_AuthenticationManager.isUserEmployee = function() {
	return core_authentication_AuthenticationManager.getUserRoles().filter(function(role) {
		return role == core_authentication_Role.EMPLOYEE;
	}).length != 0;
};
core_authentication_AuthenticationManager.getUserRoles = function() {
	if(core_authentication_AuthenticationManager.getCurrentUser() == null) return [core_authentication_Role.Annon]; else return core_authentication_AuthenticationManager.getCurrentUser().roles;
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
var core_dataaccess_EndPoint = { __ename__ : true, __constructs__ : ["AUTH","CARRIER","CUSTOMER","JOB","JOBDWG","JOBMARK","JOBSHPGRP","JOBITEM","JOBSHPMNT","MFACT","PART","SALESPERSON","SHOP","USER","USERROLE","VENDOR"] };
core_dataaccess_EndPoint.AUTH = ["AUTH",0];
core_dataaccess_EndPoint.AUTH.toString = $estr;
core_dataaccess_EndPoint.AUTH.__enum__ = core_dataaccess_EndPoint;
core_dataaccess_EndPoint.CARRIER = ["CARRIER",1];
core_dataaccess_EndPoint.CARRIER.toString = $estr;
core_dataaccess_EndPoint.CARRIER.__enum__ = core_dataaccess_EndPoint;
core_dataaccess_EndPoint.CUSTOMER = ["CUSTOMER",2];
core_dataaccess_EndPoint.CUSTOMER.toString = $estr;
core_dataaccess_EndPoint.CUSTOMER.__enum__ = core_dataaccess_EndPoint;
core_dataaccess_EndPoint.JOB = ["JOB",3];
core_dataaccess_EndPoint.JOB.toString = $estr;
core_dataaccess_EndPoint.JOB.__enum__ = core_dataaccess_EndPoint;
core_dataaccess_EndPoint.JOBDWG = ["JOBDWG",4];
core_dataaccess_EndPoint.JOBDWG.toString = $estr;
core_dataaccess_EndPoint.JOBDWG.__enum__ = core_dataaccess_EndPoint;
core_dataaccess_EndPoint.JOBMARK = ["JOBMARK",5];
core_dataaccess_EndPoint.JOBMARK.toString = $estr;
core_dataaccess_EndPoint.JOBMARK.__enum__ = core_dataaccess_EndPoint;
core_dataaccess_EndPoint.JOBSHPGRP = ["JOBSHPGRP",6];
core_dataaccess_EndPoint.JOBSHPGRP.toString = $estr;
core_dataaccess_EndPoint.JOBSHPGRP.__enum__ = core_dataaccess_EndPoint;
core_dataaccess_EndPoint.JOBITEM = ["JOBITEM",7];
core_dataaccess_EndPoint.JOBITEM.toString = $estr;
core_dataaccess_EndPoint.JOBITEM.__enum__ = core_dataaccess_EndPoint;
core_dataaccess_EndPoint.JOBSHPMNT = ["JOBSHPMNT",8];
core_dataaccess_EndPoint.JOBSHPMNT.toString = $estr;
core_dataaccess_EndPoint.JOBSHPMNT.__enum__ = core_dataaccess_EndPoint;
core_dataaccess_EndPoint.MFACT = ["MFACT",9];
core_dataaccess_EndPoint.MFACT.toString = $estr;
core_dataaccess_EndPoint.MFACT.__enum__ = core_dataaccess_EndPoint;
core_dataaccess_EndPoint.PART = ["PART",10];
core_dataaccess_EndPoint.PART.toString = $estr;
core_dataaccess_EndPoint.PART.__enum__ = core_dataaccess_EndPoint;
core_dataaccess_EndPoint.SALESPERSON = ["SALESPERSON",11];
core_dataaccess_EndPoint.SALESPERSON.toString = $estr;
core_dataaccess_EndPoint.SALESPERSON.__enum__ = core_dataaccess_EndPoint;
core_dataaccess_EndPoint.SHOP = ["SHOP",12];
core_dataaccess_EndPoint.SHOP.toString = $estr;
core_dataaccess_EndPoint.SHOP.__enum__ = core_dataaccess_EndPoint;
core_dataaccess_EndPoint.USER = ["USER",13];
core_dataaccess_EndPoint.USER.toString = $estr;
core_dataaccess_EndPoint.USER.__enum__ = core_dataaccess_EndPoint;
core_dataaccess_EndPoint.USERROLE = ["USERROLE",14];
core_dataaccess_EndPoint.USERROLE.toString = $estr;
core_dataaccess_EndPoint.USERROLE.__enum__ = core_dataaccess_EndPoint;
core_dataaccess_EndPoint.VENDOR = ["VENDOR",15];
core_dataaccess_EndPoint.VENDOR.toString = $estr;
core_dataaccess_EndPoint.VENDOR.__enum__ = core_dataaccess_EndPoint;
var core_dataaccess_ServiceAccessManager = function() { };
core_dataaccess_ServiceAccessManager.__name__ = true;
core_dataaccess_ServiceAccessManager.urlObj = function(url,data) {
	switch(url[1]) {
	case 0:
		return "/auth";
	case 1:
		if(data == null) return "/carriers";
		return "/carriers/" + Std.string(data.pk) + "}";
	case 2:
		if(data == null) return "/customers";
		return "/customers/" + Std.string(data.pk);
	case 3:
		if(data == null) return "/jobs";
		return "/jobs/" + Std.string(data.pk) + "}";
	case 4:
		if(data == null) return "/jobs/" + Std.string(data.pk) + "/drawings";
		return "/jobs/" + Std.string(data.pk) + "}/drawings/" + Std.string(data.label);
	case 5:
		return "/jobs/" + Std.string(data.pk) + "/drawings/" + Std.string(data.label) + "/marks";
	case 6:
		if(data == null) return "/jobs/" + Std.string(data.pk) + "}/shipping-groups";
		return "/jobs/" + Std.string(data.pk) + "/shipping-groups/" + Std.string(data.label);
	case 7:
		return "/jobs/" + Std.string(data.pk) + "}/shipping-groups/" + Std.string(data.label) + "/items";
	case 8:
		if(data == null) return "/jobs/" + Std.string(data.pk) + "/shipments";
		return "/jobs/" + Std.string(data.pk) + "}/shipments/" + Std.string(data.number);
	case 9:
		if(data == null) return "/manufacturers";
		return "/manufacturers/" + Std.string(data.pk);
	case 10:
		if(data == null) return "/parts";
		return "/parts/" + Std.string(data.pk) + "}";
	case 11:
		if(data == null) return "/salespeople";
		return "/salespeople/" + Std.string(data.pk);
	case 12:
		if(data == null) return "/shops";
		return "/shops/" + Std.string(data.pk) + "}";
	case 13:
		if(data == null) return "/users";
		return "/users/" + Std.string(data.pk);
	case 14:
		return "/users/" + Std.string(data.pk) + "}/roles";
	case 15:
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
core_dataaccess_ServiceAccessManager.postData = function(ep,data,callbacks) {
	var url = core_dataaccess_ServiceAccessManager.buildUrl(ep,data);
	console.log("" + Std.string(data));
	return core_dataaccess_ServiceAccessManager.ajax({ url : url, type : "POST", data : JSON.stringify(data), contentType : "application/json", processData : false, error : callbacks.error, success : callbacks.success}).always(callbacks.always).fail(callbacks.fail).done(callbacks.done).then(callbacks.then);
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
var core_reporting_ReportManager = function() { };
core_reporting_ReportManager.__name__ = true;
core_reporting_ReportManager.showReport = function(reportId,data) {
	var target = "";
	var settings = "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no";
	var baseUrl = "pdf/web/viewer.html?file=";
	var reportViewerUrl = baseUrl + core_reporting_ReportingService.retrieveReport("productionSchedule");
	window.open(reportViewerUrl,target,settings);
};
var core_reporting_ReportingService = function() { };
core_reporting_ReportingService.__name__ = true;
core_reporting_ReportingService.retrieveReport = function(reportId,data) {
	return core_reporting_ReportingService.reportingMap[reportId](data);
};
var core_sorting_Filter = function(ordering,filterMap) {
	this.ordering = ordering;
	this.filterMap = filterMap;
};
core_sorting_Filter.__name__ = true;
core_sorting_Filter.prototype = {
	filter: function(data) {
		var fieldData = this.ordering.orderData(data);
		var _g = 0;
		while(_g < fieldData.length) {
			var field = fieldData[_g];
			++_g;
			var filterValue = this.filterMap.get(field.field.name);
			if(filterValue != null && filterValue.length > 0) {
				if(Std.string(field.data).indexOf(filterValue) == -1) return false;
			}
		}
		return true;
	}
	,getFilterMap: function() {
		return this.filterMap;
	}
	,setName: function(name) {
		this.filterName = name;
	}
	,getName: function() {
		return this.filterName;
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
		console.log("Adding Filter: " + Std.string(filter));
		this.filterMap.push(filter);
		this.saveFilters();
	}
	,removeFilter: function(filter) {
		HxOverrides.remove(this.filterMap,filter);
		this.saveFilters();
	}
	,getFilters: function() {
		return this.filterMap;
	}
	,setFilterKey: function(filterKey) {
		this.filterKey = filterKey;
	}
	,loadFilters: function() {
		if(this.filterKey != null) {
			var maps = core_dataaccess_PersistenceManager.get(this.filterKey,false);
			if(maps != null && maps.filters != null) {
				var ordering = this.generateDefaultOrder([]);
				var temp = [];
				var _g = 0;
				var _g1 = maps.filters;
				while(_g < _g1.length) {
					var f = _g1[_g];
					++_g;
					if(f.data != null) {
						var entires = f.data;
						if(entires != null) {
							var dataMap = new haxe_ds_StringMap();
							var _g2 = 0;
							while(_g2 < entires.length) {
								var e = entires[_g2];
								++_g2;
								var k = e.key;
								var v = e.val;
								if(__map_reserved[k] != null) dataMap.setReserved(k,v); else dataMap.h[k] = v;
								v;
							}
							var filter = new core_sorting_Filter(ordering,dataMap);
							filter.setName(f.name);
							temp.push(filter);
						}
					}
				}
				this.filterMap = temp;
			}
		}
	}
	,saveFilters: function() {
		var filters = [];
		var _g = 0;
		var _g1 = this.filterMap;
		while(_g < _g1.length) {
			var filter = _g1[_g];
			++_g;
			var entires = [];
			var dataMap = filter.getFilterMap();
			var $it0 = dataMap.keys();
			while( $it0.hasNext() ) {
				var key = $it0.next();
				var val;
				val = __map_reserved[key] != null?dataMap.getReserved(key):dataMap.h[key];
				entires.push({ key : key, val : val});
			}
			filters.push({ data : entires, name : filter.getName()});
		}
		if(this.filterKey != null) core_dataaccess_PersistenceManager.store(this.filterKey,{ filters : filters},false);
	}
	,createFilter: function(filters) {
		throw new js__$Boot_HaxeError("You must override createFilter in ${Type.getClassName(Type.getClass(this))}.");
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
		var openManagementReviewReport = function() {
			Core.modalChange.dispatch("mr-report");
		};
		var openProductionScheduleReport = function() {
			Core.modalChange.dispatch("ps-report");
		};
		var forceUpdate = function() {
			Core.viewChange.dispatch("refresh",null);
		};
		return React.createElement("div",{ id : "topMenu", className : "ui menu"},React.createElement("a",{ onClick : openNewJobDialog, className : "item active"},React.createElement("i",{ className : "add circle icon"}),"Add Job"),React.createElement("a",{ onClick : openManageFilterDialog, className : "item"},React.createElement("i",{ className : "filter icon"}),"Manage Filters"),React.createElement("a",{ onClick : openManagementReviewReport, className : "item"},React.createElement("i",{ className : "suitcase icon"}),"Management Review"),React.createElement("a",{ onClick : openProductionScheduleReport, className : "item"},React.createElement("i",{ className : "calendar icon"}),"Production Schedule"),React.createElement("a",{ onClick : forceUpdate, className : "right item"},React.createElement("i",{ className : "refresh icon"}),"Refresh"));
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
		} else arr.push({ rep : "Revision", name : "id"});
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
			var jid = org.identifier;
			var id = new StringBuf();
			id.b += Std.string(jid.prefix);
			id.b += "-";
			id.addSub(jid.year == null?"null":"" + jid.year,2,2);
			id.b += "-";
			if(jid.label == null) id.b += "null"; else id.b += "" + jid.label;
			return id.b;
		case "salesperson":
			return org.salesperson.label;
		case "shop":
			return org.shop.label;
		case "status":
			return "" + Std.string(org.status);
		case "customer":
			return "" + org.customer.label;
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
		var key;
		key = "" + Std.string(job.identifier.prefix) + "-" + (function($this) {
			var $r;
			var _this = job.identifier.year.toString();
			$r = HxOverrides.substr(_this,2,2);
			return $r;
		}(this)) + "-" + job.identifier.label;
		var revs = false;
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
core_view_main_ContentManager.buildContent = function(viewId,info,callback) {
	if(core_view_main_ContentManager.contentMap[viewId] == null) return null;
	return core_view_main_ContentManager.contentMap[viewId](info,callback);
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
		var canHideDropdown = [canHide,"dropdown","ui"];
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
			if(elem1.hasClass("dropdown")) elem1.dropdown();
			elem1.transition({ animation : "slide down", duration : "400ms"});
		};
		var openReport = function(reportId,event) {
			core_reporting_ReportManager.showReport(reportId,jobId);
		};
		return React.createElement("div",{ id : "mainMenu", className : "ui blue menu inverted vertical left fixed"},React.createElement("div",{ className : "item"},React.createElement("img",{ src : "img/ssi_logo.svg", className : "ui logo middle aligned centered medium image"})),React.createElement("a",{ style : login, onClick : $bind(this,this.toggleLoginDialog), className : "item"},"Login"),React.createElement("a",{ style : logout, onClick : $bind(this,this.toggleLogout), className : "item"},"Logout"),React.createElement("a",{ onClick : (function(f,a1) {
			return function(e) {
				f(a1,e);
			};
		})($bind(this,this.toggleView),"job"), className : cls(canDisable)},"Job"),React.createElement("a",{ onDoubleClick : editSelectedJob, style : style, className : cls(canDisable)},React.createElement("div",{ id : "selectedJob", 'data-content' : "Double click to edit this job.", 'data-variation' : "mini inverted", ref : popup, className : "ui center aligned basic segment"},jobId)),React.createElement("div",{ ref : transition, tabIndex : "0", className : cls(canHideDropdown)},React.createElement("i",{ className : "dropdown icon"}),"Job Reports",React.createElement("div",{ tabIndex : "-1", className : "menu"},React.createElement("a",{ onClick : (function(f1,a11) {
			return function(a2) {
				f1(a11,a2);
			};
		})(openReport,"specialtyItems"), className : "item"},"Specialty Items"),React.createElement("a",{ onClick : (function(f2,a12) {
			return function(a21) {
				f2(a12,a21);
			};
		})(openReport,"layoutDrawing"), className : "item"},"Layout Drawing"),React.createElement("a",{ onClick : (function(f3,a13) {
			return function(a22) {
				f3(a13,a22);
			};
		})(openReport,"detailDrawing"), className : "item"},"Detail Drawing"),React.createElement("a",{ onClick : (function(f4,a14) {
			return function(a23) {
				f4(a14,a23);
			};
		})(openReport,"computerDrawing"), className : "item"},"Computer Drawing"),React.createElement("a",{ onClick : (function(f5,a15) {
			return function(a24) {
				f5(a15,a24);
			};
		})(openReport,"zone"), className : "item"},"Zone"),React.createElement("a",{ onClick : (function(f6,a16) {
			return function(a25) {
				f6(a16,a25);
			};
		})(openReport,"materialShipper"), className : "item"},"Material Shipper"),React.createElement("a",{ onClick : (function(f7,a17) {
			return function(a26) {
				f7(a17,a26);
			};
		})(openReport,"shipVia"), className : "item"},"Ship Via"),React.createElement("a",{ onClick : (function(f8,a18) {
			return function(a27) {
				f8(a18,a27);
			};
		})(openReport,"jobShipments"), className : "item"},"Job Shipments"))),React.createElement("a",{ onClick : (function(f9,a19) {
			return function(e1) {
				f9(a19,e1);
			};
		})($bind(this,this.toggleView),"dwg"), ref : transition, className : cls(canHide)},"Drawing"),React.createElement("div",{ ref : transition, className : cls(canHide)},"Shippable",React.createElement("div",{ className : "menu"},React.createElement("a",{ onClick : (function(f10,a110) {
			return function(e2) {
				f10(a110,e2);
			};
		})($bind(this,this.toggleView),"mark"), ref : transition, className : cls(canHide)},"Mark"),React.createElement("a",{ onClick : (function(f11,a111) {
			return function(e3) {
				f11(a111,e3);
			};
		})($bind(this,this.toggleView),"rms"), ref : transition, className : cls(canHide)},"RMS"))),React.createElement("a",{ onClick : (function(f12,a112) {
			return function(e4) {
				f12(a112,e4);
			};
		})($bind(this,this.toggleView),"abm"), ref : transition, className : cls(canHide)},"ABM"),React.createElement("a",{ onClick : (function(f13,a113) {
			return function(e5) {
				f13(a113,e5);
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
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,__class__: haxe_ds_StringMap
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
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
msignal_SlotList.NIL = new msignal_SlotList(null,null);
var q = window.jQuery;
var js = js || {}
js.JQuery = q;
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
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
var __map_reserved = {}
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
core_view_UidGenerator.prefix = "UID-";
core_view_UidGenerator.label = 0;
core_view_main_ManageFilterDialog.FILTERLISTITEM = React.createClass({ render : function() {
	var onClick = this.props.onClick;
	return React.createElement("div",{ visible : this.props.visible, key : "filter-" + core_view_UidGenerator.nextId(), className : "item"},React.createElement("div",{ className : "right floated content"},React.createElement("div",{ filterIndex : this.props.fid, onClick : onClick, className : "ui mini button"},"Delete")),React.createElement("i",{ className : "filter icon"}),React.createElement("div",{ className : "content"},this.props.name));
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
core_view_job_modal_NewFilterDialog.statusTypes = ["ALL","INACTIVE","ACTIVE","COMPLETED","CANCELLED","DELETED"];
core_view_job_modal_NewFilterDialog.prefixTypes = ["ALL","B","F","FC","FE","FR","FS","M","MF","MT","RG","BM","LM","MM","D","G","DR","EE","ME","MS","TM"];
core_view_job_modal_NewFilterDialog.FIELD = React.createClass({ handleOnChange : function(e) {
	var value = e.target.value;
	var name = this.props.name;
	this.props.onChange(name,value);
	this.props.value = value;
}, render : function() {
	var p = this.props;
	var type;
	if(p.type == null) type = "text"; else type = p.type;
	var pattern;
	if(p.pattern == null) pattern = ""; else pattern = p.pattern;
	return React.createElement("div",{ className : p.className},React.createElement("label",null,p.label),React.createElement("input",{ onChange : this.handleOnChange, name : p.name, value : this.props.value, type : type, ref : p.mask, placeholder : p.pholder, pattern : pattern}));
}});
core_view_job_modal_NewFilterDialog.DROPDOWN = React.createClass({ getInitialState : function() {
	var items = [];
	var rawItems = this.props.items;
	var _g = 0;
	while(_g < rawItems.length) {
		var abr = rawItems[_g];
		++_g;
		items.push(React.createElement("div",{ 'data-value' : abr, key : "static-" + core_view_UidGenerator.nextId(), className : "item"},abr));
	}
	var title = this.props.title;
	return { itms : items, firstSelected : this.props.def == null?"default":this.props.def, title : title};
}, initialize : function(input) {
	if(input == null) return;
	var elem = js.JQuery(ReactDOM.findDOMNode(input));
	elem.dropdown({ onChange : this.handleOnChange}).dropdown("set selected",this.state.firstSelected);
}, handleOnChange : function(value,text,selectedItem) {
	var name = this.props.label;
	this.props.onChange(name,value);
}, render : function() {
	return React.createElement("div",{ ref : this.initialize, className : "ui search selection dropdown"},React.createElement("input",{ name : this.state.title, type : "hidden"}),React.createElement("i",{ className : "dropdown icon"}),React.createElement("div",{ className : "default text"},this.state.title),React.createElement("div",{ className : "menu"},this.state.itms));
}});
core_view_job_modal_NewFilterDialog.displayName = "NewFilterDialog";
core_view_job_modal_MngReportDialog.FIELD = React.createClass({ handleOnChange : function(e) {
	var value = e.target.value;
	var name = this.props.name;
	this.props.onChange(name,value);
}, render : function() {
	var p = this.props;
	var type;
	if(p.type == null) type = "text"; else type = p.type;
	var pattern;
	if(p.pattern == null) pattern = ""; else pattern = p.pattern;
	return React.createElement("div",{ className : p.className},React.createElement("label",null,p.label),React.createElement("input",{ onChange : this.handleOnChange, defaultValue : this.props.defaultValue, name : p.name, value : this.props.value, type : type, ref : p.mask, placeholder : p.pholder, pattern : pattern}));
}});
core_view_job_modal_MngReportDialog.displayName = "MngReportDialog";
core_view_job_modal_ProdReportDialog.FIELD = React.createClass({ handleOnChange : function(e) {
	var value = e.target.value;
	var name = this.props.name;
	this.props.onChange(name,value);
}, render : function() {
	var p = this.props;
	var type;
	if(p.type == null) type = "text"; else type = p.type;
	var pattern;
	if(p.pattern == null) pattern = ""; else pattern = p.pattern;
	return React.createElement("div",{ className : p.className},React.createElement("label",null,p.label),React.createElement("input",{ onChange : this.handleOnChange, defaultValue : this.props.defaultValue, name : p.name, value : this.props.value, type : type, ref : p.mask, placeholder : p.pholder, pattern : pattern}));
}});
core_view_job_modal_ProdReportDialog.displayName = "ProdReportDialog";
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
		comp = React.createElement(core_view_main_ManageFilterDialog,{ id : "mfil-job-dialog", structure : dataObj.structure, key : "mfil-job-dialog"});
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
	case "job-filter":
		comp = React.createElement(core_view_job_modal_NewFilterDialog,{ id : "newfilter-dialog", structure : dataObj.structure, key : "newfilter-dialog"});
		break;
	case "mr-report":
		comp = React.createElement(core_view_job_modal_MngReportDialog,{ id : "mr-report-dialog", key : "mr-report-dialog"});
		break;
	case "ps-report":
		comp = React.createElement(core_view_job_modal_ProdReportDialog,{ id : "ps-report-dialog", key : "ps-report-dialog"});
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
core_dataaccess_ServiceAccessManager.baseUrl = "http://localhost/";
core_dataaccess_ServiceAccessManager.contextRoot = "api";
core_reporting_ReportingService.TEST_PDF = "data:application/pdf;base64,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RGF0ZShEOjIwMTYwMjE0MTYzNTM0LTA2JzAwJykvUHJvZHVjZXIoaVRleHQgMi4xLjcgYnkgMVQzWFQpL1RpdGxlKFByb2R1Y3Rpb24gU2NoZWR1bGUpPj4KZW5kb2JqCnhyZWYKMCAyNAowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDQ5NzkgMDAwMDAgbiAKMDAwMDA0NDYwNiAwMDAwMCBuIAowMDAwMDQ0Njk2IDAwMDAwIG4gCjAwMDAwMDAwMTUgMDAwMDAgbiAKMDAwMDA0NDc4NSAwMDAwMCBuIAowMDAwMDA1MTUxIDAwMDAwIG4gCjAwMDAwMTE0OTMgMDAwMDAgbiAKMDAwMDAxMTY2NSAwMDAwMCBuIAowMDAwMDE3OTUxIDAwMDAwIG4gCjAwMDAwMTgxMjMgMDAwMDAgbiAKMDAwMDAyNDUzMCAwMDAwMCBuIAowMDAwMDI0NzA0IDAwMDAwIG4gCjAwMDAwMzEwOTIgMDAwMDAgbiAKMDAwMDAzMTI2NiAwMDAwMCBuIAowMDAwMDM3Njk3IDAwMDAwIG4gCjAwMDAwMzc4NzEgMDAwMDAgbiAKMDAwMDA0NDQzMiAwMDAwMCBuIAowMDAwMDM3OTEwIDAwMDAwIG4gCjAwMDAwMzc5NDkgMDAwMDAgbiAKMDAwMDAzODAwNSAwMDAwMCBuIAowMDAwMDM4MDM5IDAwMDAwIG4gCjAwMDAwNDQ4ODggMDAwMDAgbiAKMDAwMDA0NDk0NyAwMDAwMCBuIAp0cmFpbGVyCjw8L0luZm8gMjMgMCBSL0lEIFs8MzE2MTQ3MjE1Yzk4ZDI2NDc5OWZmZDU2MjBmMDhiNDQ+PDAzOWYwNDQ2M2M0ZmVlMjUxNDlkNGU3ZTNiMjVjZTllPl0vUm9vdCAyMiAwIFIvU2l6ZSAyND4+CnN0YXJ0eHJlZgo0NTA5NwolJUVPRgo=";
core_reporting_ReportingService.baseUrl = "api/reports/";
core_reporting_ReportingService.reportUrlMap = { managementReview : "management-review", productionSchedule : "production-schedule", specialtyItemsByJob : "specialty-items-by-job", specialtyItemsByPartType : "specialty-items-by-part-type", layoutDrawing : "layout-drawing", detailDrawing : "detail-drawing", computerDrawing : "computer-drawing", zone : "zone", materialShipper : "material-shipper", shipVia : "ship-via", jobShipments : "job-shipments", rms : "rms", shipment : "shipment"};
core_reporting_ReportingService.reportingMap = { managementReview : function() {
	return core_reporting_ReportingService.TEST_PDF;
}, productionSchedule : function() {
	return core_reporting_ReportingService.TEST_PDF;
}, specialtyItemsByJob : function() {
	return core_reporting_ReportingService.TEST_PDF;
}, specialtyItemsByPartType : function() {
	return core_reporting_ReportingService.TEST_PDF;
}, layoutDrawing : function() {
	return core_reporting_ReportingService.TEST_PDF;
}, detailDrawing : function() {
	return core_reporting_ReportingService.TEST_PDF;
}, computerDrawing : function() {
	return core_reporting_ReportingService.TEST_PDF;
}, zone : function() {
	return core_reporting_ReportingService.TEST_PDF;
}, materialShipper : function() {
	return core_reporting_ReportingService.TEST_PDF;
}, shipVia : function() {
	return core_reporting_ReportingService.TEST_PDF;
}, jobShipments : function() {
	return core_reporting_ReportingService.TEST_PDF;
}, rms : function() {
	return core_reporting_ReportingService.TEST_PDF;
}, shipment : function() {
	return core_reporting_ReportingService.TEST_PDF;
}};
core_view_abm_AbmViewMenu.displayName = "AbmViewMenu";
js_Boot.__toStr = {}.toString;
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
core_view_abm_modal_NewAbmModalComponents.MFACTDROPDOWN = React.createClass({ getInitialState : function() {
	var items = [];
	var mfacts = [];
	core_dataaccess_ServiceAccessManager.getData(core_dataaccess_EndPoint.MFACT,{ success : function(res) {
		mfacts = res.data;
	}, error : function() {
	}});
	var _g = 0;
	while(_g < mfacts.length) {
		var mfact = mfacts[_g];
		++_g;
		items.push(React.createElement("div",{ 'data-value' : mfact.label, key : "static-" + core_view_UidGenerator.nextId(), className : "item"},mfact.label));
	}
	return { itms : items, firstSelected : this.props.def == null?"default":this.props.def};
}, initialize : function(input) {
	if(input == null) return;
	var elem = js.JQuery(ReactDOM.findDOMNode(input));
	elem.dropdown({ onChange : this.handleOnChange}).dropdown("set selected",this.state.firstSelected);
}, handleOnChange : function(value,text,selectedItem) {
	var name = this.props.name;
	this.props.onChange(name,value);
	if(value == "Create New") this.setState({ createNew : true});
}, render : function() {
	if(this.state.createNew) return React.createElement(core_view_abm_modal_NewAbmModalComponents.FIELD,{ onChange : this.handleOnChange, name : "manufacturer", className : "field"}); else return React.createElement("div",{ ref : this.initialize, className : "ui search selection dropdown"},React.createElement("input",{ name : "manufacturer", type : "hidden"}),React.createElement("i",{ className : "dropdown icon"}),React.createElement("div",{ className : "default text"},"Manufacturer"),React.createElement("div",{ className : "menu"},this.state.itms,React.createElement("div",{ 'data-value' : "Create New", className : "item"},"Create New")));
}});
core_view_abm_modal_NewAbmModalComponents.VENDORDROPDOWN = React.createClass({ getInitialState : function() {
	var items = [];
	var vendors = [];
	core_dataaccess_ServiceAccessManager.getData(core_dataaccess_EndPoint.VENDOR,{ success : function(res) {
		vendors = res.data;
	}, error : function() {
	}});
	var _g = 0;
	while(_g < vendors.length) {
		var v = vendors[_g];
		++_g;
		items.push(React.createElement("div",{ 'data-value' : v.label, key : "static-" + core_view_UidGenerator.nextId(), className : "item"},v.label));
	}
	return { itms : items, firstSelected : this.props.def == null?"default":this.props.def};
}, initialize : function(input) {
	if(input == null) return;
	var elem = js.JQuery(ReactDOM.findDOMNode(input));
	elem.dropdown({ onChange : this.handleOnChange}).dropdown("set selected",this.state.firstSelected);
}, handleOnChange : function(value,text,selectedItem) {
	var name = this.props.name;
	this.props.onChange(name,value);
	if(value == "Create New") this.setState({ createNew : true});
}, render : function() {
	if(this.state.createNew) return React.createElement(core_view_abm_modal_NewAbmModalComponents.FIELD,{ label : "Vendor", onChange : this.handleOnChange, name : "vendor", className : "three wide field"}); else return React.createElement("div",{ className : "field"},React.createElement("label",null,"Vendor"),React.createElement("div",{ ref : this.initialize, className : "ui search selection dropdown"},React.createElement("input",{ name : "vendor", type : "hidden"}),React.createElement("i",{ className : "dropdown icon"}),React.createElement("div",{ className : "default text"},"Vendor"),React.createElement("div",{ className : "menu"},this.state.itms,React.createElement("div",{ 'data-value' : "Create New", className : "item"},"Create New"))));
}});
core_view_abm_modal_NewAbmModalComponents.PARTDROPDOWN = React.createClass({ getInitialState : function() {
	var items = [];
	var parts = [];
	core_dataaccess_ServiceAccessManager.getData(core_dataaccess_EndPoint.PART,{ success : function(res) {
		parts = res.data;
	}, error : function() {
	}});
	var _g = 0;
	while(_g < parts.length) {
		var part = parts[_g];
		++_g;
		items.push(React.createElement("div",{ 'data-value' : part.number, key : "static-" + core_view_UidGenerator.nextId(), className : "item"},part.number));
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
	return React.createElement("div",{ ref : this.initialize, className : "ui search selection dropdown"},React.createElement("input",{ name : "part", type : "hidden"}),React.createElement("i",{ className : "dropdown icon"}),React.createElement("div",{ className : "default text"},"Part NO"),React.createElement("div",{ className : "menu"},this.state.itms,React.createElement("div",{ 'data-value' : "Create New", className : "item"},"Create New")));
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
	var label = job.identifier.label + HxOverrides.substr("" + job.identifier.year,2,2);
	var current = job;
	return React.createElement("div",{ className : "field"},React.createElement("div",{ className : "inline fields"},React.createElement(core_view_components_ModalComponents.FIELD,{ label : "Job" + String.fromCharCode(160) + "ID", name : "id-prefix", value : job.identifier.prefix, pholder : "Prefix", className : "six wide field"}),React.createElement(core_view_components_ModalComponents.FIELD,{ name : "id-label", value : label, pholder : "ID", className : "ten wide field"})),React.createElement("div",{ className : "fields"},React.createElement(core_view_components_ModalComponents.FIELD,{ name : "customer", value : current.customer, pholder : "Customer", className : "sixteen wide field"})),React.createElement("div",{ className : "two fields"},React.createElement(core_view_components_ModalComponents.FIELD,{ name : "salesman", value : current.salesperson.label, pholder : "Salesman", className : "field"}),React.createElement(core_view_components_ModalComponents.FIELD,{ name : "customer", value : current.contractPrice, pholder : "Contract Price", className : "field"})),React.createElement("div",{ className : "two fields"},React.createElement(core_view_components_ModalComponents.FIELD,{ mask : core_view_main_FieldMask.dateField, name : "customer", value : current.startDate, pholder : "Start Date", className : "field"}),React.createElement(core_view_components_ModalComponents.FIELD,{ mask : core_view_main_FieldMask.dateField, name : "customer", value : current.dueDate, pholder : "Due Date", className : "field"})));
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
	return React.createElement("div",{ className : "field"},React.createElement("div",{ className : "three fields"},React.createElement(core_view_job_modal_EditJobModalComponents.FIELD,{ label : "Prefix", onChange : this.handleId, name : "prefix", value : id2.prefix, className : "field"}),React.createElement(core_view_job_modal_EditJobModalComponents.FIELD,{ label : "Id", onChange : this.handleId, name : "label", value : id2.label, className : "field"}),React.createElement(core_view_job_modal_EditJobModalComponents.FIELD,{ label : "Year", onChange : this.handleId, name : "year", value : id2.year, min : "1000", type : "number", max : "9999", className : "field"})),React.createElement(core_view_job_modal_EditJobModalComponents.CUSTDROPDOWN,{ label : "Customer", onChange : this.handleCustomer, name : "label", value : cu2.label, className : "field"}),React.createElement("div",{ className : "two fields"},React.createElement(core_view_job_modal_EditJobModalComponents.SALESDROPDOWN,{ label : "Salesman", onChange : this.handleSalesman, name : "label", value : sm2.label, className : "field"}),React.createElement(core_view_job_modal_EditJobModalComponents.FIELD,{ label : "Contract Price", onChange : this.handleOnChange, name : "contractPrice", value : obj2.contractPrice, className : "field"})),React.createElement("div",{ className : "two fields"},React.createElement(core_view_job_modal_EditJobModalComponents.FIELD,{ label : "Start Date", onChange : this.handleOnChange, name : "start", value : obj2.start, type : "date", className : "field"}),React.createElement(core_view_job_modal_EditJobModalComponents.FIELD,{ label : "Due Date", onChange : this.handleOnChange, name : "due", value : obj2.due, type : "date", className : "field"})));
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
core_view_job_modal_EditJobModalComponents.CUSTDROPDOWN = React.createClass({ getInitialState : function() {
	var items = [];
	var customers = [];
	core_dataaccess_ServiceAccessManager.getData(core_dataaccess_EndPoint.CUSTOMER,{ success : function(res) {
		customers = res.data;
	}, error : function() {
	}});
	var _g = 0;
	while(_g < customers.length) {
		var customer = customers[_g];
		++_g;
		items.push(React.createElement("div",{ 'data-value' : customer.label, key : "static-" + core_view_UidGenerator.nextId(), className : "item"},customer.label));
	}
	return { itms : items, firstSelected : this.props.def == null?"default":this.props.def};
}, initialize : function(input) {
	if(input == null) return;
	var elem = js.JQuery(ReactDOM.findDOMNode(input));
	elem.dropdown({ onChange : this.handleOnChange}).dropdown("set selected",this.state.firstSelected);
}, handleOnChange : function(value,text,selectedItem) {
	var name = this.props.name;
	this.props.onChange(name,value);
	if(value == "Create New") this.setState({ createNew : true});
}, render : function() {
	if(this.state.createNew) return React.createElement(core_view_job_modal_EditJobModalComponents.FIELD,{ label : "Customer", onChange : this.handleCustomer, name : "label", className : "field"}); else return React.createElement("div",{ className : "field"},React.createElement("label",null,"Customer"),React.createElement("div",{ ref : this.initialize, className : "ui search selection dropdown"},React.createElement("input",{ name : "customer", type : "hidden"}),React.createElement("i",{ className : "dropdown icon"}),React.createElement("div",{ className : "default text"},"Customer"),React.createElement("div",{ className : "menu"},this.state.itms,React.createElement("div",{ 'data-value' : "Create New", className : "item"},"Create New"))));
}});
core_view_job_modal_EditJobModalComponents.SALESDROPDOWN = React.createClass({ getInitialState : function() {
	var items = [];
	var salesmen = [];
	core_dataaccess_ServiceAccessManager.getData(core_dataaccess_EndPoint.SALESPERSON,{ success : function(res) {
		salesmen = res.data;
	}, error : function() {
	}});
	var _g = 0;
	while(_g < salesmen.length) {
		var salesman = salesmen[_g];
		++_g;
		items.push(React.createElement("div",{ 'data-value' : salesman.label, key : "static-" + core_view_UidGenerator.nextId(), className : "item"},salesman.label));
	}
	return { itms : items, firstSelected : this.props.def == null?"default":this.props.def};
}, initialize : function(input) {
	if(input == null) return;
	var elem = js.JQuery(ReactDOM.findDOMNode(input));
	elem.dropdown({ onChange : this.handleOnChange}).dropdown("set selected",this.state.firstSelected);
}, handleOnChange : function(value,text,selectedItem) {
	var name = this.props.name;
	this.props.onChange(name,value);
	if(value == "Create New") this.setState({ createNew : true});
}, render : function() {
	if(this.state.createNew) return React.createElement(core_view_job_modal_EditJobModalComponents.FIELD,{ label : "Salesman", onChange : this.handleSalesman, name : "label", className : "field"}); else return React.createElement("div",{ className : "field"},React.createElement("label",null,"Salesman"),React.createElement("div",{ ref : this.initialize, className : "ui search selection dropdown"},React.createElement("input",{ name : "salesman", type : "hidden"}),React.createElement("i",{ className : "dropdown icon"}),React.createElement("div",{ className : "default text"},"Salesman"),React.createElement("div",{ className : "menu"},this.state.itms,React.createElement("div",{ 'data-value' : "Create New", className : "item"},"Create New"))));
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
	return React.createElement("div",{ className : "field"},React.createElement("div",{ className : "three fields"},React.createElement(core_view_job_modal_NewJobModalComponents.FIELD,{ label : "Prefix", onChange : this.handleId, name : "prefix", className : "field"}),React.createElement(core_view_job_modal_NewJobModalComponents.FIELD,{ label : "Id", onChange : this.handleId, name : "label", className : "field"}),React.createElement(core_view_job_modal_NewJobModalComponents.FIELD,{ label : "Year", onChange : this.handleId, name : "year", min : "1000", type : "number", max : "9999", className : "field"})),React.createElement(core_view_job_modal_NewJobModalComponents.CUSTDROPDOWN,{ label : "Customer", onChange : this.handleCustomer, name : "customer", className : "field"}),React.createElement("div",{ className : "two fields"},React.createElement(core_view_job_modal_NewJobModalComponents.SALESDROPDOWN,{ label : "Salesman", onChange : this.handleSalesman, name : "salesman", className : "field"}),React.createElement(core_view_job_modal_NewJobModalComponents.FIELD,{ label : "Contract Price", onChange : this.handleOnChange, name : "customer", className : "field"})),React.createElement("div",{ className : "two fields"},React.createElement(core_view_job_modal_NewJobModalComponents.FIELD,{ label : "Start Date", onChange : this.handleOnChange, name : "start", type : "date", className : "field"}),React.createElement(core_view_job_modal_NewJobModalComponents.FIELD,{ label : "Due Date", onChange : this.handleOnChange, name : "due", type : "date", className : "field"})));
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
core_view_job_modal_NewJobModalComponents.CUSTDROPDOWN = React.createClass({ getInitialState : function() {
	var items = [];
	var customers = [];
	core_dataaccess_ServiceAccessManager.getData(core_dataaccess_EndPoint.CUSTOMER,{ success : function(res) {
		customers = res.data;
	}, error : function() {
	}});
	var _g = 0;
	while(_g < customers.length) {
		var customer = customers[_g];
		++_g;
		items.push(React.createElement("div",{ 'data-value' : customer.label, key : "static-" + core_view_UidGenerator.nextId(), className : "item"},customer.label));
	}
	return { itms : items, firstSelected : this.props.def == null?"default":this.props.def};
}, initialize : function(input) {
	if(input == null) return;
	var elem = js.JQuery(ReactDOM.findDOMNode(input));
	elem.dropdown({ onChange : this.handleOnChange}).dropdown("set selected",this.state.firstSelected);
}, handleOnChange : function(value,text,selectedItem) {
	var name = this.props.name;
	this.props.onChange(name,value);
	if(value == "Create New") this.setState({ createNew : true});
}, render : function() {
	if(this.state.createNew) return React.createElement(core_view_job_modal_NewJobModalComponents.FIELD,{ label : "Customer", onChange : this.handleCustomer, name : "label", className : "field"}); else return React.createElement("div",{ className : "field"},React.createElement("label",null,"Customer"),React.createElement("div",{ ref : this.initialize, className : "ui search selection dropdown"},React.createElement("input",{ name : "customer", type : "hidden"}),React.createElement("i",{ className : "dropdown icon"}),React.createElement("div",{ className : "default text"},"Customer"),React.createElement("div",{ className : "menu"},this.state.itms,React.createElement("div",{ 'data-value' : "Create New", className : "item"},"Create New"))));
}});
core_view_job_modal_NewJobModalComponents.SALESDROPDOWN = React.createClass({ getInitialState : function() {
	var items = [];
	var salesmen = [];
	core_dataaccess_ServiceAccessManager.getData(core_dataaccess_EndPoint.SALESPERSON,{ success : function(res) {
		salesmen = res.data;
	}, error : function() {
	}});
	var _g = 0;
	while(_g < salesmen.length) {
		var salesman = salesmen[_g];
		++_g;
		items.push(React.createElement("div",{ 'data-value' : salesman.label, key : "static-" + core_view_UidGenerator.nextId(), className : "item"},salesman.label));
	}
	return { itms : items, firstSelected : this.props.def == null?"default":this.props.def};
}, initialize : function(input) {
	if(input == null) return;
	var elem = js.JQuery(ReactDOM.findDOMNode(input));
	elem.dropdown({ onChange : this.handleOnChange}).dropdown("set selected",this.state.firstSelected);
}, handleOnChange : function(value,text,selectedItem) {
	var name = this.props.name;
	this.props.onChange(name,value);
	if(value == "Create New") this.setState({ createNew : true});
}, render : function() {
	if(this.state.createNew) return React.createElement(core_view_job_modal_NewJobModalComponents.FIELD,{ label : "Salesman", onChange : this.handleSalesman, name : "label", className : "field"}); else return React.createElement("div",{ className : "field"},React.createElement("label",null,"Salesman"),React.createElement("div",{ ref : this.initialize, className : "ui search selection dropdown"},React.createElement("input",{ name : "salesman", type : "hidden"}),React.createElement("i",{ className : "dropdown icon"}),React.createElement("div",{ className : "default text"},"Salesman"),React.createElement("div",{ className : "menu"},this.state.itms,React.createElement("div",{ 'data-value' : "Create New", className : "item"},"Create New"))));
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
core_view_main_ContentManager.contentMap = { jobView : function(info,callback) {
	core_dataaccess_ServiceAccessManager.getData(core_dataaccess_EndPoint.JOB,{ success : function(response) {
		if(response.success) callback(response.data);
	}});
}};
core_view_main_SideMenu.displayName = "SideMenu";
core_view_shipment_ShipmentViewMenu.displayName = "ShipmentViewMenu";
core_view_mark_MarkViewMenu.displayName = "MarkViewMenu";
core_view_rms_RmsViewMenu.displayName = "RmsViewMenu";
core_view_main_ViewRegistry.views = { jobView : function(content) {
	var structure = new core_view_job_structure_JobTableStructure();
	var order = structure.generateDefaultOrder(content);
	structure.setFilterKey("job-filter");
	structure.loadFilters();
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
	structure1.setFilterKey("dwg-filter");
	structure1.loadFilters();
	var cls1 = ["selectable"];
	return React.createElement(core_view_components_TableComponent,{ ordering : order1, classes : cls1, structure : structure1, data : content1});
}, shpmntMenu : function() {
	return React.createElement(core_view_shipment_ShipmentViewMenu,null);
}, shpmntView : function(content2) {
	var structure2 = new core_view_shipment_structure_ShipmentTableStructure();
	var order2 = structure2.generateDefaultOrder(content2);
	structure2.setFilterKey("shpmnt-filter");
	structure2.loadFilters();
	var cls2 = ["selectable"];
	return React.createElement(core_view_components_TableComponent,{ ordering : order2, classes : cls2, structure : structure2, data : content2});
}, abmMenu : function() {
	return React.createElement(core_view_abm_AbmViewMenu,null);
}, abmView : function(content3) {
	var structure3 = new core_view_abm_structure_AbmTableStructure();
	var order3 = structure3.generateDefaultOrder(content3);
	structure3.setFilterKey("abm-filter");
	structure3.loadFilters();
	var cls3 = ["selectable"];
	return React.createElement(core_view_components_TableComponent,{ ordering : order3, classes : cls3, structure : structure3, data : content3});
}, markMenu : function() {
	return React.createElement(core_view_mark_MarkViewMenu,null);
}, markView : function(content4) {
	var structure4 = new core_view_mark_structure_MarkTableStructure();
	var order4 = structure4.generateDefaultOrder(content4);
	structure4.setFilterKey("mark-filter");
	structure4.loadFilters();
	var cls4 = ["selectable"];
	return React.createElement(core_view_components_TableComponent,{ ordering : order4, classes : cls4, structure : structure4, data : content4});
}, rmsMenu : function() {
	return React.createElement(core_view_rms_RmsViewMenu,null);
}, rmsView : function(content5) {
	var structure5 = new core_view_rms_structure_RmsTableStructure();
	var order5 = structure5.generateDefaultOrder(content5);
	structure5.setFilterKey("rms-filter");
	structure5.loadFilters();
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
		console.log(items1);
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
	var items4 = this.state.items;
	if(items4 == null) items4 = this.state.internalItems;
	var tabCount = Math.ceil(items4.length / 5.0);
	var index1 = 0;
	var _g1 = 0;
	var _g = tabCount;
	while(_g1 < _g) {
		var i3 = _g1++;
		var rows = [];
		var start = i3 * 5;
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
		console.log(i3);
		var tbcls = classNames("ui","basic","tab",{ active : i3 == 0},"segment");
		tabs.push(React.createElement("div",{ 'data-tab' : dataTab, key : "tseg-" + dataTab + "-" + items4.length, className : tbcls},React.createElement("table",{ className : "ui very basic table"},React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",null),React.createElement("th",null,"Item ID"),React.createElement("th",null,"Descripiton"),React.createElement("th",null,"Requested"))),React.createElement("tbody",null,rows))));
		var tabInitialize = function(input1) {
			if(input1 == null) return;
			var tab = js.JQuery(input1);
			tab.tab();
		};
		console.log({ active : i3 == 0});
		var cls = classNames("item",{ active : i3 == 0});
		page.push(React.createElement("a",{ 'data-tab' : dataTab, ref : tabInitialize, key : "key-" + dataTab + "-" + items4.length, className : cls},i3 + 1));
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
