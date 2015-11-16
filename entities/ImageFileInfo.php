<?php 

namespace Entities;

use Exception;
use Entities\FilePath;

/**
 * @author dimitar.danailov@mentormate.com
 */
class ImageFileInfo {

	public $filePath;
	public $dimensions = array('width' => 0, 'height' => 0);
	public $fileSize = array('bytes' => 0, 'kilobytes' => 0, 'megabytes' => 0);
	public $imageIsVisible = false;

	public function	__construct(FilePath $path, array $dimensions, $fileSizeInBytes) {
		$this->filePath = $path;
		$this->setDimensions($dimensions);
		$this->setFileSize($fileSizeInBytes);
	}

	public function setDimensions(array $dimensions) {
		if (!isset($dimensions['width']) && !isset($dimensions['height'])) {
			throw new Exception('Associative array is not valid.');
		}

		$this->dimensions = $dimensions;
	}

	public function setFileSize($fileSizeInBytes) {
		if (is_numeric($fileSizeInBytes)) {
			$this->fileSize['bytes'] = $fileSizeInBytes;
			$kilobytes = ($this->fileSize['bytes'] / 1024);
			$this->fileSize['kilobytes'] = number_format($kilobytes, 2, '.', '');

			$megabytes = ($this->fileSize['kilobytes'] / 1024);
			$this->fileSize['megabytes'] = number_format($megabytes, 2, '.', '');
		}
	}
}