package core.sorting;

import core.models.CoreTypes.Model;

class Filter<M: Model> {

    private var ordering: Ordering<M>;
    private var filterMap: Map<String, String>;
    private var filterName: String;

    public function new(ordering: Ordering<M>, filterMap: Map<String, String>) {
        this.ordering = ordering;
        this.filterMap = filterMap;
    }

    public function filter(data: M): Bool {

        var fieldData = ordering.orderData(data);

        for (field in fieldData) {

            var filterValue = filterMap[field.field.name];

            if(filterValue != null && filterValue.length > 0) {
                if(Std.string(field.data).indexOf(filterValue) == -1) {
                    return false;
                }
            }
        }


        return true;
    }

    public function getFilterMap(): Map<String, String> {
        return filterMap;
    }

    public function setName(name: String) {
        this.filterName = name;
    }

    public function getName(): String {
        return this.filterName;
    }
}
