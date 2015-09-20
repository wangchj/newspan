<?php
namespace app\models;

class Eq
{
    const typeId = 'eq';
    /**
     * @param $equation string The equation string.
     */
    public static function getAnswer($equation)
    {
        $p = strpos($equation, '=');
        $lhs = 'return ' . substr($equation, 0, $p) . ';';
        $rhs = substr($equation, $p + 1);
        $res = eval($lhs);
        return $res == $rhs;
    }

    public static function getScore($equation, $response)
    {
        if(self::getAnswer($equation) == $response)
            return 1;
        return 0;
    }
}