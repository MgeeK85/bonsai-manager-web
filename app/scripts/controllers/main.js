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

    function MainCtrl($user) {

        var vm = this;

        vm.user = $user;
    }
