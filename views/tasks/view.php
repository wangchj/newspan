<?php
use \DateTime;
use yii\helpers\Url;
use yii\web\View;
use app\assets\CreateTaskAsset;

/* @var $this yii\web\View */

CreateTaskAsset::register($this);
?>

<h1>Task: <?=$task->name?></h1>

<div class="row">
    <div class="col-xs-4">
        <b>Task Number:</b> <?=$task->taskId?>
    </div>
    <div class="col-xs-4">
        <b>Task Type:</b> <?=$task->type?>
    </div>
    <div class="col-xs-4">
        <b>Time Created:</b> <?=(new DateTime($task->createTime))->format('Y-m-d H:i:s')?>
    </div>
</div>

<hr/>

<div id="comp"></div>

<?php $this->beginBlock('TheEnd');?>
    <script type="text/jsx" src="<?=Yii::getAlias('@web')?>/js/comp/sq.js"></script>
    <script type="text/jsx" src="<?=Yii::getAlias('@web')?>/js/comp/sy.js"></script>
    <script type="text/jsx" src="<?=Yii::getAlias('@web')?>/js/comp/create-task.js"></script>
    <script type="text/jsx" src="<?=Yii::getAlias('@web')?>/js/comp/explode-task.js"></script>
    <script type="text/jsx">
        var blocks = <?=$task->json?>;
        React.render(<ExplodeTask blocks={blocks}/>, document.getElementById('comp'));
    </script>
<?php $this->endBlock();?>
