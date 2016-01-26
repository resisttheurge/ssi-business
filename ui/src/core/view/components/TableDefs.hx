package core.view.components;

import core.models.CoreTypes.Model;
import core.sorting.Ordering;
import core.structure.TableStructure;

typedef TableDefs = {}

typedef TableProps<M: Model> = {
    var structure: TableStructure<M>;
    var ordering: Ordering<M>;
    var data: Array<M>;
}

typedef RowState = {
    var hidden:Bool;
}

typedef CellProps = {
    var colWidth:Int;
}
