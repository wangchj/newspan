<?php
use yii\helpers\Url;
use yii\grid\GridView;
use app\models\Block;

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
            <th>Worker ID</th>
            <th>Task Name</th>
            <th>Lang</th>
            <th>Date and Time</th>
            <th>OS</th>
            <th>OSS</th>
            <th>OA</th>
            <th>SS</th>
            <th>SSS</th>
            <th>SA</th>
            <th>T</th>
            <th>TS</th>
            <th>Max</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach($resps as $resp):?>
            <?php 
                $taskJson = json_decode($resp->task->json);
                $respJson = json_decode($resp->json);
                if(!isWm($taskJson))
                    continue;
                $os = getOs($taskJson, $respJson);
                $oss = getOss($taskJson, $respJson);
                $oa = getOa($taskJson, $respJson);
                $ss = getSs($taskJson, $respJson);
                $sss = getSss($taskJson, $respJson);
                $sa = getSa($taskJson, $respJson);
            ?>

            <tr data-key=<?=$resp->responseId?>>
                <td><?=$resp->responseId?></td>
                <td><?=$resp->workerId?></td>
                <td><?=$resp->task->name?></td>
                <td><?=$resp->lang?></td>
                <td><?=(new DateTime($resp->datetime))->format("M j, Y g:i A")?></td>
                <td><?=$os?></td>
                <td><?=$oss?></td>
                <td><?=$oa?></td>
                <td><?=$ss?></td>
                <td><?=$sss?></td>
                <td><?=$sa?></td>
                <td><?=$resp->score?></td>
                <td><?=$oss + $sss?></td>
                <td><?=$resp->task->maxScore?></td>
            </tr>
        <?php endforeach;?>
    </tbody>
</table>

<hr />
    <table>
        <tr><td><b>OS</b></td><td>&nbsp;&nbsp;&nbsp;&nbsp;</td><td>OSpan Score</td></tr>
        <tr><td><b>OSS</b></td><td> </td><td>OSpan Strict Score</td></tr>
        <tr><td><b>OA</b></td><td> </td><td>OSpan Accuracy</td></tr>
        <tr><td><b>SS</b></td><td> </td><td>SSpan Score</td></tr>
        <tr><td><b>SSS</b></td><td> </td><td>SSpan Strict Score</td></tr>
        <tr><td><b>SA</b></td><td> </td><td>SSpan Accuracy</td></tr>
        <tr><td><b>T</b></td><td> </td><td>Total</td></tr>
        <tr><td><b>TS</b></td><td> </td><td>Strict Total</td></tr>
        <tr><td><b>Max</b></td><td> </td><td>Max Possible Score</td></tr>
    </table>
<?php
function isWm($taskJson) {
    if(count($taskJson->blocks) != 10)
        return false;
    return true;
}

function getOs($taskJson, $respJson) {
    return Block::getScore($taskJson->blocks[3], $respJson[3]) +
        Block::getScore($taskJson->blocks[4], $respJson[4]);
}

function getOss($taskJson, $respJson) {
    return Block::getStrictScore($taskJson->blocks[3], $respJson[3]) +
        Block::getStrictScore($taskJson->blocks[4], $respJson[4]);
}

function getOa($taskJson, $respJson) {
    return
    (
        Block::getAccScore($taskJson->blocks[3], $respJson[3]) +
        Block::getAccScore($taskJson->blocks[4], $respJson[4])
    ) /
    (
        Block::getAccLength($taskJson->blocks[3]) +
        Block::getAccLength($taskJson->blocks[4])
    );
}

function getSs($taskJson, $respJson) {
    return Block::getScore($taskJson->blocks[8], $respJson[8]) +
        Block::getScore($taskJson->blocks[9], $respJson[9]);
}

function getSss($taskJson, $respJson) {
    return Block::getStrictScore($taskJson->blocks[8], $respJson[8]) +
        Block::getStrictScore($taskJson->blocks[9], $respJson[9]);
}

function getSa($taskJson, $respJson) {
    return
    (
        Block::getAccScore($taskJson->blocks[8], $respJson[8]) +
        Block::getAccScore($taskJson->blocks[9], $respJson[9])
    ) /
    (
        Block::getAccLength($taskJson->blocks[8]) +
        Block::getAccLength($taskJson->blocks[9])
    );
}

?>

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
