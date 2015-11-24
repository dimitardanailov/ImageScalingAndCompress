<?php
namespace MVC\Helper\Interfaces;

use Entities\FilePath;

/**
 *
 * @author dimitar.danailov@mentormate.com
 */
interface iFileUploadHelper {
	
	/**
	 * We create directory if you directory, not exist in file system.
	 * If you directory exist: fuction return true.
	 * If you directory can be created: fuction return true.
	 * If you directory can't be created: We return false.
	 */
	public static function checkFolderExistAndCreateDirectory($directory);

	/**
	 * Try to generate filename.
	 * 1) We try to get from $_REQUEST name of file.
	 * 2) We try to get from $_FILES name of file.
	 * 3) If you file name not exist we should to generate random name. 
	 */
	public static function generateFileName();

	/**
	 * We delete all temp files 
	 * 
	 */
	public static function cleanupOldChunkFiles($directory, $maxFileAge);

	public static function isValidImage();
}