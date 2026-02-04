import test, { expect, beforeEach, describe } from "@playwright/test";

const BACKEND_URL = 'http://localhost:3002'

// Backend must be started with npm run start:test
describe('Blog app', () => {
  beforeEach( async ({ page, request }) => {
    // clean db
    await request.post(`${BACKEND_URL}/api/testing/reset`)

    // user registration    
    await request.post(`${BACKEND_URL}/api/users`, { 
      data: {
        name: 'admin',
        username: 'admin',
        password: 'test'
      }
     })

    await page.goto('http://localhost:5173/') 
  })

  describe('Login', () => {
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

    test('succeeds with correct credentials', async ({ page }) => {
      const userInputLocator = page.getByLabel('username')
      const pwdInputLocator = page.getByLabel('password')
      const btnLocator = page.getByRole('button', { name: 'login'})

      await userInputLocator.fill('admin')
      await pwdInputLocator.fill('test')
      await btnLocator.click()

      await expect(btnLocator).not.toBeVisible()

      const loggedTextLocator = page.getByText('admin logged in')
      await expect(loggedTextLocator).toBeVisible()

      const createBtn = page.getByRole('button', { name: 'create new blog' })
      await expect(createBtn).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      const userInputLocator = page.getByLabel('username')
      const pwdInputLocator = page.getByLabel('password')
      const btnLocator = page.getByRole('button', { name: 'login'})

      await userInputLocator.fill('anotheruser')
      await pwdInputLocator.fill('test123')
      await btnLocator.click()

      await expect(btnLocator).toBeVisible()
      
      const loggedTextLocator = page.getByText('admin logged in')
      await expect(loggedTextLocator).not.toBeVisible()
    })
  })
})
