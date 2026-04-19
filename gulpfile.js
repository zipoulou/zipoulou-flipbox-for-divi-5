const { src, dest } = require('gulp');
const pkg = require('./package.json');

const files = [
    '**/*',
    '!**/.*',        // hidden files at any level
    '!**/.*/**',     // contents of hidden dirs
    '!**/__*/**',
    '!**/node_modules/**',
    '!src/**',
    '!**/*.zip',
    '!**/*.map',
    '!deploy.sh',
    '!gulpfile.js',
    '!package.json',
    '!package-lock.json',
    '!tsconfig.json',
    '!webpack.config.js',
    '!composer.json',
    '!composer.lock',
];

const zip = async () => {
    const gulpZip = (await import('gulp-zip')).default;
    return src(files)
        .pipe(gulpZip(pkg.name + '-v' + pkg.version + '.zip'))
        .pipe(dest('./'));
};

exports.zip = zip;
