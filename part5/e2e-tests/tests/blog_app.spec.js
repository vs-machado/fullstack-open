import test, { expect, beforeEach, describe } from "@playwright/test";

const BACKEND_URL = 'http://localhost:3002'

const login = async (page, { username, password }) => {
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)

  await Promise.all([
    page.waitForResponse(res => res.url().includes('/api/login')),
    page.getByRole('button', { name: 'login' }).click()
  ])

  await page.getByText(`${username} logged in`).waitFor()
}

const createPost = async (page, { title, author, url }) => {
  await page.getByTestId('create-blog').click()

  await page.getByLabel('title').fill(title)
  await page.getByLabel('author').fill(author)
  await page.getByLabel('url').fill(url)

  await page.getByRole('button', { name: 'Create' }).click()
  await page.getByTestId('blog-title', { hasText: title }).waitFor()
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
      await login(page, {
        username: 'admin',
        password: 'test'
      })

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
      await createPost(page, {
        title: 'a good title',
        author: 'author',
        url: 'www.google.com'
      })
      const blogElement = page.getByTestId('blog').filter({ hasText: 'a good title' })
      await expect(blogElement).toBeVisible()

      const blogTitle = blogElement.getByTestId('blog-title')
      await expect(blogTitle).toBeVisible()

      const viewBtn = blogElement.getByRole('button', { name: 'view'})
      await expect(viewBtn).toBeVisible()

      await viewBtn.click()
      const urlText = blogElement.getByText('www.google.com') 
      await expect(urlText).toBeVisible()

      const likesText = blogElement.getByText('likes')
      await expect(likesText).toBeVisible()

      const hideBtn = blogElement.getByRole('button', { name: 'hide'})
      await expect(hideBtn).toBeVisible()
    })

    test('a post can be liked', async ({ page }) => {
      await createPost(page, {
        title: 'All You Need Is Love',
        author: 'The Beatles',
        url: 'https://music.youtube.com/watch?v=1A8sOOKianA&si=1LL8mpMh8WIzgEvA'
      })
      // await expect(page.getByTestId('blog-title').filter({ hasText: 'All You Need Is Love' })).toBeVisible()
      
      const viewBtn = page.getByRole('button', { name: 'view'})
      await expect(viewBtn).toBeVisible()
      await viewBtn.click()

      const likeBtn = page.getByRole('button', { name: 'like'}) 
      await expect(likeBtn).toBeVisible()

      const likesText = page.locator('#blog-likes')
      const likesTextContent = await likesText.textContent()
      const likesBefore = Number(likesTextContent.match(/\d+/)[0])

      await likeBtn.click()

      // Poll until the likes count updates in the UI
      await expect.poll(async () => {
        const text = await page.locator('#blog-likes').textContent()
        return text
      }).toContain(`likes ${likesBefore + 1} like`)
    })

    test('user can delete its own blog post', async ({ page }) => {
      await createPost(page, {
        title: 'California My Way',
        author: 'The 5th Dimension',
        url: 'https://music.youtube.com/watch?v=FUai8-H2Mz8&si=f-VDz9nFIHG3i9ws'
      })
      const blogElement = page.getByTestId('blog').filter({ hasText: 'California My Way' })
      await expect(blogElement).toBeVisible()

      const viewBtn = blogElement.getByRole('button', { name: 'view'})
      await viewBtn.click()
      
      const removeBtn = blogElement.getByRole('button', { name: 'remove'})
      page.on('dialog', dialog => dialog.accept())
      await removeBtn.click()

      const blogElementAfterDeletion = page.getByTestId('blog').filter({ hasText: 'California My Way' })
      await expect(blogElementAfterDeletion).toHaveCount(0)
   })
  })
})
