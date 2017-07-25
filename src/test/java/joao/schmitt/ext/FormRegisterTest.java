package joao.schmitt.ext;

import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;

/**
 * Created by root on 25/07/17.
 */
public class FormRegisterTest {

    private WebDriver webDriver;

    public FormRegisterTest(WebDriver webDriver) {
        this.webDriver = webDriver;
        this.webDriver.get("http://examples.sencha.com/extjs/6.5.0/examples/kitchensink/#form-register");
    }

    public void run() {

        waitForElement("user");

        //Check initial state
        validEmptyElementByLabel("User ID:", "user");
        validEmptyElementByLabel("Password:", "pass");
        validEmptyElementByLabel("Verify:", "pass");
        validEmptyElementByLabel("First Name:", "first");
        validEmptyElementByLabel("Last Name:", "last");
        validEmptyElementByLabel("Company:", "company");
        validEmptyElementByLabel("Email:", "email");
        validEmptyElementByLabel("State:", "state");
        validEmptyElementByLabel("Date of Birth:", "dob");
        validButtonState("Register", true);

        //Check place holder values
        validPlaceHolderValues("User ID:", "user id");
        validPlaceHolderValues("Password:", "password");
        validPlaceHolderValues("Verify:", "password");
        validPlaceHolderValues("First Name:", "First Name");
        validPlaceHolderValues("Last Name:", "Last Name");
        validPlaceHolderValues("State:", "Select a state...");

        //Check required fields
        validRequiredFields("User ID:", "Password:", true);
        validRequiredFields("Password:", "Verify:", true);
        validRequiredFields("Verify:", "First Name:", true);
        validRequiredFields("First Name:", "Last Name:", false);
        validRequiredFields("Last Name:", "Company:", false);
        validRequiredFields("Company:", "Email:", false);
        validRequiredFields("Email:", "State:", false);
        validRequiredFields("Date of Birth:", "User ID:", true);

        //Set text input values
        sendFieldValues("User ID:", "joaoschmitt");
        sendFieldValues("Password:", "asd123@");
        sendFieldValues("Verify:", "asd123@");
        sendFieldValues("First Name:", "João");
        sendFieldValues("Last Name:", "Pedro Schmitt");
        sendFieldValues("Company:", "Home");
        sendFieldValues("Email:", "joao@home.com");
        setComboValue("State:", "Minnesota", 51);
        setDateValueOne("Date of Birth:");
        validButtonState("Register", false);
        clickInButton("Register");
    }

    private void waitForElement(String name) {
        new WebDriverWait(this.webDriver, 600).until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.name(name)));
    }

    private void validEmptyElementByLabel(String label, String name) {
        WebElement element = this.webDriver.findElement(By.xpath("//div[label/span/span[text()='" + label + "']]//input"));
        Assert.assertEquals(name, element.getAttribute("name"));
    }

    private void validPlaceHolderValues(String label, String value) {
        WebElement element = this.webDriver.findElement(By.xpath("//div[label/span/span[text()='" + label + "']]//input"));
        Assert.assertEquals(value, element.getAttribute("placeholder"));
    }

    private void validRequiredFields(String firstLabel, String nextLabel, boolean required) {
        this.webDriver.findElement(By.xpath("//div[label/span/span[text()='" + firstLabel + "']]//input")).click();
        this.webDriver.findElement(By.xpath("//div[label/span/span[text()='" + nextLabel + "']]//input")).click();
        try {
            WebElement element = this.webDriver.findElement(By.xpath("//div[label/span/span[text()='" + firstLabel + "']]//div[@data-ref='errorWrapEl']//li[text()='This field is required']"));
        } catch (NoSuchElementException el) {
            Assert.assertTrue(!required);
            return;
        }
        Assert.assertTrue(required);
    }

    private void sendFieldValues(String label, String value) {
        this.webDriver.findElement(By.xpath("//div[label/span/span[text()='" + label + "']]//input")).sendKeys(value);
    }

    private void setComboValue(String label, String value, int size) {
        WebElement comboElement = this.webDriver.findElement(By.xpath("//div[label/span/span[text()='" + label + "']]"));
        String pickerId = comboElement.getAttribute("id") + "-trigger-picker";
        this.webDriver.findElement(By.xpath("//div[@id='" + pickerId + "']")).click();
        String componentId = comboElement.getAttribute("id") + "-picker";
        new WebDriverWait(this.webDriver, 10).until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.xpath("//li[text()='"+ value +"']")));
        List<WebElement> comboOptions = this.webDriver.findElements(By.xpath("//li[@data-boundview='" + componentId + "']"));
        Assert.assertEquals(size, comboOptions.size());
        this.webDriver.findElement(By.xpath("//li[text()='"+ value +"']")).click();
    }

    private void setDateValueOne(String label) {
        WebElement comboElement = this.webDriver.findElement(By.xpath("//div[label/span/span[text()='" + label + "']]"));
        String componentId = comboElement.getAttribute("id") + "-trigger-picker";
        this.webDriver.findElement(By.xpath("//div[@id='" + componentId + "']")).click();
        String xpathDayOne = "//td[@class='x-datepicker-active x-datepicker-cell']/div[@class='x-datepicker-date' and text()='1']";
        new WebDriverWait(this.webDriver, 10).until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.xpath(xpathDayOne)));
        this.webDriver.findElement(By.xpath(xpathDayOne)).click();
    }

    private void validButtonState(String label, boolean state) {
        Assert.assertEquals(state, this.webDriver.findElement(By.xpath("//a[span/span/span[text()='" + label + "']]")).getAttribute("class").contains("x-item-disabled"));
    }

    private void clickInButton(String label) {
        this.webDriver.findElement(By.xpath("//a[span/span/span[text()='" + label + "']]")).click();
    }

}
