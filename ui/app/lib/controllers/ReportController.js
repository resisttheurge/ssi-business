import { PDFJS } from 'pdfjs-dist'
import ModalJobReportController from './ModalJobReportController'

export default class ReportController {
  /*@ngInject*/
   constructor($scope, $routeParams, $q, $ssiSelected, $mdDialog, $convertDate, $unpack, Report, endpoint) {

     var self = this;

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
       var confirm = $mdDialog.prompt()
          .title('Specialty Items By Part Type')
          .textContent('Enter Part Type')
          .placeholder('Part Type')
          .ok('Submit')
          .cancel('Cancel');

       $mdDialog.show(confirm).then(function (search) {
         Report.specialtyItemsByPartType(entry).then(function (report)
         {
           if (report.length > 0)
            window.open('data:application/pdf;base64,' + report);
           else
            self.failAlert();
         });
       });
     }

   }
 }
