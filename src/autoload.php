<?php

// Enums
require_once './enums/ResponseError.php';


// entities
require_once './entities/FilePath.php';
require_once './entities/ImageFileInfo.php';

// Libs
require_once './libraries/Json/JsonHelper.php';

// Imagick
// ScissorImagick
require_once './libraries/Images/Imagick/Interfaces/iScissorImagick.php';
require_once './libraries/Images/Imagick/ScissorImagick.php';
// FileSystemImagick
require_once './libraries/Images/Imagick/Interfaces/iFileSystemImagick.php';
require_once './libraries/Images/Imagick/FileSystemImagick.php';

// PngQuant
require_once './libraries/Images/Interfaces/iImage.php';
require_once './libraries/Images/ImageBase.php';
require_once './libraries/Images/PNGBase.php';
require_once './libraries/Images/Optimization/Interfaces/iImageOptimization.php';
require_once './libraries/Images/Optimization/PNG/PngQuant.php';