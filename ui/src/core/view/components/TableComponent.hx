package core.view.components;

import core.sorting.Ordering;
import core.structure.TableStructure;
import core.models.CoreTypes.Model;
import api.react.ReactComponent.ReactComponentOfPropsAndState;
import api.react.ReactComponent.ReactComponentOfProps;
import api.react.ReactComponent.ReactComponentOfState;
import api.react.ReactComponent.ReactComponent;
import core.view.components.TableDefs;
import core.view.components.TableDefs.TableProps;
import api.react.ReactMacro.jsx;


class TableComponent<M: Model> extends ReactComponentOfProps<TableProps<M>>{

    public function new(){
        super();

        this.state = {rows: [], subrows: [], rowtoggled: [], displayed: []};
    }

    public override function render():ReactComponent {
        var structure = props.structure;
        var order = props.ordering;
        var data = structure.filterData(props.data);

        structure.init(this);

        var rows = new Array<ReactComponent>();

        for(d in data){
            var children = new Array<ReactComponent>();

            for(fd in order.orderData(d)){
                var child = structure.cellFormatter(fd, order);

                children.push(child);
            }

            rows = rows.concat(structure.generateRows(d, children));
        }

        var cls = untyped classNames("ui", "single", "line", "unstackable", "small", props.classes, "celled", "table");

        return jsx('
            <table id="mainTable" className=$cls>
                ${structure.generateHeader(order)}
            <tbody>
                $rows
            </tbody>
            </table>
        ');
    }

}


