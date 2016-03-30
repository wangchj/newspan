<?php
use yii\helpers\Url;

/* @var $this yii\web\View */
$this->title = 'Language Selection';
?>

<div id="comp" class="container" style="text-align:center; position:relative; top:50%; transform:translateY(-50%); -webkit-transform:translateY(-50%); -ms-transform:translateY(-50%)">
    <form method="post" action="<?=Url::to(['run/lang', 'taskId'=>$taskId])?>">
        <div class="row">
            <div class="col-xs-6">
                <button type="submit" name="lang" value="en" class="btn btn-default pull-right">English</button>
            </div>
            <div class="col-xs-6">
                <button type="submit" name="lang" value="es" class="btn btn-default pull-left">Español</button>
            </div>

            <input type="hidden" name="_csrf" value="<?=Yii::$app->request->getCsrfToken()?>" />
        </div>
    </form>
</div>
