<?php

namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use app\models\Response;

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
        $responses = Response::find()->all();
        return $this->render('index', ['responses'=>$responses]);
    }

    public function actionView($responseId)
    {
        $response = Response::findOne($responseId);
        return $this->render('view', ['response'=>$response]);
    }
}
