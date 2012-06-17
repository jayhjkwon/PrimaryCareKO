/// <reference path="../Libs/jquery-1.7.2.js" />
/// <reference path="../Libs/modernizr-2.5.3.js" />
/// <reference path="../Libs/knockout-2.1.0.debug.js" />
/// <reference path="../Libs/knockout.mapping-latest.debug.js" />
/// <reference path="../Libs/sammy/sammy.js" />
/// <reference path="../main.js" />
/// <reference path="../common.js" />
/// <reference path="../Models/folder.js" />
/// <reference path="../Data/folderDataService.js" />
/// <reference path="topMenuVM.js" />

ray.namespace('ray.vm');
ray.vm.folderListVM = (function (ray) {
    var self = this;

    var isVisible = ko.observable(false),
    folderList = ko.observableArray(),

    loadFolderList = function (pid) {
        ray.data.folderDataService.getFolderListByPid(pid, bindFolderList);
    },

    bindFolderList = function (folders) {
        folderList.removeAll();
        _.each(folders, function (f) {
            var folder = new ray.model.Folder();
            folder.patientId(f.PatientId);
            folder.title(f.Title);
            folder.lastUpdateTime(f.LastUpdateTime);
            folderList.push(folder);
        });
    };

    ray.vm.topMenuVM.patientNameForSearch.subscribe(function (name) {
        if (!name) {
            folderList([]);
        }
    });

    

    return {
        isVisible: isVisible
        , folderList: folderList
        , loadFolderList: loadFolderList
    };

}(ray));

$(function () {
    ko.applyBindings(ray.vm.folderListVM, document.getElementById('left-folder-list'));
});