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
        reporters: ["karma-typescript", "spec"],
        specReporter: {
            maxLogLines: 5,         // limit number of lines logged per test
            suppressErrorSummary: true,  // do not print error summary
            suppressFailed: false,  // do not print information about failed tests
            suppressPassed: false,  // do not print information about passed tests
            suppressSkipped: true,  // do not print information about skipped tests
            showSpecTiming: false // print the time elapsed for each spec
        },
        browsers: ["FirefoxHeadless", "ChromeDebugging"],
        customLaunchers: {
            'ChromeDebugging': {
                base: 'Chrome',
                flags: [
                    '--remote-debugging-port=9222',
                    '--inspect',
                    '--single-run:false'
                ],
                debug: true
            },
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
        concurrecy: Infinity
    });
};