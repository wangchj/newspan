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
        $session = Yii::$app->session;
        if(!$lang = $session->get('lang')) {
            return $this->redirect(['lang', 'taskId'=>$taskId]);
        }
        else {
            $task = Task::findOne($taskId);
            return $this->render('index', ['task'=>$task, 'lang'=>$lang]);
        }
    }

    public function actionLang($taskId) {
        if($lang = Yii::$app->request->post('lang')) {
            $session = Yii::$app->session->set('lang', $lang);
            return $this->redirect(['index', 'taskId'=>$taskId]);
        }
        else {
            return $this->render('lang', ['taskId'=>$taskId]);
        }
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
