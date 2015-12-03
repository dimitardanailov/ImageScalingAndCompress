/**
 * Current implement follow this guide: https://angular-file-upload.appspot.com/js/upload.js
 * We use ng-file-upload for plugin.
 */
class FileUploadHelper {

	constructor($scope, $timeout, Upload, attrs) {
        this.scope = $scope;    
		this.timeout = $timeout;
		this.Upload = Upload;
        this.attrs = attrs;

		this.trackUploading();
	}

    /**
     * When files array is changed.
     * We trigger a new event for file upload.
     */
    trackUploading() {
    	let tempFiles = [], _this = this;

        // console.log(this.scope[this.attrs.ngModel]);

        this.scope.$watch(this.attrs.ngModel, (files) => {
            // console.log(this);
            if (files != null) {
                if (angular.isArray(files)) {
                    tempFiles = files;
                } else {
                    tempFiles[0] = files;
                }

                // We have a new file upload.
                _this.timeout(() => {

                    // _this.scope.fileUpload.files = tempFiles;
                });
            }
        });

        /*
    	this.scope.$watch('fileUpload.files', (files) => {

            console.log('after', _this.files && _this.files.length);

    		if (files != null) {
    			if (angular.isArray(files)) {
    				tempFiles = files;
    			} else {
    				tempFiles[0] = files;
    			}

                // We have a new file upload.
                _this.timeout(() => {
                    _this.scope.fileUpload.files = tempFiles;
                });
                
    			tempFiles.forEach((tempFile) => {
    				_this.uploadFile(_this.scope, tempFile, false);
    			});
            }
    	});*/
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
            console.log('uploaded');
    	}, function(response) {
    		console.log(response);
    	});

    	file.upload.progress((evt) => {
    		// file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    	});
    }

    static createUploadReference($scope, $timeout, Upload, attrs) {
        return new FileUploadHelper($scope, $timeout, Upload, attrs);
    }
} 

export default FileUploadHelper;