/**
 * Current implement follow this guide: https://angular-file-upload.appspot.com/js/upload.js
 * We use ng-file-upload for plugin.
 */
class FileUploadHelper {

	constructor($scope, $timeout, Upload) {
		this.scope = $scope;
		this.timeout = $timeout;
		this.Upload = Upload;

		// Get Configurations
		this.scope.fileUpload = FileUploadHelper.generateFileUploadOptions();

		this.trackUploading();
	}

	static generateFileUploadOptions() {
    	const fileUploadOptions = {};

    	// ngf-model-invalid (binds the invalid selected/dropped files to this model.)
    	fileUploadOptions.invalidFiles = [];

    	// ng-model-options
    	fileUploadOptions.modelOptionsObj = {};
    	
    	//Validations:
    	fileUploadOptions.pattern="'image/png,image/jpeg"
    	
    	fileUploadOptions.chunkSize = 100000;
    	fileUploadOptions.multiple = false;
    	fileUploadOptions.backendLocation = 'upload.php';

    	return fileUploadOptions;
    }

    /**
     * When files array is changed.
     * We trigger a new event for file upload.
     */
    trackUploading() {
    	let tempFiles = [], _this = this;
    	this.scope.$watch('fileUpload.files', (files) => {
    		
    		if (files != null) {
    			if (angular.isArray(files)) {
    				tempFiles = files;
    			} else {
    				tempFiles[0] = files;
    			}
                
    			tempFiles.forEach((tempFile) => {
    				_this.uploadFile(_this.scope, tempFile, false);
    			});
            }
    	});
    }

    uploadFile(scope, file, resumable) {
    	this.uploadUsingUpload(scope, file, resumable);
    }

    /**
     * Upload file to file system.
     */
    uploadUsingUpload(scope, file, resumable) {
    	const fileNameWithEncoding = encodeURIComponent(file.name);
    	const url = `${this.scope.fileUpload.backendLocation}?name=${fileNameWithEncoding}`;

    	file.upload = this.Upload.upload({
    		'url': url,
    		'resumeSizeUrl': resumable ? url : null,
    		'resumeChunkSize': resumable ? this.scope.fileUpload.chunkSize : null,
    		'headers': {
    			'optional-header': 'header-value'
    		},
    		'data': {
    			'file': file
    		} 
    	});

    	file.upload.then((response) => {
    		console.log(response);
    	}, function(response) {
    		console.log(response);
    	});

    	file.upload.progress((evt) => {
    		// file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    	});
    }
} 

FileUploadHelper.$inject = ['$timeout'];

export default FileUploadHelper;