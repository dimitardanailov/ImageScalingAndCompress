import gulp from 'gulp';

const jsConfigurations = {
	'folderStructure' : {
		'baseDevelopment': './js/development',
		'baseProduction': './js/production'
	}
};

// Entties
jsConfigurations.folderStructure['entities'] = {
	'base': `${jsConfigurations.folderStructure.baseDevelopment}/entities`
};
jsConfigurations.folderStructure.entities['htmlContainers'] = `${jsConfigurations.folderStructure.entities.base}/htmlContainers`;

exports.configuration = jsConfigurations;