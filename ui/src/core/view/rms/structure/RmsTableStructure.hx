package core.view.rms.structure;

import api.react.ReactDOM;
import js.JQuery;
import core.models.CoreTypes.ShippingGroup;
import core.view.UidGenerator;
import api.react.ReactComponent;
import core.sorting.Ordering;
import core.sorting.Ordering.FieldData;
import core.structure.TableStructure;
import api.react.ReactComponent.ReactComponentOfState;
import api.react.ReactMacro.jsx;

class RmsTableStructure extends TableStructure<ShippingGroup> {
    private static inline function jt(){return untyped __js__('this');}

    public function new() {
        super();
    }

    public override function generateDefaultOrder(data: Array<ShippingGroup>): Ordering<ShippingGroup> {

        var arr = new Array<{rep: String, name: String}>();

        arr.push({rep: "Rms #", name: "label"});
        arr.push({rep: "Type", name: "rush"});
//        arr.push({rep: "Status", name: "item.status"});
        arr.push({rep: "Total Qty Req.", name: "requested"});
        arr.push({rep: "Total Qty Comp.", name: "completed"});
//        arr.push({rep: "Remarks", name: "item.remarks"});

        var order = new Ordering<ShippingGroup>(arr, "");

        return order;

    }

    private function generateData(data:FieldData<ShippingGroup>, ord:Ordering<ShippingGroup>):Dynamic {
        var org: ShippingGroup = data.original;

        switch data.field.name {
            case "rush": return org.rush == true ? "Rush" : "Normal";
            case "requested": {
                if(org.items == null) return "None";

                var i = 0;
                for(item in org.items){
                    i += item.requested;
                }
                return i;
            };
            case "completed":{
                if(org.items == null) return "None";

                var i = 0;
                for(item in org.items){
                    i += item.completed;
                }
                return i;
            };
            case f if(f.split(".").length > 1): {
                var obj = data.data;


                for(s in f.split(".").slice(1)){
                    obj = untyped obj[s];
                }

                return obj;
            };
            default: return data.data;
        }
    }

    public override function cellFormatter(data:FieldData<ShippingGroup>, ord:Ordering<ShippingGroup>):ReactComponent {
        data = generateData(data, ord);

        return jsx('
            <td key=${UidGenerator.nextId()}>$data</td>
        ');
    }

    public override function generateRows(shpGrp:ShippingGroup, children:Array<ReactComponent>):Array<ReactComponent> {
        var array = [];
        var exCol = null;

        var key = "tble-rms" + shpGrp.pk;

        var pKey = '$key-parent';
        var cKey = '$key-child';

        if(untyped parentTable.state.displayed[cKey] == null)
            untyped parentTable.state.displayed[cKey] = {displayed: false, state: false};

        var displayed = untyped parentTable.state.displayed[cKey].displayed == true;

        var items = shpGrp.items != null && shpGrp.items.length > 0;

        var clsIcon =
            untyped classNames(
                'toggle',
                {right: displayed == false, down: displayed == true},
                'icon',
                {disabled: !items }
            );

        var handleClickEvent = function(){
            var displayed = parentTable.state.displayed;

            var bool = untyped displayed[cKey].displayed == true;
            untyped displayed[cKey].displayed = !bool;

            parentTable.setState({displayed: displayed});
        };

        var handleDoubleClick = function(){
            Core.application.setState({editObj: shpGrp}, function(){
                Core.modalChange.dispatch("edit-rms");
            });
        };

        exCol = jsx('
            <td className="collapsing" onClick=$handleClickEvent>
                <i id="icon1" className=$clsIcon></i>
            </td>
        ');

        array.push(jsx('
            <tr key=$pKey onDoubleClick=$handleDoubleClick >
                $exCol
                $children
            </tr>
        '));

        var subrowTransition = function(input){
            if (input ==  null) return;
            var elem = new JQuery(cast ReactDOM.findDOMNode(input));
            var ds = parentTable.state.displayed;

            var displayed = untyped ds[cKey].displayed == true;
            var state = untyped ds[cKey].state == true;

            if(state != displayed){
                untyped elem.transition({
                    animation  : 'slide down',
                    duration   : '400ms'
                });

                untyped ds[cKey].state = !state;
                parentTable.setState({displayed: ds});
            } else {
                if(state == true){
                    elem.removeClass("hidden");
                }
            }
        };
        if(shpGrp.items != null && shpGrp.items.length > 0){
            var rows = [];

            var s = {backgroundColor: 'lightgray !important', color: 'black !important'};

            for(item in shpGrp.items){
                rows.push(jsx('
                    <tr key=${'rwItem' + item.pk} style=$s>
                        <td>${item.label}</td>
                        <td>${item.status}</td>
                        <td>${item.requested}</td>
                        <td>${item.completed}</td>
                        <td>${item.remarks}</td>
                        <td>${item.shop}</td>
                    </tr>
                '));
            }


            array.push(jsx('
                <tr ref=$subrowTransition className="transition hidden" key=${cKey} style=$s>
                    <td colSpan="16">
                        <table className="ui very basic table">
                            <thead>
                                <tr style=$s>
                                    <th>Item #</th>
                                    <th>Status</th>
                                    <th>Requested</th>
                                    <th>Completed</th>
                                    <th>Remarks</th>
                                    <th>Shop</th>
                                </tr>
                            </thead>
                            <tbody>
                                $rows
                            </tbody>
                        </table>
                    </td>
                </tr>
            '));

        }

        return array;
    }

    public override function generateHeader(ord:Ordering<ShippingGroup>):ReactComponent {
        var cols = ord.fields.length;
        var row = new Array<ReactComponent>();

        var i = 1;
        for (field in ord.fields) {
            row.push(jsx('<th key=${UidGenerator.nextId()}>${field.rep}</th>'));
        }


        return jsx('
            <thead className="full-width">
            <tr key=${UidGenerator.nextId()}>
                <th></th>
                $row
            </tr>
            </thead>
        ');
    }

}
