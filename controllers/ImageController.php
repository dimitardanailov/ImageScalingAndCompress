<?php
namespace MVC\Controller;

use \stdClass;
use Enums\Enum\ResponseError;
use Entities\FilePath;
use MVC\Helper\FileUploadHelper;
use \Library\JSON\JsonHelper;
use Library\Image\ImageMagick\ScissorImagick;
use Library\Image\ImageMagick\FileSystemImagick;

class ImageController {

	private $jsonHelper;

	const ImageLocationOfCurrentImages = 'images/';
	const ImageLocationForNewImages = 'images/compress/';
	const ImageLocationForUploading = 'images/uploads/';
	const CleanupTargetDir = true; // Remove old files
	const MaxFileAge = 18000; // (5 * 3600) Temp file age in seconds

	public function __construct() {
		$this->jsonHelper = new JsonHelper();
	}

	public function compressImage() {
		
		$jsonData = $this->jsonHelper->jsonInputReader();

		$dimensionsAreCorrect = isset($jsonData->dimensions) 
			&& (property_exists($jsonData->dimensions, 'width') && property_exists($jsonData->dimensions, 'height'))
			&& (is_numeric($jsonData->dimensions->width) && is_numeric($jsonData->dimensions->height));
		$bestFitIsCorrect = isset($jsonData->bestFit) && is_bool($jsonData->bestFit);
		$interlaceSchemeIsCorrect = isset($jsonData->interlaceSchemeIsEnable) && is_bool($jsonData->interlaceSchemeIsEnable);

		$requestIsValid = isset($jsonData->quality) && isset($jsonData->image) && isset($jsonData->filetype) 
			&& $dimensionsAreCorrect && $bestFitIsCorrect && $interlaceSchemeIsCorrect;

		if ($requestIsValid) {

			// Delete prImageLocationOfCurrentImages = 'images/';
			array_map('unlink', glob(ImageController::ImageLocationForNewImages . '*'));

			// Generate image name
			$imageName = $jsonData->image . $jsonData->filetype->extension;
			
			// Current(Original) Image
			$imagePath = ImageController::ImageLocationOfCurrentImages . $jsonData->filetype->type . '/';
			$currentImage = new FilePath($imagePath, $imageName);
			
			// Image optimization
			$tempName = uniqid() . $imageName;
			$imageWithOptimization = new FilePath(ImageController::ImageLocationForNewImages, $tempName);

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

	public function uploadImage() {
		// $operationResponse is equal to true, if you we can create folder or folder exist.
		$operationResponse = FileUploadHelper::checkFolderExistAndCreateDirectory(ImageController::ImageLocationForUploading);

		if ($operationResponse) {
			$fileName = FileUploadHelper::generateFileName();
			$filePath = new FilePath(ImageController::ImageLocationForUploading, $fileName);

			// Remove old temp files	
			if (ImageController::CleanupTargetDir) {
				if (!is_dir($filePath->getPath()) || !$dir = opendir($filePath->getPath())) {
					$this->jsonHelper->responseCustomError(ResponseError::PERMISSION_DENIED, 'Failed to open directory.');
				}

				// Upload image to file system.
			}

		} else {
			$this->jsonHelper->responseDefaultError();
		}
	}

	private function getImageDetailsByFilePath(FilePath $filePath) {
		$fileSystemImagick = new FileSystemImagick($filePath);
		$imageFileInfo  = $fileSystemImagick->getImageFileDetails();

		return $imageFileInfo;
	}
}

?>
