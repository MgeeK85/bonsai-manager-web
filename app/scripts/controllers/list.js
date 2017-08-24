(function(){

    'use strict';

    /**
     * @ngdoc function
     * @name bonsaiManagerWebApp.controller:ListCtrl
     * @description
     * # ListCtrl
     * Controller of the bonsaiManagerWebApp
     */
    angular.module('bonsaiManagerWebApp')
        .controller('ListCtrl', ListCtrl);

    function ListCtrl($rootScope, User, AuthService) {

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


            if(AuthService.isAuthenticated()) {

                vm.loggedIn = true;
                vm.username = AuthService.getUsername();

                console.log("currentUser", vm.username);

                User.bonsais({ id: 'me' })
                    .$promise.then(
                    function (response) {
                        vm.bonsais = response;

                        console.log("bonsais", vm.bonsais);

                    },
                    function (response) {
                        vm.message = "Error: " + response.status + " " + response.statusText;
                    });

            }

        }

    }
})();