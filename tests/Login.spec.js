// tests/automationexercise.spec.ts
import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("AutomationExercise", async ({ page }) => {
  const randomName = faker.person.firstName(); 
  const randomEmail = faker.internet.email(); 
  const randomPhone = faker.phone.number('017########'); 

  await page.goto("https://automationexercise.com/");
  await page.getByRole("link", { name: " Signup / Login" }).click();
  await page.getByRole("textbox", { name: "Name" }).fill(randomName);
  await page.locator('form').filter({ hasText: "Signup" }).getByPlaceholder("Email Address").fill(randomEmail);
  await page.getByRole("button", { name: "Signup" }).click();
  await page.getByRole("radio", { name: "Mr." }).check();
  await page.getByRole("textbox", { name: "Password *" }).fill("Password123");
  await page.locator("#days").selectOption("12");
  await page.locator("#months").selectOption("12");
  await page.locator("#years").selectOption("2002");
  await page.getByRole("checkbox", { name: "Sign up for our newsletter!" }).check();
  await page.getByRole("textbox", { name: "First name *" }).fill(randomName);
  await page.getByRole("textbox", { name: "Last name *" }).fill("Uddin");
  await page.getByRole("textbox", { name: "Address * (Street address, P." }).fill("Melbourne Street");
  await page.getByLabel("Country *").selectOption("Australia");
  await page.getByRole("textbox", { name: "State *" }).fill("Victoria");
  await page.getByRole("textbox", { name: "City * Zipcode *" }).fill("Melbourne");
  await page.locator("#zipcode").fill("3000");
  await page.getByRole("textbox", { name: "Mobile Number *" }).fill(randomPhone);
  await page.getByRole("button", { name: "Create Account" }).click();

  await expect(page.locator("#form")).toContainText(
    "Congratulations! Your new account has been successfully created!"
  );
  await page.getByRole("link", { name: "Continue" }).click();

  await page.locator('.choose > .nav > li > a').first().click();
  await page.locator('#quantity').fill('3');
  await page.getByRole('button', { name: ' Add to cart' }).click();
  await expect(page.locator('.modal-content')).toContainText('Your product has been added to cart');
  await page.getByRole('link', { name: 'View Cart' }).click();
  await expect(page.locator('#product-1')).toContainText('Rs. 1500');
});
