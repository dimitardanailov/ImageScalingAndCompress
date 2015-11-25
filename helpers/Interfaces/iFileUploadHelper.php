<?php
namespace MVC\Helper\Interfaces;

use Entities\FilePath;
use Enums\Enum\ResponseState;

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
     *
	 * @param string directory
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
	 * We try to iterate chunk files.
	 * If you chunk file filemtime is less than from (current time - $maxFileAge), we should to delete this file.
	 * 
	 * @param FilePath $path
     * @param integer $maxFileAge Temp file age in seconds
	 */
	public static function cleanupOldChunkFiles(FilePath $path, $maxFileAge);

	/**
	 * We validate image file format.
	 * 
	 * We need to pass with valid image file types.
	 * All available image formats can be found: @link http://php.net/manual/en/function.exif-imagetype.php 
	 * 
	 * @param $imagePath
	 * @param array $validTypes Default available image formats are: GIF, JPEG, PNG. 
	 * @return bool
	 */
	public static function imageFileFormatIsValid($imagePath, array $validTypes = array(IMAGETYPE_GIF, IMAGETYPE_JPEG, IMAGETYPE_PNG));

	/**
	 * We try to upload image using input - output stream.
	 *
	 * @param FilePath $path
	 * @param Array $FILES - reference to $_FILES
	 * @param bool $chunks
	 */
	public static function saveImageToFileSystem(FilePath $path, $FILES, $chunks = false);

	/**
	 * Try to find images states by httpcode.
	 * If you $httpocode is available method will return exception.
	 * 
	 * @param ResponseState $httpCode
	 */
	public static function getUploadImageStateByKey(ResponseState $httpCode);
	
	/**
	 * We have three available states 
	 * 1) We can't open the output stream. Http code is equal to ResponseState::FAILED_TO_OPEN_OUTPUT_STREAM.
	 * 2) File have error or file can't be uploaded. Http code is equal to ResponseState::INVALID_OPERATION.
	 * 3) We can't open the input stream. Http code is equal to ResponseState::FAILED_TO_OPEN_INPUT_STREAM.
	 */
	public static function getUploadImageStates();
}