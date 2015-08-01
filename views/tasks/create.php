<?php
use yii\helpers\Url;
use yii\web\View;
use app\assets\CreateTaskAsset;

/* @var $this yii\web\View */

switch($type) {
    case 'ospan':
        $this->title = 'New Operation Span Task';
        break;
    case 'sspan':
        $this->title = 'New Symmetry Span Task';
        break;
    case 'rspan': 
        $this->title = 'New Reading Span Task';
        break;
}

CreateTaskAsset::register($this);
?>

<h1><?=$this->title?></h1>


<div id="comp"></div>

<?php $this->beginBlock('TheEnd');?>
    <script type="text/javascript">
        var taskType = '<?=$type?>';
        var taskSaveUrl = '<?=Url::to(['tasks/save'])?>';
    </script>
    <script type="text/jsx" src="<?=Yii::getAlias('@web')?>/js/comp/sq.js"></script>
    <script type="text/jsx" src="<?=Yii::getAlias('@web')?>/js/comp/sy.js"></script>
    <script type="text/jsx" src="<?=Yii::getAlias('@web')?>/js/comp/create-task.js"></script>
<?php $this->endBlock();?>
