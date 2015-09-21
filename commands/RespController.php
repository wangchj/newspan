<?php
namespace app\commands;

use yii\console\Controller;
use app\models\Task;
use app\models\Response;

class RespController extends Controller
{
    public function actionRescore()
    {
        $resps = Response::find()->all();
        foreach($resps as $resp) {
            $taskJson = json_decode($resp->task->json);
            $respJson = json_decode($resp->json);
            $score = Task::getScore($taskJson, $respJson) . "\n";
            if($resp->score != $score) {
                $resp->score = $score;
                $resp->save();
            }
        }

        return 0;
    }
}