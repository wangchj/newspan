<?php

namespace app\models;

class Util
{
    public static function arrayHasPoint($array, $point) {
        if(!$array || !$point)
            return false;

        for($i = 0; $i < count($array); $i++)
            if($array[$i] && $array[$i][0] == $point[0] && $array[$i][1] == $point[1])
                return true;
        return false;
    }
}