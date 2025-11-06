var app = angular.module('notesApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/landing');

  $stateProvider
    .state('landing', {
      url: '/landing',
      templateUrl: 'views/landing.view.html',
      controller: 'landingController as vm'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'views/about.view.html',
      controller: 'aboutController as vm'
    })
    .state('entries', {
      url: '/entries',
      templateUrl: 'views/entries.view.html',
      controller: 'entriesController as vm'
    })
    .state('calendar', {
      url: '/calendar',
      templateUrl: 'views/calendar.view.html',
      controller: 'calendarController as vm'
    })
    .state('todo', {
      url: '/todo',
      templateUrl: 'views/todo.view.html',
      controller: 'todoController as vm'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.view.html',
      controller: 'loginController as vm'
    });

  // keep hash URLs clean
  $locationProvider.hashPrefix('');
});

