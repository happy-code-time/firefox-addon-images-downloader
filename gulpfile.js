const gulp = require('gulp');

const del = require('del');

const runSequence = require('gulp4-run-sequence');

const imagemin = require('gulp-imagemin');

const imageminJpegRecompress = require('imagemin-jpeg-recompress');

/**
 * Clean
 */
gulp.task('clean', function (done) {
    del.sync([
        './Distribution/**/*',
    ],
        {
            dot: true
        });
    done();
});

/**
 * Copy css files
 */
gulp.task('copy:css', function (done) {
    gulp.src([
        './Source/AppFiles/static/css/**/*'
    ])
        .pipe(gulp.dest('./Distribution/Static/css/'));
    done();
});

/**
 * Copy html files
 */
gulp.task('copy:html', function (done) {
    /**
     * Popup area
     */
    gulp.src([
        './Source/Popup/index.html'
    ])
    .pipe(gulp.dest('./Distribution/Popup/'));
    /**
     * Images area
     */
    gulp.src([
        './Source/Dashboard/index.html'
    ])
    .pipe(gulp.dest('./Distribution/Dashboard/'));
    done();
});

/**
 * Copy background script
 */
gulp.task('copy:background', function (done) {
    gulp.src([
        './Source/Background/background.js'
    ])
        .pipe(gulp.dest('./Distribution/Background/'));
    done();
});

/**
 * Copy content script
 */
gulp.task('copy:content', function (done) {
    gulp.src([
        './Source/Content/content.js'
    ])
        .pipe(gulp.dest('./Distribution/Content/'));
    done();
});

/**
 * Compress images
 */
gulp.task('compress:images', function (done) {
    gulp.src('Source/Images/**/*.{png,jpg,gif,ico}')
        .pipe(imagemin(
            [
                imagemin.gifsicle(),
                imagemin.jpegtran(),
                imagemin.optipng(),
                imagemin.svgo(),
                imageminJpegRecompress()
            ]
        ))
        .pipe(gulp.dest('Images'));
        done();
});

gulp.task('compile', function (callback) {
    runSequence(
        [
            'clean',
            'copy:css',
            'copy:html',
            'copy:background',
            'copy:content',
            'compress:images'
        ],
        callback);
});