<?php 

require 'entities/ImageLoader.php';

use Entities\ImageLoader;

$ImageLoader = new ImageLoader();

$selectedImage = current($images);

if (isset($_GET['imagepath'])) {
	$selectedImage = $_GET['imagepath'];
}

?>

<html>

	<head>
		<title>JPEG optimization</title>
	</head>

	<body>
		<div>
			<form accept="jpg-optimization.php">

				<input type="range" name="quality" min="0" value="" value="100" />

				<img src="images/jpg/<?php //echo $selectedImage; ?>" />
			</form>
			

		</div>		
	</body>

</html>