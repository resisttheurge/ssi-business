package core.view.job.structure;

import core.view.main.ContentManager.Content;
import api.react.ReactDOM;
import js.JQuery;
import js.html.HtmlElement;
import Type;
import api.react.React;
import core.view.UidGenerator;
import api.react.ReactComponent;
import core.sorting.Ordering;
import core.sorting.Ordering.FieldData;
import core.models.CoreTypes.Job;
import core.structure.TableStructure;
import api.react.ReactComponent.ReactComponentOfState;
import api.react.ReactMacro.jsx;


class JobTableStructure extends TableStructure<Job> {
    private static inline function jt(){return untyped __js__('this');}

    private var jobTable: Bool = true;
    private var revIndex: Int = 0;

    public function new(jobTable: Bool = true) {
        super();

        this.jobTable = jobTable;
    }

    override public function init(parent:ReactComponent) {
        super.init(parent);

        jobTable = parentTable.props.revTable != true;
    }


    public override function generateDefaultOrder(data: Array<Job>): Ordering<Job> {
        var arr = new Array<{rep: String, name: String}>();

        if(jobTable){
            arr.push({rep: "Id", name: "id"});
            arr.push({rep: "Customer", name: "customer"});
//            arr.push({rep: "City", name: "addresses.shipping.city"});
//            arr.push({rep: "State", name: "addresses.shipping.stateOrProvince"});
        } else {
            arr.push({rep: "Revision", name: "id"});
//            arr.push({rep: "Description", name: "revisions"});
        }


        var order = new Ordering<Job>(arr, "");

        return order;
    }

    private function generateData(data:FieldData<Job>, ord:Ordering<Job>):Dynamic {
        var org:Job = data.original;

        switch data.field.name {
            case f if(f.split(".").length > 1): {
                var obj = data.data;


                for(s in f.split(".").slice(1)){
                    obj = untyped obj[s];
                }

                return obj;
            };
            case "id": {
                if(!jobTable) return revIndex + 1;

                var jid = org.identifier;
                var id:StringBuf = new StringBuf();

                id.add(jid.prefix);
                id.add("-");

                id.addSub(Std.string(jid.year), 2, 2);
                id.add("-");

                id.add(jid.label);

                return id.toString();
            };
//            case "shipping": {
//                var add = org.addresses.shipping;
//                return '[${add.lines}] ${add.city}, ${add.stateOrProvince}';
//            };
//            case "invoicing": {
//                var add = org.addresses.invoicing;
//                return '[${add.lines}] ${add.city}, ${add.stateOrProvince}';
//            };
            case "salesperson": {
                return org.salesperson.label;
            };
            case "shop": {
                return org.shop.label;
            };
//            case "systemTypes": {
//                return "[" + org.systemTypes.map(function(s){return s.label;}).join(", ") + "]";
//            };
//            case "schedule": {
//                var sch = org.schedules;
//
//                var electricalDate = '[Start: ${sch.electrical.start}, Complete: ${sch.electrical.complete}';
//                var engineeringDate = '[Start: ${sch.engineering.start}, Complete: ${sch.engineering.complete}';
//                var mechanicalDate = '[Start: ${sch.mechanical.start}, Complete: ${sch.mechanical.complete}';
//                var shippingDate = '[Start: ${sch.shipping.start}, Complete: ${sch.shipping.complete}';
//                var installationDate = '[Start: ${sch.installation.start}, Complete: ${sch.installation.complete}';
//
//                return 'Elec: $electricalDate, Eng: $engineeringDate, Mech: $mechanicalDate, Ship: $shippingDate, Inst: $installationDate';
//            };
            case "status": {
                return '${org.status}';
            };
            case "customer": {
                return '${org.customer.label}';
            };
//            case "revisions": {
//                var rev = org.revisions[revIndex];
//
//                if(rev == null) return null;
//
//                return rev.description;
//            };

            default: return data.data;
        }
    }

    public override function cellFormatter(data:FieldData<Job>, ord:Ordering<Job>):ReactComponent {
        var cls = untyped classNames({collapsing: data.field.name == "id", noselect: !jobTable});

        var job: Job = data.original;

        data = generateData(data, ord);

        if(!jobTable && data == null) return null;

        var onclick = function(){
            if(!jobTable) return;
            Core.jobSelected.dispatch(job);
        }

        return jsx('
            <td key=${UidGenerator.nextId()} onClick=$onclick className=$cls>$data</td>
        ');
    }



    private static var mainJobRow = untyped React.createClass({
        getInitialState: function(){
            return {clicked: jt().props.clicked};
        },
        handleClickEvent: function() {
            if(jt().props.revisions == false) return;

            jt().props.toggleSubRow();

            jt().setState({clicked: !(jt().state.clicked)});
        },
        render: function(){
            var clicked = untyped jt().state.clicked;

            var s1 = {display: clicked == false ? "" : "none"};
            var s2 = {display: clicked == true  ? "" : "none"};

            var rightIcon =
                untyped classNames('toggle', 'right', 'icon', {disabled: jt().props.revisions == false});
            var downIcon =
                untyped classNames('toggle', 'down', 'icon', {disabled: jt().props.revisions == false});

            var exCol = null;

            if(jt().props.revTable != true)
                exCol = jsx('
                    <td className="collapsing"  onClick=${jt().handleClickEvent}>
                        <i id="icon1" style=$s1 className=$rightIcon></i>
                        <i id="icon2" style=$s2 className=$downIcon></i>
                    </td>');

            return jsx('
                    <tr onDoubleClick=${jt().props.onClick}>
                        $exCol
                        ${jt().props.children}
                    </tr>
                ');
        }
    });

    private static var subJobRow: ReactComponent = untyped React.createClass({
//        shouldComponentUpdate: function(){return true;},
        render: function(){
            var s = {backgroundColor: 'lightgray !important', color: 'black !important'};

            return jsx('
                    <tr className="transition hidden" style=$s>
                        <td colSpan="16">${jt().props.children}</td>
                    </tr>
                ');
        }
    });

    public override function generateRows(job:Job, children:Array<ReactComponent>):Array<ReactComponent> {
        var rows = new Array<ReactComponent>();

        var key = '${job.identifier.prefix}-${job.identifier.year.toString().substr(2, 2)}-${job.identifier.label}';
        var revs = false; //job.revisions != null && job.revisions.length > 0;

        revs = revs && jobTable;

        if(jobTable){
            rows.push(React.createElement(mainJobRow, {
                key: '$key-parent',
                revisions: revs,
                clicked: untyped parentTable.state.subrows['$key-sub'] == true,
                toggleSubRow: function(){
                    var displayed = untyped parentTable.state.subrows['$key-sub'];
                    var subrows = untyped parentTable.state.subrows;
                    var toggled = untyped parentTable.state.rowtoggled;

                    untyped subrows['$key-sub'] = !(displayed);

                    untyped toggled = '$key-sub';

                    parentTable.setState({subrows: subrows, rowtoggled: toggled});
                },
                onClick : function(){
                    Core.application.setState({editJobObj: job, editJobMainObj: parentTable.props.realjob}, function(){
                        Core.modalChange.dispatch("edit-job");
                    });
                }
            }, children));
        } else {

            rows.push(React.createElement(mainJobRow, {
                key: '$key-${(revIndex + 1)}-sub',
                revTable: !jobTable,
                toggleSubRow: function(){},
                onClick : function(){}
            }, children));

            revIndex += 1;
        }

        if(revs && jobTable){
            var content: Array<Job> = [];
//            for(j in job.revisions){
//                content.push(job);
//            }

            var structure = new JobTableStructure(false);
            var order = structure.generateDefaultOrder(content);

            var revisionTable = React.createElement(Type.getClass(parentTable), {
                structure: structure,
                ordering: order,
                data: content,
                classes: ["very", "basic"],
                realjob: job,
                revTable: true
            });

            var shouldDisplay: Bool = untyped parentTable.state.subrows['$key-sub'];
            var shouldTransition = untyped parentTable.state.rowtoggled;

            rows.push(React.createElement(subJobRow, {
                id: '$key-sub',
                key: '$key-sub',
                ref: function(input: Dynamic){
                    if(input == null || !(shouldTransition == '$key-sub' || shouldTransition == 'all')) return;

                    if(shouldDisplay || shouldTransition == '$key-sub'){
                        var elem = new JQuery(cast ReactDOM.findDOMNode(input));

                        untyped elem.transition({
                            animation  : 'slide down',
                            duration   : '400ms'
                        });

                        parentTable.state.rowtoggled = 'all';
                    }
                }
            }, revisionTable));
        }

        return rows;
    }

    public override function generateHeader(ord:Ordering<Job>):ReactComponent {
        var cols = ord.fields.length;
        var row = new Array<ReactComponent>();

        var cls = untyped classNames({noselect: !jobTable});

        var i = 1;
        for (field in ord.fields) {
            row.push(jsx('<th className=$cls key=${UidGenerator.nextId()}>${field.rep}</th>'));
        }

        var exCol = null;

        if (jobTable)
                exCol = jsx('<th key=${UidGenerator.nextId()}></th>');

        return jsx('
            <thead className="full-width">
            <tr key=${UidGenerator.nextId()}>
                $exCol
                $row
            </tr>
            </thead>
        ');
    }



}
