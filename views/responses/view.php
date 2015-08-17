<?php
use yii\helpers\Url;
use yii\web\View;
use app\assets\CreateTaskAsset;

/* @var $this yii\web\View */

$this->title = 'View Response';

CreateTaskAsset::register($this);
?>

<h1>View Response</h1>

<hr/>

<div class="row">
    <div class="col-xs-4"><b>Response Number</b>: <?=$response->responseId?></div>
    <div class="col-xs-4"><b>Participant Number</b>: <?=$response->partId?></div>
    <div class="col-xs-4"><b>Time</b>: <?=(new DateTime($response->datetime))->format('Y-m-d H:i:s')?></div>
</div>

<hr/>

<div id="comp"></div>

<?php $this->beginBlock('TheEnd');?>
    <script type="text/javascript" src="<?=Yii::getAlias('@web')?>/js/comp/sq.js"></script>
    <script type="text/javascript" src="<?=Yii::getAlias('@web')?>/js/comp/sy.js"></script>
    <script type="text/javascript" src="<?=Yii::getAlias('@web')?>/js/comp/create-task.js"></script>
    <script type="text/javascript" src="<?=Yii::getAlias('@web')?>/js/comp/view-response.js"></script>
    <script type="text/javascript">
        var resp = <?=$response->json?>;
        var task = <?=$response->task->json?>;
        React.render(React.createElement(RespView, {task: task, resp: resp}), document.getElementById('comp'));
    </script>
<?php $this->endBlock();?>
