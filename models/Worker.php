<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "Workers".
 *
 * @property string $workerId
 *
 * @property Response[] $responses
 */
class Worker extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'Workers';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'workerId' => 'Participant',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getResponses()
    {
        return $this->hasMany(Response::className(), ['workerId' => 'workerId']);
    }
}