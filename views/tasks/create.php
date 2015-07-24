<?php
use yii\web\View;
use app\assets\CreateTaskAsset;

/* @var $this yii\web\View */
$this->title = 'New Task';
CreateTaskAsset::register($this);
?>

<h1>New Task</h1>

<div id="comp"></div>

<?php $this->beginBlock('TheEnd');?>
    <script type="text/javascript">var taskType = '<?=$type?>';</script>
    <script type="text/jsx" src="<?=Yii::getAlias('@web')?>/js/comp/create-task.js"></script>
<?php $this->endBlock();?>