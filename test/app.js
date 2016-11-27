import {Component, Service, App} from './pyrite';
import template from './template.html';
import template2 from './template2.html';
import templateMelanie from './melanie.html';

@Service({
	alias: 'exampleService',
	inject: []
})
class ExampleService{
	constructor() {
		this.test = 123;
	}

	getTest() {
		return this.test;
	}
}

@Service({
	alias: 'melanieService',
	inject: ['exampleService']
})
class melanieService{
	constructor(exampleService, parent) {
		this.exampleService = exampleService;
	}
	hazMiauMiau() {
		return 'Miauuuu Miauuuu  ->>> ' + this.exampleService.getTest();
	}
}

@Component({
	selector: 'bye-world',
	template: template2,
	inject: ['exampleService']
})
class ByeWorld{
	constructor(exampleService) {
		this.name = exampleService.getTest();
	}

	getName() {
		return this.name;
	}
}

@Component({
	selector: 'melanie',
	template: templateMelanie,
	inject: [],
	require: ['hello-world']
})
class Melanie {
	constructor() {
		this.mel = this.helloWorld.name;
	}
}


@Component({
	template: template,
	selector: 'hello-world',
	inject: ['exampleService', 'melanieService']
})
class HelloWorld{
	constructor(exampleService, melanieService) {
		this.name = ' Fabio '+ melanieService.hazMiauMiau();
		this.exampleService = exampleService;
		this.person = {
			name: this.name,
			getName: () => this.name
		}
	}

	saludar(event) {
		alert(this.exampleService.getTest(), event);
	}

	getName() {
		return this.name;
	}
}

App.run();