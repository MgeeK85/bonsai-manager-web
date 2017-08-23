(function(){

    'use strict';

    /**
     * @ngdoc function
     * @name bonsaiManagerWebApp.controller:NewEditCtrl
     * @description
     * # NewEditCtrl
     * Controller of the bonsaiManagerWebApp
     */
    angular.module('bonsaiManagerWebApp')
        .controller('NewEditCtrl', NewEditCtrl);

    function NewEditCtrl($rootScope, AuthService) {

        var vm = this;

        $rootScope.$on('login:Successful', function () {
            vm.loggedIn = AuthService.isAuthenticated();
            vm.username = AuthService.getUsername();
        });

        $rootScope.$on('logout', function () {
            vm.loggedIn = false;
            vm.username = '';
        });

        init();

        ///////////////////////////


        function init() {



        }

    }
})();