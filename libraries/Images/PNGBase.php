<?php

namespace Library\Image;

use Library\Image\Interfaces\iIMage;

/**
 * @author dimitar.danailov@mentormate.com
 */
class PNGBase extends ImageBase implements iImage {

	protected $pathToPngFile;

	public function __construct($pathToPngFile) {
		parent::__construct($pathToPngFile);

		$this->pathToPngFile = $pathToPngFile;
	}
}

?>
