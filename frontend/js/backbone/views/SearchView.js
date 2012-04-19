// OsciTk Namespace Initialization //
if (typeof OsciTk === 'undefined'){OsciTk = {};}
if (typeof OsciTk.views === 'undefined'){OsciTk.views = {};}
// OsciTk Namespace Initializaiotn //

jQuery(function() {
	OsciTk.views.Search = OsciTk.views.BaseView.extend({
		id: 'search-view',
		className: 'toolbar-item-view',
		template: _.template($('#template-search').html()),
		initialize: function() {
			// this.render();
		},
		events: {
			'submit #search-form' : 'search'
		},
		render: function() {
			this.$el.html(this.template());
		},
		search: function(event) {
			event.preventDefault();
			var endpoint = 'http://osci-tk.lcl/api/search',
				keyword = '',
				page = 0,
				filters = '',
				sort = '',
				request = null;
			
			request = $.ajax({
				url: endpoint + '/' + keyword,
				type: 'POST'
			});
			request.done(function(data, textStatus, jqXHR) {
				var response = JSON.parse(data);
				var item = new OsciTkSearchResultsView(response);
			});
		}
	});
});