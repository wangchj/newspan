<?php
/* @var $this yii\web\View */
$this->title = 'Participants';
?>

<h1>Participants</h1>

<table class="table">
    <thead>
        <tr>
            <th>Participant</th>
            <th>Responses</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach($parts as $part): ?>
            <tr>
                <td><?=$part->partId?></td>
                <td><?=count($part->responses)?></td>
            </tr>
        <?php endforeach;?>
    </tbody>
</table>
