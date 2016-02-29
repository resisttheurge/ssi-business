package core.view.components;

import js.JQuery;
import core.sorting.Ordering;
import core.structure.TableStructure;
import core.models.CoreTypes.Model;
import api.react.ReactComponent.ReactComponentOfPropsAndState;
import api.react.ReactComponent.ReactComponentOfProps;
import api.react.ReactComponent.ReactComponentOfState;
import api.react.ReactComponent.ReactComponent;
import api.react.ReactDOM;
import core.view.components.TableDefs;
import core.view.components.TableDefs.TableProps;
import api.react.ReactMacro.jsx;


class TableComponent<M: Model> extends ReactComponentOfProps<TableProps<M>>{

    public function new(){
        super();

        this.state = {rows: [], subrows: [], rowtoggled: [], displayed: [], lazyDisplay: 0,
            topSpacer: {height: "0px", display: "none"}, bottomSpacer: {height: "0px", display: "none"}};
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

        var rowsLength = rows.length;
        var rowSize = 38; //pixels

        var rowsToDisplay = 300;
        var rowsBuffer = 75;

        var lazyLoader = function(input){
            if(input == null || rowsLength < 300) return;
            var elem = new JQuery(ReactDOM.findDOMNode(input));

            var maxLazyDisplay = (rowsLength - rowsToDisplay) / rowsBuffer;

            untyped elem.visibility({
                onTopVisible: function(calculations) {
//                    this.setState({})
                },
                onBottomVisible: function(calculations) {
                    // top of element passed
                },
                onUpdate: function(calculations) {
                    // do something whenever calculations adjust
//                    untyped console.log(calculations.percentagePassed);
                    var pctage = Math.floor(100 * calculations.percentagePassed);

                    if(pctage < 10 && this.state.lazyDisplay != 0){
                        this.state.lazyDisplay -= 1;
                        var topHeight = ((this.state.lazyDisplay) * rowsBuffer) * rowSize;
                        var botHeight = (rowsLength - ((this.state.lazyDisplay * rowsBuffer) + rowsToDisplay)) * rowSize;
                        this.setState({
                            topSpacer: {height: "" + topHeight + "px"},
                            botSpacer: {height: "" + botHeight + "px"},
                            displayTop: false
                        });
                    } else if(pctage > 90 &&  maxLazyDisplay < rowsLength){
                        this.state.lazyDisplay += 1;
                        var topHeight = ((this.state.lazyDisplay) * rowsBuffer) * rowSize;
                        var botHeight = (rowsLength - ((this.state.lazyDisplay * rowsBuffer) + rowsToDisplay)) * rowSize;

                        this.setState({
                            topSpacer: {height: "" + topHeight + "px"},
                            botSpacer: {height: "" + botHeight + "px"},
                            displayBot: false
                        });
                    } else if(this.state.lazyDisplay == 0 && this.state.displayTop == false){
                        this.setState({topSpacer: {height: "0px", display: "none"}, displayTop: true});
                    } else if(this.state.lazyDisplay == maxLazyDisplay && this.state.displayBot == false){
                        this.setState({botSpacer: {height: "0px", display: "none"}, displayBot: true});
                    }

//                    if (pctage > 25 && this.state.temp == true) this.setState({topSpacer: {height: "370px"}, temp: false});
                }
            })
            ;

        };

//        untyped console.log(rows.length);

        var displayableRows = rows.length > 300 ? rows.splice(Math.floor(this.state.lazyDisplay * rowsBuffer), rowsToDisplay) : rows;

        return jsx('
            <table id="mainTable" className=$cls>
                ${structure.generateHeader(order)}
                <tbody>
                    <tr id="tableSpacerTop" style=${this.state.topSpacer}><td colSpan="200"></td></tr>
                </tbody>
                <tbody ref=$lazyLoader>
                    $displayableRows
                </tbody>
                <tbody>
                    <tr id="tableSpacerBottom" style=${this.state.bottomSpacer}><td colSpan="200"></td></tr>
                </tbody>
            </table>
        ');
    }

}


