<?php

namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use app\models\Participant;
use app\models\PartIndexView;

class ParticipantsController extends Controller
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
        $partIndexView = new PartIndexView();
        $dataProvider = $partIndexView->search(Yii::$app->request->queryParams);

        return $this->render('index', [
            'partIndexView' => $partIndexView,
            'dataProvider' => $dataProvider,
        ]);
    }
}
