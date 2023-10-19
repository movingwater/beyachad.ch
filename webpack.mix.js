const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');
// const flexbugs = require('postcss-flexbugs-fixes');
const purgeCss = require('laravel-mix-purgecss');

const os = require('os');
const path = require('path');


const theme = 'beyachad';


/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */
mix
    .setPublicPath("public/assets")
    .sourceMaps()
    .js('src/js/index.js', 'public/assets')
    .sass('src/scss/index.scss', 'public/assets')
    .options({
        processCssUrls: false,
        postCss: [
            tailwindcss('tailwind.config.js')
        ],
    })
    .version()

    .webpackConfig({
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules\/(?!(dom7|swiper)\/)/,
                    use: {
                        loader: 'babel-loader',
                        options: Config.babel()
                    }
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.scss'],
            alias: {
                'plugins': __dirname + '/public/site/plugins'
            },
        }
    })

    .browserSync({
        proxy: `https://${theme}.test/`,
        // host: `${theme}.test`,
        host: 'localhost',
        files: [
            'src/**/**/*.(scss|js)',
            'public/index.php',
            'public/site/**/*.(php|css|js|scss)',
            'public/content/**/*.(md|yaml|txt)'
        ],
        port: 8080,
        https: {
            key: path.join(os.homedir(), '/.localhost-ssl/localhost.key'),
            cert: path.join(os.homedir(), '/.localhost-ssl/localhost.crt'),
        },
        xip: false,
        open: 'local',
        notify: false,
    });

if (mix.inProduction()) {

    mix
        .purgeCss({
            enabled: true,
            globs: [
                path.join(__dirname, `public/site/**/*.html`),
                path.join(__dirname, `public/site/**/*.php`),
                path.join(__dirname, `public/site/**/*.svg`),
                path.join(__dirname, 'public/assets/**/*.js'),
                path.join(__dirname, 'public/assets/**/*.css'),
            ],
            extensions: ['html', 'js', 'php', 'vue', 'svg', 'css', 'scss'],
            // whitelistPatterns: [/flex/, /mx/, /px/],
            // extractorPattern: "/[\\w-/:]+(?<!:)/g"
        })
        .version();

}

// Full API
// mix.js(src, output);
// mix.react(src, output); <-- Identical to mix.js(), but registers React Babel compilation.
// mix.preact(src, output); <-- Identical to mix.js(), but registers Preact compilation.
// mix.coffee(src, output); <-- Identical to mix.js(), but registers CoffeeScript compilation.
// mix.ts(src, output); <-- TypeScript support. Requires tsconfig.json to exist in the same folder as webpack.mix.js
// mix.extract(vendorLibs);
// mix.sass(src, output);
// mix.less(src, output);
// mix.stylus(src, output);
// mix.postCss(src, output, [require('postcss-some-plugin')()]);
// mix.combine(files, destination);
// mix.babel(files, destination); <-- Identical to mix.combine(), but also includes Babel compilation.
// mix.copy(from, to);
// mix.copyDirectory(fromDir, toDir);
// mix.minify(file);
// mix.sourceMaps(); // Enable sourcemaps
// mix.version(); // Enable versioning.
// mix.disableNotifications();
// mix.setPublicPath('path/to/public');
// mix.setResourceRoot('prefix/for/resource/locators');
// mix.autoload({}); <-- Will be passed to Webpack's ProvidePlugin.
// mix.webpackConfig({}); <-- Override webpack.config.js, without editing the file directly.
// mix.babelConfig({}); <-- Merge extra Babel configuration (plugins, etc.) with Mix's default.
// mix.then(function () {}) <-- Will be triggered each time Webpack finishes building.
// mix.dump(); <-- Dump the generated webpack config object t the console.
// mix.extend(name, handler) <-- Extend Mix's API with your own components.
// mix.options({
//   extractVueStyles: false, // Extract .vue component styling to file, rather than inline.
//   globalVueStyles: file, // Variables file to be imported in every component.
//   processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
//   purifyCss: false, // Remove unused CSS selectors.
//   terser: {}, // Terser-specific options. https://github.com/webpack-contrib/terser-webpack-plugin#options
//   postCss: [] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md
// });
