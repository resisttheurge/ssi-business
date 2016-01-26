package core.view.shipment.structure;

import core.models.CoreTypes.Shipment;
import core.view.UidGenerator;
import api.react.ReactComponent;
import core.sorting.Ordering;
import core.sorting.Ordering.FieldData;
import core.structure.TableStructure;
import api.react.ReactComponent.ReactComponentOfState;
import api.react.ReactMacro.jsx;

class ShipmentTableStructure extends TableStructure<Shipment> {
    private static inline function jt(){return untyped __js__('this');}

    public function new() {
        super();
    }

    public override function generateDefaultOrder(data: Array<Shipment>): Ordering<Shipment> {

        var arr = new Array<{rep: String, name: String}>();

        arr.push({rep: "Shipment Id", name: "pk"});
        arr.push({rep: "Shipped From", name: "shop.label"});
        arr.push({rep: "Shipped Via", name: "carrier.label"});
        arr.push({rep: "Weight", name: "weight"});
        arr.push({rep: "Bill Of Lading", name: "billOfLading"});
        arr.push({rep: "Date", name: "shipDate"});
        arr.push({rep: "Status", name: "status"});


        var order = new Ordering<Shipment>(arr, "");

        return order;

    }

    private function generateData(data:FieldData<Shipment>, ord:Ordering<Shipment>):Dynamic {
        var org: Shipment = data.original;

        switch data.field.name {
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

    public override function cellFormatter(data:FieldData<Shipment>, ord:Ordering<Shipment>):ReactComponent {
        data = generateData(data, ord);

        return jsx('
            <td key=${UidGenerator.nextId()} >$data</td>
        ');
    }

    public override function generateRows(shpment:Shipment, children:Array<ReactComponent>):Array<ReactComponent> {
        var array = [];

        var onClick = function(){
            Core.application.setState({editObj: shpment}, function(){
                Core.modalChange.dispatch("edit-shpmnt");
            });
        }

        array.push(jsx('
            <tr key=${UidGenerator.nextId()} onDoubleClick=${onClick}>$children</tr>
        '));

        return array;
    }

    public override function generateHeader(ord:Ordering<Shipment>):ReactComponent {
        var cols = ord.fields.length;
        var row = new Array<ReactComponent>();

        var i = 1;
        for (field in ord.fields) {
            row.push(jsx('<th key=${UidGenerator.nextId()}>${field.rep}</th>'));
        }


        return jsx('
            <thead className="full-width">
            <tr key=${UidGenerator.nextId()}>
                $row
            </tr>
            </thead>
        ');
    }

}
