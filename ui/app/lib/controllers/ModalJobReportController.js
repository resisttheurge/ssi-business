export default class ModalJobReportController {
  /*@ngInject*/
  constructor ($scope, $mdDialog, content) {
    var modal = this;
    modal.content = content;
    modal.firstPage = 1;

    PDFJS.getDocument(modal.convertContent(content)).then(function getPdfHelloWorld(pdf) {

      modal.pdf = pdf;
      modal.maxPage = pdf.numPages;
      modal.renderPage(modal.currentPage = 1);

    });

    modal.closeDialog = function () {
      $mdDialog.cancel();
    };

    modal.nextPage = function ()
    {
      if (modal.currentPage < modal.maxPage)
        modal.renderPage(++modal.currentPage);
    }

    modal.previousPage = function ()
    {
      if (modal.currentPage > modal.firstPage)
       modal.renderPage(--modal.currentPage);
    }

    modal.renderPage = function (pageNum)
    {
      modal.pdf.getPage(pageNum).then(function renderPage(page) {
       var scale = 1.5;
       var viewport = page.getViewport(scale);

       //
       // Prepare canvas using PDF page dimensions
       //
       var canvas = document.getElementById('the-canvas');
       var context = canvas.getContext('2d');
       canvas.height = viewport.height;
       canvas.width = viewport.width;

       //
       // Render PDF page into canvas context
       //
       page.render({ canvasContext: context, viewport: viewport });
       document.getElementsByTagName('md-dialog-content')[0].scrollTop = 0;
       $scope.$apply();
     });
    }

  }

  convertContent (content)
  {
    var raw = window.atob(content);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));

    for (var i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }

    return array;
  }

}
