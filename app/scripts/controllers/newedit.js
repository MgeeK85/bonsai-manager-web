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

    function NewEditCtrl($rootScope, $localStorage, User, Bonsai, AuthService) {

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

            vm.loggedIn = false;
            vm.username = '';

            vm.loginData = $localStorage.getObject('userinfo','{}');

            console.log("user", vm.loginData);

            if(vm.loginData){
                AuthService.login(vm.loginData);
            }


            if(AuthService.isAuthenticated()) {

                var bonsai = {
                    "name": "test",
                    "species": "test",
                    "age": 10,
                    "height": 20,
                    "diameter": 30,
                    "style": "test",
                    "pot": "test"
                };

                console.log("bonsai", bonsai);

                Bonsai.create(bonsai).$promise.then(
                    function(data) {

                        console.log("bonsai saved", data);

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
                );



            }


        }

    }
})();