/**
 * For better abstraction we divided configurations from FileUploadHelper
 */
class FileUploadOption {
	constructor(backendLocation, pattern, chunkSize, multiple) {
		this._backendLocation = backendLocation;

    	// ngf-model-invalid (binds the invalid selected/dropped files to this model.)
    	this._invalidFiles = [];
    	
    	//Validations:
    	this._pattern = pattern;
    	
    	// Upload options
    	this._chunkSize = chunkSize;
    	this._multiple = multiple
    }

    /*** Backend Location ***/
    get backendLocation() {
		return this._backendLocation;    	
    }

    set backendLocation(locaction) {
    	this._backendLocation = locaction;
    }
    /*** Backend Location ***/

    /*** Invalid files ***/
    get invalidFiles() {
    	return this._invalidFiles;
    }

    set invalidFiles(files) {
    	this._invalidFiles = files;
    }
    /*** Invalid files ***/

    /*** Pattern ***/
    get pattern() {
    	return this._pattern;
    }
    set pattern(userPattern) {
    	this._pattern = userPattern;
    }
	/*** Pattern ***/ 

	/*** Chunk Size ***/
	get chunkSize() {
		return this._chunkSize;
	}

	set chunkSize(userChunkSize) {
		this._chunkSize = userChunkSize;
	}
	/*** Chunk Size ***/

	/*** Multiple ***/
	get multiple() {
		return this._multiple;
	}

	set multiple(userMultiple) {
		this._multiple = multiple;
	}
	/*** Multiple ***/
}

export default FileUploadOption;