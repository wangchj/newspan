<?php
use yii\helpers\Url;
use yii\grid\GridView;

/* @var $this yii\web\View */
$this->title = 'Workers';
?>

<h1>Workers <button type="button" id="btn-filter" class="btn btn-default" style="float:right; display:inline"><span class="glyphicon glyphicon-tasks"></span></button></h1>

<?= GridView::widget([
    'dataProvider' => $dataProvider,
    'filterModel' => $workIndexView,
    'columns' => [
        'workerId',
        'respCount'
    ],
    'layout'=>'{items}{pager}',
    'tableOptions'=>['class'=>'table table-hover'],
    'filterRowOptions'=>['style'=>($workIndexView->hasParam() ? 'display:table-row' : 'display:none')]
]); ?>


<?php $this->beginBlock('TheEnd');?>
    <script type="text/javascript">
        $(function(){
            $('#btn-filter').click(function(event) {
                if($('#w0-filters').css('display') == 'table-row')
                    $('#w0-filters').css('display', 'none');
                else
                    $('#w0-filters').css('display', 'table-row');
            });
        });
    </script>
<?php $this->endBlock();?>