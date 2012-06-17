/// <reference path="../Libs/jquery-1.7.2.js" />
/// <reference path="../Libs/modernizr-2.5.3.js" />
/// <reference path="../Libs/knockout-2.1.0.debug.js" />
/// <reference path="../Libs/knockout.mapping-latest.debug.js" />
/// <reference path="../Libs/sammy/sammy.js" />
/// <reference path="../main.js" />
/// <reference path="../common.js" />
/// <reference path="../Models/document.js" />
/// <reference path="../Data/documentDataService.js" />

ray.namespace('ray.vm');
ray.vm.uploadDocumentVM = (function () {
    var self = this;

    var isVisible = ko.observable(false);

    ray.vm.topMenuVM.patientNameForSearch.subscribe(function (name) {
        if (!name) {
            isVisible(false);
        }
    });

    return {
        isVisible: isVisible
    };

}());

$(function () {
    ko.applyBindings(ray.vm.uploadDocumentVM, document.getElementById('body-pnr'));
});