<?php

namespace Library\Image\Optimization;

use Exception;
use RuntimeException;
use Library\Image\PNGBase;
use Entities\FilePath;
use Library\Image\Optimization\Interfaces\iImageOptimization;

/**
 * @author dimitar.danailov@mentormate.com
 * @link: https://pngquant.org/php.html
 */
class PNGQuant extends PNGBase implements iImageOptimization {

	const EXECUTION_FILE_LOCATION = '/usr/local/bin/pngquant';

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

	public function saveCompressedImage(FilePath $imageWithOptimization) {
		$compressedPngContent = $this->compress();
		$operationResponse = false;

		if (!empty($compressedPngContent)) {
			try {
				file_put_contents($imageWithOptimization->getFullPath(), $compressedPngContent);
				$operationResponse = true;
			} catch(RuntimeException $runTimeException) {
				echo '{RuntimeException} We can\'t save image' . $runTimeException->getMessage();
			} catch (Exception $exception) {
				echo '{Exception} We can\' save image' . $exception->getMessage();
			}

		} 

		return $operationResponse;
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
		$command = PNGQuant::EXECUTION_FILE_LOCATION . ' --quality=' . $this->quality . ' - < '. escapeshellarg($this->pngFile->getFullPath());
		$compressedPngContent = shell_exec($command);

		if (empty($compressedPngContent)) {
			throw new Exception("Conversion to compressed PNG failed. Is pngquant 1.8+ installed on the server?");
		}

		return $compressedPngContent;
	}
}

?>