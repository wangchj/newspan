<?php

namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use app\models\WorkIndexView;

class WorkersController extends Controller
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
        $workIndexView = new WorkIndexView();
        $dataProvider = $workIndexView->search(Yii::$app->request->queryParams);

        return $this->render('index', [
            'workIndexView' => $workIndexView,
            'dataProvider' => $dataProvider,
        ]);
    }
}
