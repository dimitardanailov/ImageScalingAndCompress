import FileUploadOption from './FileUploadOption';

class ImageUploadOption extends FileUploadOption {

	constructor(backendLocation, pattern, chunkSize, multiple) {
		super(backendLocation, pattern, chunkSize, multiple);

		this._imageThumbnailSize = {
			'width': 300,
			'height': 150
		}
	}

	/*** Image Thumbnail Size ***/
	get imageThumbnailSize() {
		return this._imageThumbnailSize;
	}

	set imageThumbnailSize(userImageThumbnailSize) {
		const userInputDataIsValid = 
			typeof userImageThumbnailSize == 'object' &&
			userImageThumbnailSize.hasOwnProperty('width') && 
			userImageThumbnailSize.hasOwnProperty('height')

		if (userInputDataIsValid) {
			this._imageThumbnailSize = userImageThumbnailSize;
		} else {
			throw "Object should to has width and height property";
		}
	}
	/*** Image Thumbnail Size ***/

	/*** Static methods ***/
    static generateDefaultImageOptions(backendLocation) {
    	const reference = new ImageUploadOption(backendLocation, 'image/png,image/jpeg', 100000, false);

    	return reference; 
    }
    /*** Static methods ***/
}

export default ImageUploadOption;