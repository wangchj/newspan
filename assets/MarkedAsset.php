<?php
namespace app\assets;

use yii\web\AssetBundle;

class MarkedAsset extends AssetBundle
{
    public $sourcePath = '@bower/marked';
    public $js = [
        'lib/marked.js'
    ];
}
