<?php

namespace Library\Image\ImageMagick\Interfaces;

/**
 *
 * @author dimitar.danailov@mentormate.com
 */
interface iFileSystemImagick {
	
	/**
	 * We retrieve information for image size and image width and height.
	 *
	 * @link http://php.net/manual/bg/function.imagick-getimagegeometry.php
	 * @link http://phpimagick.com/Imagick/getImageGeometry
	 */
	public function getImageFileDetails();
}