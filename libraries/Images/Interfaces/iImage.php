<?php

namespace Library\Image\Interfaces;

use Entities\FilePath;

interface iIMage {

    public function getImage();
    public function setImage(FilePath $image);
    public static function getImageMaxSizeInBytes();
}