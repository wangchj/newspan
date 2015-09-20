<?php
namespace app\models;

class EqLs
{
    const typeId = 'eqls';

    public static function getAcc($prob, $resp)
    {
        $sum = 0;
        for($i = 0; $i < count($prob->equations); $i++)
            if(Eq::getAnswer($prob->equations[$i]) == $resp->equations[$i]->response)
                $sum++;
        return $sum;
    }
}