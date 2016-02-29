package core.view.abm.structure;

import core.models.CoreTypes.ABM;
import core.view.UidGenerator;
import api.react.ReactComponent;
import core.sorting.Ordering;
import core.sorting.Ordering.FieldData;
import core.structure.TableStructure;
import api.react.ReactComponent.ReactComponentOfState;
import api.react.ReactMacro.jsx;

class AbmTableStructure extends TableStructure<ABM> {
    private static inline function jt(){return untyped __js__('this');}

    public function new() {
        super();
    }

    public override function generateDefaultOrder(data: Array<ABM>): Ordering<ABM> {

        var arr = new Array<{rep: String, name: String}>();

        arr.push({rep: "ABM #", name: "number"});
        arr.push({rep: "Type", name: "part.type"});
        arr.push({rep: "Description", name: "part.description"});
        arr.push({rep: "Manufacturer", name: "manufacturer.label"});
        arr.push({rep: "Vendor", name: "vendor.label"});
        arr.push({rep: "PO", name: "po"});
        arr.push({rep: "Required Qty.", name: "requestedQuantity"});
        arr.push({rep: "Qty. In Stock", name: "stockQuantity"});
        arr.push({rep: "Qty. to Purchase", name: "purchaseQuantity"});

        var order = new Ordering<ABM>(arr, "");

        return order;

    }

    private function generateData(data:FieldData<ABM>, ord:Ordering<ABM>):Dynamic {
        var org: ABM = data.original;

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

    public override function cellFormatter(data:FieldData<ABM>, ord:Ordering<ABM>):ReactComponent {
        data = generateData(data, ord);

        return jsx('
            <td key=${UidGenerator.nextId()} >$data</td>
        ');
    }

    public override function generateRows(abm:ABM, children:Array<ReactComponent>):Array<ReactComponent> {
        var array = [];

        var handleDoubleClick = function(){
            Core.app.setState({editObj: abm}, function(){
                Core.modalChange.dispatch("edit-abm");
            });
        };

        array.push(jsx('
            <tr key=${UidGenerator.nextId()} onDoubleClick=$handleDoubleClick>$children</tr>
        '));

        return array;
    }

    public override function generateHeader(ord:Ordering<ABM>):ReactComponent {
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
