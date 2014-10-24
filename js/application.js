this.One = angular.module("starter", ["ionic", "ui.router.compat"]);

One.run(function($ionicPlatform) {
  return $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

One.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('postcard', {
    url: '/postcards',
    controller: 'PostcardsController',
    templateUrl: "templates/postcards.html"
  });
  $stateProvider.state('details', {
    url: '/postcards/:id',
    controller: 'DetailsController',
    templateUrl: "templates/details.html"
  });
  $stateProvider.state('user_data', {
    url: '/user_data',
    controller: 'UserDataController',
    templateUrl: "templates/user_data.html"
  });
  $stateProvider.state('signature', {
    url: '/signature',
    templateUrl: "templates/signature.html"
  });
  $urlRouterProvider.otherwise("/postcards");
});



var DetailsController;

DetailsController = (function() {
  DetailsController.$inject = ["$scope", '$stateParams', "session", "postcards"];

  function DetailsController(scope, params, session, postcards) {
    this.scope = scope;
    this.params = params;
    this.session = session;
    this.postcards = postcards;
    this.scope.postcard = this.postcards.find(this.params.id);
    this.session.postcard_id = this.scope.postcard.id;
  }

  return DetailsController;

})();

One.controller('DetailsController', DetailsController);

var PostcardsController;

PostcardsController = (function() {
  PostcardsController.$inject = ["$scope", "$state", "postcards"];

  function PostcardsController(scope, state, postcards) {
    this.scope = scope;
    this.state = state;
    this.postcards = postcards;
    this.scope.postcards = this.postcards.all;
    console.log(this.postcards.all, 'foobar5');
  }

  return PostcardsController;

})();

One.controller('PostcardsController', PostcardsController);

var UserDataController;

UserDataController = (function() {
  UserDataController.$inject = ['$scope', 'session'];

  function UserDataController(scope, session) {
    this.scope = scope;
    this.session = session;
    console.log(this.session);
    this.scope.user_data = {};
    this.session.user_data = this.scope.user_data;
    window.deb = this.session;
  }

  return UserDataController;

})();

One.directive("signature", function() {
  return {
    restrict: "A",
    link: function(scope, element) {
      var ctx, draw, drawing, lastX, lastY, reset;
      reset = function() {
        element[0].width = element[0].width;
      };
      draw = function(lX, lY, cX, cY) {
        ctx.moveTo(lX, lY);
        ctx.lineTo(cX, cY);
        ctx.strokeStyle = "#4bf";
        ctx.stroke();
      };
      ctx = element[0].getContext("2d");
      drawing = false;
      lastX = void 0;
      lastY = void 0;
      element.bind("mousedown", function(event) {
        if (event.offsetX !== undefined) {
          lastX = event.offsetX;
          lastY = event.offsetY;
        } else {
          lastX = event.layerX - event.currentTarget.offsetLeft;
          lastY = event.layerY - event.currentTarget.offsetTop;
        }
        ctx.beginPath();
        drawing = true;
      });
      element.bind("mousemove", function(event) {
        var currentX, currentY;
        if (drawing) {
          if (event.offsetX !== undefined) {
            currentX = event.offsetX;
            currentY = event.offsetY;
          } else {
            currentX = event.layerX - event.currentTarget.offsetLeft;
            currentY = event.layerY - event.currentTarget.offsetTop;
          }
          draw(lastX, lastY, currentX, currentY);
          lastX = currentX;
          lastY = currentY;
        }
      });
      return element.bind("mouseup", function(event) {
        var dataUrl;
        dataUrl = element[0].toDataURL();
        console.log(dataUrl);
        drawing = false;
      });
    }
  };
});

var Postcards;

Postcards = (function() {
  function Postcards() {}

  Postcards.prototype.all = [
    {
      id: 0,
      name: "Aids",
      front: "https://s3.eu-central-1.amazonaws.com/onecard/card1.png"
    }, {
      id: 1,
      name: "Hunger",
      front: "https://s3.eu-central-1.amazonaws.com/onecard/card2.png"
    }, {
      id: 2,
      name: "Armut",
      front: "https://s3.eu-central-1.amazonaws.com/onecard/card1.png"
    }, {
      id: 3,
      name: "Krieg",
      front: "https://s3.eu-central-1.amazonaws.com/onecard/card2.png"
    }
  ];

  Postcards.prototype.find = function(id) {
    return this.all[id];
  };

  return Postcards;

})();

One.service("postcards", Postcards);

var Session;

Session = (function() {
  function Session() {}

  return Session;

})();

One.service('session', Session);
