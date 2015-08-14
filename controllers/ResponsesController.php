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
        $respIndexView = new RespIndexView();
        $dataProvider = $respIndexView->search(Yii::$app->request->queryParams);

        return $this->render('index', [
            'respIndexView' => $respIndexView,
            'dataProvider' => $dataProvider,
        ]);
    }

    public function actionView($responseId)
    {
        $response = Response::findOne($responseId);
        return $this->render('view', ['response'=>$response]);
    }
}
