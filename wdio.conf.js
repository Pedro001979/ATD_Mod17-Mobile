export const config = {
    runner: 'local',
    maxInstances: 1,

    hostname: '127.0.0.1',
    port: 4723,
    path: '/',

    specs: [
        './test/specs/login.test.js',
    ],

    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',

        'appium:deviceName': 'test',
        'appium:platformVersion': '10',
        'appium:udid': 'emulator-5554',
        'appium:platformVersion': '11',

        'appium:app': './apps/ebacshop.apk',
        'appium:appPackage': 'br.com.lojaebac',
        'appium:appActivity': '.MainActivity',

        'appium:autoGrantPermissions': true,
        'appium:noReset': false,
        'appium:fullReset': false,
        'appium:printPageSourceOnFindFailure': true,

        'appium:adbExecTimeout': 120000,
        'appium:androidInstallTimeout': 120000,
        'appium:uiautomator2ServerLaunchTimeout': 180000,
        'appium:uiautomator2ServerInstallTimeout': 180000,
        'appium:newCommandTimeout': 300,
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
