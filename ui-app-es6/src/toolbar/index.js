import angular from 'angular';
import toolbarComponent from './toolbar.component';
import ToolbarService from './toolbar.service';

import './toolbar.scss';


const module = angular.module('toolbar.module', [])
	.component('toolbar', toolbarComponent)
	.service('ToolbarService', ToolbarService)
	.name;

export default module;