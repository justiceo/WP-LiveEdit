import angular from 'angular';
import 'angular-ui-router';

import toolbarComponent from './toolbar.component';
import itemsService from './items.service';

import './toolbar.scss';


const module = angular.module('toolbar.module', ['ui.router'])
	.component('toolbar', toolbarComponent)
	.service('ItemsService', itemsService)
	.name;

export default module;