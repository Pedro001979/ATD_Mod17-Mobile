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

    services: ['appium'],

    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'Android Emulator',

        'appium:app': './apps/ebacshop.apks', 

        'appium:appPackage': 'br.com.lojaebac',
        'appium:appActivity': '.MainActivity',
        'appium:autoGrantPermissions': true,

        // --- AJUSTES PARA GARANTIR O RESET COMPLETO ---
        'appium:noReset': false,            // Limpa dados/cache do app ao iniciar
        'appium:fullReset': false,           // Não desinstala o app (economiza tempo), mas limpa os dados
        'appium:dontStopAppOnReset': false,  // Força o encerramento completo do app antes do reset
        'appium:shouldTerminateApp': true,   // Garante que o app é fechado ao terminar o teste
        // ----------------------------------------------

        'appium:disableIdLocatorAutocompletion': true,
        'appium:newCommandTimeout': 240
    }],

    logLevel: 'info',

    // --- MUDANÇA AQUI: Aumentado de 10000 para 20000 (20s) para ajudar no GitHub Actions ---
    waitforTimeout: 20000,

    connectionRetryTimeout: 120000,

    connectionRetryCount: 3,

    framework: 'mocha',

    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true
        }]
    ],

    // --- MUDANÇA AQUI: Ajustado para garantir o timeout maior do Mocha ---
    mochaOpts: {
        ui: 'bdd',
        timeout: 90000 // Aumentado para 90s para dar margem a testes mais lentos no CI
    },

    afterTest: async function (test, context, { error }) {
        if (error) {
            await browser.takeScreenshot();
        }
    }
}