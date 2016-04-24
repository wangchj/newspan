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
    
    public function actionWmSumCsv() {
        $resps = Response::find()->all();

        $dateStr = (new \DateTime())->format('YmdHi');

        $response = Yii::$app->response;
        $response->format = \yii\web\Response::FORMAT_RAW;
        $response->headers->add('Content-Type', 'text/csv; charset=utf-8');
        $response->headers->add('Content-Disposition', "attachment; filename=wm_response_summary_{$dateStr}.csv");
        return $this->renderPartial('wmSumCsv', ['resps'=>$resps]);
    }

    public function actionView($responseId)
    {
        $response = Response::findOne($responseId);
        return $this->render('view', ['response'=>$response]);
    }
}
