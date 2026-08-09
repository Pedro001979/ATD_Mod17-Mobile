export const config = {

    runner: 'local',

    hostname: '127.0.0.1',
    port: 4723,
    path: '/',

    specs: [
        './test/specs/**/*.js'
    ],

    exclude: [],

    maxInstances: 1,

    // ==========================================
    // APPIUM
    // ==========================================

    services: ['appium'],

    // ==========================================
    // CAPABILITIES
    // ==========================================

    capabilities: [{

        platformName: 'Android',

        'appium:automationName': 'UiAutomator2',

        'appium:deviceName': 'Android Emulator',

        // APK
        'appium:app': './apps/ebacshop.apk',

        'appium:appPackage': 'br.com.lojaebac',

        'appium:appActivity': '.MainActivity',

        'appium:autoGrantPermissions': true,

        // ======================================
        // RESET DO APLICATIVO
        // ======================================

        'appium:noReset': false,

        'appium:fullReset': false,

        'appium:dontStopAppOnReset': false,

        'appium:shouldTerminateApp': true,

        // ======================================
        // PERFORMANCE
        // ======================================

        'appium:disableIdLocatorAutocompletion': true,

        'appium:newCommandTimeout': 300,

        'appium:adbExecTimeout': 120000,

        'appium:androidInstallTimeout': 180000,

        'appium:uiautomator2ServerInstallTimeout': 120000,

        'appium:uiautomator2ServerLaunchTimeout': 120000

    }],

    // ==========================================
    // LOGS
    // ==========================================

    logLevel: 'info',

    outputDir: './logs',

    // ==========================================
    // TIMEOUTS
    // ==========================================

    waitforTimeout: 30000,

    connectionRetryTimeout: 180000,

    connectionRetryCount: 5,

    // ==========================================
    // FRAMEWORK
    // ==========================================

    framework: 'mocha',

    mochaOpts: {
        ui: 'bdd',
        timeout: 180000
    },

    // ==========================================
    // REPORTERS
    // ==========================================

    reporters: [

        'spec',

        ['allure', {

            outputDir: 'allure-results',

            disableWebdriverStepsReporting: true,

            disableWebdriverScreenshotsReporting: false

        }]

    ],

    // ==========================================
    // HOOKS
    // ==========================================

    before: async function () {

        await driver.setTimeout({

            implicit: 10000,

            pageLoad: 120000,

            script: 120000

        });

    },

    // ==========================================
    // SCREENSHOT EM CASO DE ERRO
    // ==========================================

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