<?php
namespace MVC\Controller;

use \stdClass;
use Enums\Enum as Enum;
use Entities\FilePath;
use \Library\JSON\JsonHelper;
use Library\Image\ImageMagick\ScissorImagick;
use Library\Image\ImageMagick\FileSystemImagick;

class ImageController {

	private $jsonHelper;

	const ImageLocationOfCurrentImages = 'images/';
	const ImageLocationForNewImages = 'images/compress/';

	public function __construct() {
		$this->jsonHelper = new JsonHelper();
	}

	public function compressImage() {
		
		$jsonData = $this->jsonHelper->jsonInputReader();

		$dimensionsAreCorrect = isset($jsonData->dimensions) 
			&& (property_exists($jsonData->dimensions, 'width') && property_exists($jsonData->dimensions, 'height'))
			&& (is_numeric($jsonData->dimensions->width) && is_numeric($jsonData->dimensions->height));
		$bestFitIsCorrect = isset($jsonData->bestFit) && is_bool($jsonData->bestFit);
		$requestIsValid = isset($jsonData->quality) && isset($jsonData->image) && isset($jsonData->filetype) 
			&& $dimensionsAreCorrect && $bestFitIsCorrect;

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
			$operationResponse = $scissorImagick->adaptiveResizeImageByWidthAndHeight($imageWidth, $imageHeight, $jsonData->quality, $jsonData->bestFit);

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

	private function getImageDetailsByFilePath(FilePath $filePath) {
		$fileSystemImagick = new FileSystemImagick($filePath);
		$imageFileInfo  = $fileSystemImagick->getImageFileDetails();

		return $imageFileInfo;
	}
}

?>
