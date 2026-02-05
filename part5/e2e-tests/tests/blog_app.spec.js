import test, { expect, beforeEach, describe } from "@playwright/test";

const BACKEND_URL = 'http://localhost:3002'

const login = async (page, { username, password }) => {
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

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
      const title = page.getByText('log in to application')
      const userInput = page.getByLabel('username')
      const pwdInput = page.getByLabel('password')
      const btn = page.getByRole('button', { name: 'login'})
      await expect(title).toBeVisible()
      await expect(userInput).toBeVisible()
      await expect(pwdInput).toBeVisible()
      await expect(btn).toBeVisible()
    })

    test('succeeds with correct credentials', async ({ page }) => {
      const btn = page.getByRole('button', { name: 'login'})

      await login(page, {
        username: 'admin',
        password: 'test'
      })
      await expect(btn).not.toBeVisible()

      const loggedText = page.getByText('admin logged in')
      await expect(loggedText).toBeVisible()

      const createBtn = page.getByRole('button', { name: 'create new blog' })
      await expect(createBtn).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      const userInput = page.getByLabel('username')
      const pwdInput = page.getByLabel('password')
      const btn = page.getByRole('button', { name: 'login'})

      await userInput.fill('anotheruser')
      await pwdInput.fill('test123')
      await btn.click()

      await expect(btn).toBeVisible()
      
      const loggedText = page.getByText('admin logged in')
      await expect(loggedText).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await login(page, {
        username: 'admin',
        password: 'test'
      })
    })

    test('a new blog can be created', async ({ page }) => {
      const createNewBlogBtn = page.getByRole('button', { name: 'create new blog'})
      await createNewBlogBtn.click()

      const titleInput = page.getByLabel('title')  
      const authorInput = page.getByLabel('author')
      const urlInput = page.getByLabel('url')

      await titleInput.fill('a good title')
      await authorInput.fill('bandeclay')
      await urlInput.fill('www.google.com')

      const createBtn = page.getByRole('button', { name: 'Create'})  
      await createBtn.click()

      const titleAuthorText = page.getByText('a good title bandeclay') 
      const viewBtn = page.getByRole('button', { name: 'view'})
      await expect(titleAuthorText).toBeVisible()
      await expect(viewBtn).toBeVisible()

      await viewBtn.click()
      const urlText = page.getByText('www.google.com') 
      await expect(urlText).toBeVisible()

      const likesText = page.getByText('likes')
      await expect(likesText).toBeVisible()

      const hideBtn = page.getByRole('button', { name: 'hide'})
      await expect(hideBtn).toBeVisible()
    })
  })
})
