<?php
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

<h1>Tasks <button type="button" id="btn-filter" class="btn btn-default" style="float:right; display:inline"><span class="glyphicon glyphicon-tasks"></span></button></h1>

<?= GridView::widget([
    'dataProvider' => $dataProvider,
    'filterModel' => $tasksIndexView,
    'columns' => [
        ['label'=>'#', 'attribute'=>'taskId'],
        'name:ntext',
        'createTime:datetime',
        ['attribute'=>'respCount'],
    ],
    'layout'=>'{items}{pager}',
    'tableOptions'=>['class'=>'table table-hover'],
    'filterRowOptions'=>['style'=>($tasksIndexView->hasParam() ? 'display:table-row' : 'display:none')]
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

            $('#btn-filter').click(function(event) {
                if($('#w0-filters').css('display') == 'table-row')
                    $('#w0-filters').css('display', 'none');
                else
                    $('#w0-filters').css('display', 'table-row');
            });
        });
    </script>
<?php $this->endBlock();?>