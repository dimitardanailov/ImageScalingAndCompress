import ApplicationObject from 'entities/javascript/object/ApplicationObject';

/**
 * Current implement follow this guide: https://angular-file-upload.appspot.com/js/upload.js
 * We use ng-file-upload for plugin.
 */
class FileUploadHelper {

	constructor($scope, $timeout, Upload, attributeMap) {
        this.scope = $scope;    
		this.timeout = $timeout;
		this.Upload = Upload;
        this.attributeMap = attributeMap;

        if (this.attributeMap.has('uploadPath')) {
            this.uploadPath = this.attributeMap.get('uploadPath');
            this.trackUploading();
        } else {
            throw 'You should to specify ngcfu-image-option-upload-path attrbiute';
        }
	}

    /**
     * When files array is changed.
     * We trigger a new event for file upload.
     */
    trackUploading() {
    	let tempFiles = [], _this = this;
        const modelReference = this.attributeMap.get('ngModel');
        this.scope.$watch(modelReference, (files) => {
            if (files != null) {
                if (angular.isArray(files)) {
                    tempFiles = files;
                } else {
                    tempFiles[0] = files;
                }

                // We have a new file upload.
                _this.timeout(() => {
                    _this.scope  = ApplicationObject.updateNestedObject(_this.scope, modelReference, tempFiles);
                });

                tempFiles.forEach((tempFile, i) => {
                    console.log('Count files:' + i);
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
    	const url = `${this.uploadPath}?name=${fileNameWithEncoding}`;

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

        let progressPercent = 0;
    	file.upload.then((response) => {
            console.log('uploaded');
            alert('File is uploaded');
    	}, function(response) {
    		console.log(response);
    	}, function(event) {
            console.log('event', event);
            progressPercent = Math.min(100, parseInt(100.0 * event.loaded / event.total));
            console.log(progressPercent);
        });
    }

    static createUploadReference($scope, $timeout, Upload, attributeMap) {
        return new FileUploadHelper($scope, $timeout, Upload, attributeMap);
    }
} 

export default FileUploadHelper;