export const config = {
    runner: 'local',
    maxInstances: 1,

    // Conecta no Appium já iniciado na porta 4723
    hostname: '127.0.0.1',
    port: 4723,
    path: '/',

    // REMOVA OU COMENTE O SERVICE:
    // services: ['appium'], 

    specs: [
        './test/specs/**/*.js'
    ],

    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'Android Emulator',
        'appium:app': './apps/ebacshop.apk',
        'appium:appPackage': 'br.com.lojaebac',
        'appium:appActivity': '.MainActivity',
        'appium:noReset': false,
        'appium:fullReset': false,
        'appium:autoGrantPermissions': true,
        'appium:newCommandTimeout': 300
    }],

    logLevel: 'info',
    waitforTimeout: 15000,
    connectionRetryTimeout: 180000,
    connectionRetryCount: 3,

    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 120000
    }
};