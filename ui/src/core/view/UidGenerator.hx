package core.view;

import api.react.ReactComponent;
import api.react.ReactMacro.jsx;

class UidGenerator {
    private static var prefix: String = "UID-";
    private static var label: Int = 0;

    public static function nextId(): String {
        if (label == 16777215){
            label = 0;
        }

        var result = prefix + StringTools.hex(label, 8);

        label += 1;

        return result;
    }

    public static function reset(){
        label = 0;
    }


}
