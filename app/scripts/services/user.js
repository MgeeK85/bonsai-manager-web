'use strict';

angular.module('bonsaiManagerWebApp', ['lbServices']).

// The $user service represents the currently logged in user
// and the `User` argument is defined in the lbServices module generated for you
factory('$user', function(User) {
    var userService = {};

    // This function reloads the currently logged in user
    userService.load = function() {
        User.findById({ id: 'me' }, function(v) {
            userService.data = v;
        });
    };

    userService.load();

    return userService;
});