<?php
namespace app\models;

class Block
{
    /**
     * @param $probBlock array A map
     * @param $respBlock array A map
     * @return integer The correctness score of the response.
     */
    public static function getScore($probBlock, $respBlock)
    {
        $sum = 0;
        for($i = 0; $i < count($probBlock->problems); $i++) {
            $prob = $probBlock->problems[$i];
            switch($prob->type) {
                case Ls::typeId: $sum += Ls::getScore($probBlock->problems[$i]->letters, $respBlock[$i]->response); break;
                case Eq::typeId: $sum += Eq::getScore($probBlock->problems[$i]->equation, $respBlock[$i]->response); break;
                case Sq::typeId: $sum += Sq::getScore($probBlock->problems[$i]->squares, $respBlock[$i]->response); break;    
                case Sy::typeId: $sum += Sy::getScore($probBlock->problems[$i]->symmetry, $respBlock[$i]->response); break;
                case EqLs::typeId: $sum += Ls::getScore($probBlock->problems[$i]->letters, $respBlock[$i]->letters->response); break;
                case SySq::typeId: $sum += Sq::getScore($probBlock->problems[$i]->squares, $respBlock[$i]->squares->response); break;
            }
        }
        return $sum;
    }

    /**
     * @see Block::getScore()
     */
    public static function getStrictScore($probBlock, $respBlock)
    {
        $sum = 0;
        for($i = 0; $i < count($probBlock->problems); $i++) {
            $prob = $probBlock->problems[$i];
            switch($prob->type) {
                case Ls::typeId: $sum += Ls::getStrictScore($probBlock->problems[$i]->letters, $respBlock[$i]->response); break;
                case Eq::typeId: $sum += Eq::getScore($probBlock->problems[$i]->equation, $respBlock[$i]->response); break;
                case Sq::typeId: $sum += Sq::getStrictScore($probBlock->problems[$i]->squares, $respBlock[$i]->response); break;
                case Sy::typeId: $sum += Sy::getScore($probBlock->problems[$i]->symmetry, $respBlock[$i]->response); break;
                case EqLs::typeId: $sum += Ls::getStrictScore($probBlock->problems[$i]->letters, $respBlock[$i]->letters->response); break;
                case SySq::typeId: $sum += Sq::getStrictScore($probBlock->problems[$i]->squares, $respBlock[$i]->squares->response); break;
            }
        }
        return $sum; 
    }

    /**
     * Gets the total number of correct math responses.
     */
    public static function getOspanAcc($probBlock, $respBlock)
    {
        $sum = 0;
        for($i = 0; $i < count($probBlock->problems); $i++) {
            $prob = $probBlock->problems[$i];
            if($prob->type != EqLs::typeId)
                continue;
            $sum += EqLs::getAcc($prob, $respBlock[$i]);
        }
        return $sum;
    }

    /**
     * Gets the total number of math questions of all EqLs problems in the block.
     * Each problem could contain multiple math questions.
     */
    public static function getOspanLength($probBlock)
    {
        $sum = 0;
        for($i = 0; $i < count($probBlock->problems); $i++) {
            $prob = $probBlock->problems[$i];
            if($prob->type === EqLs::typeId)
                $sum += count($prob->equations);
        }
        return $sum;
    }

    public static function getSspanAcc($probBlock, $respBlock)
    {
        $sum = 0;
        for($i = 0; $i < count($probBlock->problems); $i++) {
            $prob = $probBlock->problems[$i];
            if($prob->type != SySq::typeId)
                continue;
            $sum += SySq::getAcc($prob, $respBlock[$i]);
        }
        return $sum;
    }

    public static function getSspanLength($probBlock)
    {
        $sum = 0;
        for($i = 0; $i < count($probBlock->problems); $i++) {
            $prob = $probBlock->problems[$i];
            if($prob->type === SySq::typeId)
                $sum += count($prob->symmetries);
        }
        return $sum;
    }
}