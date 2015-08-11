<?php
use yii\helpers\Url;

/* @var $this yii\web\View */
$this->title = 'Responses';
?>

<style>
    tbody > tr {
        cursor: pointer;
    }
</style>

<h1>Responses</h1>

<table class="table table-hover">
    <thead>
        <tr>
            <th>#</th>
            <th>Participant</th>
            <th>Task Name</th>
            <th>Date and Time</th>
            <th>Score</th>
            <th>Percentage</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach($responses as $response): ?>
            <tr data-responseId="<?=$response->responseId?>">
                <td><?=$response->responseId?></td>
                <td><?=$response->partId?></td>
                <td><?=$response->task->name?></td>
                <td><?=(new DateTime($response->datetime))->format('Y-m-d H:i:s')?></td>
                <td><?=$response->score?> / <?=$response->task->maxScore?></td>
                <td><?=round($response->score / $response->task->maxScore, 2)?></td>
            </tr>
        <?php endforeach;?>
    </tbody>
</table>

<?php $this->beginBlock('TheEnd');?>
    <script type="text/javascript">
        var viewUrl = '<?=Url::to(['responses/view', 'responseId'=>0])?>';
    </script>
    <script type="text/javascript" src="<?=Yii::getAlias('@web/js/views/response-index.js')?>"></script>
<?php $this->endBlock();?>
