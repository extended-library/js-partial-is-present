'use strict';

const gulp     = require(`gulp`),
      mocha    = require(`gulp-mocha`),
      coverage = require(`gulp-istanbul`),
      sequence = require(`gulp-sequence`),
      lint     = require(`gulp-eslint`),
      debug    = require(`gulp-debug`),
      vars     = require(`../../../../tests/variables`);

const sourceName = 'js-partial-is-present';

gulp.task(
    `tasks/test.src`,
    () => {
        vars.path = `../src/${sourceName}.js`;

        return gulp
            .src(
                `../../tests/tests.js`,
                {
                    read : false
                }
            )
            .pipe(
                mocha({
                    ui : `exports`
                })
            );
    }
);

gulp.task(
    `tasks/test.dist.development`,
    () => {
        vars.path = `../dist/${sourceName}.js`;

        return gulp
            .src(
                `../../tests/tests.js`,
                {
                    read : false
                }
            )
            .pipe(
                mocha({
                    ui : `exports`
                })
            );
    }
);

gulp.task(
    `tasks/test.dist.production`,
    () => {
        vars.path = `../dist/${sourceName}.min.js`;

        return gulp
            .src(
                `../../tests/tests.js`,
                {
                    read : false
                }
            )
            .pipe(
                mocha({
                    ui : `exports`
                })
            );
    }
);

gulp.task(
    `tasks/test.init-cov`,
    () => {
        return gulp
            .src(`../../src/**/*.js`)
            .pipe(coverage())
            .pipe(coverage.hookRequire());
    }
);

gulp.task(
    `tasks/test.with-cov`,
    [
      `tasks/test.init-cov`
    ],
    () => {
        vars.path = `../src/${sourceName}.js`;

        return gulp
            .src(
                `../../tests/tests.js`,
                {
                    read : false
                }
            )
            .pipe(
                mocha({
                    ui : `exports`
                })
            )
            .pipe(
                coverage.writeReports({
                    dir : `../../cov`
                })
            )
            .pipe(
                coverage.enforceThresholds({
                    thresholds : {
                        global : 100 // enforce 100% coverage
                    }
                }
            ));
    }
);

gulp.task(
    `tasks/test.with-lint`,
    [
        `tasks/test.src`
    ],
    () => {
        return gulp
            .src(`../../src/**/*.js`)
            .pipe(lint())
            .pipe(lint.format())
            .pipe(lint.failAfterError());
    }
);

gulp.task(
    `tasks/test.dist`,
    (cb) => {
        sequence(
            `tasks/test.dist.development`,
            `tasks/test.dist.production`
        )(cb);
    }
);

gulp.task(
    `tasks/test`,
    (cb) => {
        sequence(
            `tasks/test.src`,
            `tasks/test.with-cov`,
            `tasks/test.with-lint`,
            `tasks/test.dist`
        )(cb);
    }
);
