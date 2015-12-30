package core.sorting;

import core.models.CoreTypes.Model;

typedef ModelField = {
    var index: Int;
    var rep: String;
    var name: String;
}

typedef FieldData<M: Model> = {
    var field: ModelField;
    var data: Dynamic;
    var original: M;
}

class Ordering<M: Model> {
    public var fields: Array<ModelField>;
    private var subObject: String;

    public function new(fArray: Array<{rep: String, name: String}>, prefix: String) {
        fields = new Array<ModelField>();

        var i = 0;
        for(field in fArray){
            fields.push({index: i++, rep: field.rep, name: field.name});
        }

        this.subObject = prefix;
    }


    public function orderData(data: M): Array<FieldData<M>> {
        var result = new Array<FieldData<M>>();

        var org = data;

        if(subObject.length > 0){
            for(s in subObject.split(".")){
                data = Reflect.getProperty(data, s);
            }
        }

        for(field in fields){
            var name = field.name;

            if(field.name.split(".").length > 1){
                name = field.name.split(".")[0];
            }

            result.push({field: field, data: Reflect.getProperty(data, name), original: org});
        }

        return result;
    }
}
