import { PDFJS } from 'pdfjs-dist'
import ModalJobReportController from './ModalJobReportController'

export default class ReportController {
  /*@ngInject*/
   constructor($scope, $routeParams, $q, $ssiSelected, $mdDialog, $convertDate, $unpack, Report) {

     var self = this;
     console.log('ReportController constructed')

     self.template = `<md-dialog>
       <md-dialog-content>
        <canvas id="the-canvas" style="border:1px solid black;"/>
       </md-dialog-content>
        <md-dialog-actions layout-align="space-between center">
        <span>
        <md-button ng-disabled="modal.currentPage === modal.maxPage" ng-click="modal.nextPage()" class="md-primary">
          Next Page
        </md-button>
        <md-button ng-disabled="modal.currentPage === modal.firstPage" ng-click="modal.previousPage()" class="md-primary">
          Previous Page
        </md-button>
        </span>
        <span>
          <md-button ng-click="modal.closeDialog()" class="md-primary">
            Close
          </md-button>
          </span>
        </md-dialog-actions>
      </md-dialog>`;

     self.layoutDrawing = function layoutDrawing()
     {
       var parentEl = angular.element(document.body);

       Report.layoutDrawing($ssiSelected.job.id).then(function (report)
       {
         self.report = report;
         $mdDialog.show({
           parent: parentEl,
           template: self.template,
           locals: {
                   content: self.report
                 },
           controller: ModalJobReportController,
           controllerAs: 'modal'

         })
       });
     }

     self.detailDrawing = function detailDrawing()
     {
       var parentEl = angular.element(document.body);
       Report.detailDrawing($ssiSelected.job.id).then(function (report)
       {
         self.report = report;
         $mdDialog.show({
           parent: parentEl,
           template: self.template,
           locals: {
                 content: self.report
               },
           controller: ModalJobReportController,
           controllerAs: 'modal'
         });
       })
     }

     self.zone = function zone()
     {
       var parentEl = angular.element(document.body);
       Report.zone($ssiSelected.job.id).then(function (report)
       {
         self.report = report;
         $mdDialog.show({
           parent: parentEl,
           template: self.template,
           locals: {
                 content: self.report
               },
           controller: ModalJobReportController,
           controllerAs: 'modal'
         });
       })
     }

     self.computerDrawing = function computerDrawing()
     {
       var parentEl = angular.element(document.body);
       Report.computerDrawing($ssiSelected.job.id).then(function (report)
       {
         self.report = report;
         $mdDialog.show({
           parent: parentEl,
           template: self.template,
           locals: {
                 content: self.report
               },
           controller: ModalJobReportController,
           controllerAs: 'modal'
         });
       })
     }

     self.specialtyItemsByJob = function zone()
     {
       var parentEl = angular.element(document.body);
       Report.specialtyItemsByJob($ssiSelected.job.id).then(function (report)
       {
         self.report = report;
         $mdDialog.show({
           parent: parentEl,
           template: self.template,
           locals: {
                 content: self.report
               },
           controller: ModalJobReportController,
           controllerAs: 'modal'
         });
       })
     }

     self.materialShipper = function zone()
     {
       var parentEl = angular.element(document.body);
       Report.materialShipper($ssiSelected.job.id).then(function (report)
       {
         self.report = report;
         $mdDialog.show({
           parent: parentEl,
           template: self.template,
           locals: {
                 content: self.report
               },
           controller: ModalJobReportController,
           controllerAs: 'modal'
         });
       })
     }

     self.shipVia = function zone()
     {
       var parentEl = angular.element(document.body);
       Report.shipVia($ssiSelected.job.id).then(function (report)
       {
         self.report = report;
         $mdDialog.show({
           parent: parentEl,
           template: self.template,
           locals: {
                 content: self.report
               },
           controller: ModalJobReportController,
           controllerAs: 'modal'
         });
       })
     }

     self.jobShipments = function zone()
     {
       var parentEl = angular.element(document.body);
       Report.jobShipments($ssiSelected.job.id).then(function (report)
       {
         self.report = report;
         $mdDialog.show({
           parent: parentEl,
           template: self.template,
           locals: {
                 content: self.report
               },
           controller: ModalJobReportController,
           controllerAs: 'modal'
         });
       })
     }

   }
 }
