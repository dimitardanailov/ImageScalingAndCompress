<?php
namespace MVC\Controller;

use \stdClass;
use Enums\Enum\ResponseState;
use Entities\FilePath;
use MVC\Helper\FileUploadHelper;
use \Library\JSON\JsonHelper;
use Library\Image\ImageMagick\ScissorImagick;
use Library\Image\ImageMagick\FileSystemImagick;

class ImageController {

	private $jsonHelper;

	const CleanupTargetDir = true; // Remove old files
	const MaxFileAge = 18000; // (5 * 3600) Temp file age in seconds
	
	private static $ImageLocationOfCurrentImages;
	private static $ImageLocationForNewImages;
	private static $ImageLocationForUploading;
	private static $ValidImageFormats = array(IMAGETYPE_GIF, IMAGETYPE_JPEG, IMAGETYPE_PNG);

	public function __construct() {
		self::$ImageLocationOfCurrentImages = ProjectRootFolder . '/images/';
		self::$ImageLocationForNewImages = ProjectRootFolder . '/images/compress/';
		self::$ImageLocationForUploading = ProjectRootFolder . '/images/uploads/';

		$this->jsonHelper = new JsonHelper();
	}

	/**
	 * We try to compress image.
	 * 1 )We can compress: PNG and JPEG files.
	 * 2) We can scale image.
	 * 3) We can change colors of images. We lossy image compression. (Image is processed with a “lossy” filter that eliminates some pixel data).
	 * 4) We can apply Progressive Image Rendering (http://blog.codinghorror.com/progressive-image-rendering/)
	 */
	public function compressImage() {
		
		$jsonData = $this->jsonHelper->jsonInputReader();

		// Validation
		$dimensionsAreCorrect = isset($jsonData->dimensions) 
			&& (property_exists($jsonData->dimensions, 'width') && property_exists($jsonData->dimensions, 'height'))
			&& (is_numeric($jsonData->dimensions->width) && is_numeric($jsonData->dimensions->height));
		$bestFitIsCorrect = isset($jsonData->bestFit) && is_bool($jsonData->bestFit);
		$interlaceSchemeIsCorrect = isset($jsonData->interlaceSchemeIsEnable) && is_bool($jsonData->interlaceSchemeIsEnable);

		$requestIsValid = isset($jsonData->quality) && isset($jsonData->image) && isset($jsonData->filetype) 
			&& $dimensionsAreCorrect && $bestFitIsCorrect && $interlaceSchemeIsCorrect;

		if ($requestIsValid) {

			// Delete previous images = 'images/';
			array_map('unlink', glob(ImageController::$ImageLocationForNewImages . '*'));

			// Generate image name
			$imageName = $jsonData->image . $jsonData->filetype->extension;
			
			// Current(Original) Image
			$imagePath = ImageController::$ImageLocationOfCurrentImages . $jsonData->filetype->type . '/';
			$currentImage = new FilePath($imagePath, $imageName);
			
			// Image optimization
			$tempName = uniqid() . $imageName;
			$imageWithOptimization = new FilePath(ImageController::$ImageLocationForNewImages, $tempName);

			$scissorImagick = new ScissorImagick($currentImage, $imageWithOptimization);
			$imageWidth = $jsonData->dimensions->width;
			$imageHeight = $jsonData->dimensions->height;
			
			// Note: We need to turn best fit, because ratio can be floating point.
			$jsonData->bestFit = false;

			$operationResponse = $scissorImagick->adaptiveResizeImageByWidthAndHeight(
				$imageWidth, 
				$imageHeight, 
				$jsonData->quality, 
				$jsonData->bestFit,
				$jsonData->interlaceSchemeIsEnable
			);

			if ($operationResponse) {
				$response = new stdClass();
				$response->currentImageDetails = $this->getImageDetailsByFilePath($currentImage);
				$response->imageWithOptimizationDetails = $this->getImageDetailsByFilePath($imageWithOptimization);

				$this->jsonHelper->responseJsonMessageByKeyAndValues('response', $response);
				
			} else {
				$this->jsonHelper->responseDefaultError();
			}
		} else {
			$this->jsonHelper->responseDefaultError();
		}
	}


	/**
	 * Try to save in local image file system.
	 */
	public function saveImageToFileSystem() {
		// Try to validate input information. 
		if (isset($_FILES['file']) && is_array($_FILES['file'])) {
			// $operationResponse is equal to true, if you we can create folder or folder exist.
			$operationResponse = FileUploadHelper::checkFolderExistAndCreateDirectory(ImageController::$ImageLocationForUploading);

			if ($operationResponse) {
				// Generate image filename
				$fileName = FileUploadHelper::generateFileName();
				// We will use this $filepath, when we try to save image to 
				$filePath = new FilePath(ImageController::$ImageLocationForUploading, $fileName);

				// Remove old temp files	
				if (ImageController::CleanupTargetDir) {
					if (!is_dir($filePath->getPath()) || !$dir = opendir($filePath->getPath())) {
						$this->jsonHelper->responseCustomError(ResponseState::PERMISSION_DENIED, 'Failed to open directory.');
					}
					FileUploadHelper::cleanupOldChunkFiles($filePath, ImageController::MaxFileAge);
				}

				// Upload image to file system.
				$imagePath = $_FILES['file']['tmp_name'];
				$imageFileFormatIsValid = FileUploadHelper::imageFileFormatIsValid($imagePath, ImageController::$ValidImageFormats);
				if ($imageFileFormatIsValid) {
					$state = FileUploadHelper::saveImageToFileSystem($filePath, $_FILES, false);

					var_dump($state);
				} else {
					$this->jsonHelper->responseCustomError(ResponseState::INVALID_REQUEST, 'Current system support only upload of: GIF, JPEG, PNG.');
				}

			} else {
				$this->jsonHelper->responseCustomError(ResponseState::PERMISSION_DENIED, 'Failed to create or access directory.');
			}
		} else {
			$this->jsonHelper->responseCustomError(ResponseState::INVALID_REQUEST, 'Request is not valid.');
		}
	}

	private function getImageDetailsByFilePath(FilePath $filePath) {
		$fileSystemImagick = new FileSystemImagick($filePath);
		$imageFileInfo  = $fileSystemImagick->getImageFileDetails();

		return $imageFileInfo;
	}
}

?>
