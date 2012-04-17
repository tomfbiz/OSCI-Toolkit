// OsciTk Namespace Initialization //
if (typeof OsciTk === 'undefined'){OsciTk = {};}
// OsciTk Namespace Initializaiotn //

jQuery(function() {
	OsciTk.router = Backbone.Router.extend({
	
		routes: {
			'' : 'root',
			'section/:section_id' : 'section' // TODO: add params for paragraph, etc.
		},
	
		initialize: function() {
			console.log(window.appConfig.get('package_url'), 'router url');
			this.dispatcher = _.extend({}, Backbone.Events);
			window.appAccount = new OsciTk.models.Account(null, {dispatcher: this.dispatcher});
			window.app = new OsciTk.views.App({dispatcher: this.dispatcher});
		},
	
		/**
		 * Route to root location
		 */
		root: function() {
			console.log('routing to root');
			this.dispatcher.trigger('routedToRoot');
		},
	
		/**
		 * Route to the given section
		 */
		section: function(section_id) {
			console.log('routing to section ' + section_id);
			this.dispatcher.trigger('routedToSection', section_id);
		},
	
		/**
		 * Route to search
		 */
		search: function(query) {
			console.log('searching for ' + query);
			this.dispatcher.trigger('routedToSearch', query);
		}
	});
});