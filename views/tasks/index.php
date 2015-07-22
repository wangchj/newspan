<?php
/* @var $this yii\web\View */
$this->title = 'Mission Control';
?>

<h1>Tasks</h1>

<table class="table">
    <tr>
        <th>Name</th>
        <th>Created Date</th>
    </tr>
    <?php foreach($tasks as $task): ?>
        <tr>
            <td>$task->name</td>
            <td>$task->createdDate</td>
        </tr>
    <?php endforeach;?>
</table>