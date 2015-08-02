<?php
use \DateTime;
use yii\helpers\Url;

/* @var $this yii\web\View */
$this->title = 'Mission Control';
?>

<h1>Tasks</h1>

<table class="table">
    <tr>
        <th>#</th>
        <th>Name</th>
        <th>Type</th>
        <th>Created Date</th>
        <th>Responses</th>
    </tr>
    <?php foreach($tasks as $task): ?>
        <tr>
            <td><?=$task->taskId?></td>
            <td><a href="<?=Url::to(['tasks/view', 'taskId'=>$task->taskId])?>"><?=$task->name?></a></td>
            <td><?=$task->type?></td>
            <td><?=(new DateTime($task->createTime))->format('Y-m-d H:i:s')?></td>
            <td><?=count($task->responses)?></td>
        </tr>
    <?php endforeach;?>
</table>