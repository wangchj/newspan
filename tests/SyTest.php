<?php
namespace app\tests;

require_once(__DIR__ . '/../models/Util.php');
require_once(__DIR__ . '/../models/Sy.php');

use app\models\Util;
use app\models\Sy;

class SyTest extends \PHPUnit_Framework_TestCase
{
    public function testIsSymmetric()
    {
        $this->assertTrue(Sy::isSymmetric([]));
        $this->assertFalse(Sy::isSymmetric([[0,0],[7,1]]));
        $this->assertTrue(Sy::isSymmetric([[0,0],[7,0]]));
        $this->assertTrue(Sy::isSymmetric([[0,0],[7,0],[1,1],[6,1]]));
        $this->assertTrue(Sy::isSymmetric([[0,0],[7,0],[1,1],[6,1],[0,7],[7,7]]));
    }
}