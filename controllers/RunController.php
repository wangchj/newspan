<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use app\models\Task;

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
}
