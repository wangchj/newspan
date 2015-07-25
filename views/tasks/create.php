<?php
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

<form>
    <div class="form-group">
        <label for="taskName">Task Name</label>
        <input class="form-control"/>
    </div>
</form>

<div id="comp"></div>

<?php $this->beginBlock('TheEnd');?>
    <script type="text/javascript">var taskType = '<?=$type?>';</script>
    <script type="text/jsx" src="<?=Yii::getAlias('@web')?>/js/comp/create-task.js"></script>
<?php $this->endBlock();?>
