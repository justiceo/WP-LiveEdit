import angular from 'angular';
import 'angular-ui-router';

import toolbarComponent from './toolbar.component';
import itemsService from './items.service';
import ToolbarService from './toolbar.service';

import './toolbar.scss';


const module = angular.module('toolbar.module', ['ui.router'])
	.component('toolbar', toolbarComponent)
	.service('ItemsService', itemsService)
	.service('ToolbarService', ToolbarService)
	.name;

export default module;