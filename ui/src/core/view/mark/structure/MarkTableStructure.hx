package core.view.mark.structure;

import core.models.CoreTypes.Mark;
import core.view.UidGenerator;
import api.react.ReactComponent;
import core.sorting.Ordering;
import core.sorting.Ordering.FieldData;
import core.structure.TableStructure;
import api.react.ReactComponent.ReactComponentOfState;
import api.react.ReactMacro.jsx;

class MarkTableStructure extends TableStructure<Mark> {
    private static inline function jt(){return untyped __js__('this');}

    public function new() {
        super();
    }

    public override function generateDefaultOrder(data: Array<Mark>): Ordering<Mark> {

        var arr = new Array<{rep: String, name: String}>();

        arr.push({rep: "Id", name: "label"});
        arr.push({rep: "Dwg Id", name: "drawingId"});
        arr.push({rep: "Type", name: "type"});
        arr.push({rep: "Status", name: "item.status"});
        arr.push({rep: "Qty Req.", name: "item.requested"});
        arr.push({rep: "Qty Comp.", name: "item.completed"});
        arr.push({rep: "Remarks", name: "item.remarks"});

//        arr.push({rep: "", name: "zones"});
//        arr.push({rep: "", name: "label"});

        var order = new Ordering<Mark>(arr, "");

        return order;

    }

    private function generateData(data:FieldData<Mark>, ord:Ordering<Mark>):Dynamic {
        var org: Mark = data.original;

        switch data.field.name {
            case f if(f.split(".").length > 1): {
                var obj = data.data;


                for(s in f.split(".").slice(1)){
                    if(obj == null) return null;
                    obj = untyped obj[s];
                }

                return obj;
            };
            default: return data.data;
        }
    }

    public override function cellFormatter(data:FieldData<Mark>, ord:Ordering<Mark>):ReactComponent {
        data = generateData(data, ord);

        return jsx('
            <td key=${UidGenerator.nextId()} >$data</td>
        ');
    }

    public override function generateRows(dwg:Mark, children:Array<ReactComponent>):Array<ReactComponent> {
        var array = [];
        array.push(jsx('
            <tr>$children</tr>
        '));

        return array;
    }

    public override function generateHeader(ord:Ordering<Mark>):ReactComponent {
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
