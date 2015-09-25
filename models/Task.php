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

    /**
     * @param $task object Json decoded object.
     * @param $resp object Json decoded object.
     */
    public static function getScore($task, $resp)
    {
        $sum = 0;
        for($i = 0; $i < count($task->blocks); $i++)
            if(!$task->blocks[$i]->practice)
                $sum += Block::getScore($task->blocks[$i], $resp[$i]);
        return $sum;
    }

    /**
     * @see Task::getScore()
     */
    public static function getStrictScore($task, $resp)
    {
        $sum = 0;
        for($i = 0; $i < count($task->blocks); $i++)
            if(!$task->blocks[$i]->practice)
                $sum += Block::getStrictScore($task->blocks[$i], $resp[$i]);
        return $sum;
    }

    public static function getAccuracy($task, $resp)
    {
        $sum = 0;
        $len = 0;
        for($i = 0; $i < count($task->blocks); $i++) {
            if(!$task->blocks[$i]->practice) {
                $sum += Block::getAccScore($task->blocks[$i], $resp[$i]);
                $len += Block::getAccLength($task->blocks[$i]);
            }
        }

        if($len == 0)
            return null;
        else
            return $sum / $len;
    }
}
