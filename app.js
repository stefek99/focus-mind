var app = angular.module("app", ["ngRoute"]);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'partials/home.html',
      controller: "HomeCtrl"
    })
    .when('/countdown', {
      templateUrl: 'partials/countdown.html',
      controller: "CountdownCtrl"
    })
    .when('/settings', {
      templateUrl: 'partials/settings.html',
      controller: "SettingsCtrl"
    })
    .otherwise('/home')
});

app.controller("HomeCtrl", function($scope, countdown) {
  $scope.minutes = 1;
  $scope.seconds = 30;
  $scope.accomplish = "required";

  $scope.submit = function() {
    var seconds = $scope.minutes * 60 + $scope.seconds;
    countdown.start($scope.accomplish, seconds);
    return false;
  }
});      

app.controller("CountdownCtrl", function($scope, $location, countdown) {
  $scope.Math = window.Math;
  $scope.accomplish = countdown.accomplish;
  $scope.seconds = countdown.seconds;

  if (!$scope.accomplish) { $location.path("/"); }  // checking if we are initialized

  $scope.$on("second", function(event, data) {
    $scope.seconds = data.seconds;
    $scope.$apply();
  })
  
});

app.controller("SettingsCtrl", function($scope) {
  $scope.message = "It works!";
});

app.service("countdown", function($rootScope, $location) {
  var countdown = {};



  countdown.start = function(accomplish, seconds) {
    countdown.accomplish = accomplish;
    countdown.seconds = seconds;
    countdown.intervalId = setInterval(function() {
      countdown.seconds--;
      console.log(countdown.seconds);

      $rootScope.$broadcast("second", {seconds: countdown.seconds})

      if (countdown.seconds === 0) {
        clearInterval(countdown.intervalId);
      }
      
    }, 1000);

    $location.path("countdown");
  }

  return countdown;

})