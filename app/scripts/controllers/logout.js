'use strict';

/**
 * @ngdoc function
 * @name bonsaiManagerWebApp.controller:LogoutCtrl
 * @description
 * # LoginCtrl
 * Controller of the bonsaiManagerWebApp
 */
angular.module('bonsaiManagerWebApp')
    .controller('LogoutCtrl', LogoutCtrl);

function LogoutCtrl($state, AuthService) {

    var vm = this;


    AuthService.logout()
        .then(function() {
            $state.go('app');
        });

    ///////////////////////////////////



}
