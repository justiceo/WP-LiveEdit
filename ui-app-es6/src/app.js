import angular from 'angular';
import 'angular-sanitize';
import 'angular-material';
import 'angular-material/angular-material.css';
import 'angular-ui-bootstrap';
import 'angular-messages';

import Components from './components';
import Toolbar from './toolbar';
import svgAssetsCache from './svg-assets-cache';

import appComponent from './application.component';

import './app.scss';


angular
  .module('synopsis', ['ngSanitize','ngMaterial', 'ngMessages', 'ui.bootstrap', svgAssetsCache, Components, Toolbar])
  .config(($locationProvider) => {
    "ngInject";   // ng-annotate doesn't handle arrow functions automatically; need to add the directive prologue.
    $locationProvider.html5Mode(true);
  })
  .component('app', appComponent)
  ;

angular
  .element(document)
  .ready(() => angular.bootstrap(document, ['synopsis']));

