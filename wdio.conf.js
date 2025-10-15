export const config = {

    // runner: 'local',
    // port: 4723,

    user: 'oauth-pp87524773-54b85',
    key: '236a775b-1728-4d9f-81d2-2937f81c737b',
    hostname: 'ondemand.us-west-1.saucelabs.com',
    port: 443,
    baseUrl: 'wd/hub',

    specs: [
        './test/specs/**/*.js'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    maxInstances: 1,

    capabilities: [
        {
            platformName: 'Android',
            'appium:app': 'storage:filename=ebacshop.aab', // The filename of the mobile app
            'appium:deviceName': 'Android GoogleAPI Emulator',
            'appium:platformVersion': '12.0',
            'appium:automationName': 'UiAutomator2',
            "appium:disableIdLocatorAutocompletion": true,
            'sauce:options': {
                build: 'appium-build-teste-ebacshop',
                name: 'Ebac Shop Android',
                deviceOrientation: 'PORTRAIT',
                appiumVersion: '2.0.0',
            },
        },

        //     {
        //     // capabilities for local Appium web tests on an Android Emulator
        //     platformName: 'Android',
        //     'appium:deviceName': 'Ebac',
        //     'appium:platformVersion': '16.0',
        //     'appium:automationName': 'UiAutomator2',
        //     'appium:app': `${process.cwd()}/app/ebacshop.apks`,
        //     'appium:appWaitActivity': '.MainActivity',
        //     'appium:disableIdLocatorAutocompletion': true
        // }
    ],

    logLevel: 'info',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: ['spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true,
        }]
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
}                                                                           
