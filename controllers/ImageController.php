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

	const WIDTH = 800;
	const HEIGHT = 600;
	const ImageLocationOfCurrentImages = 'images/';
	const ImageLocationForNewImages = 'images/compress/';

	public function __construct() {
		$this->jsonHelper = new JsonHelper();
	}

	public function compressImage() {
		
		$jsonData = $this->jsonHelper->jsonInputReader();
		$requestIsValid = isset($jsonData->quality) && isset($jsonData->image) && isset($jsonData->filetype);

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
			$operationResponse = $scissorImagick->adaptiveResizeImageByWidthAndHeight(ImageController::WIDTH, ImageController::HEIGHT, $jsonData->quality);

			if ($operationResponse) {
				$response = new stdClass();
				$response->currentImageDetails = $this->getImageDetailsByFilePath($currentImage);
				$response->imageWithOptimizationDetails = $this->getImageDetailsByFilePath($imageWithOptimization);

				// $fileInfo = new stdClass();
				// $fileInfo->path = $imageWithOptimization->getPath();
				// $fileInfo->name = $imageWithOptimization->getFileName();


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
