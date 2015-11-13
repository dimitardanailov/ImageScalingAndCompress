<?php

namespace Library\Image;

use Exception;
use Library\Image\Interfaces\iIMage;

/**
 * @author dimitar.danailov@mentormate.com
 */
class ImageBase implements iIMage {

	const IMAGE_MAX_SIZE_IN_MB = 10;

	private $imagePath;

	public function __construct($imagePath) {
		if (!file_exists($imagePath)) {
			throw new Exception("File does not exist: $imagePath");
		}

		$this->imagePath = $imagePath;
	}

	/*** $imagePath ***/
	public function getPathToImageFile() {
		return $this->imagePath;
	}

	public function setPathToImageFile($imagePath) {
		$this->imagePath = $imagePath;
	}
	/*** $imagePath ***/


	/**
	 * Get image maximum size in bytes.
	 */
	public  static function getImageMaxSizeInBytes() {
		return (ImageBase::IMAGE_MAX_SIZE_IN_MB * 1024 * 1024);
	}
}

