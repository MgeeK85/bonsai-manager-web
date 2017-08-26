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

    function NewEditCtrl($scope, $rootScope, $log, $state, $stateParams, Bonsai, AuthService) {

        var vm = this;

        vm.createUpdateBonsai = createUpdateBonsai;
        vm.cancel = cancel;


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

        });


        init();

        ///////////////////////////


        function init() {

            vm.loggedIn = false;
            vm.editMode = false;

            if(AuthService.isAuthenticated()) {
                // TODO cancel

                /*
                vm.bonsai = {
                    "name": "Test1",
                    "species": "Pinus",
                    "age": 10,
                    "height": 20,
                    "diameter": 30,
                    "style": "Chokkkan",
                    "pot": "Rectangular"
                };

                */



                if($stateParams.id) {

                    Bonsai.findById({id: $stateParams.id})
                        .$promise.then(
                        function (response) {
                            vm.bonsai = response;
                            vm.editMode = true;

                            //$scope.showDish = true;
                        },
                        function (response) {
                            vm.message = "Error: " + response.status + " " + response.statusText;
                        }
                    );

                }

            }

        }


        function createUpdateBonsai() {


            if(vm.editMode) {

                $log.info("update", vm.bonsai);

                Bonsai.upsert( vm.bonsai).$promise.then(
                    function(data) {

                        $log.info("bonsai saved", data);
                        $state.go('app.list');
                    }
                );
            } else {

                $log.info("create", vm.bonsai);

                Bonsai.create(vm.bonsai).$promise.then(
                    function(data) {

                        $log.info("bonsai saved", data);
                        $state.go('app.list');
                    }
                );
            }




        }

        function cancel() {
            $state.go('app.list');
        }

    }
})();