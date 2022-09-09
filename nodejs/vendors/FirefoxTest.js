require('geckodriver');
let webdriver = require('selenium-webdriver');

class FirefoxTest {

  constructor(nextExecutor) {
    this.driver = null;
    this.tests = [];
    this.nextExecutor = nextExecutor;
  }

  addTest(test) {
    this.tests.push(test);
  }

  run() {
    if(this.tests.length > 0)
      this.runTest(this.tests[0], 1);
    else
      this.nextExecutor();
  }

  runTest(test, index) {
    let next = this.nextExecutor;
    if(this.tests.length > index) {
      next = () => this.runTest(this.tests[index], ++index);
    }
    test.run(
      () => new webdriver.Builder().withCapabilities(webdriver.Capabilities.firefox()).build(),
      next
    )
  }

}

module.exports = FirefoxTest;