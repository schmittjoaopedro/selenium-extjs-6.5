package joao.schmitt;

import joao.schmitt.ext.DragAndDropTest;
import joao.schmitt.ext.EditorGridTest;
import joao.schmitt.ext.FormRegisterTest;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class FirefoxTests {

    @Test
    public void formRegisterTest() {
        WebDriver driver = getDriver();
        FormRegisterTest formRegisterTest = new FormRegisterTest(driver);
        formRegisterTest.run();
        driver.quit();
    }

    @Test
    public void dragAndDropTest() {
        WebDriver driver = getDriver();
        DragAndDropTest formRegisterTest = new DragAndDropTest(driver);
        formRegisterTest.run();
        driver.quit();
    }

    @Test
    public void editorGridTest() {
        WebDriver driver = getDriver();
        EditorGridTest editorGridTest = new EditorGridTest(driver);
        editorGridTest.run();
        driver.quit();
    }

    private WebDriver getDriver() {
        System.setProperty("webdriver.gecko.driver","webdriver/geckodriver");
        WebDriver driver = new FirefoxDriver();
        return driver;
    }

}
