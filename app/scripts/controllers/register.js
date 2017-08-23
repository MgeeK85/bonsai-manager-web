(function(){

    'use strict';


    /**
     * @ngdoc function
     * @name bonsaiManagerWebApp.controller:RegisterCtrl
     * @description
     * # RegisterCtrl
     * Controller of the bonsaiManagerWebApp
     */
    angular.module('bonsaiManagerWebApp')
        .controller('RegisterCtrl', RegisterCtrl);

    function RegisterCtrl($scope, AuthService, ngDialog, $localStorage) {


        $scope.doRegister = function() {

            console.log("regoister", $scope.registration);



            AuthService.register($scope.registration);

            ngDialog.close();

        };

        /////////////////////////////


    }

})();

