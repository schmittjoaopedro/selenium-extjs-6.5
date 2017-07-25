package joao.schmitt;

import joao.schmitt.ext.FormRegisterTest;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class ChromeTests {

    @Test
    public void formRegisterTest() {
        WebDriver driver = getDriver();

        FormRegisterTest formRegisterTest = new FormRegisterTest(driver);
        formRegisterTest.run();

        driver.quit();
    }

    private WebDriver getDriver() {
        System.setProperty(
            "webdriver.chrome.driver",
            "webdriver/chromedriver");

        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        return driver;
    }

}
