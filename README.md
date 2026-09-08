# Mobile Test Automation — EBAC Shop

![WebdriverIO](https://img.shields.io/badge/WebdriverIO-9.x-EA5906?logo=webdriverio&logoColor=white)
![Appium](https://img.shields.io/badge/Appium-3.x-662D91?logo=appium&logoColor=white)
![Android](https://img.shields.io/badge/Android-UiAutomator2-3DDC84?logo=android&logoColor=white)
![Mocha](https://img.shields.io/badge/Mocha-Test%20Runner-8D6748?logo=mocha&logoColor=white)

> Mobile UI automation project built with WebdriverIO, Appium and Android UiAutomator2, focused on validating critical user journeys in the EBAC Shop application.

## About

This repository is part of my QA Automation portfolio and demonstrates how to structure and execute automated tests for Android applications using a modern WebdriverIO + Appium stack.

## Stack

- **WebdriverIO 9** — automation framework
- **Appium 3** — mobile automation server
- **UiAutomator2** — Android automation driver
- **Mocha** — test framework
- **Allure** — test reporting
- **JavaScript / Node.js** — project implementation

## Key Practices

- Page Object Model for reusable screen interactions
- Android-specific selectors
- Explicit separation between test specifications and page objects
- Local Appium execution
- Automated reporting with Allure
- CI-oriented project structure

## Installation

```bash
npm install
```

## Running the tests

Make sure an Android emulator/device is available and Appium is configured, then run:

```bash
npm test
```

The test command executes the WebdriverIO configuration defined in `wdio.conf.js`.

## Project Goal

The goal is to demonstrate practical mobile QA automation skills, including test organization, Android element identification, driver configuration and maintainable automated user flows.

## Author

**Pedro Ricardo**  
QA Automation | Web | API | Mobile Testing

[![GitHub](https://img.shields.io/badge/GitHub-Pedro001979-181717?logo=github)](https://github.com/Pedro001979)

---

This project is maintained as part of my software testing portfolio.
