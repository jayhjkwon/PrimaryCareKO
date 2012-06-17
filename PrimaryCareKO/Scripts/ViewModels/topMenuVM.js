/// <reference path="../Libs/jquery-1.7.2.js" />
/// <reference path="../Libs/modernizr-2.5.3.js" />
/// <reference path="../Libs/knockout-2.1.0.debug.js" />
/// <reference path="../Libs/knockout.mapping-latest.debug.js" />
/// <reference path="../Libs/sammy/sammy.js" />
/// <reference path="../main.js" />
/// <reference path="../common.js" />

ray.namespace('ray.vm');
ray.vm.topMenuVM = (function () {
    var self = this;

    var patientNameForSearch = ko.observable();

    return {
        patientNameForSearch : patientNameForSearch
    }

}());

$(function () {
    ko.applyBindings(ray.vm.topMenuVM, document.getElementById('top'));

    ray.vm.topMenuVM.patientNameForSearch.subscribe(function (name) {
        if (!name) {
            location.hash = '';
        }
    });
});