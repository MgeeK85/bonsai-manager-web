'use strict';

/**
 * @ngdoc overview
 * @name bonsaiManagerWebApp
 * @description
 * # bonsaiManagerWebApp
 *
 * Main module of the application.
 */
angular
  .module('bonsaiManagerWebApp', [
    'ngResource',
    'ngDialog',
    'ui.router',
    'lbServices',
    'bonsaiManagerWebApp.services'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('app', {
              url:'/',
              views: {
                  'content': {
                      templateUrl : 'views/main.html',
                      controller  : 'MainCtrl'
                  }
              }

          })

          // route for the aboutus page
          .state('app.login', {
              url:'login',
              views: {
                  'content@': {
                      templateUrl : 'views/login.html',
                      controller  : 'LoginCtrl',
                      controllerAs : 'login'
                  }
              }
          });

      $urlRouterProvider.otherwise('/');

  })

    .config(function($httpProvider) {
        $httpProvider.interceptors.push(function() {
            return {
                request: function(req) {


                    // Transform **all** $http calls so that requests that go to `/`
                    // instead go to a different origin, in this case localhost:3000
                    if (req.url.charAt(0) === '/') {
                        //req.url = 'http://localhost:3000' + req.url;
                        req.url = 'https://bonsai-manager.mybluemix.net' + req.url;

                        console.log("interceptor req url: ", req.url);

                        // and make sure to send cookies too
                        req.withCredentials = true;
                    }

                    return req;
                }
            };
        });
    });
