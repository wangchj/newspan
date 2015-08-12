<?php
use \DateTime;
use yii\helpers\Url;

/* @var $this yii\web\View */
$this->title = 'Tasks';
?>

<style>
    tbody > tr {
        cursor: pointer;
    }
</style>

<h1>Tasks</h1>

<table class="table table-hover">
    <thead>
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Created Date</th>
            <th>Responses</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach($tasks as $task): ?>
            <tr data-taskid="<?=$task->taskId?>">
                <td><?=$task->taskId?></td>
                <td><?=$task->name?></td>
                <td><?=(new DateTime($task->createTime))->format('Y-m-d H:i:s')?></td>
                <td><?=count($task->responses)?></td>
            </tr>
        <?php endforeach;?>
    </tbody>
</table>

<?php $this->beginBlock('TheEnd');?>
    <script type="text/javascript">
        var viewUrl = '<?=Url::to(['tasks/view', 'taskId'=>0])?>';
    </script>
    <script type="text/javascript">
        $(function(){
            $('tbody tr').click(function(event){
                var id = $(this).data('taskid');
                window.location.href = viewUrl.replace('0', id);
            });
        });
    </script>
<?php $this->endBlock();?>