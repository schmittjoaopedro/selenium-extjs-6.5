package joao.schmitt;

import joao.schmitt.ext.FormRegisterTest;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

/**
 * Created by root on 25/07/17.
 */
public class FirefoxTests {

    @Test
    public void formRegisterTest() {
        WebDriver driver = getDriver();

        FormRegisterTest formRegisterTest = new FormRegisterTest(driver);
        formRegisterTest.run();

        driver.quit();
    }

    private WebDriver getDriver() {
        System.setProperty("webdriver.gecko.driver","webdriver/geckodriver");
        WebDriver driver = new FirefoxDriver();
        return driver;
    }

}
