<?php
namespace app\assets;

use yii\web\AssetBundle;

class CreateTaskAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';
    public $css = [
        'css/bootplus.css'
    ];
    public $js = [
        'https://fb.me/react-0.13.3.js',
        'https://fb.me/JSXTransformer-0.13.3.js',
        'js/models.js'
    ];
    public $depends = [
        'app\assets\AppAsset'
    ];
}
