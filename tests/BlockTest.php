<?php
namespace app\tests;

require_once(__DIR__ . '/../models/Block.php');
require_once(__DIR__ . '/../models/Eq.php');
require_once(__DIR__ . '/../models/Ls.php');
require_once(__DIR__ . '/../models/EqLs.php');
require_once(__DIR__ . '/../models/Sy.php');
require_once(__DIR__ . '/../models/Sq.php');
require_once(__DIR__ . '/../models/SySq.php');

use app\models\Block;

class BlockTest extends \PHPUnit_Framework_TestCase
{
    public function testGetScoreLsBlockFullScore()
    {
        $taskJson = '{"blocks":[{"practice":false,"problems":[{"id":0,"type":"ls","letters":["A","B","C"]},{"id":1,"type":"ls","letters":["A","B","C","D"]}]}],"instructs":[],"struct":[{"type":"block","id":0}]}';
        $respJson = '[[{"probId":0,"options":["J","F","P","K","C","G","B","H","A","W","Q","L"],"response":["A","B","C"],"time":3288},{"probId":1,"options":["N","Y","H","G","M","Q","D","A","P","C","B","F"],"response":["A","B","C","D"],"time":7514}]]';
        $this->assertSame(7, Block::getScore(json_decode($taskJson)->blocks[0], json_decode($respJson)[0]));
    }

    public function testGetScoreLsBlockTypical()
    {
        $taskJson = '{"blocks":[{"practice":false,"problems":[{"id":0,"type":"ls","letters":["A","B","C"]},{"id":1,"type":"ls","letters":["A","B","C","D"]}]}],"instructs":[],"struct":[{"type":"block","id":0}]}';
        $respJson = '[[{"probId":0,"options":["J","F","P","K","C","G","B","H","A","W","Q","L"],"response":["A","B","C"],"time":3288},{"probId":1,"options":["N","Y","H","G","M","Q","D","A","P","C","B","F"],"response":["A","B","C","G"],"time":7514}]]';
        $this->assertSame(6, Block::getScore(json_decode($taskJson)->blocks[0], json_decode($respJson)[0]));
    }

    public function testGetScoreEqLsBlockFullScore()
    {
        $taskJson = '{"blocks":[{"practice":false,"problems":[{"id":0,"type":"eqls","letters":["V","R","L"],"equations":["(9*2)-10=8","(16/2)-5=30","(5*4)+3=23"]},{"id":1,"type":"eqls","letters":["Y","L","K","P"],"equations":["(25*2)-10=20","(4*1)+6=10","(4*5)+5=15","(10/5)+5=7"]}]}],"instructs":[{"text":"Welcome. The task you will be completing today involves two things: remembering letters and solving simple math problems. First, you will practice each part before you begin the task. Please read the instructions carefully so you know how to do the task.\n\nPlease click the CONTINUE button to begin","next":"Continue"}],"struct":[{"type":"inst","id":0},{"type":"block","id":0}]}';
        $respJson = '[[{"probId":0,"letters":{"options":["R","H","C","P","X","V","L","M","D","K","F","Y"],"response":["V","R","L"],"time":4409},"equations":[{"response":false,"time":611},{"response":false,"time":546},{"response":false,"time":499}]},{"probId":1,"letters":{"options":["L","X","N","K","W","P","F","C","Y","S","B","J"],"response":["Y","L","K","P"],"time":5293},"equations":[{"response":false,"time":638},{"response":false,"time":361},{"response":false,"time":392},{"response":false,"time":584}]}]]';
        $this->assertSame(7, Block::getScore(json_decode($taskJson)->blocks[0], json_decode($respJson)[0]));
    }

    public function testGetScoreEqLsBlockEmptyResponse()
    {
        $taskJson = '{"blocks":[{"practice":false,"problems":[{"id":0,"type":"eqls","letters":["V","R","L"],"equations":["(9*2)-10=8","(16/2)-5=30","(5*4)+3=23"]},{"id":1,"type":"eqls","letters":["Y","L","K","P"],"equations":["(25*2)-10=20","(4*1)+6=10","(4*5)+5=15","(10/5)+5=7"]}]}],"instructs":[{"text":"Welcome. The task you will be completing today involves two things: remembering letters and solving simple math problems. First, you will practice each part before you begin the task. Please read the instructions carefully so you know how to do the task.\n\nPlease click the CONTINUE button to begin","next":"Continue"}],"struct":[{"type":"inst","id":0},{"type":"block","id":0}]}';
        $respJson = '[[{"probId":0,"letters":{"options":["R","H","C","P","X","V","L","M","D","K","F","Y"],"response":[],"time":4409},"equations":[{"response":false,"time":611},{"response":false,"time":546},{"response":false,"time":499}]},{"probId":1,"letters":{"options":["L","X","N","K","W","P","F","C","Y","S","B","J"],"response":[],"time":5293},"equations":[{"response":false,"time":638},{"response":false,"time":361},{"response":false,"time":392},{"response":false,"time":584}]}]]';
        $this->assertSame(0, Block::getScore(json_decode($taskJson)->blocks[0], json_decode($respJson)[0]));
    }

    public function testGetScoreEqLsBlockTypical()
    {
        $taskJson = '{"blocks":[{"practice":false,"problems":[{"id":0,"type":"eqls","letters":["V","R","L"],"equations":["(9*2)-10=8","(16/2)-5=30","(5*4)+3=23"]},{"id":1,"type":"eqls","letters":["Y","L","K","P"],"equations":["(25*2)-10=20","(4*1)+6=10","(4*5)+5=15","(10/5)+5=7"]}]}],"instructs":[{"text":"Welcome. The task you will be completing today involves two things: remembering letters and solving simple math problems. First, you will practice each part before you begin the task. Please read the instructions carefully so you know how to do the task.\n\nPlease click the CONTINUE button to begin","next":"Continue"}],"struct":[{"type":"inst","id":0},{"type":"block","id":0}]}';
        $respJson = '[[{"probId":0,"letters":{"options":["R","H","C","P","X","V","L","M","D","K","F","Y"],"response":["V","R","K"],"time":4409},"equations":[{"response":false,"time":611},{"response":false,"time":546},{"response":false,"time":499}]},{"probId":1,"letters":{"options":["L","X","N","K","W","P","F","C","Y","S","B","J"],"response":["Y","L","K","P", "D"],"time":5293},"equations":[{"response":false,"time":638},{"response":false,"time":361},{"response":false,"time":392},{"response":false,"time":584}]}]]';
        $this->assertSame(6, Block::getScore(json_decode($taskJson)->blocks[0], json_decode($respJson)[0]));
    }

    public function testGetScoreSySqBlockTypical()
    {
        $taskJson = '{"blocks":[{"practice":false,"problems":[{"id":0,"type":"sq","squares":[[0,0],[1,1],[2,2]]},{"id":1,"type":"sysq","squares":[[3,3],[2,1],[1,1]],"symmetries":[[[4,1],[5,7],[2,6],[6,7],[1,5],[5,3],[3,3],[2,0],[5,1],[7,0],[3,1],[7,4],[3,0],[7,2],[3,6],[6,6],[2,4],[0,3],[2,5],[6,0],[0,1],[5,0],[0,6],[4,2],[3,2],[1,6],[2,7],[4,7],[1,3],[0,5],[1,7],[3,5],[2,2],[7,6],[6,2],[7,5],[0,0],[4,6],[2,1],[5,5]],[[2,5],[5,5],[3,4],[4,4],[0,0],[7,0],[2,6],[5,6],[0,2],[7,2],[2,7],[5,7],[0,3],[7,3],[3,5],[4,5],[1,4],[6,4],[3,3],[4,3],[0,7],[7,7],[0,1],[7,1],[2,1],[5,1],[0,6],[7,6],[1,3],[6,3],[2,4],[5,4],[7,4],[1,5],[6,5],[3,1],[4,1],[1,2],[6,2],[1,6],[6,6],[3,7],[4,7],[6,0]],[[2,3],[5,3],[0,5],[7,5],[3,7],[4,7],[1,1],[6,1],[2,6],[5,6],[3,0],[4,0],[2,1],[5,1],[2,0],[5,0],[1,0],[6,0],[0,1],[7,1],[1,2],[3,5],[4,5],[3,6],[4,6],[2,7],[5,7],[1,7]]]}]}],"instructs":[],"struct":[{"type":"block","id":0}]}';
        $respJson = '[[{"probId":0,"response":[[0,0],[1,1],null],"time":3611},{"probId":1,"squares":{"response":[null,null,null],"time":1437},"symmetries":[{"response":false,"time":3056},{"response":false,"time":1871},{"response":false,"time":1011}]}]]';
        $this->assertSame(2, Block::getScore(json_decode($taskJson)->blocks[0], json_decode($respJson)[0]));
    }

    public function testGetStrictScoreEqLsBlockFullScore()
    {
        $taskJson = '{"blocks":[{"practice":false,"problems":[{"id":0,"type":"eqls","letters":["V","R","L"],"equations":["(9*2)-10=8","(16/2)-5=30","(5*4)+3=23"]},{"id":1,"type":"eqls","letters":["Y","L","K","P"],"equations":["(25*2)-10=20","(4*1)+6=10","(4*5)+5=15","(10/5)+5=7"]}]}],"instructs":[{"text":"Welcome. The task you will be completing today involves two things: remembering letters and solving simple math problems. First, you will practice each part before you begin the task. Please read the instructions carefully so you know how to do the task.\n\nPlease click the CONTINUE button to begin","next":"Continue"}],"struct":[{"type":"inst","id":0},{"type":"block","id":0}]}';
        $respJson = '[[{"probId":0,"letters":{"options":["R","H","C","P","X","V","L","M","D","K","F","Y"],"response":["V","R","L"],"time":4409},"equations":[{"response":false,"time":611},{"response":false,"time":546},{"response":false,"time":499}]},{"probId":1,"letters":{"options":["L","X","N","K","W","P","F","C","Y","S","B","J"],"response":["Y","L","K","P"],"time":5293},"equations":[{"response":false,"time":638},{"response":false,"time":361},{"response":false,"time":392},{"response":false,"time":584}]}]]';
        $this->assertSame(7, Block::getStrictScore(json_decode($taskJson)->blocks[0], json_decode($respJson)[0]));
    }

    public function testGetStrictScoreEqLsEmptyResponse()
    {
        $taskJson = '{"blocks":[{"practice":false,"problems":[{"id":0,"type":"eqls","letters":["V","R","L"],"equations":["(9*2)-10=8","(16/2)-5=30","(5*4)+3=23"]},{"id":1,"type":"eqls","letters":["Y","L","K","P"],"equations":["(25*2)-10=20","(4*1)+6=10","(4*5)+5=15","(10/5)+5=7"]}]}],"instructs":[{"text":"Welcome. The task you will be completing today involves two things: remembering letters and solving simple math problems. First, you will practice each part before you begin the task. Please read the instructions carefully so you know how to do the task.\n\nPlease click the CONTINUE button to begin","next":"Continue"}],"struct":[{"type":"inst","id":0},{"type":"block","id":0}]}';
        $respJson = '[[{"probId":0,"letters":{"options":["R","H","C","P","X","V","L","M","D","K","F","Y"],"response":[],"time":4409},"equations":[{"response":false,"time":611},{"response":false,"time":546},{"response":false,"time":499}]},{"probId":1,"letters":{"options":["L","X","N","K","W","P","F","C","Y","S","B","J"],"response":[],"time":5293},"equations":[{"response":false,"time":638},{"response":false,"time":361},{"response":false,"time":392},{"response":false,"time":584}]}]]';
        $this->assertSame(0, Block::getStrictScore(json_decode($taskJson)->blocks[0], json_decode($respJson)[0]));
    }

    public function testGetStrictScoreEqLsTypical()
    {
        $taskJson = '{"blocks":[{"practice":false,"problems":[{"id":0,"type":"eqls","letters":["V","R","L"],"equations":["(9*2)-10=8","(16/2)-5=30","(5*4)+3=23"]},{"id":1,"type":"eqls","letters":["Y","L","K","P"],"equations":["(25*2)-10=20","(4*1)+6=10","(4*5)+5=15","(10/5)+5=7"]}]}],"instructs":[{"text":"Welcome. The task you will be completing today involves two things: remembering letters and solving simple math problems. First, you will practice each part before you begin the task. Please read the instructions carefully so you know how to do the task.\n\nPlease click the CONTINUE button to begin","next":"Continue"}],"struct":[{"type":"inst","id":0},{"type":"block","id":0}]}';
        $respJson = '[[{"probId":0,"letters":{"options":["R","H","C","P","X","V","L","M","D","K","F","Y"],"response":["V", "R", "L"],"time":4409},"equations":[{"response":false,"time":611},{"response":false,"time":546},{"response":false,"time":499}]},{"probId":1,"letters":{"options":["L","X","N","K","W","P","F","C","Y","S","B","J"],"response":["Y", "L"],"time":5293},"equations":[{"response":false,"time":638},{"response":false,"time":361},{"response":false,"time":392},{"response":false,"time":584}]}]]';
        $this->assertSame(3, Block::getStrictScore(json_decode($taskJson)->blocks[0], json_decode($respJson)[0]));
    }

    public function testGetStrictScoreEqLsTypicalLongResponse()
    {
        $taskJson = '{"blocks":[{"practice":false,"problems":[{"id":0,"type":"eqls","letters":["V","R","L"],"equations":["(9*2)-10=8","(16/2)-5=30","(5*4)+3=23"]},{"id":1,"type":"eqls","letters":["Y","L","K","P"],"equations":["(25*2)-10=20","(4*1)+6=10","(4*5)+5=15","(10/5)+5=7"]}]}],"instructs":[{"text":"Welcome. The task you will be completing today involves two things: remembering letters and solving simple math problems. First, you will practice each part before you begin the task. Please read the instructions carefully so you know how to do the task.\n\nPlease click the CONTINUE button to begin","next":"Continue"}],"struct":[{"type":"inst","id":0},{"type":"block","id":0}]}';
        $respJson = '[[{"probId":0,"letters":{"options":["R","H","C","P","X","V","L","M","D","K","F","Y"],"response":["V", "R", "L"],"time":4409},"equations":[{"response":false,"time":611},{"response":false,"time":546},{"response":false,"time":499}]},{"probId":1,"letters":{"options":["L","X","N","K","W","P","F","C","Y","S","B","J"],"response":["Y", "L", "K", "P", "D"],"time":5293},"equations":[{"response":false,"time":638},{"response":false,"time":361},{"response":false,"time":392},{"response":false,"time":584}]}]]';
        $this->assertSame(3, Block::getStrictScore(json_decode($taskJson)->blocks[0], json_decode($respJson)[0]));
    }

    public function testGetStrictScoreSySqBlockTypical()
    {
        $taskJson = '{"blocks":[{"practice":false,"problems":[{"id":0,"type":"sq","squares":[[0,0],[1,1],[2,2]]},{"id":1,"type":"sysq","squares":[[3,3],[2,1],[1,1]],"symmetries":[[[4,1],[5,7],[2,6],[6,7],[1,5],[5,3],[3,3],[2,0],[5,1],[7,0],[3,1],[7,4],[3,0],[7,2],[3,6],[6,6],[2,4],[0,3],[2,5],[6,0],[0,1],[5,0],[0,6],[4,2],[3,2],[1,6],[2,7],[4,7],[1,3],[0,5],[1,7],[3,5],[2,2],[7,6],[6,2],[7,5],[0,0],[4,6],[2,1],[5,5]],[[2,5],[5,5],[3,4],[4,4],[0,0],[7,0],[2,6],[5,6],[0,2],[7,2],[2,7],[5,7],[0,3],[7,3],[3,5],[4,5],[1,4],[6,4],[3,3],[4,3],[0,7],[7,7],[0,1],[7,1],[2,1],[5,1],[0,6],[7,6],[1,3],[6,3],[2,4],[5,4],[7,4],[1,5],[6,5],[3,1],[4,1],[1,2],[6,2],[1,6],[6,6],[3,7],[4,7],[6,0]],[[2,3],[5,3],[0,5],[7,5],[3,7],[4,7],[1,1],[6,1],[2,6],[5,6],[3,0],[4,0],[2,1],[5,1],[2,0],[5,0],[1,0],[6,0],[0,1],[7,1],[1,2],[3,5],[4,5],[3,6],[4,6],[2,7],[5,7],[1,7]]]}]}],"instructs":[],"struct":[{"type":"block","id":0}]}';
        $respJson = '[[{"probId":0,"response":[[0,0],[1,1],[2,2]],"time":3611},{"probId":1,"squares":{"response":[[3,3],[2,1],[1,2]],"time":1437},"symmetries":[{"response":false,"time":3056},{"response":false,"time":1871},{"response":false,"time":1011}]}]]';
        $this->assertSame(3, Block::getStrictScore(json_decode($taskJson)->blocks[0], json_decode($respJson)[0]));
    }

    public function testGetStrictScoreSySqBlockEmptyResponse1()
    {
        $taskJson = '{"blocks":[{"practice":false,"problems":[{"id":0,"type":"sq","squares":[[0,0],[1,1],[2,2]]},{"id":1,"type":"sysq","squares":[[3,3],[2,1],[1,1]],"symmetries":[[[4,1],[5,7],[2,6],[6,7],[1,5],[5,3],[3,3],[2,0],[5,1],[7,0],[3,1],[7,4],[3,0],[7,2],[3,6],[6,6],[2,4],[0,3],[2,5],[6,0],[0,1],[5,0],[0,6],[4,2],[3,2],[1,6],[2,7],[4,7],[1,3],[0,5],[1,7],[3,5],[2,2],[7,6],[6,2],[7,5],[0,0],[4,6],[2,1],[5,5]],[[2,5],[5,5],[3,4],[4,4],[0,0],[7,0],[2,6],[5,6],[0,2],[7,2],[2,7],[5,7],[0,3],[7,3],[3,5],[4,5],[1,4],[6,4],[3,3],[4,3],[0,7],[7,7],[0,1],[7,1],[2,1],[5,1],[0,6],[7,6],[1,3],[6,3],[2,4],[5,4],[7,4],[1,5],[6,5],[3,1],[4,1],[1,2],[6,2],[1,6],[6,6],[3,7],[4,7],[6,0]],[[2,3],[5,3],[0,5],[7,5],[3,7],[4,7],[1,1],[6,1],[2,6],[5,6],[3,0],[4,0],[2,1],[5,1],[2,0],[5,0],[1,0],[6,0],[0,1],[7,1],[1,2],[3,5],[4,5],[3,6],[4,6],[2,7],[5,7],[1,7]]]}]}],"instructs":[],"struct":[{"type":"block","id":0}]}';
        $respJson = '[[{"probId":0,"response":[],"time":3611},{"probId":1,"squares":{"response":[[3,3],[2,1],[1,1]],"time":1437},"symmetries":[{"response":false,"time":3056},{"response":false,"time":1871},{"response":false,"time":1011}]}]]';
        $this->assertSame(3, Block::getStrictScore(json_decode($taskJson)->blocks[0], json_decode($respJson)[0]));
    }

    public function testGetStrictScoreSySqBlockEmptyResponse2()
    {
        $taskJson = '{"blocks":[{"practice":false,"problems":[{"id":0,"type":"sq","squares":[[0,0],[1,1],[2,2]]},{"id":1,"type":"sysq","squares":[[3,3],[2,1],[1,1]],"symmetries":[[[4,1],[5,7],[2,6],[6,7],[1,5],[5,3],[3,3],[2,0],[5,1],[7,0],[3,1],[7,4],[3,0],[7,2],[3,6],[6,6],[2,4],[0,3],[2,5],[6,0],[0,1],[5,0],[0,6],[4,2],[3,2],[1,6],[2,7],[4,7],[1,3],[0,5],[1,7],[3,5],[2,2],[7,6],[6,2],[7,5],[0,0],[4,6],[2,1],[5,5]],[[2,5],[5,5],[3,4],[4,4],[0,0],[7,0],[2,6],[5,6],[0,2],[7,2],[2,7],[5,7],[0,3],[7,3],[3,5],[4,5],[1,4],[6,4],[3,3],[4,3],[0,7],[7,7],[0,1],[7,1],[2,1],[5,1],[0,6],[7,6],[1,3],[6,3],[2,4],[5,4],[7,4],[1,5],[6,5],[3,1],[4,1],[1,2],[6,2],[1,6],[6,6],[3,7],[4,7],[6,0]],[[2,3],[5,3],[0,5],[7,5],[3,7],[4,7],[1,1],[6,1],[2,6],[5,6],[3,0],[4,0],[2,1],[5,1],[2,0],[5,0],[1,0],[6,0],[0,1],[7,1],[1,2],[3,5],[4,5],[3,6],[4,6],[2,7],[5,7],[1,7]]]}]}],"instructs":[],"struct":[{"type":"block","id":0}]}';
        $respJson = '[[{"probId":0,"response":[null, null],"time":3611},{"probId":1,"squares":{"response":[[3,3],[2,1],[1,1]],"time":1437},"symmetries":[{"response":false,"time":3056},{"response":false,"time":1871},{"response":false,"time":1011}]}]]';
        $this->assertSame(3, Block::getStrictScore(json_decode($taskJson)->blocks[0], json_decode($respJson)[0]));
    }

    public function testGetStrictScoreSySqBlockFullScore()
    {
        $taskJson = '{"blocks":[{"practice":false,"problems":[{"id":0,"type":"sq","squares":[[0,0],[1,1],[2,2]]},{"id":1,"type":"sysq","squares":[[3,3],[2,1],[1,1]],"symmetries":[[[4,1],[5,7],[2,6],[6,7],[1,5],[5,3],[3,3],[2,0],[5,1],[7,0],[3,1],[7,4],[3,0],[7,2],[3,6],[6,6],[2,4],[0,3],[2,5],[6,0],[0,1],[5,0],[0,6],[4,2],[3,2],[1,6],[2,7],[4,7],[1,3],[0,5],[1,7],[3,5],[2,2],[7,6],[6,2],[7,5],[0,0],[4,6],[2,1],[5,5]],[[2,5],[5,5],[3,4],[4,4],[0,0],[7,0],[2,6],[5,6],[0,2],[7,2],[2,7],[5,7],[0,3],[7,3],[3,5],[4,5],[1,4],[6,4],[3,3],[4,3],[0,7],[7,7],[0,1],[7,1],[2,1],[5,1],[0,6],[7,6],[1,3],[6,3],[2,4],[5,4],[7,4],[1,5],[6,5],[3,1],[4,1],[1,2],[6,2],[1,6],[6,6],[3,7],[4,7],[6,0]],[[2,3],[5,3],[0,5],[7,5],[3,7],[4,7],[1,1],[6,1],[2,6],[5,6],[3,0],[4,0],[2,1],[5,1],[2,0],[5,0],[1,0],[6,0],[0,1],[7,1],[1,2],[3,5],[4,5],[3,6],[4,6],[2,7],[5,7],[1,7]]]}]}],"instructs":[],"struct":[{"type":"block","id":0}]}';
        $respJson = '[[{"probId":0,"response":[[0,0],[1,1],[2,2]],"time":3611},{"probId":1,"squares":{"response":[[3,3],[2,1],[1,1]],"time":1437},"symmetries":[{"response":false,"time":3056},{"response":false,"time":1871},{"response":false,"time":1011}]}]]';
        $this->assertSame(6, Block::getStrictScore(json_decode($taskJson)->blocks[0], json_decode($respJson)[0]));
    }

    public function testGetStrictScoreSySqBlockLongResponse()
    {
        $taskJson = '{"blocks":[{"practice":false,"problems":[{"id":0,"type":"sq","squares":[[0,0],[1,1],[2,2]]},{"id":1,"type":"sysq","squares":[[3,3],[2,1],[1,1]],"symmetries":[[[4,1],[5,7],[2,6],[6,7],[1,5],[5,3],[3,3],[2,0],[5,1],[7,0],[3,1],[7,4],[3,0],[7,2],[3,6],[6,6],[2,4],[0,3],[2,5],[6,0],[0,1],[5,0],[0,6],[4,2],[3,2],[1,6],[2,7],[4,7],[1,3],[0,5],[1,7],[3,5],[2,2],[7,6],[6,2],[7,5],[0,0],[4,6],[2,1],[5,5]],[[2,5],[5,5],[3,4],[4,4],[0,0],[7,0],[2,6],[5,6],[0,2],[7,2],[2,7],[5,7],[0,3],[7,3],[3,5],[4,5],[1,4],[6,4],[3,3],[4,3],[0,7],[7,7],[0,1],[7,1],[2,1],[5,1],[0,6],[7,6],[1,3],[6,3],[2,4],[5,4],[7,4],[1,5],[6,5],[3,1],[4,1],[1,2],[6,2],[1,6],[6,6],[3,7],[4,7],[6,0]],[[2,3],[5,3],[0,5],[7,5],[3,7],[4,7],[1,1],[6,1],[2,6],[5,6],[3,0],[4,0],[2,1],[5,1],[2,0],[5,0],[1,0],[6,0],[0,1],[7,1],[1,2],[3,5],[4,5],[3,6],[4,6],[2,7],[5,7],[1,7]]]}]}],"instructs":[],"struct":[{"type":"block","id":0}]}';
        $respJson = '[[{"probId":0,"response":[[0,0],[1,1],[2,2]],"time":3611},{"probId":1,"squares":{"response":[[3,3],[2,1],[1,1],[4,5]],"time":1437},"symmetries":[{"response":false,"time":3056},{"response":false,"time":1871},{"response":false,"time":1011}]}]]';
        $this->assertSame(3, Block::getStrictScore(json_decode($taskJson)->blocks[0], json_decode($respJson)[0]));
    }

    public function testGetAccScoreOspanFullScore()
    {
        $task = '{"blocks":[{"practice":false,"problems":[{"id":0,"type":"eqls","letters":["G","W","J"],"equations":["(9*2)-10=8","(3*4)+5=30","(5*4)-3=17"]},{"id":1,"type":"eqls","letters":["D","L","T","Q"],"equations":["(25*2)-10=20","(4*1)+20=24","(4*5)+5=15","(10/5)+5=7"]}]}],"instructs":[],"struct":[{"type":"block","id":0}]}';
        $resp = '[[{"probId":0,"letters":{"options":["P","C","L","X","B","G","H","N","K","Q","J","W"],"response":["G","W","J"],"time":4826},"equations":[{"response":true,"time":4521},{"response":false,"time":2147},{"response":true,"time":2264}]},{"probId":1,"letters":{"options":["D","M","Q","F","W","G","L","K","T","J","Y","R"],"response":["D","L","T","Q"],"time":4502},"equations":[{"response":false,"time":2077},{"response":true,"time":3069},{"response":false,"time":2137},{"response":true,"time":4358}]}]]';
        $this->assertSame(7, Block::getAccScore(json_decode($task)->blocks[0], json_decode($resp)[0]));
    }

    public function testGetAccScoreOspanZeroScore()
    {
        $task = '{"blocks":[{"practice":false,"problems":[{"id":0,"type":"eqls","letters":["G","W","J"],"equations":["(9*2)-10=8","(3*4)+5=30","(5*4)-3=17"]},{"id":1,"type":"eqls","letters":["D","L","T","Q"],"equations":["(25*2)-10=20","(4*1)+20=24","(4*5)+5=15","(10/5)+5=7"]}]}],"instructs":[],"struct":[{"type":"block","id":0}]}';
        $resp = '[[{"probId":0,"letters":{"options":["P","C","L","X","B","G","H","N","K","Q","J","W"],"response":["G","W","J"],"time":4826},"equations":[{"response":false,"time":4521},{"response":true,"time":2147},{"response":false,"time":2264}]},{"probId":1,"letters":{"options":["D","M","Q","F","W","G","L","K","T","J","Y","R"],"response":["D","L","T","Q"],"time":4502},"equations":[{"response":true,"time":2077},{"response":false,"time":3069},{"response":true,"time":2137},{"response":false,"time":4358}]}]]';
        $this->assertSame(0, Block::getAccScore(json_decode($task)->blocks[0], json_decode($resp)[0]));
    }

    public function testgetAccLengthOspan()
    {
        $task = '{"blocks":[{"practice":false,"problems":[{"id":0,"type":"eqls","letters":["G","W","J"],"equations":["(9*2)-10=8","(3*4)+5=30","(5*4)-3=17"]},{"id":1,"type":"eqls","letters":["D","L","T","Q"],"equations":["(25*2)-10=20","(4*1)+20=24","(4*5)+5=15","(10/5)+5=7"]}]}],"instructs":[],"struct":[{"type":"block","id":0}]}';
        $this->assertSame(7, Block::getAccLength(json_decode($task)->blocks[0]));

        $task = '{"blocks":[{"practice":false,"problems":[{"id":0,"type":"eqls","letters":["G"],"equations":["(5*4)-3=17"]},{"id":1,"type":"eqls","letters":["D"],"equations":["(10/5)+5=7"]}]}],"instructs":[],"struct":[{"type":"block","id":0}]}';
        $this->assertSame(2, Block::getAccLength(json_decode($task)->blocks[0]));
    }

    public function testgetAccScoreSspanFullScore()
    {
        $task = '{"blocks":[{"practice":false,"problems":[{"id":0,"type":"sq","squares":[[0,0],[1,1],[2,2]]},{"id":1,"type":"sysq","squares":[[3,3],[2,1],[1,1]],"symmetries":[[[4,1],[5,7],[2,6],[6,7],[1,5],[5,3],[3,3],[2,0],[5,1],[7,0],[3,1],[7,4],[3,0],[7,2],[3,6],[6,6],[2,4],[0,3],[2,5],[6,0],[0,1],[5,0],[0,6],[4,2],[3,2],[1,6],[2,7],[4,7],[1,3],[0,5],[1,7],[3,5],[2,2],[7,6],[6,2],[7,5],[0,0],[4,6],[2,1],[5,5]],[[2,5],[5,5],[3,4],[4,4],[0,0],[7,0],[2,6],[5,6],[0,2],[7,2],[2,7],[5,7],[0,3],[7,3],[3,5],[4,5],[1,4],[6,4],[3,3],[4,3],[0,7],[7,7],[0,1],[7,1],[2,1],[5,1],[0,6],[7,6],[1,3],[6,3],[2,4],[5,4],[7,4],[1,5],[6,5],[3,1],[4,1],[1,2],[6,2],[1,6],[6,6],[3,7],[4,7],[6,0]],[[2,3],[5,3],[0,5],[7,5],[3,7],[4,7],[1,1],[6,1],[2,6],[5,6],[3,0],[4,0],[2,1],[5,1],[2,0],[5,0],[1,0],[6,0],[0,1],[7,1],[1,2],[3,5],[4,5],[3,6],[4,6],[2,7],[5,7],[1,7]]]}]}],"instructs":[],"struct":[{"type":"block","id":0}]}';
        $resp = '[[{"probId":0,"response":[[0,0],[1,1],null],"time":3611},{"probId":1,"squares":{"response":[null,null,null],"time":1437},"symmetries":[{"response":false,"time":3056},{"response":false,"time":1871},{"response":false,"time":1011}]}]]';
        $this->assertSame(3, Block::getAccScore(json_decode($task)->blocks[0], json_decode($resp)[0]));

        $task='{"blocks":[{"practice":true,"problems":[{"id":0,"type":"sysq","squares":[[0,3],[3,3]],"symmetries":[[[3,5],[4,5],[2,1],[5,1],[0,2],[7,2],[0,3],[7,3],[1,1],[6,1],[2,4],[5,4],[2,5],[5,5],[0,4],[7,4],[0,0],[7,0],[3,1],[4,1],[0,5],[7,5],[2,7],[5,7],[2,0],[5,0],[1,3],[6,3],[0,6],[7,6],[1,4],[6,4],[1,2],[6,2],[3,3],[4,3],[1,0],[6,0],[1,5],[6,5],[3,4],[4,4],[2,6],[5,6],[1,7],[6,7],[3,2],[4,2],[3,6],[4,6],[3,7],[4,7],[0,1],[7,1]],[[0,5],[7,3],[4,5],[6,3],[5,5],[2,0],[4,6],[3,3],[6,7],[3,0],[7,4],[6,2],[1,5],[5,2],[6,1],[3,1],[1,4],[6,0],[7,0],[4,7],[0,3],[4,2],[4,3],[0,7],[3,6],[7,1],[6,6],[5,4],[3,7],[4,4],[2,4],[0,6],[7,6],[4,1],[7,7],[7,5],[1,3],[0,2],[0,4],[6,5],[2,1],[3,4],[3,5],[1,1],[2,7],[6,4],[4,0],[3,2],[0,0],[5,7]]]},{"id":1,"type":"sysq","squares":[[2,1],[3,2],[0,1]],"symmetries":[[[2,7],[5,7],[2,1],[5,1],[3,4],[4,4],[1,3],[6,3],[0,5],[7,5],[2,4],[5,4],[3,1],[4,1],[0,4],[7,4],[3,7],[4,7],[2,2],[5,2],[3,0],[4,0],[3,5],[4,5],[2,0],[5,0]],[[3,6],[4,6],[0,5],[7,5],[0,4],[7,4],[3,1],[4,1],[0,2],[7,2],[2,2],[5,2],[1,3],[6,3],[3,7],[4,7],[3,3],[4,3],[3,2],[4,2],[1,5],[6,5],[1,2],[6,2],[0,6],[7,6],[2,3],[5,3],[1,6],[6,6],[0,1],[7,1],[2,0],[5,0],[3,0],[4,0],[1,0],[6,0],[3,5],[4,5],[0,7],[7,7],[2,6],[5,6],[1,1],[6,1],[2,5],[5,5],[0,0],[7,0]],[[2,0],[5,0],[1,3],[1,0],[6,0],[0,6],[7,6],[0,4],[7,4],[2,7],[5,7],[3,3],[4,3],[0,5],[7,5],[7,7],[3,5],[4,5],[3,6],[4,6],[1,7],[6,7],[2,1],[5,1],[3,1],[4,1],[0,2],[7,2],[0,3],[7,3],[3,7],[4,7],[1,2],[6,2],[2,5],[5,5],[0,1],[7,1],[1,4],[6,4],[3,2],[4,2],[1,1],[6,1],[2,3],[5,3],[0,0],[7,0],[1,5],[6,5]]]},{"id":2,"type":"sysq","squares":[[2,0],[1,2],[0,0],[3,0]],"symmetries":[[[3,7],[4,7],[0,3],[3,4],[4,4],[2,0],[5,0],[5,3],[1,7],[6,7],[3,3],[4,3],[0,2],[7,2],[0,4],[7,4],[2,5],[5,5],[3,1],[4,1],[1,1],[6,1],[1,6],[6,6],[2,7],[5,7],[3,6],[4,6],[1,4],[6,4],[1,3],[6,3],[3,2],[4,2],[0,0],[7,0],[0,7],[7,7],[2,4],[5,4],[0,5],[7,5],[0,1],[7,1],[2,1],[5,1],[2,6],[5,6],[1,5],[6,5],[1,0],[6,0],[1,2],[6,2],[0,6],[7,6],[3,0]],[[0,3],[7,3],[3,5],[4,5],[3,7],[4,7],[2,4],[5,4],[0,4],[7,4],[3,3],[4,3],[3,2],[4,2],[2,5],[5,5],[3,4],[4,4],[3,6],[4,6],[1,4],[6,4],[2,6],[5,6],[3,0],[4,0],[0,0],[7,0],[2,2],[5,2],[2,3],[5,3],[1,2],[6,2],[0,1],[7,1],[1,5],[6,5],[1,0],[6,0],[0,6],[7,6],[1,6],[6,6],[0,2],[7,2]],[[0,3],[7,3],[3,0],[4,0],[2,1],[5,1],[1,1],[6,1],[2,0],[5,0],[3,4],[4,4],[0,7],[7,7],[0,5],[7,5],[3,1],[4,1],[0,6],[7,6],[1,3],[6,3],[2,4],[5,4],[3,3],[4,3],[1,6],[6,6],[0,2],[7,2],[0,4],[7,4],[2,5],[5,5],[0,1],[7,1],[1,5],[6,5],[2,3],[5,3],[1,7],[6,7]],[[3,1],[4,1],[3,6],[4,6],[2,5],[5,5],[1,5],[6,5],[3,4],[4,4],[2,4],[5,4],[3,7],[4,7],[2,3],[5,3],[2,0],[5,0],[3,0],[4,0],[1,7],[6,7],[1,0],[6,0],[0,5],[7,5],[0,0],[7,0],[0,7],[7,7],[0,2],[7,2],[1,3],[6,3],[1,6],[6,6],[2,1],[5,1],[1,2],[6,2],[2,6],[5,6],[1,1],[6,1],[3,2],[4,2],[0,3],[7,3],[3,5],[4,5],[3,3],[4,3],[2,2],[5,2],[0,4],[0,1],[6,4]]]}]}],"instructs":[],"struct":[{"type":"block","id":0}]}';
        $resp = '[[{"probId":0,"squares":{"response":[[0,3],[3,3]],"time":1469},"symmetries":[{"response":true,"time":3330},{"response":false,"time":910}]},{"probId":1,"squares":{"response":[[2,1],[3,2],[0,1]],"time":1883},"symmetries":[{"response":true,"time":6899},{"response":true,"time":1997},{"response":false,"time":1013}]},{"probId":2,"squares":{"response":[[2,0],[1,2],[0,0],[3,0]],"time":2181},"symmetries":[{"response":false,"time":1878},{"response":true,"time":4584},{"response":true,"time":1925},{"response":false,"time":1276}]}]]';

        $this->assertSame(9, Block::getAccScore(json_decode($task)->blocks[0], json_decode($resp)[0]));
    }

    public function testGetAccScoreSspanTypical()
    {
        $task = '{"blocks":[{"practice":false,"problems":[{"id":0,"type":"sq","squares":[[0,0],[1,1],[2,2]]},{"id":1,"type":"sysq","squares":[[3,3],[2,1],[1,1]],"symmetries":[[[4,1],[5,7],[2,6],[6,7],[1,5],[5,3],[3,3],[2,0],[5,1],[7,0],[3,1],[7,4],[3,0],[7,2],[3,6],[6,6],[2,4],[0,3],[2,5],[6,0],[0,1],[5,0],[0,6],[4,2],[3,2],[1,6],[2,7],[4,7],[1,3],[0,5],[1,7],[3,5],[2,2],[7,6],[6,2],[7,5],[0,0],[4,6],[2,1],[5,5]],[[2,5],[5,5],[3,4],[4,4],[0,0],[7,0],[2,6],[5,6],[0,2],[7,2],[2,7],[5,7],[0,3],[7,3],[3,5],[4,5],[1,4],[6,4],[3,3],[4,3],[0,7],[7,7],[0,1],[7,1],[2,1],[5,1],[0,6],[7,6],[1,3],[6,3],[2,4],[5,4],[7,4],[1,5],[6,5],[3,1],[4,1],[1,2],[6,2],[1,6],[6,6],[3,7],[4,7],[6,0]],[[2,3],[5,3],[0,5],[7,5],[3,7],[4,7],[1,1],[6,1],[2,6],[5,6],[3,0],[4,0],[2,1],[5,1],[2,0],[5,0],[1,0],[6,0],[0,1],[7,1],[1,2],[3,5],[4,5],[3,6],[4,6],[2,7],[5,7],[1,7]]]}]}],"instructs":[],"struct":[{"type":"block","id":0}]}';
        $resp = '[[{"probId":0,"response":[[0,0],[1,1],null],"time":3611},{"probId":1,"squares":{"response":[null,null,null],"time":1437},"symmetries":[{"response":true,"time":3056},{"response":false,"time":1871},{"response":false,"time":1011}]}]]';
        $this->assertSame(2, Block::getAccScore(json_decode($task)->blocks[0], json_decode($resp)[0]));
    }

    public function testgetAccLengthSspan()
    {
        $task = '{"blocks":[{"practice":false,"problems":[{"id":0,"type":"sq","squares":[[0,0],[1,1],[2,2]]},{"id":1,"type":"sysq","squares":[[3,3],[2,1],[1,1]],"symmetries":[[[4,1],[5,7],[2,6],[6,7],[1,5],[5,3],[3,3],[2,0],[5,1],[7,0],[3,1],[7,4],[3,0],[7,2],[3,6],[6,6],[2,4],[0,3],[2,5],[6,0],[0,1],[5,0],[0,6],[4,2],[3,2],[1,6],[2,7],[4,7],[1,3],[0,5],[1,7],[3,5],[2,2],[7,6],[6,2],[7,5],[0,0],[4,6],[2,1],[5,5]],[[2,5],[5,5],[3,4],[4,4],[0,0],[7,0],[2,6],[5,6],[0,2],[7,2],[2,7],[5,7],[0,3],[7,3],[3,5],[4,5],[1,4],[6,4],[3,3],[4,3],[0,7],[7,7],[0,1],[7,1],[2,1],[5,1],[0,6],[7,6],[1,3],[6,3],[2,4],[5,4],[7,4],[1,5],[6,5],[3,1],[4,1],[1,2],[6,2],[1,6],[6,6],[3,7],[4,7],[6,0]],[[2,3],[5,3],[0,5],[7,5],[3,7],[4,7],[1,1],[6,1],[2,6],[5,6],[3,0],[4,0],[2,1],[5,1],[2,0],[5,0],[1,0],[6,0],[0,1],[7,1],[1,2],[3,5],[4,5],[3,6],[4,6],[2,7],[5,7],[1,7]]]}]}],"instructs":[],"struct":[{"type":"block","id":0}]}';
        $this->assertSame(3, Block::getAccLength(json_decode($task)->blocks[0]));

        $task='{"blocks":[{"practice":true,"problems":[{"id":0,"type":"sysq","squares":[[0,3],[3,3]],"symmetries":[[[3,5],[4,5],[2,1],[5,1],[0,2],[7,2],[0,3],[7,3],[1,1],[6,1],[2,4],[5,4],[2,5],[5,5],[0,4],[7,4],[0,0],[7,0],[3,1],[4,1],[0,5],[7,5],[2,7],[5,7],[2,0],[5,0],[1,3],[6,3],[0,6],[7,6],[1,4],[6,4],[1,2],[6,2],[3,3],[4,3],[1,0],[6,0],[1,5],[6,5],[3,4],[4,4],[2,6],[5,6],[1,7],[6,7],[3,2],[4,2],[3,6],[4,6],[3,7],[4,7],[0,1],[7,1]],[[0,5],[7,3],[4,5],[6,3],[5,5],[2,0],[4,6],[3,3],[6,7],[3,0],[7,4],[6,2],[1,5],[5,2],[6,1],[3,1],[1,4],[6,0],[7,0],[4,7],[0,3],[4,2],[4,3],[0,7],[3,6],[7,1],[6,6],[5,4],[3,7],[4,4],[2,4],[0,6],[7,6],[4,1],[7,7],[7,5],[1,3],[0,2],[0,4],[6,5],[2,1],[3,4],[3,5],[1,1],[2,7],[6,4],[4,0],[3,2],[0,0],[5,7]]]},{"id":1,"type":"sysq","squares":[[2,1],[3,2],[0,1]],"symmetries":[[[2,7],[5,7],[2,1],[5,1],[3,4],[4,4],[1,3],[6,3],[0,5],[7,5],[2,4],[5,4],[3,1],[4,1],[0,4],[7,4],[3,7],[4,7],[2,2],[5,2],[3,0],[4,0],[3,5],[4,5],[2,0],[5,0]],[[3,6],[4,6],[0,5],[7,5],[0,4],[7,4],[3,1],[4,1],[0,2],[7,2],[2,2],[5,2],[1,3],[6,3],[3,7],[4,7],[3,3],[4,3],[3,2],[4,2],[1,5],[6,5],[1,2],[6,2],[0,6],[7,6],[2,3],[5,3],[1,6],[6,6],[0,1],[7,1],[2,0],[5,0],[3,0],[4,0],[1,0],[6,0],[3,5],[4,5],[0,7],[7,7],[2,6],[5,6],[1,1],[6,1],[2,5],[5,5],[0,0],[7,0]],[[2,0],[5,0],[1,3],[1,0],[6,0],[0,6],[7,6],[0,4],[7,4],[2,7],[5,7],[3,3],[4,3],[0,5],[7,5],[7,7],[3,5],[4,5],[3,6],[4,6],[1,7],[6,7],[2,1],[5,1],[3,1],[4,1],[0,2],[7,2],[0,3],[7,3],[3,7],[4,7],[1,2],[6,2],[2,5],[5,5],[0,1],[7,1],[1,4],[6,4],[3,2],[4,2],[1,1],[6,1],[2,3],[5,3],[0,0],[7,0],[1,5],[6,5]]]},{"id":2,"type":"sysq","squares":[[2,0],[1,2],[0,0],[3,0]],"symmetries":[[[3,7],[4,7],[0,3],[3,4],[4,4],[2,0],[5,0],[5,3],[1,7],[6,7],[3,3],[4,3],[0,2],[7,2],[0,4],[7,4],[2,5],[5,5],[3,1],[4,1],[1,1],[6,1],[1,6],[6,6],[2,7],[5,7],[3,6],[4,6],[1,4],[6,4],[1,3],[6,3],[3,2],[4,2],[0,0],[7,0],[0,7],[7,7],[2,4],[5,4],[0,5],[7,5],[0,1],[7,1],[2,1],[5,1],[2,6],[5,6],[1,5],[6,5],[1,0],[6,0],[1,2],[6,2],[0,6],[7,6],[3,0]],[[0,3],[7,3],[3,5],[4,5],[3,7],[4,7],[2,4],[5,4],[0,4],[7,4],[3,3],[4,3],[3,2],[4,2],[2,5],[5,5],[3,4],[4,4],[3,6],[4,6],[1,4],[6,4],[2,6],[5,6],[3,0],[4,0],[0,0],[7,0],[2,2],[5,2],[2,3],[5,3],[1,2],[6,2],[0,1],[7,1],[1,5],[6,5],[1,0],[6,0],[0,6],[7,6],[1,6],[6,6],[0,2],[7,2]],[[0,3],[7,3],[3,0],[4,0],[2,1],[5,1],[1,1],[6,1],[2,0],[5,0],[3,4],[4,4],[0,7],[7,7],[0,5],[7,5],[3,1],[4,1],[0,6],[7,6],[1,3],[6,3],[2,4],[5,4],[3,3],[4,3],[1,6],[6,6],[0,2],[7,2],[0,4],[7,4],[2,5],[5,5],[0,1],[7,1],[1,5],[6,5],[2,3],[5,3],[1,7],[6,7]],[[3,1],[4,1],[3,6],[4,6],[2,5],[5,5],[1,5],[6,5],[3,4],[4,4],[2,4],[5,4],[3,7],[4,7],[2,3],[5,3],[2,0],[5,0],[3,0],[4,0],[1,7],[6,7],[1,0],[6,0],[0,5],[7,5],[0,0],[7,0],[0,7],[7,7],[0,2],[7,2],[1,3],[6,3],[1,6],[6,6],[2,1],[5,1],[1,2],[6,2],[2,6],[5,6],[1,1],[6,1],[3,2],[4,2],[0,3],[7,3],[3,5],[4,5],[3,3],[4,3],[2,2],[5,2],[0,4],[0,1],[6,4]]]}]}],"instructs":[],"struct":[{"type":"block","id":0}]}';
        
        $this->assertSame(9, Block::getAccLength(json_decode($task)->blocks[0]));
    }
}