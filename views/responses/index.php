<?php
use yii\helpers\Url;
use yii\grid\GridView;

/* @var $this yii\web\View */
$this->title = 'Responses';
?>

<style>
    tbody > tr {
        cursor: pointer;
    }
</style>

<h1>Responses <button type="button" id="btn-filter" class="btn btn-default" style="float:right; display:inline"><span class="glyphicon glyphicon-tasks"></span></button></h1>

<?= GridView::widget([
    'dataProvider' => $dataProvider,
    'filterModel' => $respIndexView,
    'columns' => [
        'responseId',
        'partId',
        'name',
        'datetime:datetime',
        'score',
        'maxScore',
        ['attribute'=>'percentage', 'format'=>['decimal']]
    ],
    'layout'=>'{items}{pager}',
    'tableOptions'=>['class'=>'table table-hover'],
    'filterRowOptions'=>['style'=>($respIndexView->hasParam() ? 'display:table-row' : 'display:none')]
]);?>

<?php $this->beginBlock('TheEnd');?>
    <script type="text/javascript">
        var viewUrl = '<?=Url::to(['responses/view', 'responseId'=>0])?>';
    </script>
    <script type="text/javascript" src="<?=Yii::getAlias('@web/js/views/response-index.js')?>"></script>
    <script>
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
        })
    </script>
<?php $this->endBlock();?>
