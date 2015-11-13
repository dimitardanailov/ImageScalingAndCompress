<?php

namespace Library\Image\Interfaces;

interface iIMage {

    public function getPathToImageFile();
    public function setPathToImageFile($imagePath);
    public static function getImageMaxSizeInBytes();
}