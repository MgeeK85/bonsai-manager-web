(function(){

    'use strict';

    /**
     * @ngdoc function
     * @name bonsaiManagerWebApp.controller:BonsaiDetailCtrl
     * @description
     * # BonsaiDetailCtrl
     * Controller of the bonsaiManagerWebApp
     */
    angular.module('bonsaiManagerWebApp')
        .controller('BonsaiDetailCtrl', BonsaiDetailCtrl);

    function BonsaiDetailCtrl($rootScope, $scope, $state, $stateParams, Bonsai, ngDialog, AuthService) {

        var vm = this;

        vm.deleteBonsai = deleteBonsai;

        $scope.$watch('currentUser.id', function(value) {
            if (!value) {
                return;
            }

            vm.loggedIn = true;

            Bonsai.findById({id: $stateParams.id})
                .$promise.then(
                    function (response) {
                        vm.bonsai = response;


                        //$scope.showDish = true;
                    },
                    function (response) {
                        vm.message = "Error: " + response.status + " " + response.statusText;
                    }
                );


        });

        init();

        ///////////////////////////


        function init() {

            vm.loggedIn = false;
            vm.username = '';

            console.log("init", AuthService.isAuthenticated());

            if(AuthService.isAuthenticated()) {
                vm.loggedIn = true;
                vm.username = AuthService.getUsername();
            }
        }


        function deleteBonsai() {

            ngDialog.openConfirm({
                template:
                    '<p>Are you sure you want to delete selected Bonsai?</p>' +
                    '<div>' +
                    '<button type="button" class="btn btn-default" ng-click="closeThisDialog(0)">No&nbsp;' +
                    '<button type="button" class="btn btn-primary pull-right" ng-click="confirm(1)">Yes' +
                    '</button></div>',
                plain: true,
                className: 'ngdialog-theme-default'
            }).then(function (value) {
                // perform delete operation

                console.log("create", vm.bonsai);

                Bonsai.delete(vm.bonsai).$promise.then(
                    function(data) {

                        console.log("bonsai deleted", data);

                        $state.go('app.list');
                    }
                );

            }, function (value) {
                //Do something
            });

        }

    }

})();

