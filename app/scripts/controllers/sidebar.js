(function(){

    'use strict';

    /**
     * @ngdoc function
     * @name bonsaiManagerWebApp.controller:SidebarCtrl
     * @description
     * # SidebarCtrl
     * Controller of the bonsaiManagerWebApp
     */
    angular.module('bonsaiManagerWebApp')
        .controller('SidebarCtrl', SidebarCtrl);

    function SidebarCtrl($scope, $state, $rootScope, $log, ngDialog, AuthService) {

        var vm = this;

        // functions
        vm.openLogin = openLogin;
        vm.logOut = logOut;
        vm.stateis = stateis;

        $rootScope.$on('login:Successful', function () {
            vm.loggedIn = AuthService.isAuthenticated();
            vm.username = AuthService.getUsername();
        });

        $rootScope.$on('registration:Successful', function () {
            vm.loggedIn = AuthService.isAuthenticated();
            vm.username = AuthService.getUsername();
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

        //////////////////////////////////////

        function init() {

            vm.loggedIn = false;
            vm.username = '';


            if(AuthService.isAuthenticated()) {
                vm.loggedIn = true;
                vm.username = AuthService.getUsername();
            }
        }

        function openLogin() {
            ngDialog.open({ template: 'views/login.html', scope: $scope,
                className: 'ngdialog-theme-default', controller:"LoginCtrl" });
        }

        function logOut() {
            AuthService.logout();
            vm.loggedIn = false;
            vm.username = '';
        }

        function stateis(curstate) {
            return $state.is(curstate);
        }

    }

})();

