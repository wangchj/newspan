<?php
use \DateTime;
use yii\helpers\Url;
use yii\helpers\Html;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $tasksIndexView app\models\TasksIndexView */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Tasks';
?>

<style>
    tbody > tr {
        cursor: pointer;
    }
</style>

<h1>Tasks</h1>

<?= GridView::widget([
    'dataProvider' => $dataProvider,
    'filterModel' => $tasksIndexView,
    'columns' => [
        ['label'=>'#', 'attribute'=>'taskId'],
        'name:ntext',
        'createTime:datetime',
        'respCount:integer'
    ],
    'tableOptions'=>['class'=>'table table-hover']
]);?>

<?php $this->beginBlock('TheEnd');?>
    <script type="text/javascript">
        var viewUrl = '<?=Url::to(['tasks/view', 'taskId'=>0])?>';
    </script>
    <script type="text/javascript">
        $(function(){
            $('tbody tr').click(function(event){
                var id = $(this).data('key');
                window.location.href = viewUrl.replace('0', id);
            });
        });
    </script>
<?php $this->endBlock();?>