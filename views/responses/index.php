<?php
use yii\helpers\Url;
use yii\grid\GridView;
use app\models\Task;

/* @var $this yii\web\View */
$this->title = 'Responses';
?>

<style>
    tbody > tr {
        cursor: pointer;
    }
</style>

<h1>WM Response Report</h1>

<table class="table table-hover">
    <thead>
        <tr>
            <th>#</th>
            <th>Participant</th>
            <th>Task Name</th>
            <th>Date and Time</th>
            <th>Score</th>
            <th>Strict Score</th>
            <th>Accuracy</th>
            <th>Max</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach($resps as $resp):?>
            <?php 
                $taskJson = json_decode($resp->task->json);
                $respJson = json_decode($resp->json);
                $s = Task::getScore($taskJson, $respJson);
                $ss = Task::getStrictScore($taskJson, $respJson);
                $ac = Task::getAccuracy($taskJson, $respJson);
            ?>

            <tr data-key=<?=$resp->responseId?>>
                <td><?=$resp->responseId?></td>
                <td><?=$resp->workerId?></td>
                <td><?=$resp->task->name?></td>
                <td><?=(new DateTime($resp->datetime))->format("M j, Y g:i A")?></td>
                <td><?=$s?></td>
                <td><?=$ss?></td>
                <td><?=$ac?></td>
                <td><?=$resp->task->maxScore?></td>
            </tr>
        <?php endforeach;?>
    </tbody>
</table>

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
