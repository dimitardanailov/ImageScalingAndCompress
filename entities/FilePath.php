<?php 

namespace Entities;

/**
 * @author dimitar.danailov@mentormate.com
 */
class FilePath {
	private $path;
	private $filename;

	public function	__construct($path, $filename) {
		$this->path = $path;
		$this->filename = $filename;
	}

	/*** path ***/
	public function getPath() {
		return $this->path;
	}

	public function setPath($path) {
		$this->path = $path;
	}
	/*** path ***/

	/*** filename ***/
	public function getFileName() {
		return $this->filename;
	}

	public function setFileName($filename) {
		$this->filename = $filename;
	}
	/*** filename ***/

	/**
	 * Generate full path to image.
	 * Create a concatenation between path and filename.
	 */
	public function getFullPath() {
		return $this->getPath() . $this->getFileName();
	}
}