<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "Responses".
 *
 * @property integer $responseId
 * @property integer $taskId
 * @property string $workerId
 * @property integer $qualId
 * @property string $datetime
 * @property string $json
 * @property integer $score
 *
 * @property Participant $participant
 * @property Task $task
 */
class Response extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'Responses';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['taskId', 'workerId', 'qualId', 'datetime', 'json', 'score'], 'required'],
            [['taskId', 'qualId', 'score'], 'integer'],
            [['workerId', 'datetime', 'json'], 'string']
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'responseId' => 'Response ID',
            'taskId' => 'Task ID',
            'workerId' => 'Worker ID',
            'qualId' => 'Qualtrics ID',
            'datetime' => 'Datetime',
            'json' => 'Json',
            'score' => 'Score'
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getWorker()
    {
        return $this->hasOne(Participant::className(), ['workerId' => 'workerId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTask()
    {
        return $this->hasOne(Task::className(), ['taskId' => 'taskId']);
    }
}
