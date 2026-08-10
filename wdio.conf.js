export const config = {
    runner: 'local',

    // 1. Garante 1 teste por vez para não dar conflito no emulador
    maxInstances: 1,

    // 2. Procura e roda todos os arquivos de teste na pasta specs
    specs: [
        './test/specs/login.test.js'
    ],

    exclude: [],

    logLevel: 'info',
    waitforTimeout: 15000,
    connectionRetryTimeout: 12000,
    connectionRetryCount: 3,

    // 3. O Appium Service gerencia o servidor automaticamente
    services: ['appium'],

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

        // Timeouts com os zeros corrigidos (180000ms = 3 minutos):
        'appium:adbExecTimeout': 120000,
        'appium:newCommandTimeout': 300,
        'appium:androidInstallTimeout': 180000,
        'appium:uiautomator2ServerInstallTimeout': 180000,
        'appium:uiautomator2ServerLaunchTimeout': 180000
    }],

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

    // Screenshot automático caso ocorra alguma falha no teste
    afterTest: async function (test, context, { error }) {
        if (error) {
            try {
                await driver.saveScreenshot(`./errorShots/${Date.now()}.png`);
            } catch (e) {
                console.log('Não foi possível salvar screenshot de erro.');
            }
        }
    }
};