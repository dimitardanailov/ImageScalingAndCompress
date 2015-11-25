<?php

$projectRootFolder = realpath(dirname(__FILE__));
define("ProjectRootFolder", str_replace('/src', null, $projectRootFolder));

// Enums
require_once ProjectRootFolder . '/enums/ResponseStates.php';

// entities
require_once ProjectRootFolder . '/entities/FilePath.php';
require_once ProjectRootFolder . '/entities/ImageFileInfo.php';
require_once ProjectRootFolder . '/entities/JsonState.php';

// helpers
// FileUploadHelper
require_once ProjectRootFolder . '/helpers/Interfaces/iFileUploadHelper.php';
require_once ProjectRootFolder . '/helpers/FileUploadHelper.php';

// Libs
require_once ProjectRootFolder . '/libraries/Json/JsonHelper.php';

// Imagick
// ScissorImagick
require_once ProjectRootFolder . '/libraries/Images/Imagick/Interfaces/iScissorImagick.php';
require_once ProjectRootFolder . '/libraries/Images/Imagick/ScissorImagick.php';
// FileSystemImagick
require_once ProjectRootFolder. '/libraries/Images/Imagick/Interfaces/iFileSystemImagick.php';
require_once ProjectRootFolder . '/libraries/Images/Imagick/FileSystemImagick.php';

// PngQuant
require_once ProjectRootFolder . '/libraries/Images/Interfaces/iImage.php';
require_once ProjectRootFolder . '/libraries/Images/ImageBase.php';
require_once ProjectRootFolder . '/libraries/Images/PNGBase.php';
require_once ProjectRootFolder . '/libraries/Images/Optimization/Interfaces/iImageOptimization.php';
require_once ProjectRootFolder . '/libraries/Images/Optimization/PNG/PNGQuant.php';