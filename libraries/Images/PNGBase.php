<?php

namespace Library\Image;
use Entities\FilePath;
use Library\Image\Interfaces\iIMage;

/**
 * @author dimitar.danailov@mentormate.com
 */
class PNGBase extends ImageBase implements iImage {

	protected $pngFile;

	public function __construct(FilePath $pngFile) {
		parent::__construct($pngFile);

		$this->pngFile = $pngFile;
	}
}

?>
