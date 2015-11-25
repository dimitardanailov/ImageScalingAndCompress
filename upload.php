<?php

require_once './src/autoload.php';
require_once './controllers/ImageController.php';

use MVC\Controller\ImageController;

$ImageController = new ImageController();
$ImageController->saveImageToFileSystem();

?>