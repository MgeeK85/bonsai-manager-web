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

        function MainCtrl($scope, $rootScope, $state, ngDialog, User, AuthService) {

            var vm = this;

            vm.openLogin = openLogin;
            vm.bonsaiDetail = bonsaiDetail;
            vm.getSecondIndex = getSecondIndex;

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


            }

            function getSecondIndex(index) {
                if(vm.bonsais.length>=0)
                    return vm.bonsais.length;
                else
                    return index;
            }

            function openLogin() {
                ngDialog.open({ template: 'views/login.html', scope: $scope,
                    className: 'ngdialog-theme-default', controller:"LoginCtrl" });
            }

            function bonsaiDetail(bonsaiId) {
                console.log("bonsai id", bonsaiId);

                if(bonsaiId) {
                    $state.go('app.bonsaidetail', { id: bonsaiId});
                }
            }
        }
})();