'use strict';

const configurations = {
	'folderStructure' : {
		'baseDevelopment': './js/development',
		'baseProduction': './js/production'
	}
};

// Entties
configurations.folderStructure['entities'] = {
	'base': `${configurations.folderStructure.baseDevelopment}/entities`
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
	configurations.folderStructure.entities[key] = `${configurations.folderStructure.entities.base}/${key}`;
});

// Concatenation
configurations.concatenationLocations = {
	'mainfile' : 'application.min.js',
	'base' : {
		'libraries': 'libraries.min.js',
		'projects': 'project.min.js'
	}, 
	'temp' : {
		'entities': 'entities.min.js'
	}
};

configurations.baseFiles = generateTempFiles('base');
configurations.tempFiles = generateTempFiles('temp');

configurations.minifyLocations = {
	'libraries': configurations.folderStructure.baseProduction + '/' + configurations.concatenationLocations.base.libraries,
	'projects': configurations.folderStructure.baseProduction + '/' + configurations.concatenationLocations.base.projects
};

function generateTempFiles(concatenationLocationsKey) {
	const baseProductionFilePath = configurations.folderStructure.baseProduction.replace('./', '') + '/';
	const tempFiles = [];

	let tempLocation = null;
	// http://stackoverflow.com/questions/921789/how-to-loop-through-javascript-object-literal-with-objects-as-members
	Object.keys(configurations.concatenationLocations[concatenationLocationsKey]).forEach(function(key) {
		tempLocation = baseProductionFilePath + configurations.concatenationLocations[concatenationLocationsKey][key];
		
		tempFiles.push(tempLocation);
	});

	return tempFiles;
}

exports.configuration = configurations;
