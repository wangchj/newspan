<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "Responses".
 *
 * @property integer $responseId
 * @property integer $taskId
 * @property integer $partId
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
            [['taskId', 'partId', 'datetime', 'json', 'score'], 'required'],
            [['taskId', 'partId', 'score'], 'integer'],
            [['datetime', 'json'], 'string']
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
            'partId' => 'Part ID',
            'datetime' => 'Datetime',
            'json' => 'Json',
            'score' => 'Score'
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getParticipant()
    {
        return $this->hasOne(Participant::className(), ['partId' => 'partId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTask()
    {
        return $this->hasOne(Task::className(), ['taskId' => 'taskId']);
    }
}
