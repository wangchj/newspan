<?php
use yii\helpers\Url;
use yii\grid\GridView;

/* @var $this yii\web\View */
$this->title = 'Participants';
?>

<h1>Participants <button type="button" id="btn-filter" class="btn btn-default" style="float:right; display:inline"><span class="glyphicon glyphicon-tasks"></span></button></h1>

<?= GridView::widget([
    'dataProvider' => $dataProvider,
    'filterModel' => $partIndexView,
    'columns' => [
        'partId',
        'respCount'
    ],
    'layout'=>'{items}{pager}',
    'tableOptions'=>['class'=>'table table-hover'],
    'filterRowOptions'=>['style'=>($partIndexView->hasParam() ? 'display:table-row' : 'display:none')]
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