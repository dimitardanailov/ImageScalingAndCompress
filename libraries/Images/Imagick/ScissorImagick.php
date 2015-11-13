<?php
namespace Library\Image\ImageMagick;

use Imagick;
use Exception;
use Entities\FilePath;
use Library\Image\ImageMagick\Interfaces\iScissorImagick;
use Library\Image\Optimization\PNGQuant;

/**
 * Class we will be used image resizing and image compression.
 *
 * @author dimitar.danailov@mentormate.com
 */
class ScissorImagick extends Imagick implements iScissorImagick {

	private $currentImage;
	// Information where we should to save a new image.
	private $imageWithOptimization;

	public function	__construct(FilePath $currentImage, FilePath $imageWithOptimization) {
		$imagePath = $currentImage->getFullPath();
		if (!file_exists($imagePath)) {
			throw new Exception("File does not exist: $imagePath");
		}

		parent::__construct(realpath($imagePath));

		$this->currentImage = $currentImage;
		$this->imageWithOptimization = $imageWithOptimization;
	}


	/**
	 * Try to scale and compress image.
	 * {@inheritDoc}
	 * @see \Library\Image\ImageMagick\Interfaces\iImageMagick::adaptiveResizeImageByWidthAndHeight()
	 * @return If you we can save the image we return true.
	 */
	public function adaptiveResizeImageByWidthAndHeight($width, $height, $quality = 100, $bestFit = true) {
		$this->adaptiveResizeImage($width, $height, $bestFit);

		$imageFileType = exif_imagetype($this->currentImage->getFullPath());
		$operationResponse = false;

		switch ($imageFileType) {
			case IMAGETYPE_JPEG:
				$operationResponse = $this->changeImageQualityForJpeg($quality);
				break;
			case IMAGETYPE_PNG:
				$operationResponse = $this->changeImageQualityForPNG($quality);
				break;
			default:
				throw new Exception("Image format is not supported.");
				break;
		}

		return $operationResponse;
	}

	/**
	 * {@inheritDoc}
	 * @see \Library\Image\ImageMagick\Interfaces\iImageMagick::resizeImage()
	 */
	public function resizeImageByWidthAndHeight($width, $height, $bestFit = true) {
		$filterType = \Imagick::FILTER_UNDEFINED;
		$blur = 0;

		$this->resizeImage($width, $height, $filterType, $blur, $bestFit);
		$imageBlob = $this->getimageblob();

		return $imageBlob;
	}

	/**
	 * {@inheritDoc}
	 * @see \Library\Image\ImageMagick\Interfaces\iImageMagick::changeImageQualityForJPEG()
	 * @return If you we can save the image we return true.
	 */
	public function changeImageQualityForJPEG($quality)  {
		$this->setImageCompressionQuality($quality);
		$operationResponse = $this->saveImageToFileSystem();
		
		return $operationResponse;
	}

	/**
	 * {@inheritDoc}
	 * @see \Library\Image\ImageMagick\Interfaces\iImageMagick::changeImageQualityForPNG()
	 * @return If you we can save the image we return true.
	 */
	public function changeImageQualityForPNG($quality) {
		// Try to save image to file system.
		try {
			$this->writeImage($this->newImageLocation);

			$pngQuant = new PNGQuant($this->newImageLocation, $quality);
			$pngQuant->storeCompressImage($this->newImageLocation);
			$this->destroy();

			return true;
		} catch (Exception $exception) {
			$this->destroy();

			return false;
		}
	}

	/**
	 * @return If you we can save the image we return success.
	 */
	public function saveImageToFileSystem() {
		// Try to save image to file system.
		try {
			$this->writeImage($this->imageWithOptimization->getFullPath());
			$this->destroy();

			return true;
		} catch (Exception $exception) {
			$this->destoy();

			return false;
		}
	}
}