<?php
use yii\helpers\Html;
use yii\helpers\Url;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use app\assets\AppAsset;

/* @var $this \yii\web\View */
/* @var $content string */

AppAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
</head>
<body>

<?php $this->beginBody() ?>
    <div class="wrap">
        <nav id="w0" class="navbar navbar-fixed-top navbar-inverse" role="navigation">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#w0-collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="<?=Url::to(['control/index'])?>">Mission Control</a>
                </div>
                <div id="w0-collapse" class="collapse navbar-collapse">
                    <?php $controller = Yii::$app->controller?>
                    <ul id="w1" class="navbar-nav nav">
                        <li class="dropdown<?=$controller->id === 'tasks' ? ' active' : ''?>">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Tasks <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="<?=Url::to(['tasks/index'])?>">Tasks List</a></li>
                                <li><a href="<?=Url::to(['tasks/create'])?>">New Task</a></li>
                            </ul>
                        </li>
                        <li class="<?=$controller->id === 'responses' ? 'active' : ''?>"><a href="<?=Url::to(['responses/index'])?>">Responses</a></li>
                        <li class="<?=$controller->id === 'participants' ? 'active' : ''?>"><a href="<?=Url::to(['participants/index'])?>">Participants</a></li>
                        <li>
                            <?php if(Yii::$app->user->isGuest):?>
                                <a href="<?=Url::to(['site/login'])?>">Login</a>
                            <?php else:?>
                                <a href="<?=Url::to(['site/logout'])?>" data-method="post">Logout</a>
                            <?php endif;?>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <div class="container">
            <?= Breadcrumbs::widget([
                'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
            ]) ?>
            <?= $content ?>
        </div>
    </div>

    <footer class="footer">
        <div class="container">
            <p class="pull-left">&copy; Newspan <?= date('Y') ?></p>
        </div>
    </footer>

<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
