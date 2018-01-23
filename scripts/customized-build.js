/*
本模块运行react-scripts里的脚本(Create React App)
可以自定义webpack配置，通过在项目根目录创建"overrides-config.dev.js"、 "overrides-config.prod.js"

A config-overrides file should export a single function that takes a config and modifies it as necessary.

module.exports = function(webpackConfig) {
    webpackConfig.module.rules[0].use[0].options.useEslintrc = ture;
};

 */
var rewire = require('rewire');
var proxyquire = require('proxyquire');

switch(process.argv[2]) {
    //the "start" script is run during develop mode
    case 'start':
        rewireModule('react-scripts/scripts/start.js', loadCustomizer('./overrides-config.dev'));
        break;
    //the "build" script is run to produce a production bundle
    case 'build':
        rewireModule('react-scripts/scripts/build.js', loadCustomizer('./overrides-config.prod'));
        break;
    //the "test" script runs all the tests with Jestc
    case 'test':
        //load customizations from the config-overrides.testing file
        //that file should export a single function that takes a config and return a config
        let customizer = loadCustomizer('./overrides-config.testing');
        proxyquire('react-scripts/scripts/test.js', {
            //when test.js asks for '../utils/createJestConfig' it will get this instead:
            '../utils/createJestConfig': (...args) => {
                //use the existing createJestConfig function to create a config, then pass it through the customizer
                var createJestConfig = require('react-scripts/utils/createJestConfig');
                return customizer(createJestConfig(...args));
            }
        });
        break;
    default:
        console.log('customized-build only supports "start", "build", and "test" options.');
        process.exit(-1);
}

//attempt to load the given module and return null if it fails.
function loadCustomizer(module) {
    try {
        return require(module);
    } catch(e) {
        if (e.code !== "MODULE_NOT_FOUND") {
            throw e;
        }
    }

    //If the module doesn't exist return a noop that simply returns the config it's given.
    return config => config;
}

function rewireModule(modulePath, customizer) {
    //load the module with 'rewire', which allows modifying the script's internal variables.
    let defaults = rewire(modulePath);

    // Reach into the module, grab its global 'config' variable,
    // and pass it through the customizer function.
    // The customizer should *mutate* the config object, because
    // react-scripts imports the config as a `const` and we can't
    // modify that reference.
    let config = defaults.__get__('config');
    customizer(config);
}