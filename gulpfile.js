

var gulp = require("gulp");
var htmlmin = require("gulp-htmlmin");
var less = require("gulp-less");
var cssnano =require("gulp-cssnano");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var browserSync =require("browser-sync").create();


//css编译 压缩
gulp.task("style",function(){
	gulp.src("src/styles/*.less")
	    .pipe(less())
	    .pipe(cssnano())
	    .pipe(gulp.dest("dist/styles"))
	    .pipe(browserSync.reload({stream:true}));
});

//js合并 压缩

gulp.task("js",function(){
	gulp.src("src/js/*.js")
	    .pipe(concat("all.js"))
	    .pipe(uglify())
	    .pipe(gulp.dest("dist/js"))
	    .pipe(browserSync.reload({stream:true}));
});

//html压缩 去掉注释
gulp.task("html",function(){
	gulp.src("src/*.html")
	    .pipe(htmlmin({
	    	collapseWhitespace:true,
	    	removeComments:true
	    }))
	    .pipe(gulp.dest("dist"))
	    .pipe(browserSync.reload({stream:true}));
});

//图片copy到执行文件中
gulp.task("images",function(){
	gulp.src("src/images/*.*")
	    .pipe(gulp.dest("dist/images"))
	    .pipe(browserSync.reload({stream:true}));
});

//整合前四个任务 启动一个web服务（最简单的自动化工作流)

gulp.task("workflow",["style","js","html","images"],function(){
	browserSync.init({
		server:{
			baseDir:"./dist",
			index: "1.html"
		}
	});
	gulp.watch("src/styles/*.less",["style"]);
	gulp.watch("src/js/*.js",["js"]);
	gulp.watch("src/*.html",["html"]);
	gulp.watch("src/images/*.*",["images"]);
});