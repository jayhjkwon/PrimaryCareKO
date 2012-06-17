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
ray.vm.documentListVM = (function (ray) {
    var self = this;
    var isVisible = ko.observable(false),
    documentList = ko.observableArray(),

    loadDocumentList = function (pid) {
        ray.data.documentDataService.getDocumentListByPid(pid, bindDocumentList);
    },

    bindDocumentList = function (documents) {
        documentList.removeAll();
        _.each(documents, function (f) {
            var document = new ray.model.Document()
                                .patientId(f.PatientId)
                                .title(f.Title)
                                .url(f.Url)
                                .comments(f.Comments);
            documentList.push(document);
        });
    },

    onTitleClick = function (document) {
        ray.vm.patientListVM.test(document);    // demonstrate to call function in other ViewModels
    };

    ray.vm.topMenuVM.patientNameForSearch.subscribe(function (name) {
        if (!name) {
            documentList([]);
            isVisible(false);
        }
    });

    return {
        isVisible: isVisible
        , documentList: documentList
        , loadDocumentList: loadDocumentList
        , onTitleClick: onTitleClick
    };

} (ray));

$(function () {
    ko.applyBindings(ray.vm.documentListVM, document.getElementById('body-document-list'));
});