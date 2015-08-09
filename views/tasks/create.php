<?php
use yii\helpers\Url;
use yii\web\View;
use app\assets\CreateTaskAsset;

/* @var $this yii\web\View */

$this->title = 'New Task';

CreateTaskAsset::register($this);
?>

<h1><?=$this->title?></h1>


<div id="comp"></div>

<?php $this->beginBlock('TheEnd');?>
    <script type="text/javascript">
        var taskType = '<?=$type?>';
        var taskSaveUrl = '<?=Url::to(['tasks/save'])?>';
        var taskIndexUrl = '<?=Url::to(['tasks/index'], true)?>';
    </script>
    <script type="text/jsx" src="<?=Yii::getAlias('@web')?>/js/comp/sq.js"></script>
    <script type="text/jsx" src="<?=Yii::getAlias('@web')?>/js/comp/sy.js"></script>
    <script type="text/javascript" src="<?=Yii::getAlias('@web')?>/js/task-template.js"></script>
    <script type="text/jsx" src="<?=Yii::getAlias('@web')?>/js/comp/create-task.js"></script>
    <script type="text/jsx">
        React.render(<CreateTask />, document.getElementById('comp'));
    </script>
<?php $this->endBlock();?>
