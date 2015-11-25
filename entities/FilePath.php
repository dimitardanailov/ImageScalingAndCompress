<?php 

namespace Entities;

/**
 * @author dimitar.danailov@mentormate.com
 */
class FilePath {
	public $path; // Full folder path.
	public $filename;
	public $browserPath;

	public function	__construct($path, $filename) {
		$this->path = $path;
		$this->filename = $filename;

		$this->browserPath = str_replace(ProjectRootFolder . '/', null, $this->path);
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

	/*** browserPath ***/
	public function getBrowserPath() {
		return $this->browserPath;
	}

	public function setBrowserPath($browserPath) {
		$this->browserPath = $browserPath;
	}
	/*** browserPath ***/

	/**
	 * Generate full path to image.
	 * Create a concatenation between path and filename.
	 */
	public function getFullPath() {
		return $this->getPath() . $this->getFileName();
	}


}