// Checking page title
if (document.title.indexOf("Google") != -1) {
    //Creating Elements
    var btn = document.createElement("BUTTON")
    var t = document.createTextNode("CLICK ME");
    btn.appendChild(t);
    //Appending to DOM 
    document.body.appendChild(btn);
}


$(`
  <div ng-app='app' id="focus-mind"><div ng-view></div>

  <script type="text/ng-template" id="partials/home.html">
    <div class='overlay'>
      <h3>I am the overlay</h3>
      <p>You are on a website, known to be fucking distracting.</p>

      <form ng-submit="submit()">
        <label for="accomplish">What do you want to accomplish</label>
        <input id="accomplish" ng-model="accomplish" placeholder="what..." required>

        <br>


        <label for="howmuchtime">How much time is a sensible estimate</label>
        <input type="number" ng-model="minutes" placeholder="minutes...">
        <input type="number" ng-model="seconds" placeholder="second...">


        <input type="submit" value="I'm ready">
      </form>


    </div>
  </script>  

  <script type="text/ng-template" id="partials/countdown.html">
    <div class="countdown" >
      <p>You are here to: {{ accomplish }}</p>

      <div ng-show="state === 'init'">
        <p>Time left: {{ Math.floor(seconds/60) }} minutes {{ seconds % 60 }} seconds</p>
        <button ng-click="done()">done</button>
      </div>

      <div ng-show="state === 'toolate'">
        <p>Time overdue: {{ Math.floor(seconds/60) }} minutes {{ seconds % 60 }} seconds</p>
        <button ng-click="done()">done</button>
        <iframe src="https://giphy.com/embed/11StaZ9Lj74oCY" width="480" height="304" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
      </div>
    </div>

    <div class="overlay" ng-show="state === 'done'">
      <h1>Well done</h1>
      <iframe src="https://giphy.com/embed/11Feog5PTumNnq" width="480" height="367" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
    </div>
  </script>  

  <script type="text/ng-template" id="partials/countdown.html">
    <div class="countdown" >
      <p>You are here to: {{ accomplish }}</p>

      <div ng-show="state === 'init'">
        <p>Time left: {{ Math.floor(seconds/60) }} minutes {{ seconds % 60 }} seconds</p>
        <button ng-click="done()">done</button>
      </div>

      <div ng-show="state === 'toolate'">
        <p>Time overdue: {{ Math.floor(seconds/60) }} minutes {{ seconds % 60 }} seconds</p>
        <button ng-click="done()">done</button>
        <iframe src="https://giphy.com/embed/11StaZ9Lj74oCY" width="480" height="304" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
      </div>
    </div>

    <div class="overlay" ng-show="state === 'done'">
      <h1>Well done</h1>
      <iframe src="https://giphy.com/embed/11Feog5PTumNnq" width="480" height="367" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
    </div>
  </script>



  `
  ).appendTo("body");

// "run_at": "document_start" ---> no body to append

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
  $scope.minutes = 0;
  $scope.seconds = 3;
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
  $scope.state = 'init';

  if (!$scope.accomplish) { $location.path("/"); }  // checking if we are initialized

  $scope.$on("second", function(event, data) {
    

    if (data.seconds < 0) {
      $scope.state = 'toolate';
      $scope.seconds = Math.abs(data.seconds);
    } else {
      $scope.seconds = data.seconds;
    }

    $scope.$apply();
  })

  $scope.done = function() {
    $scope.state = 'done';
    countdown.stop();
  }
  
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

      $rootScope.$broadcast("second", {seconds: countdown.seconds})
      
    }, 1000);

    $location.path("countdown");
  }

  countdown.stop = function() {
    clearInterval(countdown.intervalId);
  }

  return countdown;

})