<?php

namespace app\models;

use Yii;
use yii\data\ActiveDataProvider;
/**
 * This is the model class for table "TasksIndexView".
 *
 * @property integer $taskId
 * @property string $name
 * @property string $createTime
 * @property integer $maxScore
 * @property integer $respCount
 */
class TasksIndexView extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'TasksIndexView';
    }

    public static function primaryKey()
    {
        return ['taskId'];
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['taskId', 'maxScore', 'respCount'], 'integer'],
            [['name', 'createTime'], 'string']
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'taskId' => 'Task ID',
            'name' => 'Name',
            'createTime' => 'Create Time',
            'maxScore' => 'Max Score',
            'respCount' => 'Responses',
        ];
    }

    /**
     * Checks if any of the params contains value.
     */
    public function hasParam()
    {
        return $this->taskId || $this->name || $this->createTime || $this->maxScore || ($this->respCount != null);
    }

    public function search($params)
    {
        $query = TasksIndexView::find();

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
            'taskId' => $this->taskId,
            'maxScore' => $this->maxScore
        ]);

        $query->andFilterWhere(['like', 'name', $this->name])
            ->andFilterWhere(['like', 'createTime', $this->createTime])
            ->andFilterWhere(['like', 'respCount', $this->respCount]);

        return $dataProvider;
    }
}