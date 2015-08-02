<?php
use \DateTime;
use yii\helpers\Url;

/* @var $this yii\web\View */
$this->title = '';
?>

<div id="comp"></div>

<?php $this->beginBlock('TheEnd');?>
    <script type="text/javascript">
        var taskType = '<?=$type?>';
        var taskSaveUrl = '<?=Url::to(['tasks/save'])?>';
    </script>
    <script type="text/jsx" src="<?=Yii::getAlias('@web')?>/js/comp/sq.js"></script>
    <script type="text/jsx" src="<?=Yii::getAlias('@web')?>/js/comp/sy.js"></script>
    <script type="text/jsx" src="<?=Yii::getAlias('@web')?>/js/comp/create-task.js"></script>
    <script type="text/jsx">
        React.render(<CreateTask />, document.getElementById('comp'));
    </script>
<?php $this->endBlock();?>