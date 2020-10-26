var project_folder = require("path").basename(__dirname) + "-project",
	source_folder = "#src",
	path = {
		src: {
			html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
			pug: source_folder + "/pug/*.pug",
			css: [source_folder + "/scss/*.scss", "!" + source_folder + "/scss/_*.scss"],
			js: [source_folder + "/js/script.js", "!" + source_folder + "/js/_*.js"],
			img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
			fonts: source_folder + "/fonts/*.ttf",
		},
		build: {
			html: project_folder + "/",
			css: project_folder + "/css/",
			js: project_folder + "/js/",
			img: project_folder + "/img/",
			fonts: project_folder + "/fonts/",
		},
		watch: {
			html: source_folder + "/**/*.html",
			pug: source_folder + "/pug/*.pug",
			css: source_folder + "/scss/**/*.scss",
			js: source_folder + "/js/**/*.js",
			img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
		},
		clean: ["./" + project_folder + "/", source_folder + '/pug/comp/']
	};

let { src, dest } = require("gulp"),
	gulp = require("gulp"),
	browsersync = require("browser-sync").create(),
	fileinclude = require("gulp-file-include"),
	del = require("del"),
	scss = require("gulp-sass"),
	autoprefixer = require("gulp-autoprefixer"),
	group_media = require("gulp-group-css-media-queries"),
	clean_css = require("gulp-clean-css"),
	rename = require("gulp-rename"),
	uglify = require("gulp-uglify-es").default,
	imagemin = require("gulp-imagemin"),
	webp = require("gulp-webp"),
	webphtml = require("gulp-webp-html"),
	ttf2woff = require("gulp-ttf2woff"),
	ttf2woff2 = require("gulp-ttf2woff2"),
	fonter = require("gulp-fonter"),
	pug = require('gulp-pug'),
	prettyHtml = require('gulp-pretty-html'),
	babel = require('gulp-babel');

function browserSync(params) {
	browsersync.init({
		server: {
			baseDir: "./" + project_folder
		},
		port: 3000,
		notify: false
	})
}
function pug2html() {
	return src(path.src.pug)
		.pipe(pug({
			pretty: '\t'
		}))
		.pipe(dest(source_folder + '/pug/comp/'))
}
function html() {
	return src(path.src.html)
		.pipe(fileinclude({
		}))
		.pipe(webphtml())
		.pipe(prettyHtml())
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream())
}
function css() {
	return src(path.src.css)
		.pipe(
			scss({
				outputStyle: "expanded"
			})
		)
		.pipe(
			group_media()
		)
		.pipe(
			autoprefixer({
				overrideBrowserslist: ["last 5 version"],
				cascade: true
			})
		)
		.pipe(dest(path.build.css))
		.pipe(clean_css())
		.pipe(
			rename({
				extname: ".min.css"
			})
		)
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream())
}
function js() {
	return src(path.src.js)
		.pipe(fileinclude())
		.pipe(babel({
            presets: ['@babel/env']
        }))
		.pipe(dest(path.build.js))
		.pipe(
			uglify()
		)
		.pipe(
			rename({
				extname: ".min.js"
			})
		)
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream())
}
function img() {
	return src(path.src.img)
		.pipe(
			webp({
				quality: 70
			})
		)
		.pipe(dest(path.build.img))
		.pipe(src(path.src.img))
		.pipe(
			imagemin({
				progressive: true,
				svgoPlugins: [{ removeViewBox: false }],
				interlaced: true,
				optmizationLevel: 3
			})
		)
		.pipe(dest(path.build.img))
		.pipe(browsersync.stream())
}
function fonts() {
	src(path.src.fonts)
		.pipe(ttf2woff())
		.pipe(dest(path.build.fonts));
	return src(path.src.fonts)
		.pipe(ttf2woff2())
		.pipe(dest(path.build.fonts));
}
gulp.task('otf2ttf', function () {
	return gulp.src([source_folder + '/fonts/*otf'])
		.pipe(fonter({
			formats: ['ttf']
		}))
		.pipe(dest(source_folder + '/fonts/'));
});
function fontsStyle(params) {
	let file_content = fs.readFileSync(source_folder + '/scss/fonts.scss');
	if (file_content == '') {
		fs.writeFile(source_folder + '/scss/fonts.scss', '', cb);
		return fs.readdir(path.build.fonts, function (err, items) {
			if (items) {
				let c_fontname;
				for (var i = 0; i < items.length; i++) {
					let fontname = items[i].split('.');
					fontname = fontname[0];
					if (c_fontname != fontname) {
						fs.appendFile(source_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
					}
					c_fontname = fontname;
				}
			}
		})
	}
}
function watchfile(params) {
	gulp.watch([path.watch.pug], pug2html);
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.css], css);
	gulp.watch([path.watch.js], js);
	gulp.watch([path.watch.img], img);
}
function clean(params) {
	return del(path.clean);
}

let build = gulp.series(clean, pug2html, gulp.parallel(html, css, js, img, fonts)),
	watch = gulp.parallel(build, watchfile, browserSync);

exports.default = watch;