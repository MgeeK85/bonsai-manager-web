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
    'lbServices'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider

          .state('app', {
              url:'/',
              views: {
                  'sidebar': {
                      templateUrl : 'views/sidebar.html',
                      controller  : 'SidebarCtrl',
                      controllerAs : 'sidebar'
                  },
                  'content': {
                      templateUrl : 'views/main.html',
                      controller  : 'MainCtrl',
                      controllerAs : 'main'
                  }
              }
          })

          // route for the bonsai detail page
          .state('app.newedit', {
              url: 'newedit/:id',
              views: {
                  'content@': {
                      templateUrl : 'views/newedit.html',
                      controller  : 'NewEditCtrl',
                      controllerAs : 'newedit'
                  }
              }
          })

          // route for the bonsai detail page
          .state('app.list', {
              url: 'list',
              views: {
                  'content@': {
                      templateUrl : 'views/list.html',
                      controller  : 'ListCtrl',
                      controllerAs : 'list'
                  }
              }
          })

          // route for the bonsai detail page
          .state('app.bonsaidetail', {
              url: 'detail/:id',
              views: {
                  'content@': {
                      templateUrl : 'views/bonsaidetail.html',
                      controller  : 'BonsaiDetailCtrl',
                      controllerAs : 'detail'
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
    })

    .run(['$rootScope', '$state', 'LoopBackAuth', 'AuthService',
            function($rootScope, $state, LoopBackAuth, AuthService) {

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
            // redirect to login page if not logged in
            if (toState.authenticate && !LoopBackAuth.accessTokenId) {
                event.preventDefault(); //prevent current page from loading
            // Maintain returnTo state in $rootScope that is used
            // by authService.login to redirect to after successful login.
            // http://www.jonahnisenson.com/angular-js-ui-router-redirect-after-login-to-requested-url/
                $rootScope.returnTo = {
                    state: toState,
                    params: toParams
                };
                $state.go('app');
            }
        });

        // Get data from localstorage after pagerefresh
        // and load user data into rootscope.
        if (LoopBackAuth.accessTokenId && !$rootScope.currentUser) {
            AuthService.refresh(LoopBackAuth.accessTokenId);
        }
    }]);
