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
 *
 * @property Responses[] $responses
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
            [['name', 'createTime', 'json'], 'required'],
            [['name', 'createTime', 'json'], 'string']
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
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getResponses()
    {
        return $this->hasMany(Responses::className(), ['taskId' => 'taskId']);
    }
}
