(function(){

    'use strict';

    /**
     * @ngdoc function
     * @name bonsaiManagerWebApp.controller:MainCtrl
     * @description
     * # MainCtrl
     * Controller of the bonsaiManagerWebApp
     */
    angular.module('bonsaiManagerWebApp')
        .controller('MainCtrl', MainCtrl);

        function MainCtrl($scope, $rootScope, AuthService) {

            var vm = this;

            $rootScope.$on('login:Successful', function () {
                vm.loggedIn = AuthService.isAuthenticated();
                vm.username = AuthService.getUsername();
            });

            $rootScope.$on('logout', function () {
                vm.loggedIn = false;
                vm.username = '';
            });

            $scope.$watch('currentUser.id', function(value) {
                if (!value) {
                    return;
                }


                console.log("value", value);

                vm.loggedIn = true;
                vm.username = AuthService.getUsername();

            });

            init();

            ///////////////////////////


            function init() {

                vm.loggedIn = false;
                vm.username = '';


                if(AuthService.isAuthenticated()) {
                    vm.loggedIn = true;
                    vm.username = AuthService.getUsername();


                    // TODO get user's bonsais

                }
            }

        }
})();