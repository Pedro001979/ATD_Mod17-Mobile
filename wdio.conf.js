export const config = {
    runner: 'local',
    maxInstances: 1,

    hostname: '127.0.0.1',
    port: 4723,
    path: '/',

    specs: [
        './test/specs/cadastro.test.js',
    ],

    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',

        'appium:deviceName': 'Pixel_2',
        'appium:platformVersion': '10',
        'appium:udid': 'emulator-5554',

        'appium:app': './apps/ebacshop.apk',
        'appium:appPackage': 'br.com.lojaebac',
        'appium:appActivity': '.MainActivity',

        'appium:autoGrantPermissions': true,
        'appium:noReset': false,

        'appium:adbExecTimeout': 60000,
        'appium:androidInstallTimeout': 90000,
        'appium:uiautomator2ServerLaunchTimeout': 120000,
    }],

    logLevel: 'info',
    waitforTimeout: 30000,
    connectionRetryTimeout: 180000,
    connectionRetryCount: 2,

    framework: 'mocha',

    mochaOpts: {
        ui: 'bdd',
        timeout: 180000
    }
};
