let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

// mix.js('resources/assets/js/app.js', 'public/js')
//    .sass('resources/assets/sass/app.scss', 'public/css');

mix.scripts([
    // 'resources/assets/js/jquery.js',
    'resources/assets/js/coreui.js',
    'resources/assets/js/bootstrap.js',
    // 'resources/assets/js/jquery.dataTables.min.js',
    'resources/assets/js/jquery.dataTables.min.js',
    'resources/assets/js/dataTables.semanticui.min.js',
    'resources/assets/js/semantic.min.js',
    // 'resources/assets/js/dataTables.bootstrap.min.js',
    // 'resources/assets/js/pace.js',
    // 'resources/assets/js/perfect-scrollbar.js',
    // 'resources/assets/js/popper.js',
    'resources/assets/js/app.js',
], 'public/js/app.js');


mix.styles([
    'resources/assets/css/bootstrap.css',
    'resources/assets/css/coreui.css',
    // 'resources/assets/css/dataTables.bootstrap.min.css',
    'resources/assets/css/font-awesome.css',
    'resources/assets/css/dataTables.semanticui.min.css',
    'resources/assets/css/semantic.min.css',
    'resources/assets/css/toastr.min.css',
], 'public/css/app.css');