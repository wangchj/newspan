<?php
use yii\helpers\Url;

/* @var $this yii\web\View */
$this->title = '';
?>

<div class="container">
    <div id="comp" style="margin-top:40px; text-align:center"></div>
</div>

<?php $this->beginBlock('TheEnd');?>
    <script type="text/javascript"></script>
    <script type="text/jsx" src="<?=Yii::getAlias('@web')?>/js/comp/generic.js"></script>
    <script type="text/jsx" src="<?=Yii::getAlias('@web')?>/js/comp/sq.js"></script>
    <script type="text/jsx" src="<?=Yii::getAlias('@web')?>/js/comp/sy.js"></script>
    <script type="text/jsx" src="<?=Yii::getAlias('@web')?>/js/comp/sysq.js"></script>
    <script type="text/jsx" src="<?=Yii::getAlias('@web')?>/js/comp/run/sspan.js"></script>
    <script type="text/jsx">
        var blocks = <?=$task->json?>;
        React.render(<SSpan blocks={blocks}/>, document.getElementById('comp'));
    </script>
<?php $this->endBlock();?>