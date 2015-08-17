<?php
use \DateTime;
use yii\helpers\Url;

/* @var $this yii\web\View */
$this->title = '';
?>

<script type="text/x-mathjax-config">
    MathJax.Hub.Config({
        showProcessingMessages: false,
        tex2jax: {inlineMath: [['`','`']]}
    });
</script>

<script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=AM_HTMLorMML"></script>

<div id="comp" class="container" style="text-align:center; position:relative; top:50%; transform:translateY(-50%)"></div>

<?php $this->beginBlock('TheEnd');?>

    <script type="text/javascript">
        var saveUrl = '<?=Url::to(['run/save'])?>';
    </script>

    <script type="text/jsx" src="<?=Yii::getAlias('@web')?>/js/comp/generic.js"></script>
    <script type="text/jsx" src="<?=Yii::getAlias('@web')?>/js/comp/ls.js"></script>
    <script type="text/jsx" src="<?=Yii::getAlias('@web')?>/js/comp/eq.js"></script>
    <script type="text/jsx" src="<?=Yii::getAlias('@web')?>/js/comp/eqls.js"></script>
    <script type="text/jsx" src="<?=Yii::getAlias('@web')?>/js/comp/sq.js"></script>
    <script type="text/jsx" src="<?=Yii::getAlias('@web')?>/js/comp/sy.js"></script>
    <script type="text/jsx" src="<?=Yii::getAlias('@web')?>/js/comp/sysq.js"></script>
    <script type="text/jsx" src="<?=Yii::getAlias('@web')?>/js/comp/runner.js"></script>

    <script type="text/jsx">
        var task = <?=$task->json?>;
        React.render(<Runner taskId={<?=$task->taskId?>} task={task}/>, document.getElementById('comp'));
    </script>

<?php $this->endBlock();?>