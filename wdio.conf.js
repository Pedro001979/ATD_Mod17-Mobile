export const config = {
    runner: 'local',
    maxInstances: 1,

    hostname: '127.0.0.1',
    port: 4723,
    path: '/',

    specs: [
        './test/specs/Cadastro.test.js'
    ],

    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'Android Emulator',
        'appium:platformVersion': '29',

        'appium:app': './apps/ebacshop.apk',
        'appium:appPackage': 'br.com.lojaebac',
        'appium:appActivity': '.MainActivity',

        'appium:autoGrantPermissions': true,
        'appium:noReset': false,
        'appium:fullReset': false,
        'appium:shouldTerminateApp': true,

        'appium:adbExecTimeout': 120000,
        'appium:androidInstallTimeout': 180000,
        'appium:uiautomator2ServerInstallTimeout': 180000,
        'appium:uiautomator2ServerLaunchTimeout': 180000,
        'appium:newCommandTimeout': 300,

        'appium:disableWindowAnimation': true,
        'appium:skipServerInstallation': false,
        'appium:skipDeviceInitialization': false
    }],

    logLevel: 'info',
    waitforTimeout: 60000,
    connectionRetryTimeout: 180000,
    connectionRetryCount: 3,

    framework: 'mocha',

    mochaOpts: {
        ui: 'bdd',
        timeout: 240000
    }
};
