package core.view.main;

import core.view.shipment.ShipmentViewMenu;
import core.view.shipment.structure.ShipmentTableStructure;
import core.view.abm.AbmViewMenu;
import core.view.abm.structure.AbmTableStructure;
import core.view.rms.structure.RmsTableStructure;
import core.view.rms.RmsViewMenu;
import core.view.mark.MarkViewMenu;
import core.view.mark.structure.MarkTableStructure;
import core.view.dwg.DwgViewMenu;
import core.view.dwg.structure.DwgTableStructure;
import api.react.React;
import api.react.ReactDOM;
import js.Browser;
import core.view.job.JobViewMenu;
import js.JQuery;
import js.html.HtmlElement;
import api.react.ReactMacro;
import core.view.components.TableComponent;
import core.view.job.structure.JobTableStructure;
import core.models.CoreTypes.Job;

import api.react.ReactComponent;
import api.react.ReactMacro.jsx;


typedef View = Dynamic -> ReactComponent;

class ViewRegistry {
    private static var views ={
        jobView: function(content){
            var structure = new JobTableStructure();

            var order = structure.generateDefaultOrder(content);

            var cls = ["selectable"];

            return jsx('
                <$TableComponent structure=$structure
                    ordering=$order
                    data=$content
                    classes=$cls/>
            ');
        },
        jobMenu: function(){
            return jsx('<$JobViewMenu />');
        },
        homeView: function(){
            return jsx('
                <div className="ui">
                    <h3 className="ui dividing header">Welcome to SSI Job Management Suite</h3>
                        <p>Please Login to Begin.</p>

                </div>
            ');
        },
        homeMenu: function(){

            return jsx('<div id="topMenu" className="ui menu"></div>');
        },
        dwgMenu: function(){
            return jsx('<$DwgViewMenu />');
        },
        dwgView: function(content){
            var structure = new DwgTableStructure();

            var order = structure.generateDefaultOrder(content);

            var cls = ["selectable"];

            return jsx('
                <$TableComponent structure=$structure
                    ordering=$order
                    data=$content
                    classes=$cls/>
            ');
        },
        shpmntMenu: function(){
            return jsx('<$ShipmentViewMenu />');
        },
        shpmntView: function(content){
            var structure = new ShipmentTableStructure();

            var order = structure.generateDefaultOrder(content);

            var cls = ["selectable"];

            return jsx('
                <$TableComponent structure=$structure
                    ordering=$order
                    data=$content
                    classes=$cls/>
            ');
        },
        abmMenu: function(){
            return jsx('<$AbmViewMenu />');
        },
        abmView: function(content){
            var structure = new AbmTableStructure();

            var order = structure.generateDefaultOrder(content);

            var cls = ["selectable"];

            return jsx('
                <$TableComponent structure=$structure
                    ordering=$order
                    data=$content
                    classes=$cls/>
            ');
        },
        markMenu: function(){
            return jsx('<$MarkViewMenu />');
        },
        markView: function(content){
            var structure = new MarkTableStructure();

            var order = structure.generateDefaultOrder(content);

            var cls = ["selectable"];

            return jsx('
                <$TableComponent structure=$structure
                    ordering=$order
                    data=$content
                    classes=$cls/>
            ');
        },
        rmsMenu: function(){
            return jsx('<$RmsViewMenu />');
        },
        rmsView: function(content){
            var structure = new RmsTableStructure();

            var order = structure.generateDefaultOrder(content);

            var cls = ["selectable"];

            return jsx('
                <$TableComponent structure=$structure
                    ordering=$order
                    data=$content
                    classes=$cls/>
            ');
        }
    };

    public static function buildView(viewId: String, content: Dynamic): ReactComponent{
        if(untyped views[viewId] == null){
            if(viewId.lastIndexOf("Menu") >= 0){
                viewId = "homeMenu";
            } else {
                throw 'View by the id $viewId does not exist.';
            }
        }

        var view: ReactComponent = untyped views[viewId](content);

        var anim = function(input: Dynamic){
            if(input == null || input == false) return;
            var elem = new JQuery(ReactDOM.findDOMNode(input));

            if(elem.hasClass("transition") && elem.hasClass("visible")) return;

            elem.addClass("transition hidden");
            elem.ready(function(e){

                untyped elem.transition({
                    animation  : 'scale',
                    duration   : '.5s'
                });
            });
        };


        return React.cloneElement(view, {ref: anim});
    }

    public static function registerView(id: String, view: View){ untyped views[id] = view; }

}
