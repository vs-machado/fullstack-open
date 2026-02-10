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
  await page.getByTestId('blog-title').filter({ hasText: title }).waitFor()
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

   test('only user who added a blog post can delete it', async ({ page, request }) => {
      // registers another user
      await request.post(`${BACKEND_URL}/api/users`, { 
        data: {
          name: 'user2',
          username: 'user2',
          password: 'test'
        }
      })

      // creates a post on the admin user
      await createPost(page, {
        title: 'Supersonic Rocket Ship',
        author: 'The Kinks',
        url: 'https://music.youtube.com/watch?v=-2RJRrccX7s&si=_JIH7nHJDwUYpEZ2'
      })

      const blogElement = page.getByTestId('blog').filter({ hasText: 'Supersonic Rocket Ship' })
      await expect(blogElement).toBeVisible()

      const viewBtn = blogElement.getByRole('button', { name: 'view'})
      await viewBtn.click()
      
      // removeBtn is visible
      const removeBtn = blogElement.getByRole('button', { name: 'remove'})
      await expect(removeBtn).toBeVisible()

      // logout
      const logoutBtn = page.getByRole('button', { name: 'logout' })
      await logoutBtn.click()

      // login on the 2nd account
      await login(page, {
        username: 'user2',
        password: 'test'
      })

      const blogElement2 = page.getByTestId('blog').filter({ hasText: 'Supersonic Rocket Ship' })
      await expect(blogElement2).toBeVisible()

      const viewBtn2 = blogElement.getByRole('button', { name: 'view'})
      await viewBtn2.click()

      // removeBtn must not be visible to another user
      const removeBtn2 = blogElement.getByRole('button', { name: 'remove'})
      await expect(removeBtn2).toHaveCount(0)
   })

   test('blog posts are arranged in the order according to the likes', async ({ page, request }) => {
      await createPost(page, {
        title: '1984',
        author: 'David Bowie',
        url: 'https://music.youtube.com/watch?v=x2xfpMMQIJ8&si=Jmlg1f3p6TIQP6mQ'
      })
      await createPost(page, {
        title: 'Rocky Raccoon',
        author: 'The Beatles',
        url: 'https://music.youtube.com/watch?v=sDcDCZGcZj8&si=8xG_4_MR5gN-KV2J'
      })
      await createPost(page, {
        title: 'Over You',
        author: 'The Velvet Underground',
        url: 'https://music.youtube.com/watch?v=MJzrnA0SLGg&si=OhtZ8darkbfP5jf6'
      })
      await createPost(page, {
        title: 'As The World Falls Down',
        author: 'David Bowie',
        url: 'https://music.youtube.com/watch?v=3baQ9lj3W7E&si=9oc5SnXusGM5ARFA'
      })

      // Over You
      const blogElement3 = page.getByTestId('blog').filter({ hasText: 'Over You' })
      const viewBtn3 = blogElement3.getByRole('button', { name: 'view'})
      await viewBtn3.click()

      // most liked blog post (over you song)
      const likeBtn3 = blogElement3.getByRole('button', { name: 'like'})
      for (let i = 0; i < 3; i++) {
        await likeBtn3.click()
        await page.waitForTimeout(100) // small wait for re-render
      }

      // Rocky Raccoon
      const blogElement2 = page.getByTestId('blog').filter({ hasText: 'Rocky Raccoon' })
      const viewBtn2 = blogElement2.getByRole('button', { name: 'view'})
      await viewBtn2.click()

      const likeBtn2 = blogElement2.getByRole('button', { name: 'like'})
      for (let i = 0; i < 2; i++) {
        await likeBtn2.click()
        await page.waitForTimeout(100) // small wait for re-render
      }

      // As The World Falls Down
      const blogElement4 = page.getByTestId('blog').filter({ hasText: 'As The World Falls Down' })
      const viewBtn4 = blogElement4.getByRole('button', { name: 'view'})
      await viewBtn4.click()

      const likeBtn4 = blogElement4.getByRole('button', { name: 'like'})
      await likeBtn4.click()
      await page.waitForTimeout(100)

      await expect(
        page.getByTestId('blog').first().getByTestId('blog-title')
      ).toContainText('Over You')

      const blogs = page.getByTestId('blog')
      const titles = await blogs.getByTestId('blog-title').allTextContents()

      expect(titles[0]).toContain('Over You')
      expect(titles[1]).toContain('Rocky Raccoon')
      expect(titles[2]).toContain('As The World Falls Down')
      expect(titles[3]).toContain('1984')
   })
  })
})
