<?php
namespace app\tests;

require_once(__DIR__ . '/../models/Eq.php');

use app\models\Eq;

class EqTest extends \PHPUnit_Framework_TestCase
{
    public function testGetAnswerTrue()
    {
        $this->assertTrue(Eq::getAnswer('1+1=2'));
        $this->assertTrue(Eq::getAnswer('11+11=22'));

        $this->assertTrue(Eq::getAnswer('2-1=1'));
        $this->assertTrue(Eq::getAnswer('10-5=5'));
        
        $this->assertTrue(Eq::getAnswer('2*2=4'));
        $this->assertTrue(Eq::getAnswer('2*-2=-4'));

        $this->assertTrue(Eq::getAnswer('2/2=1'));
        $this->assertTrue(Eq::getAnswer('0/2=0'));
        $this->assertTrue(Eq::getAnswer('10/2=5'));
    }

    public function testGetAnswerFalse()
    {
        $this->assertFalse(Eq::getAnswer('11+1=22'));
        $this->assertFalse(Eq::getAnswer('1-1=22'));
        $this->assertFalse(Eq::getAnswer('1*1=2'));
        $this->assertFalse(Eq::getAnswer('10/2=2'));
    }

    public function testGetScore()
    {
        $this->assertSame(1, Eq::getScore("1+1=2", true));
        $this->assertSame(0, Eq::getScore("1+1=2", false));
        $this->assertSame(1, Eq::getScore("10+20=30", true));
        $this->assertSame(1, Eq::getScore("10+20=300", false));

        $this->assertSame(1, Eq::getScore("1-1=0", true));
        $this->assertSame(1, Eq::getScore("1-1=2", false));
        $this->assertSame(1, Eq::getScore("10-20=-10", true));
        $this->assertSame(0, Eq::getScore("10-20=300", true));

        $this->assertSame(1, Eq::getScore("1*1=1", true));
        $this->assertSame(1, Eq::getScore("2*2=2", false));
        $this->assertSame(0, Eq::getScore("10*20=-10", true));
        $this->assertSame(0, Eq::getScore("10*20=300", true));

        $this->assertSame(1, Eq::getScore("1/1=1", true));
        $this->assertSame(1, Eq::getScore("2/2=2", false));
        $this->assertSame(0, Eq::getScore("20/10=-10", true));
        $this->assertSame(0, Eq::getScore("200/2=100", false));

    }
}