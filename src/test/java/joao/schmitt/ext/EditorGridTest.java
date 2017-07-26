package joao.schmitt.ext;

import org.junit.Assert;
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

/**
 * Created by root on 26/07/17.
 */
public class EditorGridTest {

    private WebDriver webDriver;

    public EditorGridTest(WebDriver webDriver) {
        this.webDriver = webDriver;
        this.webDriver.get("http://examples.sencha.com/extjs/6.5.0/examples/kitchensink/#cell-editing");
    }

    public void run() {
        waitForDivWithText("Adder's-Tongue");
        setCellValueByLabel("Adder's-Tongue", 1, "Daisy");
        setCellComboValueByLabel("Daisy", 2, "Sun", "Sunny");
        setCellSpinnerValueByLabel("Daisy", 3, 4);
        setCellValueByLabel("Daisy", 4, "05/05/17");
        setClickByLabel("Daisy", 5);
        scrollToTop("Anemone");
        setClickByLabel("Anemone", 6);
        Assert.assertEquals(0, this.webDriver.findElements(By.xpath("//tr[td/div[text()=\"Anemone\"]]")).size());
        this.webDriver.findElement(By.xpath("//a[span/span/span[text()='Add Plant']]")).click();
        this.webDriver.switchTo().activeElement().sendKeys("Teste");
        this.webDriver.switchTo().activeElement().sendKeys(Keys.ENTER);
    }

    private void waitForDivWithText(String text) {
        new WebDriverWait(this.webDriver, 600).until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.xpath("//div[text()=\"" + text + "\"]")));
    }

    private void setCellValueByLabel(String text, int column, String value) {
        WebElement cell = this.webDriver.findElement(By.xpath("//tr[td/div[text()=\"" + text + "\"]]/td[" + column + "]"));
        cell.click();
        new WebDriverWait(this.webDriver, 2).until(ExpectedConditions.visibilityOf(cell.findElement(By.xpath("//input"))));
        cell.findElement(By.xpath("//input")).clear();
        cell.findElement(By.xpath("//input")).sendKeys(value);
        cell.findElement(By.xpath("//input")).sendKeys(Keys.ENTER);
    }

    private void setCellComboValueByLabel(String label, int column, String search, String value) {
        WebElement cell = this.webDriver.findElement(By.xpath("//tr[td/div[text()=\"" + label + "\"]]/td[" + column + "]"));
        cell.click();
        new WebDriverWait(this.webDriver, 2).until(ExpectedConditions.visibilityOf(cell.findElement(By.xpath("//input"))));
        cell.findElement(By.xpath("//input")).sendKeys(search);
        new WebDriverWait(this.webDriver, 2).until(ExpectedConditions.visibilityOf(cell.findElement(By.xpath("//li[text()=\"" + value + "\"]"))));
        cell.findElement(By.xpath("//li[text()=\"" + value + "\"]")).click();
        cell.findElement(By.xpath("//input")).sendKeys(Keys.ENTER);
    }

    private void setCellSpinnerValueByLabel(String label, int column, int numberClicks) {
        WebElement cell = this.webDriver.findElement(By.xpath("//tr[td/div[text()=\"" + label + "\"]]/td[" + column + "]"));
        cell.click();
        new WebDriverWait(this.webDriver, 2).until(ExpectedConditions.visibilityOf(cell.findElement(By.xpath("//input"))));
        for(int i = 0; i < numberClicks; i++) {
            cell.findElement(By.xpath("//input")).sendKeys(Keys.ARROW_UP);
        }
        cell.findElement(By.xpath("//input")).sendKeys(Keys.ENTER);
    }

    private void setClickByLabel(String label, int column) {
        this.webDriver.findElement(By.xpath("//tr[td/div[text()=\"" + label + "\"]]/td[" + column + "]")).click();
    }

    private void scrollToTop(String label) {
        WebElement cell = this.webDriver.findElement(By.xpath("//tr[td/div[text()=\"" + label + "\"]]"));
        ((JavascriptExecutor) this.webDriver).executeScript("arguments[0].scrollIntoView(true);", cell);
        try {
            Thread.sleep(500);
        } catch (Exception e) {
            Assert.assertTrue(false);
        }
    }

}
