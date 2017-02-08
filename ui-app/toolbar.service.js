/**
 * Created by Justice on 2/7/2017.
 */
angular.module('le')
    .factory('ToolbarService', ['$http', '$log', function($http, $log) {
        var service = {};
		var buttons = [];

        service.noop = function() {
            return "no op";
        }
		
		service.getButtons = function() {
			return buttons;
		}
		
		service.add = function(button) {

			console.log("TbService: adding button - ", button.title);
			
			// if user didn't specify an index, then it's last
			if( !button.position )
				button.position = 1000;

			// if button already exist, don't add it.
			for(let b of buttons) {
				if(b.id == button.id) {
					console.log(b.id, " already exists")
					return;
				}
			}
			
			buttons.push(button);
			buttons.sort(function(a, b) {
				if(a.position < b.position)
					return -1;
				else if (a.position > b.position)
					return 1;
				else return 0;
			});
			
			// todo: change this to use a single loop insert. above is inefficient
		}
		
		service.remove = function(buttonId) {
			buttons.filter(function(b) { b.id != buttonId;});
		}		
		
        return service;
    }]);