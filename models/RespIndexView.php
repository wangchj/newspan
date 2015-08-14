<?php

namespace app\models;

use Yii;
use yii\data\ActiveDataProvider;

/**
 * This is the model class for table "RespIndexView".
 *
 * @property integer $responseId
 * @property integer $partId
 * @property string $name
 * @property string $datetime
 * @property integer $score
 * @property integer $maxScore
 * @property string $percentage
 */
class RespIndexView extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'RespIndexView';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['responseId', 'partId', 'score', 'maxScore'], 'integer'],
            [['name', 'datetime', 'percentage'], 'string']
        ];
    }

    public static function primaryKey()
    {
        return ['responseId'];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'responseId' => '#',
            'partId' => 'Participant',
            'name' => 'Task Name',
            'datetime' => 'Date and Time',
            'score' => 'Score',
            'maxScore' => 'Max',
            'percentage' => 'Percentage',
        ];
    }

    public function hasParam()
    {
        return $this->responseId != null || $this->partId != null || $this->name != null || $this->datetime != null || $this->score != null || $this->maxScore != null || $this->percentage != null;
    }

    public function search($params)
    {
        $query = RespIndexView::find();

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        $this->load($params);

        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }

        $query->andFilterWhere([
            'responseId' => $this->responseId,
            'partId' => $this->partId,
            'score' => $this->score,
            'maxScore' => $this->maxScore,
        ]);

        $query->andFilterWhere(['like', 'name', $this->name])
            ->andFilterWhere(['like', 'datetime', $this->datetime])
            ->andFilterWhere(['like', 'percentage', $this->percentage]);

        return $dataProvider;
    }
}