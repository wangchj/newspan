<?php
namespace app\tests;

require_once(__DIR__ . '/../models/Eq.php');
require_once(__DIR__ . '/../models/EqLs.php');

use app\models\Eq;
use app\models\EqLs;

class EqLsTest extends \PHPUnit_Framework_TestCase
{
    public function testGetAccPerfect()
    {
        $prob = '{"id":0,"type":"eqls","letters":["V","R","L"],"equations":["(9*2)-10=8","(16/2)-5=30","(5*4)+3=23"]}';
        $resp = '{"probId":0,"letters":{"options":["R","H","C","P","X","V","L","M","D","K","F","Y"],"response":["V","R","L"],"time":4409},"equations":[{"response":true,"time":611},{"response":false,"time":546},{"response":true,"time":499}]}';
        $this->assertSame(3, EqLs::getAcc(json_decode($prob), json_decode($resp)));
    }

    public function testGetAccTypical()
    {
        $prob = '{"id":0,"type":"eqls","letters":["V","R","L"],"equations":["(9*2)-10=8","(16/2)-5=30","(5*4)+3=23"]}';
        $resp = '{"probId":0,"letters":{"options":["R","H","C","P","X","V","L","M","D","K","F","Y"],"response":["V","R","L"],"time":4409},"equations":[{"response":false,"time":611},{"response":false,"time":546},{"response":false,"time":499}]}';
        $this->assertSame(1, EqLs::getAcc(json_decode($prob), json_decode($resp)));
    }
}