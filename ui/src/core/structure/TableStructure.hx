package core.structure;

import core.dataaccess.PersistenceManager;
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
    private var filterKey: String;

    private function new() {
        filterMap = new Array<Filter<M>>();
    }

    public function addFilter(filter:Filter<M>) {
        untyped console.log("Adding Filter: " + filter);

        filterMap.push(filter);
        saveFilters();
    }

    public function removeFilter(filter:Filter<M>){
        filterMap.remove(filter);
        saveFilters();
    }

    public function getFilters() {
        return filterMap;
    }

    public function setFilterKey(filterKey: String) {
        this.filterKey = filterKey;
    }

    public function loadFilters() {

        if(filterKey != null) {
            var maps: AllFilters = PersistenceManager.get(filterKey, false);

            if(maps != null && maps.filters != null) {
                var ordering = generateDefaultOrder([]);

                var temp = new Array<Filter<M>>();

                for (f in maps.filters) {
                    if(f.data != null) {
                        var entires: Array<Dynamic> = cast f.data;
                        if (entires != null) {
                            var dataMap = new Map<String, String>();

                            for (e in entires) {
                                dataMap[e.key] = e.val;
                            }

                            var filter = new Filter(ordering, dataMap);
                            filter.setName(f.name);
                            temp.push(filter);
                        }
                    }
                }

                filterMap = temp;
            }
        }
    }



    public function saveFilters() {
        var filters = new Array<FilterData>();


        for (filter in filterMap) {
            var entires = new Array<Entry>();

            var dataMap = filter.getFilterMap();

            for (key in dataMap.keys()) {
                var val = dataMap.get(key);

                entires.push({key: key, val: val});
            }

            filters.push({data: entires, name: filter.getName()});
        }


        if(filterKey != null)
            PersistenceManager.store(filterKey, {filters: filters}, false);
    }

    public function createFilter(filters: Map<String, String>): Filter<M> {
        throw "You must override createFilter in ${Type.getClassName(Type.getClass(this))}.";
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

typedef AllFilters = {
    var filters: Array<FilterData>;
}

typedef FilterData = {
    var name: String;
    var data: Array<Entry>;
}

typedef Entry = {
    var key: String;
    var val: String;
}