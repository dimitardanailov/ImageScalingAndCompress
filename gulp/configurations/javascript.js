'use strict';

class GulpJavascriptConfiguration {

	constructor() {
		this.configurations = {
			'folderStructure' : {
				'baseDevelopment': './js/development',
				'baseProduction': './js/production'
			}
		}

		this.initialize();
	}

	initialize() {
		this.generateAngularFileStructure();
		this.generatesEntitiesFileStructure();

		// Concatenation locations
		this.configurations.concatenationLocations = GulpJavascriptConfiguration.getConcatenationLocations();

		this.configurations.baseFiles = this.generateTempFiles('base');
		this.configurations.tempFiles = this.generateTempFiles('temp');

		this.generateMinifyLocations();
	}

	getConfigurations() {
		return this.configurations;
	}

	/**
	 * Method will be responsible for angular folder structure.
	 */
	generateAngularFileStructure() {
		this.configurations.folderStructure['angular'] = {
			'base': `${this.configurations.folderStructure.baseDevelopment}/angular` 
		};
	}

	/**
	 * Method will be responsible for entities folder structure.
	 */
	generatesEntitiesFileStructure() {
		this.configurations.folderStructure['entities'] = {
			'base': `${this.configurations.folderStructure.baseDevelopment}/entities`
		};

		const entitiesFolders = [
			// HTML Containers
			// We need these structure to create a custom html wrappers
			'htmlContainers',

			// Javascript
			// We extend current Javascript structures
			'javascript'
		];

		entitiesFolders.forEach((key) => {
			this.configurations.folderStructure.entities[key] = `${this.configurations.folderStructure.entities.base}/${key}`;
		});
	}

	/**
	 * We need to minify:
	 * libraries.min.js - Contains information for all external libraries.
	 * projectfiles.min.js - Contains information for all internal project files
	 */
	generateMinifyLocations() {
		this.configurations.minifyLocations = {
			'libraries': this.configurations.folderStructure.baseProduction + '/' + this.configurations.concatenationLocations.base.libraries,
			'projectfiles': this.configurations.folderStructure.baseProduction + '/' + this.configurations.concatenationLocations.base.projectfiles
		};
	}

	/**
	 * Method will append for each temp file: location of production folder.
 	 * 
	 * @param {string} concatenationLocationsKey - Key from GulpJavascriptConfiguration::getConcatenationLocations() temp object.
	 */
	generateTempFiles(concatenationLocationsKey) {
		const baseProductionFilePath = this.configurations.folderStructure.baseProduction.replace('./', '') + '/';
		const tempFiles = [];

		let tempLocation = null, _this = this;
		// http://stackoverflow.com/questions/921789/how-to-loop-through-javascript-object-literal-with-objects-as-members
		Object.keys(this.configurations.concatenationLocations[concatenationLocationsKey]).forEach(function(key) {
			tempLocation = baseProductionFilePath + _this.configurations.concatenationLocations[concatenationLocationsKey][key];
			
			tempFiles.push(tempLocation);
		});

		return tempFiles;
	}

	static getConcatenationLocations() {
		return {
			'mainfile' : 'application.min.js',
			'base' : {
				'libraries': 'libraries.min.js',
				'projectfiles': 'projectfiles.min.js'
			}, 
			'temp' : {
				'entities': 'entities.min.js',
				'angular': 'angular.min.js'
			}
		};
	}
}

const gulpJavascriptConfiguration = new GulpJavascriptConfiguration();
exports.configuration = gulpJavascriptConfiguration.getConfigurations();