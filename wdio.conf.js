export const config = {
    // ============================================================
    // RUNNER
    // ============================================================

    runner: 'local',
    maxInstances: 1,

    // ============================================================
    // APPIUM
    // ============================================================

    hostname: '127.0.0.1',
    port: 4723,
    path: '/',

    // ============================================================
    // TESTES
    // ============================================================

    specs: [
        './test/specs/login.test.js',
    ],

    // ============================================================
    // CAPABILITIES ANDROID
    // ============================================================

    capabilities: [{
        platformName: 'Android',

        'appium:automationName': 'UiAutomator2',

        'appium:deviceName': 'pixel_2',
        'appium:platformVersion': '10',
        'appium:udid': 'emulator-5554',

        'appium:app': './apps/ebacshop.apk',
        'appium:appPackage': 'br.com.lojaebac',
        'appium:appActivity': '.MainActivity',

        // Permissões
        'appium:autoGrantPermissions': true,

        // Estado do aplicativo
        'appium:noReset': false,

        // ========================================================
        // TIMEOUTS APPIUM / ANDROID
        // ========================================================

        'appium:adbExecTimeout': 180000,

        'appium:androidInstallTimeout': 300000,

        'appium:uiautomator2ServerInstallTimeout': 180000,

        'appium:uiautomator2ServerLaunchTimeout': 180000,
    }],

    // ============================================================
    // LOGS
    // ============================================================

    logLevel: 'info',

    // ============================================================
    // TIMEOUTS WDIO
    // ============================================================

    waitforTimeout: 30000,

    connectionRetryTimeout: 180000,

    connectionRetryCount: 2,

    // ============================================================
    // FRAMEWORK
    // ============================================================

    framework: 'mocha',

    // ============================================================
    // MOCHA
    // ============================================================

    mochaOpts: {
        ui: 'bdd',
        timeout: 180000,
    },

    // ============================================================
    // REPORTERS
    // ============================================================

    reporters: [
        'spec',

        [
            'allure',
            {
                outputDir: './allure-results',

                disableWebdriverStepsReporting: false,

                disableWebdriverScreenshotsReporting: false,

                disableWebdriverScreenshotsReporting: false,
            },
        ],
    ],
};