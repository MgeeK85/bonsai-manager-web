
(function(){

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

        function LoginCtrl($scope, $user, $facebookLogin, $googleLogin, $twitterLogin, ngDialog, $localStorage, AuthService) {

            //var vm = this;

            //vm.facebookLogin = $facebookLogin;
            //vm.googleLogin = $googleLogin;
            //vm.twitterLogin = $twitterLogin;


            $scope.doLogin = function() {
                console.log("login");

                if($scope.rememberMe)
                    $localStorage.storeObject('userinfo',$scope.loginData);

                AuthService.login($scope.loginData);

                ngDialog.close();

            };

            $scope.openRegister = function() {

                console.log("register");
                ngDialog.open(
                    {
                        template: 'views/register.html',
                        scope: $scope,
                        className: 'ngdialog-theme-default',
                        controller:"RegisterCtrl"
                    }
                );
            };




            init();

            ///////////////////////////////////

            function init() {

                $scope.loggedIn = false;
                $scope.username = '';

                $scope.loginData = $localStorage.getObject('userinfo','{}');

                console.log("user", $scope.loginData);

                //vm.user = $user;
                if($scope.loginData) {
                    $scope.loggedIn = true;
                }


            }


        }

})();