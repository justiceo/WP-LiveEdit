import angular from 'angular';

import NavBar from './navbar/navbar';
import PostSettings from './settings/settings';
import PostRevisions from './revisions/revisions';
import Help from './help/help';
import NewPost from './new-post/new-post';

import DataService from './dataservice';

const module = angular.module('components.module', [])
	.component('navbar', NavBar)
	.component('postSettings', PostSettings)
	.component('postRevisions', PostRevisions)
	.component('leHelp', Help)
	.component('newPost', NewPost)	
	.service('DataService', DataService)
	.name;

export default module;	