'use strict';

angular.module('bonsaiManagerWebApp.services', [])

    .factory('$user', function(User) {
        var ret = {};

        // This function reloads the currently logged in user
        ret.load = function() {
            User.findById({ id: 'me' }, function(v) {
                ret.data = v;
            });
        };

        ret.load();

        return ret;
    })

    .factory('$facebookLogin', function($user) {
        return function() {
            var url = 'http://localhost:3000/auth/facebook';
            //var url = 'https://bonsai-manager.mybluemix.net/auth/facebook';

            var ref = window.open(url, '_self', 'location=no');

            // For Cordova
            if (window.cordova) {
                ref.addEventListener('loadstop', function(ev) {
                    if (ev.url.indexOf('/auth/facebook/callback') !== -1) {
                        ref.close();
                        $user.load();
                    }
                });
            } else {
                // For `ionic serve --lab`. Wait for the user to close the window
                // and, when they do, check the server to see if they're now logged in.
                var interval = setInterval(function() {
                    if (ref.closed) {
                        $user.load();
                        clearInterval(interval);
                    }
                }, 100);
            }
        };
    })

    .factory('$googleLogin', function($user) {
        return function() {
            //var url = 'http://localhost:3000/auth/google';
            var url = 'https://bonsai-manager.mybluemix.net/auth/google';

            var ref = window.open(url, '_self', 'location=no');

            // For Cordova
            if (window.cordova) {
                ref.addEventListener('loadstop', function(ev) {
                    if (ev.url.indexOf('/auth/google/callback') !== -1) {
                        ref.close();
                        $user.load();
                    }
                });
            } else {
                // For `ionic serve --lab`. Wait for the user to close the window
                // and, when they do, check the server to see if they're now logged in.
                var interval = setInterval(function() {
                    if (ref.closed) {
                        $user.load();
                        clearInterval(interval);
                    }
                }, 100);
            }
        };
    })

    .factory('$twitterLogin', function($user) {
        return function() {
            //var url = 'http://localhost:3000/auth/twitter';
            var url = 'https://bonsai-manager.mybluemix.net/auth/twitter';

            var ref = window.open(url, '_self', 'location=no');

            // For Cordova
            if (window.cordova) {
                ref.addEventListener('loadstop', function(ev) {
                    if (ev.url.indexOf('/auth/twitter/callback') !== -1) {
                        ref.close();
                        $user.load();
                    }
                });
            } else {
                // For `ionic serve --lab`. Wait for the user to close the window
                // and, when they do, check the server to see if they're now logged in.
                var interval = setInterval(function() {
                    if (ref.closed) {
                        $user.load();
                        clearInterval(interval);
                    }
                }, 100);
            }
        };
    });