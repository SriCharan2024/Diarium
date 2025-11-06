app.controller('mainController', function($scope, $transitions) {
  $scope.showNavbar = true;

  $transitions.onSuccess({}, function(transition) {
    const stateName = transition.to().name;
    // Hide navbar for specific pages
    if (stateName === 'login' || stateName === 'about') {
      $scope.showNavbar = false;
    } else {
      $scope.showNavbar = true;
    }
  });
});
