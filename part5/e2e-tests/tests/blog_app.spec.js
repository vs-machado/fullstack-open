import test, { expect, beforeEach, describe } from "@playwright/test";


describe('Blog app', () => {
  beforeEach( async ({ page }) => {
    await page.goto('http://localhost:5173/')
  })

  test('Login form is shown', async ({ page }) => {
    const titleLocator = page.getByText('log in to application')
    const userInputLocator = page.getByLabel('username')
    const pwdInputLocator = page.getByLabel('password')
    const btnLocator = page.getByRole('button', { name: 'login'})
    await expect(titleLocator).toBeVisible()
    await expect(userInputLocator).toBeVisible()
    await expect(pwdInputLocator).toBeVisible()
    await expect(btnLocator).toBeVisible()
  })
})
