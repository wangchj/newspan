<?php
namespace app\models\json;

use app\models\Block;

class WmScorer
{
    /** Object converted from task JSON. */
    private $taskJson = null;

    /** Object converted from response JSON. */
    private $respJson = null;

    /**
     * @param $response object An app\models\Response object
     */
    public function __construct($response) {
        $this->respJson = json_decode($response->json);
        $this->taskJson = json_decode($response->task->json);
    }

    /**
     * Checks if this task is standard 100 points WM task.
     *
     * This method should be called before calling other methods in this class. Most of the methods in this class
     * depends on the task being in 100 points format.
     */
    public function isWm() {
        if(count($this->taskJson->blocks) != 10)
            return false;
        return true;
    }


    public function getOspanScore() {
        return Block::getScore($this->taskJson->blocks[3], $this->respJson[3]) +
            Block::getScore($this->taskJson->blocks[4], $this->respJson[4]);
    }

    public function getOspanStrictScore() {
        return Block::getStrictScore($this->taskJson->blocks[3], $this->respJson[3]) +
            Block::getStrictScore($this->taskJson->blocks[4], $this->respJson[4]);
    }

    public function getOspanAccuracy() {
        return
        (
            Block::getAccScore($this->taskJson->blocks[3], $this->respJson[3]) +
            Block::getAccScore($this->taskJson->blocks[4], $this->respJson[4])
        ) /
        (
            Block::getAccLength($this->taskJson->blocks[3]) +
            Block::getAccLength($this->taskJson->blocks[4])
        );
    }

    public function getSspanScore() {
        return Block::getScore($this->taskJson->blocks[8], $this->respJson[8]) +
            Block::getScore($this->taskJson->blocks[9], $this->respJson[9]);
    }

    public function getSspanStrictScore() {
        return Block::getStrictScore($this->taskJson->blocks[8], $this->respJson[8]) +
            Block::getStrictScore($this->taskJson->blocks[9], $this->respJson[9]);
    }

    public function getSspanAccuracy() {
        return
        (
            Block::getAccScore($this->taskJson->blocks[8], $this->respJson[8]) +
            Block::getAccScore($this->taskJson->blocks[9], $this->respJson[9])
        ) /
        (
            Block::getAccLength($this->taskJson->blocks[8]) +
            Block::getAccLength($this->taskJson->blocks[9])
        );
    }
}