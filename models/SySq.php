<?php
namespace app\models;

class SySq
{
    const typeId = 'sysq';

    public static function getAcc($prob, $resp)
    {
        $sum = 0;
        for($i = 0; $i < count($prob->symmetries); $i++)
            if(Sy::isSymmetric($prob->symmetries[$i]) == $resp->symmetries[$i]->response)
                $sum++;
        return $sum;
    }
}