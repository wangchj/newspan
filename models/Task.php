<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "Tasks".
 *
 * @property integer $taskId
 * @property string $name
 * @property string $type
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
            [['name', 'type', 'createTime', 'json'], 'required'],
            [['name', 'type', 'createTime', 'json'], 'string']
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
            'type' => 'Type',
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
