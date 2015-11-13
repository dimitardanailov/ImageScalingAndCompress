<?php

namespace Library\Image\Optimization;

use Exception;
use RuntimeException;
use Library\Image\PNGBase;
use Entities\FilePath;
use Library\Image\Optimization\Interfaces\iImageOptimization;

/**
 * @author dimitar.danailov@mentormate.com
 * Source: https://pngquant.org/php.html
 */
class PNGQuant extends PNGBase implements iImageOptimization {
        
	private $minQuantity;
	private $maxQuality;
	private $quality;

	public function __construct(FilePath $pngFile, $quality) {
		parent::__construct($pngFile);
		$this->quality = $quality;
	}

	/*** $minQuantity ***/
	public function getMinQuantity() {
		return $this->minQuantity;
	}

	public function setMinQuantity($minQuantity) {
		$this->minQuantity = $minQuantity;
	}
	/*** $minQuantity ***/

	/*** $maxQuality ***/
	public function getMaxQuality() {
		return $this->maxQuality;
	}

	public function setMaxQuality($maxQuality) {
		$this->maxQuality = $maxQuality;
	}
	/*** $maxQuality ***/

	/*** $quality ***/ 
	public function getQuality() {
		return $this->quality;
	}

	public function setQuality($quality) {
		$this->quality = $quality;
	}
	/*** $quality ***/ 

	/**
	 * We try to save image in file system.
	 * {@inheritDoc}
	 * @see \Library\Image\Optimization\Interfaces\iImageOptimization::saveCompressedImage()
	 */
	public function saveCompressedImage(FilePath $filePath) {
		echo 'here';
		exit();

		$compressedPngContent = $this->compress();

		try {
			file_put_contents($filePath->getFullPath(), $compressedPngContent);
			unset($compressedPngContent);
		} catch(RuntimeException $runTimeException) {
			echo '{RuntimeException} We can\'t save image' . $runTimeException->getMessage();
		} catch (Exception $exception) {
			echo '{Exception} We can\' save image' . $exception->getMessage();
		}
	}

	/**
	 * Function will compresed image and will save to $savePath
	 * {@inheritDoc}
	 * @see \Library\Image\Optimization\Interfaces\iImageOptimization::compress()
	 * @params $savePath - Image will be saved in this place.
	 */
	public function compress() {
		// '-' makes it use stdout, required to save to $compressedPngContent variable
		// '<' makes it read from the given file path
		// escapeshellarg() makes this safe to use with any path
		$compressedPngContent = shell_exec("pngquant");

		if (empty($compressedPngContent)) {
			throw new Exception("Conversion to compressed PNG failed. Is pngquant 1.8+ installed on the server?");
		}

		return $compressedPngContent;
	}
}

?>