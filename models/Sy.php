<?php
namespace app\models;

class Sy
{
    const typeId = 'sy';

    /**
     * Gets the mirror point.
     */
    public static function getMirror($p)
    {
        return [7 - $p[0], $p[1]];
    }

    public static function isSymmetric($array)
    {
        for($i = 0; $i < count($array); $i++)
            if(!Util::arrayHasPoint($array, self::getMirror($array[$i])))
                return false;
        return true;
    }

    public static function getScore($symmetry, $response)
    {
        if(self::isSymmetric($symmetry) == $response)
            return 1;
        return 0;
    }
}