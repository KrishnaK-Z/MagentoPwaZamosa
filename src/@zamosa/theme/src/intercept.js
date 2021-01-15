const moduleOverridePlugin = require('./moduleOverrideWebpackPlugin');
const componentOverrideMapping = require('./componentOverrideMapping');

module.exports = targets => {
    targets.of('@magento/pwa-buildpack').specialFeatures.tap(flags => {
        /**
         *  Wee need to actived esModules and cssModules to allow build pack to load our extension
         * {@link https://magento.github.io/pwa-studio/pwa-buildpack/reference/configure-webpack/#special-flags}.
         */
        flags[targets.name] = {esModules: true, cssModules: true};
    });

    targets.of('@magento/pwa-buildpack').webpackCompiler.tap(compiler => {
        // registers our own overwrite plugin for webpack
        new moduleOverridePlugin(componentOverrideMapping).apply(compiler);
    });

    targets.of("@magento/venia-ui").routes.tap(routes => {
        routes.push({
            name: "MyGreetingRoute",
            pattern: "/greeting",
            path: '@zamosa/theme/src/lib/components/TopBar'
        });
    });
}
