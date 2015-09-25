<?php

namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use app\models\Response;
use app\models\RespIndexView;

class ResponsesController extends Controller
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
        $resps = Response::find()->all();

        return $this->render('index', [
            'resps' => $resps
        ]);
    }

    public function actionWm()
    {
        $resps = Response::find()->all();

        return $this->render('wm', [
            'resps' => $resps
        ]);
    }
    
    public function actionView($responseId)
    {
        $response = Response::findOne($responseId);
        return $this->render('view', ['response'=>$response]);
    }
}
