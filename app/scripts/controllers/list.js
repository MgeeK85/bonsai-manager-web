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

    function ListCtrl($rootScope, $scope, User, AuthService) {

        var vm = this;

        vm.bonsaiDetail = bonsaiDetail;

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

            vm.loggedIn = true;

            console.log("value",  $rootScope.currentUser);

            User.bonsais({ id: 'me' })
                .$promise.then(
                function (response) {
                    vm.bonsais = response;

                    console.log("bonsais", vm.bonsais);

                },
                function (response) {
                    vm.message = "Error: " + response.status + " " + response.statusText;
                });

        });

        init();

        ///////////////////////////


        function init() {

            vm.loggedIn = false;
            vm.username = '';

            if(AuthService.isAuthenticated()) {

                vm.loggedIn = true;
                vm.username = AuthService.getUsername();

                console.log("currentUser", vm.username);



            }

        }

        function bonsaiDetail(bonsaiId) {
            console.log("bonsai id", bonsaiId);

            if(bonsaiId) {
                $state.go('app.bonsaidetail', { id: bonsaiId});
            }
        }

    }
})();