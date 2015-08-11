<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "Tasks".
 *
 * @property integer $taskId
 * @property string $name
 * @property string $createTime
 * @property string $json
 * @property integer maxScore
 *
 * @property Response[] $responses
 */
class Task extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'Tasks';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['name', 'createTime', 'json', 'maxScore'], 'required'],
            [['name', 'createTime', 'json'], 'string'],
            [['maxScore'], 'integer']
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
            'json' => 'Json',
            'maxScore' => 'Maximum Score'
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getResponses()
    {
        return $this->hasMany(Response::className(), ['taskId' => 'taskId']);
    }
}
