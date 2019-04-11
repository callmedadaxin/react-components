const gulp = require("gulp");
const babel = require("gulp-babel");
const sass = require("gulp-sass");
const inline = require("gulp-inline");
const clean = require("del");
const vinylPaths = require("vinyl-paths");

/* eslint-disable */
gulp.task("clean", () => {
  return clean(["lib", "es"]);
});

// 复制less模块到es
gulp.task("sassToLib", () => {
  return gulp.src("./src/**/*.scss").pipe(gulp.dest("./es"));
});

// 复制less模块到es
gulp.task("cssToLib", () => {
  return gulp
    .src("./src/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./es"));
});

gulp.task("imagesTolib", () => {
  return gulp.src("./src/**/*.svg").pipe(gulp.dest("./es/"));
});

gulp.task("cleanCss", () => {
  return gulp.src("./es/styles/assets/*.css").pipe(vinylPaths(clean));
});

// babel 打包成支持es6模块的语法
// 配置modules: false，保留es6模块化语法
gulp.task(
  "es",
  gulp.series(
    "clean",
    () => {
      return gulp
        .src("./src/**/*.js")
        .pipe(
          babel({
            babelrc: false,
            presets: [
              ["@babel/preset-env", { modules: false }],
              "@babel/preset-react"
            ],
            plugins: [
              "@babel/plugin-proposal-object-rest-spread",
              ["@babel/plugin-proposal-decorators", { legacy: true }],
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-transform-classes"
            ]
          })
        )
        .pipe(gulp.dest("./es"));
    },
    "sassToLib",
    "cssToLib",
    "imagesTolib",
    "cleanCss"
  )
);

// // 发布打包
// gulp.task(
//   "lib",
//   gulp.series(
//     "clean",
//     () => {
//       return gulp
//         .src("./src/**/*.js")
//         .pipe(babel())
//         .pipe(gulp.dest("./lib"));
//     },
//     "lessToLib"
//   )
// );
