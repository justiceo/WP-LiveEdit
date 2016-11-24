(function($)
{
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
				this.inline.format('com', 'title', $('#insert-auth-area').val());				
				this.modal.close();
				this.selection.remove();
			}
		};
	};
})(jQuery);