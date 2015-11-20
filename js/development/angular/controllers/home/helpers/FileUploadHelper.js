export class FileUploadHelper {
	static generateFileUploadOptions() {
    	const fileUploadOptions = {};

    	// ngf-model-invalid (binds the invalid selected/dropped files to this model.)
    	fileUploadOptions.invalidFiles = [];

    	// ng-model-options
    	fileUploadOptions.modelOptionsObj = {};

    	return fileUploadOptions;
    }
} 