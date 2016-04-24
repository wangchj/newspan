<?php
use yii\helpers\Url;
use app\models\json\WmScorer;

echo '#,Worker ID,Task Name,Language,Date and Time,OSPAN Score,OSPAN Strict Score,OSPAN Accuracy,';
echo 'SSPAN Score,SSPAN Strict Score,SSPAN Accuracy,Total,Strict Total,Maximum Score,url';
echo "\n";

foreach($resps as $resp) {
    $scorer = new WmScorer($resp);
    
    if(!$scorer->isWm())
        continue;

    $os = $scorer->getOspanScore();
    $oss = $scorer->getOspanStrictScore();
    $oa = $scorer->getOspanAccuracy();
    $ss = $scorer->getSspanScore();
    $sss = $scorer->getSspanStrictScore();
    $sa = $scorer->getSspanAccuracy();
    $date = (new DateTime($resp->datetime))->format("c");

    echo "$resp->responseId,$resp->workerId,{$resp->task->name},$resp->lang,$date,$os,$oss,$oa,$ss,$sss,$sa,";
    echo $resp->score; echo ',';
    echo $oss + $sss;  echo ',';
    echo $resp->task->maxScore; echo ',';
    echo Url::to(['responses/view', 'responseId'=>$resp->responseId], true);

    if($resp->responseId != $resps[count($resps) - 1]->responseId)
        echo "\n";
}