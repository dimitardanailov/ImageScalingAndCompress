<?php
namespace MVC\Helper;

use MVC\Helper\Interfaces\iFileUploadHelper;
use Entities\FilePath;

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
		if (isset($_REQUEST["name"])) {
			return $_REQUEST["name"];
		} elseif (!isset($_FILES["name"])) {
			return $_FILES["name"];
		} else {
			return uniqid("file_");
		}
	}

	/**
	 * {@inheritDoc}
	 */
	public static function cleanupOldChunkFiles($targetDir, $maxFileAge) {
		if (!is_dir($targetDir) || !$dir = opendir($targetDir)) {
			throw Exception('Failed to open directory.');
		}

		while (($file = readdir($dir)) !== false) {
			$tmpfilePath = $targetDir . DIRECTORY_SEPARATOR . $file;

			// If temp file is current file proceed to the next
			if ($tmpfilePath == "{$filePath}.part") {
				continue;
			}

			// Remove temp file if it is older than the max age and is not the current file
			if (preg_match('/\.part$/', $file) && (filemtime($tmpfilePath) < time() - $maxFileAge)) {
				@unlink($tmpfilePath);
			}
		}

		closedir($dir);
	}
}