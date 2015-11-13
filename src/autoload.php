<?php

// Enums
require_once './enums/ResponseError.php';


// entities
require_once './entities/FilePath.php';

// Libs
require_once './libraries/Json/JsonHelper.php';

// Imagick
require_once './libraries/Images/Imagick/Interfaces/iScissorImagick.php';
require_once './libraries/Images/Imagick/ScissorImagick.php';

// PngQuant
require_once './libraries/Images/Interfaces/iImage.php';
require_once './libraries/Images/ImageBase.php';
require_once './libraries/Images/PNGBase.php';
require_once './libraries/Images/Optimization/Interfaces/iImageOptimization.php';
require_once './libraries/Images/Optimization/PNG/PngQuant.php';