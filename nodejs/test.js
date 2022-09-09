let FirefoxTest = require('./vendors/FirefoxTest');
let ChromeTest = require('./vendors/ChromeTest');

let FormRegisterTest = require('./tests/FormRegisterTest');
let EditorGridTest = require('./tests/EditorGridTest');

function runMozilla() {
    let firefoxTest = new FirefoxTest();
    firefoxTest.addTest(new FormRegisterTest());
    firefoxTest.addTest(new EditorGridTest());
    firefoxTest.run();
}

function runChrome() {
    let chromeTest = new ChromeTest(runMozilla);
    chromeTest.addTest(new FormRegisterTest());
    chromeTest.addTest(new EditorGridTest());
    chromeTest.run();
}

runChrome();