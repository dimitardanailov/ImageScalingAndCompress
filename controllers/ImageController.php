<?php
namespace MVC\Controller;

use Enums\Enum as Enum;
use \Library\JSON\JsonHelper;
use Library\Image\ImageMagick\ScissorImagick;

class ImageController {

	private $jsonHelper;

	const WIDTH = 800;
	const HEIGHT = 600;
	const NewImageLocationFolderName = 'images/compress/';

	public function __construct() {
		$this->jsonHelper = new JsonHelper();
	}

	public function compressImage() {
		
		$jsonData = $this->jsonHelper->jsonInputReader();
		$requestIsValid = isset($jsonData->quality) && isset($jsonData->image) && isset($jsonData->filetype);

		if ($requestIsValid) {

			// Generate path to the image.
			$imageName = $jsonData->image . $jsonData->filetype->extension;
			$imagePath = 'images/' . $jsonData->filetype->type . '/' . $imageName;

			// Delete previous files
			array_map('unlink', glob(ImageController::NewImageLocationFolderName . '*'));
			$newImageLocation = ImageController::NewImageLocationFolderName . uniqid() . $imageName;

			$scissorImagick = new ScissorImagick($imagePath, $newImageLocation);
			$operationResponse = $scissorImagick->adaptiveResizeImageByWidthAndHeight(ImageController::WIDTH, ImageController::HEIGHT, $jsonData->quality);

			if ($operationResponse) {
				$this->jsonHelper->responseJsonMessageByKeyAndValues('newImageLocation', $newImageLocation);
			} else {
				$this->jsonHelper->responseDefaultError();
			}
		} else {
			$this->jsonHelper->responseDefaultError();
		}
	}
}

?>
