<?php

namespace app\models;

use Yii;
use yii\data\ActiveDataProvider;

/**
 * This is the model class for table "PartIndexView".
 *
 * @property integer $partId
 * @property string $respCount
 */
class PartIndexView extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'PartIndexView';
    }

    public static function primaryKey()
    {
        return ['partId'];
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['partId', 'respCount'], 'integer']
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'partId' => 'Participant',
            'respCount' => 'Responses'
        ];
    }

    public function hasParam()
    {
        return $this->partId != null || $this->respCount != null;
    }

    public function search($params)
    {
        $query = PartIndexView::find();

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
            'partId' => $this->partId,
        ]);

        $query->andFilterWhere(['like', 'respCount', $this->respCount]);

        return $dataProvider;
    }
}