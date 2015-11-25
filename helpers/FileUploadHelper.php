<?php
namespace MVC\Helper;

use MVC\Helper\Interfaces\iFileUploadHelper;
use Entities\FilePath;
use Entities\JsonState;
use Enums\Enum\ResponseState;

class FileUploadHelper implements iFileUploadHelper {
	
	/**
	 * {@inheritDoc}
	 */
	public static function checkFolderExistAndCreateDirectory($directory){
		// Create target dir
		if (!file_exists($directory)) {
			return @mkdir($targetDir);
		} else {
			return true;
		}
	}

	/**
	 * {@inheritDoc}
	 */
	public static function generateFileName() {
		if (isset($_REQUEST['name'])) {
			return $_REQUEST["name"];
		} elseif (isset($_FILES['file']) && isset($_FILES['file']['name'])) {
			return $_FILES['file']['name'];
		} else {
			return uniqid('file_');
		}
	}

	/**
	 * {@inheritDoc}
	 */
	public static function cleanupOldChunkFiles(FilePath $path, $maxFileAge) {
		$targetDir = $path->getPath();
		if (!is_dir($targetDir) || !$dir = opendir($targetDir)) {
			throw Exception('Failed to open directory.');
		}

		while (($file = readdir($dir)) !== false) {
			$tempFilePath = $targetDir . DIRECTORY_SEPARATOR . $file;

			// If temp file is current file proceed to the next
			if ($tempFilePath == "{$path->getFullPath()}.part") {
				continue;
			}

			// Remove temp file if it is older than the max age and is not the current file
			if (preg_match('/\.part$/', $file) && (filemtime($tempFilePath) < time() - $maxFileAge)) {
				@unlink($tempFilePath);
			}
		}

		closedir($dir);
	}

	/**
	 * {@inheritDoc}
	 */
	public static function imageFileFormatIsValid($imagePath, array $validTypes = array(IMAGETYPE_GIF, IMAGETYPE_JPEG, IMAGETYPE_PNG)) {
		if (!file_exists($imagePath)) {
			throw new Exception("File does not exist: $imagePath");
		}

		// Image file type
		$imageFileType = exif_imagetype($imagePath);

		if (in_array($imageFileType, $validTypes)) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * {@inheritDoc}
	 */
	public static function saveImageToFileSystem(FilePath $path, $FILES, $chunks = false) {
		$state = new JsonState(ResponseState::STATUS_OK, '');
		$filePath = $path->getFullPath();

		// Open temp file
		if (!$out = @fopen("{$filePath}.part", $chunks ? "ab" : "wb")) {
			$state = FileUploadHelper::getUploadImageStateByKey(ResponseState::FAILED_TO_OPEN_OUTPUT_STREAM);
		}

		if (empty($FILES) && $FILES["file"]["error"] || !is_uploaded_file($FILES["file"]["tmp_name"])) {
			$state = FileUploadHelper::getUploadImageStateByKey(ResponseState::INVALID_OPERATION);
		}	

		// Read binary input stream and append it to temp file
		if (!$in = @fopen($FILES["file"]["tmp_name"], "rb")) {
			$state = FileUploadHelper::getUploadImageStateByKey(ResponseState::FAILED_TO_OPEN_INPUT_STREAM);
		}

		// Upload image, if you information is correct.
		if ($state->getHttpCode() == ResponseState::STATUS_OK) {
			// Upload a image part.
			while ($buff = fread($in, 4096)) {
				fwrite($out, $buff);
			}

			@fclose($out);
			@fclose($in);

			// Strip the temp .part suffix off 
			rename("{$filePath}.part", $filePath);
		}

		return $state;
	}

	/**
	 * {@inheritDoc}
	 */
	public static function getUploadImageStateByKey(ResponseState $httpCode) {
		$states = FileUploadHelper::getUploadImageStates();

		foreach ($state as $states) {
			if ($state->getHttpCode() === $httpCode) {
				return $state;
			}
		}

		throw new Exception("Your http code cannot be found.");
	}

	/**
	 * {@inheritDoc}
	 */
	public static function getUploadImageStates() {
		$states = [];

		// JSON States
		array_push($states, new JsonState(ResponseState::FAILED_TO_OPEN_OUTPUT_STREAM, 'Failed to open output stream.'));
		array_push($states, new JsonState(ResponseState::INVALID_OPERATION, 'Failed to move uploaded file.'));
		array_push($states, new JsonState(ResponseState::FAILED_TO_OPEN_INPUT_STREAM, 'Failed to open input stream.'));

		return $states;
	}
}