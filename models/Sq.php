<?php

namespace app\models;

class Sq
{
    const typeId = 'sq';
    
    /**
     * @param $squares array An array of array of length 2: [[0,0],[1,1]].
     * @param $response array An array of array of length 2.
     * @return integer The correctness score of the response.
     */
    public static function getScore($squares, $response)
    {
        $sum = 0;
        for($i = 0; $i < count($squares) && $i < count($response); $i++)
            if($squares[$i][0] === $response[$i][0] && $squares[$i][1] === $response[$i][1])
                $sum++;
        return $sum;
    }

    /**
     * @see Sq::getScore()
     */
    public static function getStrictScore($squares, $response)
    {
        if(count($squares) !== count($response))
            return 0;
        for($i = 0; $i < count($squares); $i++)
            if(!$response[$i] || $squares[$i][0] !== $response[$i][0] || $squares[$i][1] != $response[$i][1])
                return 0;
        return count($squares);
    }
}