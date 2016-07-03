var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');

var config = {
    path: {
        in : 'src/*.png',
        out: {
            css: 'dest/',
            img: 'dest/'
        }
    },
    name: {
        img: 'sprite.png',
        css: 'sprite.css',
        outputImg: '/img/sprite.png',
        hoverClass: '_on',
        template: 'template/template.css.handlebars'
    },
    // 各ファイルの生成ループのときに使いたい変数をここで生成する
    // _on がついているときは、:hoverのCSSを追加する
    cssVarMap: function(sprite) {
        // console.log(sprite);

        var hoverTarget = config.name.hoverClass;

        sprite.isBtnHover = false;
        sprite.isBtnHover = false;
        if ( sprite.name.indexOf(config.name.hoverClass) !== -1 ) {
            sprite.isBtnHover = true;
            sprite.nameHoverClass = sprite.name.replace(config.name.hoverClass, '');
        }

        sprite.half = {
            offset_x: (sprite.x * -0.5) + 'px',
            offset_y: (sprite.y * -0.5) + 'px',
            width: sprite.width * 0.5 + 'px',
            height: sprite.height * 0.5 + 'px',
            total_width: sprite.total_width * 0.5 + 'px',
            total_height: sprite.total_height * 0.5 + 'px'
        };
    },
    imgOpts: { quality: 100 },
    template: config.name.template,
    format: 'css'
}


gulp.task('sprite', function () {
    var spriteData = gulp.src(config.path.in) //スプライトにする愉快な画像達
        .pipe(spritesmith({
            imgName: config.name.img, //スプライトの画像
            cssName: config.name.css, //生成されるscss
            imgPath: config.name.outputImg, //生成されるscssに記載されるパス
            cssFormat: config.format, //フォーマット
            cssVarMap: config.cssVarMap,
            cssTemplate: config.template,
            imgOpts: config.imgOpts,
            cssHandlebarsHelpers: {
                half: function (num) { return num/2; }
            }
        }));
    spriteData.img.pipe(gulp.dest(config.path.out.img)); //imgNameで指定したスプライト画像の保存先
    spriteData.css.pipe(gulp.dest(config.path.out.css)); //cssNameで指定したcssの保存先
});



gulp.task('default', function() {
    gulp.run('sprite');
});
