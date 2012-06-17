/// <reference path="Libs/jquery-1.7.2.js" />
/// <reference path="Libs/modernizr-2.5.3.js" />
/// <reference path="../Libs/knockout-2.1.0.debug.js" />
/// <reference path="Libs/knockout.mapping-latest.debug.js" />
/// <reference path="Libs/sammy/sammy.js" />
/// <reference path="main.js" />
/// <reference path="common.js" />
/// <reference path="ViewModels/folderListVM.js" />
/// <reference path="ViewModels/patientListVM.js" />
/// <reference path="ViewModels/documentListVM.js" />
/// <reference path="ViewModels/uploadDocumentVM.js" />


ray.namespace('ray.router');
ray.router.appRouter = (function () {

    var init = $.sammy(function () {
        this.get("", function () {
            console.log("default route page");
        });

        this.get('#/patient/:pid', function () {
            var pid = this.params.pid;
            ray.vm.patientListVM.loadPatientListById(pid, true);
            ray.vm.folderListVM.loadFolderList(pid);
        });

        this.get('#/patient/folder/:pid', function () {
            var pid = this.params.pid;
            ray.vm.patientListVM.loadPatientListById(pid, true);
            ray.vm.folderListVM.loadFolderList(pid);
            ray.vm.documentListVM.isVisible(true);
            ray.vm.documentListVM.loadDocumentList(pid);
            ray.vm.uploadDocumentVM.isVisible(false);
        });

        this.get('#/document/upload', function () {
            ray.vm.documentListVM.isVisible(false);
            ray.vm.uploadDocumentVM.isVisible(true);
        });
    }).run();

    return { init: init };

}());

$(function () {
    ray.router.appRouter.init;
});