package core.structure;

import api.react.ReactComponent;
import core.sorting.Ordering;
import core.sorting.Ordering.FieldData;
import core.models.CoreTypes.Model;
import core.models.CoreTypes.Job;
import core.sorting.Filter;



@:abstract
class TableStructure<M: Model> {
    private var filterMap:Array<Filter<M>>;
    private var parentTable: ReactComponent;

    private function new() {
        filterMap = new Array<Filter<M>>();
    }

    public function addFilter(filter:Filter<M>) {
        filterMap.push(filter);
    }

    public function removeFilter(filter:Filter<M>){
        filterMap.remove(filter);
    }

    public function filterData(data: Array<M>): Array<M> {
        return data.filter(
            function(d){
                if(filterMap.length == 0) return true;

                for(f in filterMap){
                    if (f.filter(d)) return true;
                }

                return false;
            });
    }

    public function init(parent: ReactComponent){
        this.parentTable = parent;
    }

    public function generateDefaultOrder(data: Array<M>): Ordering<M> {
        throw "You must override generateDefaultOrder in ${Type.getClassName(Type.getClass(this))}.";
    }

    public function generateRows(job: M , children: Array<ReactComponent>): Array<ReactComponent> {
        throw "You must override generateRow in ${Type.getClassName(Type.getClass(this))}.";
    }

    public function generateHeader(ord: Ordering<M>): ReactComponent {
        throw "You must override generateHeader in ${Type.getClassName(Type.getClass(this))}.";
    }

    public function cellFormatter(data: FieldData<M>, ord: Ordering<M>): ReactComponent {
        throw "You must override cellFormatter in ${Type.getClassName(Type.getClass(this))}.";
    }
}
