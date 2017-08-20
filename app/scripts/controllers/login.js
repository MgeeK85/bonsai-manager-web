'use strict';

/**
 * @ngdoc function
 * @name bonsaiManagerWebApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the bonsaiManagerWebApp
 */
angular.module('bonsaiManagerWebApp')
    .controller('LoginCtrl', LoginCtrl);

    function LoginCtrl($http, $log, $facebookLogin, $googleLogin, $twitterLogin) {

        var vm = this;



        vm.facebookLogin = $facebookLogin;
        vm.googleLogin = $googleLogin;
        vm.twitterLogin = $twitterLogin;

    }
