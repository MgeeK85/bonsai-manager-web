(function(){

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

        function MainCtrl($scope, $rootScope, $state, $filter, $log, ngDialog, User, AuthService) {

            var vm = this;

            vm.openLogin = openLogin;
            vm.bonsaiDetail = bonsaiDetail;
            vm.getSecondIndex = getSecondIndex;

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


                console.log("value", value);

                vm.loggedIn = true;

                User.bonsais({ id: 'me' })
                    .$promise.then(
                    function (response) {
                        vm.bonsais = response;

                        console.log("bonsais", vm.bonsais);

                        vm.data = [];

                        if(vm.bonsais && vm.bonsais.length > 0) {

                            // compute species occurrences
                            var speciesOccurences = vm.bonsais.reduce(function(sums,entry){
                                sums[entry.species] = (sums[entry.species] || 0) + 1;
                                return sums;
                            },{});

                            angular.forEach(speciesOccurences, function(value, key) {
                                console.log(key + ': ' + value.species);

                                vm.data.push({
                                    key: $filter('limitTo')(key, 10),
                                    y: value
                                })
                            });

                            $log.info("result", speciesOccurences);

                            var totalAges = 0;

                            // compute mean age
                            angular.forEach(vm.bonsais, function(value, key) {
                                totalAges += value.age;
                            });

                            vm.meanAge = totalAges / vm.bonsais.length;

                            $log.info("mean age", vm.meanAge);
                        }

                    },
                    function (response) {
                        vm.message = "Error: " + response.status + " " + response.statusText;
                    });

            });

            init();

            ///////////////////////////


            function init() {



                /* Chart options */
                vm.options = {
                    chart: {
                        type: 'pieChart',
                        height: 300,
                        x: function(d){return d.key;},
                        y: function(d){return d.y;},
                        showLabels: true,
                        duration: 500,
                        labelThreshold: 0.01,
                        labelSunbeamLayout: true,
                        legend: {
                            margin: {
                                top: 5,
                                right: 35,
                                bottom: 5,
                                left: 0
                            }
                        }
                    }
                };




            }

            function getSecondIndex(index) {
                console.log("index", index);
                if(vm.bonsais.length>=0)
                    return vm.bonsais.length;
                else
                    return index;
            }

            function openLogin() {
                ngDialog.open({ template: 'views/login.html', scope: $scope,
                    className: 'ngdialog-theme-default', controller:"LoginCtrl" });
            }

            function bonsaiDetail(bonsaiId) {
                console.log("bonsai id", bonsaiId);

                if(bonsaiId) {
                    $state.go('app.bonsaidetail', { id: bonsaiId});
                }
            }
        }
})();