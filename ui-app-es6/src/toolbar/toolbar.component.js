class ToolbarController {
	/*@ngInject*/
	constructor(ItemsService) {
		this.itemsService = ItemsService;
		this.items = [];
	}

	$onInit() {
		this.itemsService
			.getItems()
			.then((items) => this.items = items);
			// TODO: error handling	
	}
}

const toolbarComponent = {
	template: require('./toolbar.html'),
	controller: ToolbarController
};

export default toolbarComponent;