var TemplateLibraryHeaderView = require( 'elementor-templates/views/parts/header' ),
	TemplateLibraryHeaderLogoView = require( 'elementor-templates/views/parts/header-parts/logo' ),
	TemplateLibraryHeaderSaveView = require( 'elementor-templates/views/parts/header-parts/save' ),
	TemplateLibraryHeaderMenuView = require( 'elementor-templates/views/parts/header-parts/menu' ),
	TemplateLibraryHeaderPreviewView = require( 'elementor-templates/views/parts/header-parts/preview' ),
	TemplateLibraryHeaderBackView = require( 'elementor-templates/views/parts/header-parts/back' ),
	TemplateLibraryLoadingView = require( 'elementor-templates/views/parts/loading' ),
	TemplateLibraryCollectionView = require( 'elementor-templates/views/parts/templates' ),
	TemplateLibrarySaveTemplateView = require( 'elementor-templates/views/parts/save-template' ),
	TemplateLibraryImportView = require( 'elementor-templates/views/parts/import' ),
	TemplateLibraryPreviewView = require( 'elementor-templates/views/parts/preview' ),
	TemplateLibraryLayoutView;

TemplateLibraryLayoutView = Marionette.LayoutView.extend( {
	el: '#elementor-template-library-modal',

	regions: {
		modalContent: '.dialog-message',
		modalHeader: '.dialog-widget-header'
	},

	initialize: function() {
		this.getRegion( 'modalHeader' ).show( new TemplateLibraryHeaderView() );
	},

	getHeaderView: function() {
		return this.getRegion( 'modalHeader' ).currentView;
	},

	getTemplateActionButton: function( isPro ) {
		var templateId = '#tmpl-elementor-template-library-' + ( isPro ? 'get-pro-button' : 'insert-button' );

		templateId = elementor.hooks.applyFilters( 'elementor/editor/template-library/template/action-button', templateId );

		var template = Marionette.TemplateCache.get( templateId );

		return Marionette.Renderer.render( template );
	},

	showLoadingView: function() {
		this.modalContent.show( new TemplateLibraryLoadingView() );
	},

	showTemplatesView: function( templatesCollection ) {
		this.modalContent.show( new TemplateLibraryCollectionView( {
			collection: templatesCollection
		} ) );

		var headerView = this.getHeaderView();

		headerView.tools.show( new TemplateLibraryHeaderSaveView() );
		headerView.menuArea.show( new TemplateLibraryHeaderMenuView() );
		headerView.logoArea.show( new TemplateLibraryHeaderLogoView() );
	},

	showImportView: function() {
		this.modalContent.show( new TemplateLibraryImportView() );
	},

	showSaveTemplateView: function( elementModel ) {
		this.modalContent.show( new TemplateLibrarySaveTemplateView( { model: elementModel } ) );

		var headerView = this.getHeaderView();

		headerView.tools.reset();
		headerView.menuArea.reset();
		headerView.logoArea.show( new TemplateLibraryHeaderLogoView() );
	},

	showPreviewView: function( templateView ) {
		this.modalContent.show( new TemplateLibraryPreviewView( {
			templateView: templateView
		} ) );

		var headerView = this.getHeaderView();

		headerView.menuArea.reset();

		headerView.tools.show( new TemplateLibraryHeaderPreviewView( {
			templateView: templateView
		} ) );

		headerView.logoArea.show( new TemplateLibraryHeaderBackView() );
	}
} );

module.exports = TemplateLibraryLayoutView;
