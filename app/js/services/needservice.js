'use strict';

angular.module('fantasyApp.services.need', [])
  .factory('Needs', ['Firebase', 'FBURL', '$rootScope', function(Firebase, FBURL, $rootScope) {
    return new Firebase(FBURL).child('needs');
  }]);