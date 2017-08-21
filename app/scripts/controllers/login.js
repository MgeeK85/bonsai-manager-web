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

    function LoginCtrl($user, $facebookLogin, $googleLogin, $twitterLogin, $log) {

        var vm = this;

        vm.user = $user;

        vm.facebookLogin = $facebookLogin;
        vm.googleLogin = $googleLogin;
        vm.twitterLogin = $twitterLogin;



        vm.loggedIn = false;
        vm.username = '';

    }
