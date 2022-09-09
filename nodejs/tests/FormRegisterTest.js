var assert = require('chai').assert,
    test = require('selenium-webdriver/testing');
const { By, until } = require('selenium-webdriver');

module.exports = class FormRegisterTest {

    run(factory, next) {
        
        var me = this;

        test.describe('Valid form', function () {
            
            this.timeout(5 * 1000 * 60);
            let driver = factory();

            test.it('Test valid form', function (done) {

                //Wait page loading
                driver.get("http://examples.sencha.com/extjs/6.5.0/examples/kitchensink/#form-register")
                .then(() => {
                    return driver.wait(until.elementLocated(By.name('user')), 600000);    
                })

                //Check initial state
                .then(me.validEmptyElementByLabel(driver, "User ID:", "user"))
                .then(me.validEmptyElementByLabel(driver, "Password:", "pass"))
                .then(me.validEmptyElementByLabel(driver, "Verify:", "pass"))
                .then(me.validEmptyElementByLabel(driver, "First Name:", "first"))
                .then(me.validEmptyElementByLabel(driver, "Last Name:", "last"))
                .then(me.validEmptyElementByLabel(driver, "Company:", "company"))
                .then(me.validEmptyElementByLabel(driver, "Email:", "email"))
                .then(me.validEmptyElementByLabel(driver, "State:", "state"))
                .then(me.validEmptyElementByLabel(driver, "Date of Birth:", "dob"))
                //Valid button is disabled
                .then(me.validButtonState(driver, 'Register', true))
                //Valid place holder fields
                .then(me.validPlaceHolderValues(driver, 'User ID:', 'user id'))
                .then(me.validPlaceHolderValues(driver, 'Password:', 'password'))
                .then(me.validPlaceHolderValues(driver, 'Verify:', 'password'))
                .then(me.validPlaceHolderValues(driver, 'First Name:', 'First Name'))
                .then(me.validPlaceHolderValues(driver, 'Last Name:', 'Last Name'))
                .then(me.validPlaceHolderValues(driver, 'State:', 'Select a state...'))
                //Valid required field User ID:
                .then(me.validRequiredFields(driver, "User ID:", "Password:", true))
                .then(me.validRequiredFields(driver, "Password:", "Verify:", true))
                .then(me.validRequiredFields(driver, "Verify:", "First Name:", true))
                .then(me.validRequiredFields(driver, "First Name:", "Last Name:", false))
                .then(me.validRequiredFields(driver, "Last Name:", "Company:", false))
                .then(me.validRequiredFields(driver, "Company:", "Email:", false))
                .then(me.validRequiredFields(driver, "Email:", "State:", false))
                .then(me.validRequiredFields(driver, "State:", "Date of Birth:", false))
                .then(me.validRequiredFields(driver, "Date of Birth:", "User ID:", true))
                //Set value text fields
                .then(me.sendFieldValues(driver, "User ID:", "joaoschmitt"))
                .then(me.sendFieldValues(driver, "Password:", "asd123@"))
                .then(me.sendFieldValues(driver, "Verify:", "asd123@"))
                .then(me.sendFieldValues(driver, "First Name:", "João"))
                .then(me.sendFieldValues(driver, "Last Name:", "Pedro Schmitt"))
                .then(me.sendFieldValues(driver, "Company:", "Home"))
                .then(me.sendFieldValues(driver, "Email:", "joao@home.com"))
                //Set value combo fields
                .then(me.sendComboValue(driver, "State:", "Minnesota", 51))
                //Set value date fields
                .then(me.sendDateValueOne(driver, "Date of Birth:"))
                //Valid button is disabled
                .then(me.validButtonState(driver, 'Register', false))
                //Click in button
                .then(me.clickInButton(driver, "Register"))
                //Finish tests
                .then(() => {
                    driver.quit();
                    done();
                    if(next)
                        next();
                });
            });
        });

    }

    validEmptyElementByLabel(driver, label, name) {
        return driver.findElement(By.xpath("//div[label/span/span[text()='User ID:']]//input"))
            .then((element) => element.getAttribute('name'))
            .then((text) => assert.equal(text, 'user'))
    }

    validButtonState(driver, label, state) {
        return driver.findElement(By.xpath(`//a[span/span/span[text()='${label}']]`))
            .then((element) => element.getAttribute('class'))
            .then((text) => assert.equal(state, text.indexOf("x-item-disabled") !== -1))
    }

    validPlaceHolderValues(driver, label, value) {
        return () => driver.findElement(By.xpath(`//div[label/span/span[text()='${label}']]//input`))
            .then((element) => element.getAttribute('placeholder'))
            .then((text) => assert.equal(text, value));
    }

    validRequiredFields(driver, firstLabel, nextLabel, required) {
        return driver.findElement(By.xpath(`//div[label/span/span[text()='${firstLabel}']]//input`))
            .then((element => element.click()))
            .then(() => driver.findElement(By.xpath(`//div[label/span/span[text()='${nextLabel}']]//input`)))
            .then((element => element.click()))
            .then(() => driver.findElements(By.xpath(`//div[label/span/span[text()='${firstLabel}']]//div[@data-ref='errorWrapEl']//li[text()='This field is required']`)))
            .then((elements) => assert.equal(required, elements.length === 1))
    }

    sendFieldValues(driver, label, value) {
        return driver.findElement(By.xpath(`//div[label/span/span[text()='${label}']]//input`))
            .then((element) => element.sendKeys(value));
    }

    sendComboValue(driver, label, value, size) {
        var state = {};
        return driver.findElement(By.xpath(`//div[label/span/span[text()='${label}']]`))
            .then((element) => element.getAttribute('id'))
            .then((text) => {
                state = {
                    pickerId: `${text}-trigger-picker`,
                    componentId: `${text}-picker`
                }
            })
            .then(() => driver.findElement(By.xpath("//div[@id='" + state.pickerId + "']")).click())
            .then(() => driver.wait(until.elementLocated(By.xpath(`//li[text()='${value}']`)), 600000))
            .then(() => driver.findElements(By.xpath(`//li[@data-boundview='${state.componentId}']`)))
            .then((element) => assert.equal(size, element.length))
            .then(() => driver.findElement(By.xpath(`//li[text()='${value}']`)))
            .then((element) => element.click())
    }

    sendDateValueOne(driver, label) {
        return driver.findElement(By.xpath(`//div[label/span/span[text()='${label}']]`))
            .then((element) => element.getAttribute('id'))
            .then((text) => `${text}-trigger-picker`)
            .then((text) => driver.findElement(By.xpath(`//div[@id='${text}']`)))
            .then((element) => element.click())
            .then(() => driver.wait(until.elementLocated(By.xpath(`//td[@class='x-datepicker-active x-datepicker-cell']/div[@class='x-datepicker-date' and text()='1']`)), 600000))
            .then(() => driver.findElement(By.xpath(`//td[@class='x-datepicker-active x-datepicker-cell']/div[@class='x-datepicker-date' and text()='1']`)))
            .then((element) => element.click());
    }

    clickInButton(driver, label) {
        return driver.findElement(By.xpath(`//a[span/span/span[text()='${label}']]`))
            .then((element) => element.click());
    }

}