module.exports = function (config) {
    config.set({
        frameworks: ["mocha", "chai", "karma-typescript"],
        files: ["ImageFromString/**/*.ts"],
        preprocessors: {
            "ImageFromString/**/*.ts": ["karma-typescript"]
        },
        colors: true,
        ports: 9876,
        karmaTypescriptConfig: {
            tsconfig: "./tsconfig.json"
        },
        logLevel: config.LOG_INFO,
        autoWatch: false,
        reporters: ["progress", "karma-typescript"],
        browsers: ["FirefoxHeadless"],
        customLaunchers: {
            'FirefoxHeadless': {
                base: 'Firefox',
                flags: [
                    '-headless',
                ],
                prefs: {
                    'network.proxy.type': 0
                }
            },
        },
        concurrecy: Infinity,
        singleRun: true
    });
};