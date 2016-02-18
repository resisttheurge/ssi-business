package core.view.shipitem.structure;

import core.models.CoreTypes.Drawing;
import core.view.UidGenerator;
import api.react.ReactComponent;
import core.sorting.Ordering;
import core.sorting.Ordering.FieldData;
import core.structure.TableStructure;
import api.react.ReactComponent.ReactComponentOfState;

class DwgTableStructure extends TableStructure<Drawing> {
    private static inline function jt(){return untyped __js__('this');}

    public function new() {
        super();
    }

    public override function generateDefaultOrder(data: Array<Drawing>): Ordering<Drawing> {

        var arr = new Array<{rep: String, name: String}>();

        arr.push({rep: "Id", name: "label"});
        arr.push({rep: "Title", name: "title"});
        arr.push({rep: "Type", name: "type"});
        arr.push({rep: "Revision", name: "revision"});
        arr.push({rep: "Revision Date", name: "revisionDate"});
        arr.push({rep: "Start Date", name: "startDate"});
        arr.push({rep: "Shop Date", name: "shopDate"});
        arr.push({rep: "Field Date", name: "fieldDate"});

        var order = new Ordering<Drawing>(arr, "");

        return order;

    }

    private function generateData(data:FieldData<Drawing>, ord:Ordering<Drawing>):Dynamic {
        var org: Drawing = data.original;

        switch data.field.name {
            default: return data.data;
        }
    }

    public override function cellFormatter(data:FieldData<Drawing>, ord:Ordering<Drawing>):ReactComponent {
        data = generateData(data, ord);

        return jsx('
            <td key=${UidGenerator.nextId()} >$data</td>
        ');
    }

    public override function generateRows(dwg:Drawing, children:Array<ReactComponent>):Array<ReactComponent> {
        var array = [];

        var handleDblClick = function(e){
            Core.app.setState({editObj: dwg}, function(){
                Core.modalChange.dispatch("edit-dwg");
            });
        }

        array.push(jsx('
            <tr key=${UidGenerator.nextId()} onDoubleClick=$handleDblClick>$children</tr>
        '));

        return array;
    }

    public override function generateHeader(ord:Ordering<Drawing>):ReactComponent {
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
