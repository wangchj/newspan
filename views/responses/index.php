<?php
/* @var $this yii\web\View */
$this->title = 'Responses';
?>

<h1>Responses</h1>

<table class="table">
    <tr>
        <th>#</th>
        <th>Task Name</th>
        <th>Task Type</th>
        <th>Participant</th>
        <th>Date and Time</th>
    </tr>
    <?php foreach($responses as $response): ?>
        <tr>
            <td><?=$response->responseId?></td>
            <td><?=$response->task->name?></td>
            <td><?=$response->task->type?></td>
            <td><?=$response->partId?></td>
            <td><?=(new DateTime($response->datetime))->format('Y-m-d H:i:s')?></td>
        </tr>
    <?php endforeach;?>
</table>
