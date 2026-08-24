export const config = {
    runner: 'local',
    maxInstances: 1,

    hostname: '127.0.0.1',
    port: 4723,
    path: '/',

    specs: [
        './test/specs/Cadastro.test.js',
    ],

    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',

        // O emulator-runner cria exatamente este AVD e o Android 10/API 29.
        'appium:deviceName': 'pixel_2',
        'appium:platformVersion': '10',
        'appium:udid': 'emulator-5554',

        // APK válido e presente no repositório após o checkout/LFS.
        'appium:app': './apps/ebacshop.apk',
        'appium:appPackage': 'br.com.lojaebac',
        'appium:appActivity': '.MainActivity',

        'appium:autoGrantPermissions': true,
        'appium:noReset': false,
        'appium:fullReset': false,
        'appium:dontStopAppOnReset': false,
        'appium:shouldTerminateApp': true,

        // Timeouts elevados para o runner do GitHub Actions.
        'appium:newCommandTimeout': 300,
        'appium:adbExecTimeout': 120000,
        'appium:androidInstallTimeout': 180000,
        'appium:uiautomator2ServerInstallTimeout': 120000,
        'appium:uiautomator2ServerLaunchTimeout': 120000,
    }],

    logLevel: 'info',
    outputDir: './logs',

    waitforTimeout: 30000,
    connectionRetryTimeout: 180000,
    connectionRetryCount: 5,

    framework: 'mocha',

    mochaOpts: {
        ui: 'bdd',
        timeout: 180000,
    },

    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }],
    ],

    before: async function () {
        await browser.setTimeout({
            implicit: 10000,
            pageLoad: 120000,
            script: 120000,
        });
    },

    afterTest: async function (test, context, { error }) {
        if (error) {
            console.error('========================================');
            console.error('TESTE FALHOU');
            console.error(error);
            console.error('========================================');

            try {
                await browser.saveScreenshot(`./errorShots/${Date.now()}.png`);
            } catch (e) {
                console.log('Não foi possível salvar screenshot.');
            }
        }
    },
};