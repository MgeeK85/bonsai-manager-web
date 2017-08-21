'use strict';


(function(){

    /**
     * @ngdoc function
     * @name bonsaiManagerWebApp.controller:SidebarCtrl
     * @description
     * # SidebarCtrl
     * Controller of the bonsaiManagerWebApp
     */
    angular.module('bonsaiManagerWebApp')
        .controller('SidebarCtrl', SidebarCtrl);

    function SidebarCtrl($user) {

        var vm = this;

        vm.user = $user;
    }

})();

