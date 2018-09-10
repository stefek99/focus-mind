// Checking page title
if (document.title.indexOf("Google") != -1) {
    //Creating Elements
    var btn = document.createElement("BUTTON")
    var t = document.createTextNode("CLICK ME");
    btn.appendChild(t);
    //Appending to DOM 
    document.body.appendChild(btn);
}


$("<div style='background:red' ng-app='app' ng-controller='ctrl'>hello {{ message }}</div>").appendTo("body");

var app = angular.module("app", []);

app.controller("ctrl", function($scope) {
  $scope.message = "hurray it works";
});