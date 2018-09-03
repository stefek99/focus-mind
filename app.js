var app = angular.module("app", ["ngRoute"]);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'home.html',
      controller: "HomeCtrl"
    })
    .when('/settings', {
      templateUrl: 'settings.html',
      controller: "SettingsCtrl"
    })
    .otherwise('/home')
});

app.controller("HomeCtrl", function($scope) {
  $scope.message = "It home!";
});      

app.controller("LoginCtrl", function($scope) {
  $scope.message = "It works!";
});