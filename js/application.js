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

var Postcards;

Postcards = (function() {
  function Postcards() {}

  Postcards.prototype.all = [
    {
      id: 0,
      name: "Scruff McGruff"
    }, {
      id: 1,
      name: "G.I. Joe"
    }, {
      id: 2,
      name: "Miss Frizzle"
    }, {
      id: 3,
      name: "Ash Ketchum"
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
