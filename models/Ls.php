<?php
namespace app\models;

class Ls
{
    const typeId = 'ls';

    /**
     * @param $letters array An array of 1 character strings.
     * @param $response array An array of 1 character strings
     * @return integer The correctness score of the response.
     */
    public static function getScore($letters, $response)
    {
        $sum = 0;
        for($i = 0; $i < count($letters) && $i < count($response); $i++)
            if($letters[$i] === $response[$i])
                $sum++;
        return $sum;
    }

    /**
     * @see Ls::getScore()
     */
    public static function getStrictScore($letters, $response)
    {
        if(count($letters) != count($response))
            return 0;

        for($i = 0; $i < count($letters); $i++)
            if($letters[$i] !== $response[$i])
                return 0;

        return count($letters);
    }
}