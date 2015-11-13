<?php

namespace Library\Image\Optimization\Interfaces;
use Entities\FilePath;

interface iImageOptimization {
        
        
	public function saveCompressedImage(FilePath $filePath);
	public function compress();
}