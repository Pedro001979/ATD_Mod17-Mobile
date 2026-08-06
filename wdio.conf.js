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

    //
    // Appium
    //
    services: [
        ['appium', {
            command: 'appium',
            args: {
                relaxedSecurity: true
            }
        }]
    ],

    //
    // Capabilities
    //
    capabilities: [{

        platformName: 'Android',

        'appium:automationName': 'UiAutomator2',

        'appium:deviceName': 'Android Emulator',

        'appium:app': './apps/ebacshop.apks',

        'appium:appPackage': 'br.com.lojaebac',

        'appium:appActivity': '.MainActivity',

        'appium:autoGrantPermissions': true,

        //
        // Reset do aplicativo
        //
        'appium:noReset': false,
        'appium:fullReset': false,
        'appium:dontStopAppOnReset': false,
        'appium:shouldTerminateApp': true,

        //
        // Performance
        //
        'appium:disableIdLocatorAutocompletion': true,

        'appium:newCommandTimeout': 300,

        'appium:adbExecTimeout': 120000,

        'appium:androidInstallTimeout': 180000,

        'appium:uiautomator2ServerInstallTimeout': 120000,

        'appium:uiautomator2ServerLaunchTimeout': 120000

    }],

    //
    // Logs
    //
    logLevel: 'info',

    outputDir: './logs',

    //
    // Timeouts
    //
    waitforTimeout: 30000,

    connectionRetryTimeout: 180000,

    connectionRetryCount: 5,

    //
    // Framework
    //
    framework: 'mocha',

    mochaOpts: {
        ui: 'bdd',
        timeout: 180000
    },

    //
    // Reporters
    //
    reporters: [

        'spec',

        ['allure', {

            outputDir: 'allure-results',

            disableWebdriverStepsReporting: true,

            disableWebdriverScreenshotsReporting: false

        }]

    ],

    //
    // Hooks
    //
    before: async function () {

        await driver.setTimeout({

            implicit: 10000,

            pageLoad: 120000,

            script: 120000

        })

    },

    afterTest: async function (test, context, { error }) {

        if (error) {

            console.error('========================================')
            console.error('TESTE FALHOU')
            console.error(error)
            console.error('========================================')

            try {

                await browser.saveScreenshot(
                    `./errorShots/${Date.now()}.png`
                )

            } catch (e) {
                console.log('Não foi possível salvar screenshot.')
            }

        }

    }

}