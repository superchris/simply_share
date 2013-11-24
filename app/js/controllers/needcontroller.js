'use strict';

angular.module('fantasyApp.controllers.need', ['fantasyApp.services.need'])
  .controller('NeedCtrl', ['$scope', "Needs", "geolocation",
    function($scope, Needs, geolocation) {

      geolocation.getLocation().then(function(data){
        $scope.coordinates = {
          lat: data.coords.latitude,
          long: data.coords.longitude
        };
        $scope.map = new mxn.Mapstraction('map', 'googlev3');
        var center = new mxn.LatLonPoint(data.coords.latitude,data.coords.longitude);
        $scope.map.setCenterAndZoom(center, 9);
        Needs.on("child_added", function(snapshot) {
          var need = snapshot.val();
          $scope.map.addMarkerWithData( new mxn.Marker( new mxn.LatLonPoint(need.coordinates.lat, need.coordinates.long)), {
            infoBubble : need.need
          });
        });
      });


      $scope.save = function() {
        Needs.push({need: this.need, coordinates: this.coordinates});
        this.need = "";
      }

    }]);