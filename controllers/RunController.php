<?php

namespace app\controllers;

use \DateTime;
use Yii;
use yii\web\Controller;
use app\models\Task;
use app\models\Response;
use app\models\Participant;

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
        $res->partId = $_POST['partId'];
        $res->datetime = (new DateTime())->format('c');
        $res->json = $_POST['json'];
        $res->score = $_POST['score'];
        $res->save();

        if(!$part = Participant::findOne($res->partId))
        {
            $part = new Participant();
            $part->partId = $res->partId;
            $part->save();
        }
    }
}
