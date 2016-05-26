import { PDFJS } from 'pdfjs-dist'
import ModalJobReportController from './ModalJobReportController'

export default class ReportController {
  /*@ngInject*/
   constructor($scope, $routeParams, $q, $ssiSelected, $mdDialog, $convertDate, $unpack, Report, endpoint, enums, Customer, $filter) {

     var self = this;

     $scope.prefixes = enums.prefixes

     function filter(expression, comparator) {
       return function (array) {
         return $q(function (resolve, reject) {
           return resolve($filter('filter')(array, expression, comparator))
         })
       }
     }

     $scope.queryCustomers = function queryCustomers(expression) {
       return Customer.endpoint.query().$promise.then($unpack).then(filter(expression))
     }

     self.failAlert = function ()
     {
       $mdDialog.show(
      $mdDialog.alert()
        .clickOutsideToClose(true)
        .title('No Data')
        .textContent('No records found for this report')
        .ok('Close')
      );
     }

     self.layoutDrawing = function layoutDrawing()
     {
       Report.layoutDrawing($ssiSelected.job.id).then(function (report)
       {
         if (report.length > 0)
          window.open('data:application/pdf;base64,' + report);
         else
          self.failAlert();
       });
     }

     self.detailDrawing = function detailDrawing()
     {
       Report.detailDrawing($ssiSelected.job.id).then(function (report)
       {
         if (report.length > 0)
          window.open('data:application/pdf;base64,' + report);
         else
          self.failAlert();
       });
     }

     self.zone = function zone()
     {
       Report.zone($ssiSelected.job.id).then(function (report)
       {
         if (report.length > 0)
          window.open('data:application/pdf;base64,' + report);
         else
          self.failAlert();
       });
     }

     self.computerDrawing = function computerDrawing()
     {
       Report.computerDrawing($ssiSelected.job.id).then(function (report)
       {
         if (report.length > 0)
          window.open('data:application/pdf;base64,' + report);
         else
          self.failAlert();
       });
     }

     self.specialtyItemsByJob = function zone()
     {
       Report.specialtyItemsByJob($ssiSelected.job.id).then(function (report)
       {
         if (report.length > 0)
          window.open('data:application/pdf;base64,' + report);
         else
          self.failAlert();
       })
     }

     self.materialShipper = function zone()
     {
       Report.materialShipper($ssiSelected.job.id).then(function (report)
       {
         if (report.length > 0)
          window.open('data:application/pdf;base64,' + report);
         else
          self.failAlert();
       });
     }

     self.shipVia = function zone()
     {
       Report.shipVia($ssiSelected.job.id).then(function (report)
       {
         if (report.length > 0)
          window.open('data:application/pdf;base64,' + report);
         else
          self.failAlert();
       });
     }

     self.jobShipments = function zone()
     {
       Report.jobShipments($ssiSelected.job.id).then(function (report)
       {
         if (report.length > 0)
          window.open('data:application/pdf;base64,' + report);
         else
          self.failAlert();
       });
     }

     self.rms = function rms()
     {
       Report.rms($ssiSelected.job.id, $ssiSelected.shippingGroup.id).then(function (report)
       {
         if (report.length > 0)
          window.open('data:application/pdf;base64,' + report);
         else
          self.failAlert();
       });
     }

     self.shipment = function shipment()
     {
       Report.shipment($ssiSelected.shipment.id).then(function (report)
       {
         if (report.length > 0)
          window.open('data:application/pdf;base64,' + report);
         else
          self.failAlert();
       });
     }

     self.specialtyItemsByPartType = function specialtyItemsByPartType(entry)
     {
       $mdDialog.show({
           clickOutsideToClose: true,
           scope: $scope,
           preserveScope: true,
           template: `<md-dialog>
                      <md-dialog-content style="padding: 30px 30px 0px 30px;"">
                      <div layout="column" layout-align="center" layout-margin>
                        <md-input-container>
                          <label>Part Type</label>
                          <input ng-model="reportEntry" type="text">
                        </md-input-container>
                      </div>
                      </md-dialog-content>
                      <md-dialog-actions>
                        <md-button ng-click="closeDialog()" class="md-primary">Cancel</md-button>
                        <span flex></span>
                        <md-button ng-click="displayReport()" class="md-primary">Submit</md-button>
                      </md-dialog-actions>
                    </md-dialog>`,
           controller: function DialogController($scope, $mdDialog) {

             $scope.closeDialog = function () {
               $mdDialog.hide();
             }

             $scope.displayReport = function () {
               $mdDialog.hide();
               Report.specialtyItemsByPartType($scope.reportEntry).then(function (report)
               {
                 if (report.length > 0)
                  window.open('data:application/pdf;base64,' + report);
                 else
                  self.failAlert();
               });
             }

           }
         });
     };

     self.managementReview = function specialtyItemsByPartType(entry)
     {
       $mdDialog.show({
           clickOutsideToClose: true,
           scope: $scope,
           preserveScope: true,
           template: `<md-dialog>
                      <md-dialog-content style="padding: 30px 30px 0px 30px;"">
                      <div layout-align="center" layout-margin>

                        <div class="md-block" layout = "row">
                          <md-datepicker ng-model="reportFrom" md-placeholder="From"></md-datepicker>

                          <md-datepicker ng-model="reportTo" md-placeholder="To"></md-datepicker>
                        </div>

                        <div class="md-block" layout ="row" layout-align="center">
                          <label style="margin-right: 15px;">Job Number</label>
                          <md-input-container style="margin-right: 20px; width: 50px;">
                            <md-select ng-model="jobPrefix" style="width: 50px;">
                              <md-option ng-repeat="prefix in prefixes" ng-value="prefix">
                                     {{prefix}}
                              </md-option>
                            </md-select>
                          </md-input-container>
                            -
                          <md-input-container style="width: 50px;">
                            <input ng-model="jobYear" type="number">
                          </md-input-container>
                            -
                          <md-input-container style="width: 125px;">
                            <input ng-model="jobLabel" type="text">
                          </md-input-container>
                        </div>

                        <div class="md-block" layout = "row">

                          <md-input-container flex="70">
                             <label>City</label>
                             <input name="city" ng-model="city">
                          </md-input-container>



                          <md-input-container flex="30">
                             <label>State</label>
                             <input name="state" ng-model="state">
                          </md-input-container>

                        </div>

                        <div class="md-block" layout = "row">

                        <md-autocomplete flex
                            md-selected-item="customer"
                            md-search-text="customerSearchText"
                            md-items="customer in queryCustomers(customerSearchText)"
                            md-item-text="customer.label"
                            md-floating-label="Customer" layout-margin>
                          <span>{{customer.label}}</span>
                        </md-autocomplete>

                        </div>

                      </div>
                      </md-dialog-content>
                      <md-dialog-actions>
                        <md-button ng-click="closeDialog()" class="md-primary">Cancel</md-button>
                        <span flex></span>
                        <md-button ng-click="displayReport()" class="md-primary">Submit</md-button>
                      </md-dialog-actions>
                    </md-dialog>`,
           controller: function DialogController($scope, $mdDialog) {

             $scope.closeDialog = function () {
               $mdDialog.hide();
             }

             $scope.displayReport = function () {
               $mdDialog.hide();
               Report.managementReview($scope.reportFrom.toISOString().substring(0, 10), $scope.reportTo.toISOString().substring(0, 10), $scope.jobPrefix, $scope.jobYear, $scope.jobLabel, city, state, customer).then(function (report)
               {
                 if (report.length > 0)
                  window.open('data:application/pdf;base64,' + report);
                 else
                  self.failAlert();
               });
             }

           }
         });
     };

     self.productionSchedule = function productionSchedule(entry)
     {
       $mdDialog.show({
           clickOutsideToClose: true,
           scope: $scope,
           preserveScope: true,
           template: `<md-dialog>
                      <md-dialog-content style="padding: 30px 30px 0px 30px;"">
                      <div layout-align="center" layout-margin>
                          <md-datepicker ng-model="reportWeek" md-placeholder="Week Ending"></md-datepicker>
                      </div>
                      </md-dialog-content>
                      <md-dialog-actions>
                        <md-button ng-click="closeDialog()" class="md-primary">Cancel</md-button>
                        <span flex></span>
                        <md-button ng-click="displayReport()" class="md-primary">Submit</md-button>
                      </md-dialog-actions>
                    </md-dialog>`,
           controller: function DialogController($scope, $mdDialog) {

             $scope.closeDialog = function () {
               $mdDialog.hide();
             }

             $scope.displayReport = function () {
               $mdDialog.hide();
               Report.productionSchedule($scope.reportWeek.toISOString().substring(0, 10)).then(function (report)
               {
                 if (report.length > 0)
                  window.open('data:application/pdf;base64,' + report);
                 else
                  self.failAlert();
               });
             }
           }
         });
     };
   }

 }
