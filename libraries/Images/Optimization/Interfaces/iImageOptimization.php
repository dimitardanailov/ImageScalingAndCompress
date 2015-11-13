<?php

namespace Library\Image\Optimization\Interfaces;

interface iImageOptimization {
        
        
	public function storeCompressImage($savePath);
	public function compress();
}