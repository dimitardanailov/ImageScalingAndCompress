<?php

namespace Library\Image\ImageMagick\Interfaces;

/**
 *
 * @author dimitar.danailov@mentormate.com
 */
interface iScissorImagick {
	/**
	 * 1) Adaptively resize image with data-dependent triangulation. Avoids blurring across sharp color changes.
	 * Most useful when used to shrink images slightly to a slightly smaller "web size"; may not look good when a full-sized image is adaptively resized to a thumbnail.
	 * Available since 6.2.9.
	 * 2) After that we need to determine image file format.
	 * Option 1) Jpeg: Please @see ScissorImagick::changeImageQualityForJPEG
	 * Option 2) Png: Please @see ScissorImagick::changeImageQualityForPNG
	 * 
	 * Note we can enable progressive download for image.
	 * Image has progressive rendering if you interlaceSchemeIsEnable is equal to true.
	 *
	 * @param integer $width
	 * @param integer $height
	 * @param integer $quality
	 * @param bool $bestFit
	 * @param bool $interlaceSchemeIsEnable 
	 *
	 * @link http://phpimagick.com/Imagick/adaptiveResizeImage
	 * @link http://blog.codinghorror.com/progressive-image-rendering/
	 */
	public function adaptiveResizeImageByWidthAndHeight($width, $height, $quality = 100, $bestFit = true, $interlaceSchemeIsEnable = false);

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

	/**
	 * Add progressive image rendering.
	 * We added this layer, after @see Library\Image\Optimization\PNGQuant
	 * @param int $quality
	 */	
	public function addProgressiveRenderingForPNG();

	/**
	 * Save image to file system and destroy @see Imagick object.
	 * @param int $quality
	 */		
	public function saveImageToFileSystem($imagePath);
}