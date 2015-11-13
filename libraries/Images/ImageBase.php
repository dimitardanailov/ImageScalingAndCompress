<?php

namespace Library\Image;

use Exception;
use Entities\FilePath;
use Library\Image\Interfaces\iIMage;

/**
 * @author dimitar.danailov@mentormate.com
 */
class ImageBase implements iIMage {

	const IMAGE_MAX_SIZE_IN_MB = 10;

	private $image;

	public function __construct(FilePath $image) {
		$imagePath = $image->getFullPath();
		if (!file_exists($imagePath)) {
			throw new Exception("File does not exist: $image");
		}

		$this->image = $image;
	}

	/*** $image ***/
	public function getImage() {
		return $this->image;
	}

	public function setImage(FilePath $image) {
		$this->image = $image;
	}
	/*** $image ***/


	/**
	 * Get image maximum size in bytes.
	 */
	public static function getImageMaxSizeInBytes() {
		return (ImageBase::IMAGE_MAX_SIZE_IN_MB * 1024 * 1024);
	}
}

