<?php

namespace Library\Image\ImageMagick\Interfaces;

/**
 *
 * @author dimitar.danailov@mentormate.com
 */
interface iScissorImagick
{
	/**
	 * 1) Adaptively resize image with data-dependent triangulation. Avoids blurring across sharp color changes.
	 * Most useful when used to shrink images slightly to a slightly smaller "web size"; may not look good when a full-sized image is adaptively resized to a thumbnail.
	 * Available since 6.2.9.
	 * 2) After that we need to determine image file format.
	 * Option 1) Jpeg: Please @see ScissorImagick::changeImageQualityForJPEG
	 * Option 2) Png: Please @see ScissorImagick::changeImageQualityForPNG
	 * 
	 * @param $width
	 * @param $height
	 * @param $quality
	 * @param $bestFit
	 *
	 * @link http://phpimagick.com/Imagick/adaptiveResizeImage
	 */
	public function adaptiveResizeImageByWidthAndHeight($width, $height, $quality = 100, $bestFit = true);

	/**
	 * Scale image by width and height
	 * @param int $width
	 * @param int $height
	 *
	 * @link http://www.php.net/manual/en/imagick.resizeimage.php
	 * @link http://phpimagick.com/Imagick/resizeImage?imagePath=People&filterType=20&width=500&height=500&blur=10&bestFit=1&cropZoom=0
	 */
	public function resizeImageByWidthAndHeight($width, $height, $bestFit = true);

	/**
	 * Change image quality of jpeg file and save image.
	 * @param int $quality
	 */	
	public function changeImageQualityForJPEG($quality);

	/**
	 * Change image quality of png file and save image.
	 * @param int $quality
	 */	
	public function changeImageQualityForPNG($quality);
}