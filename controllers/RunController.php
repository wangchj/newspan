<?php

namespace app\controllers;

use \DateTime;
use Yii;
use yii\web\Controller;
use app\models\Task;
use app\models\Response;
use app\models\Worker;

class RunController extends Controller
{
    public $layout = 'run';

    public function actionIndex($taskId)
    {
        $task = Task::findOne($taskId);
        return $this->render('index', ['task'=>$task]);
    }

    public function actionSave()
    {
        $res = new Response();
        $res->taskId = $_POST['taskId'];
        $res->workerId = $_POST['workerId'];
        $res->qualId = $_POST['qualId'];
        $res->datetime = (new DateTime())->format('c');
        $res->json = $_POST['json'];
        $res->score = $_POST['score'];
        $res->save();

        if(!$worker = Worker::findOne($res->workerId))
        {
            $worker = new Worker();
            $worker->workerId = $res->workerId;
            $worker->save();
        }

        return $res->responseId;
    }
}
