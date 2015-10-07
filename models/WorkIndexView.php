<?php

namespace app\models;

use Yii;
use yii\data\ActiveDataProvider;

/**
 * This is the model class for table "WorkIndexView".
 *
 * @property integer $workerId
 * @property string $respCount
 */
class WorkIndexView extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'WorkIndexView';
    }

    public static function primaryKey()
    {
        return ['workerId'];
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['workerId'], 'string'],
            [['respCount'], 'integer']
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'workerId' => 'Participant',
            'respCount' => 'Responses'
        ];
    }

    public function hasParam()
    {
        return $this->workerId != null || $this->respCount != null;
    }

    public function search($params)
    {
        $query = WorkIndexView::find();

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        $this->load($params);

        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }

        // $query->andFilterWhere([
        //     'workerId' => $this->workerId,
        // ]);

        $query->andFilterWhere(['like', 'respCount', $this->respCount])
            ->andFilterWhere(['like', 'workerId', $this->workerId]);

        return $dataProvider;
    }
}