<?php
namespace app\tests;

require_once(__DIR__ . '/../models/Ls.php');

use app\models\Ls;

class LsTest extends \PHPUnit_Framework_TestCase
{
    public function testGetScore()
    {
        //Boundary cases
        $this->assertSame(0, Ls::getScore(['A', 'B', 'C'], []));
        $this->assertSame(0, Ls::getScore([], ['A', 'B', 'C']));

        //Normal cases
        $this->assertSame(3, Ls::getScore(['A', 'B', 'C'], ['A', 'B', 'C']));
        $this->assertSame(2, Ls::getScore(['A', 'B', 'C'], ['A', 'B']));
        $this->assertSame(2, Ls::getScore(['A', 'B', 'C'], ['A', 'B', 'D']));
        $this->assertSame(3, Ls::getScore(['A', 'B', 'C'], ['A', 'B', 'C', 'D']));
        $this->assertSame(1, Ls::getScore(['A', 'B', 'C'], ['C', 'B', 'A']));
    }

    public function testGetStrictScore() {
        //Boundary cases
        $this->assertSame(0, Ls::getStrictScore(['A', 'B', 'C'], []));
        $this->assertSame(0, Ls::getStrictScore([], ['A', 'B', 'C']));

        //Normal cases
        $this->assertSame(3, Ls::getStrictScore(['A', 'B', 'C'], ['A', 'B', 'C']));
        $this->assertSame(0, Ls::getStrictScore(['A', 'B', 'C'], ['A', 'B']));
        $this->assertSame(0, Ls::getStrictScore(['A', 'B', 'C'], ['A', 'B', 'D']));
        $this->assertSame(0, Ls::getStrictScore(['A', 'B', 'C'], ['A', 'B', 'C', 'D']));
        $this->assertSame(0, Ls::getStrictScore(['A', 'B', 'C'], ['C', 'B', 'A']));
    }
}