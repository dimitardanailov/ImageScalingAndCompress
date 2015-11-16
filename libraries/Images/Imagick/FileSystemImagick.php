<?php
namespace Library\Image\ImageMagick;

use Imagick;
use Exception;
use Entities\FilePath;
use Entities\ImageFileInfo;
use Library\Image\ImageMagick\Interfaces\iFileSystemImagick;

/**
 *
 * @author dimitar.danailov@mentormate.com
 */
class FileSystemImagick extends Imagick implements iFileSystemImagick {

	private $currentImage;

	public function	__construct(FilePath $currentImage) {
		$imagePath = $currentImage->getFullPath();
		if (!file_exists($imagePath)) {
			throw new Exception("File does not exist: $imagePath");
		}

		parent::__construct(realpath($imagePath));
		$this->currentImage = $currentImage;
	}

	/**
	 * {@inheritDoc}
	 * @see \Library\Image\ImageMagick\Interfaces\iFileSystemImagick::getImageFileDetails()
	 */
	public function getImageFileDetails() {
		$imageGeometry = $this->getImageGeometry();
		$imageSizeInBytes = $this->getImageLength();

		$imageFileInfo = new ImageFileInfo($this->currentImage, $imageGeometry, $imageSizeInBytes);

		return $imageFileInfo;
	}
}