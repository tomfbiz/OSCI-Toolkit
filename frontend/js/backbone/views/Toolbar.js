// OsciTk Namespace Initialization //
if (typeof OsciTk === 'undefined'){OsciTk = {};}
if (typeof OsciTk.views === 'undefined'){OsciTk.views = {};}
// OsciTk Namespace Initializaiotn //

jQuery(function() {
	OsciTk.views.Toolbar = OsciTk.views.BaseView.extend({
		id: 'toolbar',
		template: _.template($('#template-toolbar').html()),
		initialize: function() {
			// if toolbar items were provided, store them in the view
			this.toolbarItems = window.appConfig.get('toolbarItems') ? window.appConfig.get('toolbarItems') : [];
			this.toolbarItemViews = [];
			// tracks the state of the content area drawer
			this.isContentOpen = false;
			this.render();
		},
		render: function() {
			this.$el.html(this.template());
			_.each(this.toolbarItems, function(toolbarItem) {
				var options = {
					dispatcher: this.dispatcher,
					toolbarItem: toolbarItem
				};
				var item = new OsciTk.views.ToolbarItem(options);
				// console.log(item, 'toolbarItem');
				this.toolbarItemViews.push(item);
				this.addView(item, '#toolbar-handle');
				item.render();
			}, this);
		},
		contentOpen: function() {
			var toolbarContent = this.$el.find('#toolbar-content');
			var toolbarHandleHeight = this.$el.find('#toolbar-handle').outerHeight();
			var toolbarHeight = toolbarContent.outerHeight() + toolbarHandleHeight;
			// console.log(toolbarHeight, 'toolbarHeight calculated');
			var toolbarMaxHeightPercentage = parseInt(this.$el.css('max-height'), 10);
			var toolbarMaxHeight = $(window).height() * (toolbarMaxHeightPercentage / 100);
			if (toolbarHeight > toolbarMaxHeight) {
				toolbarContent.height(toolbarMaxHeight - toolbarHandleHeight);
			}
			this.$el.animate({
				'height': toolbarHeight + 'px'
			}, 'fast');
			this.isContentOpen = true;
		},
		contentClose: function() {
			this.$el.animate({
				'height': this.$el.find('#toolbar-handle').outerHeight() + 'px', 
				'width': '100%'
			}, 'fast');
			this.isContentOpen = false;
		}
	});
});