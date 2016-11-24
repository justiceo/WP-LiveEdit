/**
Auth Plugin
===============
Helps with authenticating users, determining their roles and persisting identity with changes made
Base requirements / idea:
- Option to disable the plugin when user is not logged in.
- Abstracts over authenticated requests by handling all oauth stuff
- Answers the question of who is editing this document? their name, role etc
*/
(function($)
{   
    'use strict';
	$.Redactor.prototype.auth = function()
	{
		return {			
			langs: {
				en: {
					"auth": "Authentication",
                    "login": "Login"
				}
			},
			init: function()
			{
				var button = this.button.add('auth', 'Auth', this.lang.get('auth'));
				
				// initialize add new button
				this.button.addCallback(button, this.auth.show);
			},
			show: function()
			{
				// if user is already logged in, no need
				if($("body").hasClass("logged-in")){
					console.log("already logged in");
					return;
				}				
				
				// otherwise we add new auth
				this.modal.addTemplate('login', this.auth.getLoginTemplate());
				this.modal.load('login', this.lang.get('auth'), 400);

				// action button
				this.modal.getActionButton().text(this.lang.get('login')).on('click', this.auth.login);
				this.modal.show();
				
			},
			getLoginTemplate: function()
			{
				return String()
				+ '<div class="modal-section" id="redactor-modal-auth-insert">'
					+ '<section>'						
						+ '<input id="auth-username" type="text"  placeholder="Enter username" />'
                        + '<input id="auth-password" type="password" placeholder="Enter password" />'
					+ '</section>'
					+ '<section>'
						+ '<button id="redactor-modal-button-action">Login</button>'
					+ '</section>'
				+ '</div>';
			},
			login: function()
			{	
				// grab username and password
                var username = $("#auth-username").val();
                var password = $("auth-password").val();                
				this.modal.close();
				this.selection.remove();
			}
		};
	};
})(jQuery);