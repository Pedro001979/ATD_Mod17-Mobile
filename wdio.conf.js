export const config = {
    runner: 'local',

    // 1. Garante 1 teste por vez para não dar conflito no emulador
    maxInstances: 1,

    // 2. Procura e roda todos os arquivos de teste na pasta specs
    specs: [
        './test/specs/**/*.js'
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
        
        // Caminho do aplicativo
        'appium:app': './apps/ebacshop.apk',
        'appium:appPackage': 'br.com.lojaebac',
        'appium:appActivity': '.MainActivity',

        // Reinicia os dados do app a cada suite (evita testes interferindo entre si)
        'appium:noReset': false,
        'appium:fullReset': false,
        'appium:autoGrantPermissions': true,

        // Timeouts maiores para garantir estabilidade no CI/CD
        'appium:adbExecTimeout': 12000,
        'appium:newCommandTimeout': 300,
        'appium:androidInstallTimeout': 18000,
        'appium:uiautomator2ServerInstallTimeout': 18000,
        'appium:uiautomator2ServerLaunchTimeout': 18000
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