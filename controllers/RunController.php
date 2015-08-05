<?php

namespace app\controllers;

use \DateTime;
use Yii;
use yii\web\Controller;
use app\models\Task;
use app\models\Response;

class RunController extends Controller
{
    public $layout = 'run';

    public function actionIndex($taskId)
    {
        $task = Task::findOne($taskId);
        Yii::info($task->type);
        switch($task->type) {
            case 'ospan':
                return $this->render('ospan', ['task'=>$task]);
            case 'sspan':
                return $this->render('sspan', ['task'=>$task]);
            case 'rspan':
                return $this->render('rspan', ['task'=>$task]);
        }
    }

    public function actionSave()
    {
        $res = new Response();
        $res->taskId = $_POST['taskId'];
        $res->partId = $_POST['partId'];
        $res->datetime = (new DateTime())->format('c');
        $res->json = $_POST['blocks'];
        $res->save();
    }
}
