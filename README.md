# Image scaling and compress

Tool need to provide infrastructure for building of image with optimization.  Current implement support only `.png` and `.jpeg`.

Current we support:

  - We can compress: PNG and JPEG files.
  - We can scale image.
  - We can change colors of images. We lossy image compression. (Image is processed with a “lossy” filter that eliminates some pixel data).
  - We can apply Progressive Image Rendering (http://blog.codinghorror.com/progressive-image-rendering/).

### Requirements
  - PHP version 5.5+
  - Nodejs version 4.2.2
  - Apache server or Nginx server
  - pngquant 2.+
  - ImageMagick 6.9.+

### MAC OS X Installation

#### Get Apache and PHP

Please follow instructions:

  - [Get Apache, MySQL, PHP and phpMyAdmin working on OSX 10.9 Mavericks](http://coolestguidesontheplanet.com/get-apache-mysql-php-phpmyadmin-working-osx-10-9-mavericks/)
  - [Get Apache, MySQL, PHP and phpMyAdmin working on OSX 10.10 Yosemite](http://coolestguidesontheplanet.com/get-apache-mysql-php-phpmyadmin-working-osx-10-10-yosemite/) 
  - [Get Apache, MySQL, PHP and phpMyAdmin working on OSX 10.11 El Capitan](http://coolestguidesontheplanet.com/get-apache-mysql-php-and-phpmyadmin-working-on-osx-10-11-el-capitan)

**Note**: We need only Apache and PHP (Of course the current widget support and Nginx).

#### Get Xdebug

Please follow instructions in: [Xdebug: Support; Tailored Installation Instructions](http://xdebug.org/wizard.php)

#### PngQuant

Please install this package:

```bash
brew install pngquant
```

#### Imagemagick

Please install this package: 

```bash
brew install imagemagick
```

After that we need to connect PHP and Imagemagick.

```bash
brew install imagemagick
brew install {php version}-imagick # Example for PHP 5.5: brew install php55-imagick
```

Edit `/etc/php.ini` to include imagick

```bash
extension=/usr/local/Cellar/{php version}-imagick/{version of php55-imagick}/imagick.so
```

Example:

```bash
extension = /usr/local/Cellar/php55-imagick/3.1.2_1/imagick.so
```

### Nodejs

We will use Node Version Manager for supporting of Nodejs. I prefer to use: [https://github.com/creationix/nvm](https://github.com/creationix/nvm)

```bash
# Installation of Node Version Manager
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash
```

**Note**: The script clones the nvm repository to `~/.nvm` and adds the source line to your profile (`~/.bash_profile`, `~/.zshrc` or `~/.profile`).


```bash
# Install nodejs version 4.2.2
nvm install 4.2.2
nvm use 4.2.2
```

#### Installation of project packages

We need to install `gulp`, `yargs` and ``.

```bash
npm install --global gulp
npm install yargs
npm install browserify
```

After that we need to go in project folder

```bash
cd project_folder
npm install
```

### Gulp Tasks

Please use follow commands: 

```bash
# Use this task only in development mode 
# Task will browserify necessary javascript files.
gulp default
```

```bash 
# Task will browserify necessary javascript files and minify these files.
gulp build
```

```bash
# Task will tracking for javascript changes.
gulp watch
```

### Permissions

Please execute follow commands: 

```bash
cd project_folder
mkdir images/compress/
chmod -R 777 images/compress/
```