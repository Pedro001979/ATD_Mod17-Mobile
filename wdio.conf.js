export const config = {

    maxInstances: 1,

    runner: 'local',

    hostname: '127.0.0.1',
    port: 4723,
    path: '/',

    specs: [
        './test/specs/login.test.js'
    ],

    exclude: [],

    // IMPORTANTE:
    // apenas um teste por vez

    services: ['appium'],

    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'Android Emulator',
        'appium:app': './apps/ebacshop.apk',
        'appium:appPackage': 'br.com.lojaebac',
        'appium:appActivity': '.MainActivity',
        'appium:autoGrantPermissions': true,

        // Timeouts maiores para runners do GitHub
        'appium:avdLaunchTimeout': 180000,
        'appium:avdReadyTimeout': 180000,
        'appium:androidInstallTimeout': 180000,
        'appium:uiautomator2ServerInstallTimeout': 180000,
        'appium:uiautomator2ServerLaunchTimeout': 180000,
        'appium:newCommandTimeout': 300
    }],

    logLevel: 'info',

    outputDir: './logs',

    waitforTimeout: 10000,

    connectionRetryTimeout: 120000,

    connectionRetryCount: 3,

    framework: 'mocha',

    mochaOpts: {
        ui: 'bdd',
        timeout: 120000
    },

    reporters: [
        'spec',

        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false
        }]
    ],

    before: async function () {

        await driver.setTimeout({
            implicit: 3000,
            pageLoad: 60000,
            script: 60000
        });

    },

    afterTest: async function (test, context, { error }) {

        if (error) {

            console.error('========================================');
            console.error('TESTE FALHOU');
            console.error(error);
            console.error('========================================');

            try {

                await browser.saveScreenshot(
                    `./errorShots/${Date.now()}.png`
                );

            } catch (e) {

                console.log(
                    'Não foi possível salvar screenshot.'
                );

            }

        }

    }
};