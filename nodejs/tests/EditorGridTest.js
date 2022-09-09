var assert = require('chai').assert,
    test = require('selenium-webdriver/testing');
const { Key, By, until } = require('selenium-webdriver');

module.exports = class EditorGridTest {

    run(factory, next) {

        var me = this;

        test.describe('Editor grid', function () {
            
            this.timeout(5 * 1000 * 60);
            let driver = factory();

            test.it('Test editor grid', function (done) {

                //Wait page loading
                driver.get("http://examples.sencha.com/extjs/6.5.0/examples/kitchensink/#cell-editing")
                //Wait page finish load
                .then(me.waitForDivWithText(driver, "Adder's-Tongue"))
                //Change value of row Adder's-Tongue to column 1 (textfield)
                .then(me.setCellValueByLabel(driver, "Adder's-Tongue", 1, "Daisy"))
                //Change value of row Daisy with to column 2 (combobox)
                .then(me.setCellComboValueByLabel(driver, "Daisy", 2, "Sun", "Sunny"))
                //Change value of row Daisy with to column 3 (numberfield)
                .then(me.setCellSpinnerValueByLabel(driver, "Daisy", 3, 4))
                //Change value of row Daisy with to column 4 (textfield)
                .then(me.setCellValueByLabel(driver, "Daisy", 4, "05/05/17"))
                //Change value of row Daisy with to column 5 (checkbox)
                .then(me.setClickByLabel(driver, "Daisy", 5))
                //Scroll test
                .then(me.scrollToTop(driver, "Anemone"))
                //Remove buttont est
                .then(me.setClickByLabel(driver, "Anemone", 6))
                .then(() => driver.findElements(By.xpath(`//tr[td/div[text()='Anemone']]`)))
                .then((elements) => assert.equal(0, elements.length))
                //Add buttont est
                .then(() => driver.findElement(By.xpath(`//a[span/span/span[text()='Add Plant']]`)))
                .then((element) => element.click())
                //Insert value on focused input
                .then(() => driver.switchTo().activeElement())
                .then((element) => element.sendKeys("Teste"))
                .then(() => driver.switchTo().activeElement())
                .then((element) => element.sendKeys(Key.ENTER))

                .then(() => {
                    driver.quit();
                    done();
                    if(next)
                        next();
                });
            });
        });

    }

    waitForDivWithText(driver, text) {
        return driver.wait(until.elementLocated(By.xpath(`//div[text()="${text}"]`)), 600000);
    }

    setCellValueByLabel(driver, label, column, value) {
        return driver.findElement(By.xpath(`//tr[td/div[text()="${label}"]]/td[${column}]`))
            .then((element) => element.click())
            .then(() => driver.wait(until.elementLocated(By.xpath(`//tr[td/div[text()="${label}"]]/td[${column}]//input`))))
            .then(() => driver.findElement(By.xpath(`//tr[td/div[text()="${label}"]]/td[${column}]//input`)))
            .then((element) => element.clear())
            .then(() => driver.findElement(By.xpath(`//tr[td/div[text()="${label}"]]/td[${column}]//input`)))
            .then((element) => element.sendKeys(value))
            .then(() => driver.findElement(By.xpath(`//tr[td/div[text()="${label}"]]/td[${column}]//input`)))
            .then((element) => element.sendKeys(Key.ENTER));
    }

    setCellComboValueByLabel(driver, label, column, search, value) {
        var query = `//tr[td/div[text()="${label}"]]/td[${column}]`;
        return driver.findElement(By.xpath(query))
            .then((element) => element.click())
            .then(() => driver.wait(until.elementLocated(By.xpath(query + '//input'))))
            .then(() => driver.findElement(By.xpath(query + '//input')))
            .then((element) => element.sendKeys(search))
            .then(() => driver.wait(until.elementLocated(By.xpath(`//li[text()="${value}"]`))))
            .then(() => driver.findElement(By.xpath(`//li[text()="${value}"]`)))
            .then((element) => element.click())
            .then(() => driver.findElement(By.xpath(query + '//input')))
            .then((element) => element.sendKeys(Key.ENTER));
    }

    setCellSpinnerValueByLabel(driver, label, column, numberClicks) {
        var query = `//tr[td/div[text()="${label}"]]/td[${column}]`;
        
        function clickTicks(element, start, max) {
            if(start < max) {
                return element.sendKeys(Key.ARROW_UP).then(clickTicks.bind(element, ++start, max));
            } else {
                return element.sendKeys(Key.ARROW_UP);
            }
        }

        return driver.findElement(By.xpath(query))
            .then((element) => element.click())
            .then(() => driver.wait(until.elementLocated(By.xpath(query + '//input'))))
            .then(() => driver.findElement(By.xpath(query + '//input')))
            .then((element) => {
                for(let i = 0; i < numberClicks; i++)
                    element.sendKeys(Key.ARROW_UP);
            })
            .then(() => driver.findElement(By.xpath(query + '//input')))
            .then((element) => element.click());
    }

    setClickByLabel(driver, label, column) {
        return driver.findElement(By.xpath(`//tr[td/div[text()="${label}"]]/td[${column}]`))
            .then((element) => element.click());
    }

    scrollToTop(driver, label) {
        return driver.findElement(By.xpath(`//tr[td/div[text()="${label}"]]`))
            .then((element) => driver.executeScript("arguments[0].scrollIntoView()", element))
            .then(driver.sleep(500));
    }


}