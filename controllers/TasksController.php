<?php

namespace app\controllers;

use \DateTime;
use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use app\models\Task;

class TasksController extends Controller
{
    public $layout = 'control';
    
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'rules' => [
                    [
                        //'actions' => ['index'],
                        'allow' => true,
                        'roles' => ['@'],
                    ]
                ]
            ]
        ];
    }

    public function actionIndex()
    {
        $tasks = Task::find()->all();

        return $this->render('index', ['tasks'=>$tasks]);
    }

    public function actionCreate($type)
    {
        return $this->render('create', ['type'=>$type]);
    }

    /**
     * Ajax task save.
     */
    public function actionSave()
    {
        $s = urldecode(Yii::$app->request->rawBody);
        $p1 = strpos($s, '&task=');
        $p2 = strpos($s, '&maxScore=');

        $name = substr($s, 5, $p1 - 5);
        $json = substr($s, $p1 + 6, $p2 - $p1 - 6);
        $msco = substr($s, $p2 + 10);
        
        $task = new Task();
        $task->name = $name;
        $task->json = $json;
        $task->maxScore = $msco;
        $task->createTime = (new DateTime())->format('c');
        $task->save();
    }

    public function actionView($taskId)
    {
        $task = Task::findOne($taskId);
        return $this->render('view', ['task'=>$task]);
    }
}
