import angular from 'angular';
import 'angular-sanitize';

import Components from './components';
import Toolbar from './toolbar';

import appComponent from './application.component';

import './app.scss';


angular
  .module('synopsis', ['ngSanitize', Components, Toolbar])
  .config(($locationProvider) => {
    "ngInject";   // ng-annotate doesn't handle arrow functions automatically; need to add the directive prologue.
    $locationProvider.html5Mode(true);
  })
  .component('app', appComponent)
  ;

angular
  .element(document)
  .ready(() => angular.bootstrap(document, ['synopsis']));

