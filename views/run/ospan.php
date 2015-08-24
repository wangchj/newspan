<?php
use yii\helpers\Url;

/* @var $this yii\web\View */
$this->title = '';
?>
<link href="<?=Yii::getAlias('@web/css/comp/ls.css')?>" rel="stylesheet">

<script type="text/x-mathjax-config">
    MathJax.Hub.Config({
        showProcessingMessages: false,
        tex2jax: {inlineMath: [['`','`']]}
    });
</script>

<script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=AM_HTMLorMML"></script>

<div class="container">
    <div id="comp" style="margin-top:50px; text-align:center"></div>
</div>

<?php $this->beginBlock('TheEnd');?>
    <script type="text/javascript">
        var saveUrl = '<?=Url::to(['run/save'])?>';
    </script>
    <script type="text/jsx" src="<?=Yii::getAlias('@web')?>/js/comp/generic.js"></script>
    <script type="text/jsx" src="<?=Yii::getAlias('@web')?>/js/comp/ls.js"></script>
    <script type="text/jsx" src="<?=Yii::getAlias('@web')?>/js/comp/eq.js"></script>
    <script type="text/jsx" src="<?=Yii::getAlias('@web')?>/js/comp/eqls.js"></script>
    <script type="text/jsx" src="<?=Yii::getAlias('@web')?>/js/comp/run/ospan.js"></script>
    <script type="text/jsx">
        var blocks = <?=$task->json?>;
        React.render(<OSpan taskId={<?=$task->taskId?>} blocks={blocks}/>, document.getElementById('comp'));
    </script>
<?php $this->endBlock();?>