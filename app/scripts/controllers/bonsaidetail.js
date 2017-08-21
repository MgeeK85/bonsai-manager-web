'use strict';


(function(){

    /**
     * @ngdoc function
     * @name bonsaiManagerWebApp.controller:BonsaiDetailCtrl
     * @description
     * # BonsaiDetailCtrl
     * Controller of the bonsaiManagerWebApp
     */
    angular.module('bonsaiManagerWebApp')
        .controller('BonsaiDetailCtrl', BonsaiDetailCtrl);

    function BonsaiDetailCtrl($user) {

        var vm = this;

        vm.user = $user;




    }

})();

