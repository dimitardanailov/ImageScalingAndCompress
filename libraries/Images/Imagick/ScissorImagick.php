<?php
namespace Library\Image\ImageMagick;

use Imagick;
use Exception;
use Entities\FilePath;
use Library\Image\ImageMagick\Interfaces\iScissorImagick;
use Library\Image\Optimization\PNGQuant;

/**
 * Class we will be used image resizing and image compression.
 * For compression of PNG files we use @see Library\Image\Optimization\PNGQuant
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
	public function adaptiveResizeImageByWidthAndHeight($width, $height, $quality = 100, $bestFit = true, $interlaceSchemeIsEnable = false) {
		$operationResponse = false;
		
		// Protect from injections.
		if ($width > 0 && $height > 0 && $quality > 0 && is_bool($bestFit)) {
			$this->adaptiveResizeImage($width, $height, $bestFit);

			// Image file type
			$imageFileType = exif_imagetype($this->currentImage->getFullPath());

			switch ($imageFileType) {
				case IMAGETYPE_JPEG:
					if ($interlaceSchemeIsEnable) {
						$this->setInterlaceScheme(Imagick::INTERLACE_JPEG);
					}

					$operationResponse = $this->changeImageQualityForJpeg($quality);
					break;
				case IMAGETYPE_PNG:
					$operationResponse = $this->changeImageQualityForPNG($quality);

					if ($operationResponse && $interlaceSchemeIsEnable) {
						$operationResponse = $this->addProgressiveRenderingForPNG();
					}

					break;
				default:
					throw new Exception("Image format is not supported.");
					break;
			}
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
		$imagePath = $this->imageWithOptimization->getFullPath();
		$operationResponse = $this->saveImageToFileSystem($imagePath);
		
		return $operationResponse;
	}

	/**
	 * {@inheritDoc}
	 * @see \Library\Image\ImageMagick\Interfaces\iImageMagick::changeImageQualityForPNG()
	 * @return If you we can save the image we return true.
	 */
	public function changeImageQualityForPNG($quality) {
		$tempImageName = uniqid() . $this->imageWithOptimization->getFileName();
		$tempFilePath = new FilePath($this->imageWithOptimization->getPath(), $tempImageName);
		$operationResponse = $this->writeImage($tempFilePath->getFullPath());

		if ($operationResponse) {
			// Try to optimize png
			try {
				$pngQuant = new PNGQuant($tempFilePath, $quality);
				$operationResponse = $pngQuant->saveCompressedImage($this->imageWithOptimization);
			} catch (Exception $exception) {
				$operationResponse = false;
			}
		} 

		return $operationResponse;
	}

	/**
	 * {@inheritDoc}
	 */
	public function addProgressiveRenderingForPNG() {
		$instance = new ScissorImagick($this->imageWithOptimization, $this->imageWithOptimization);
		$instance->setInterlaceScheme(Imagick::INTERLACE_PNG);

		$imagePath = $instance->imageWithOptimization->getFullPath();
		$operationResponse = $instance->saveImageToFileSystem($imagePath);
		
		return $operationResponse;
	}

	/**
	 * {@inheritDoc}
	 * @param $imagePath
	 * @return If you we can save the image we return success.
	 */
	public function saveImageToFileSystem($imagePath) {
		// Try to save image to file system.
		try {
			$this->writeImage($imagePath);
			$this->destroy();

			return true;
		} catch (Exception $exception) {
			$this->destoy();

			return false;
		}
	}
}