const { test, expect, beforeEach, describe } = require('@playwright/test')
const { createBlog, loginWith } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = page.getByText('Log in to application')
    await expect(locator).toBeVisible()
    const username = page.getByText('username')
    await expect(username).toBeVisible()
    const password = page.getByText('password')
    await expect(password).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')

      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salaine')

      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'title', 'author', 'http://localhost/')

      await expect(page.getByText('a new blog title by author added')).toBeVisible()

      await page.reload()
      await expect(page.getByText('title authorview')).toBeVisible()
    })

    test('blog can be liked', async ({ page }) => {
      await createBlog(page, 'title', 'author', 'http://localhost/')

      await page.reload()
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('0')).toBeVisible()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('blog updated')).toBeVisible()
      
      await page.reload()
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('1')).toBeVisible()
    })

    test('blog can be removed by its creator', async ({ page }) => {
      await createBlog(page, 'title', 'author', 'http://localhost/')
      
      await page.reload()
      await page.getByRole('button', { name: 'view' }).click()
      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', { name: 'remove' }).click()
      await expect(page.getByText('blog deleted')).toBeVisible()
    })

    test('user can not delete others blogs', async ({ page, request }) => {
      await createBlog(page, 'title', 'author', 'http://localhost/')
      await page.reload()
      await page.getByRole('button', { name: 'logout' }).click()

      await request.post('/api/users', {
        data: {
          name: 'toinen käyttäjä',
          username: 'nimi',
          password: 'salasana'
        }
      })
      await loginWith(page, 'nimi', 'salasana')
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('remove')).not.toBeVisible()
    })

    test('blogs are ordered by likes', async ({ page }) => {
      await createBlog(page, 'blog1', 'author1', 'http://localhost/')
      await createBlog(page, 'blog2', 'author2', 'http://localhost/')
      await createBlog(page, 'blog3', 'author3', 'http://localhost/')
      await page.reload()

      await page.getByText('blog2').locator('..').getByRole('button', { name: 'view' }).click()
      await page.getByText('blog2').locator('..').getByRole('button', { name: 'like' }).click()
      await page.getByText('blog3').locator('..').getByRole('button', { name: 'view' }).click()
      await page.getByText('blog3').locator('..').getByRole('button', { name: 'like' }).click()

      await page.reload()
      await page.getByText('blog2').locator('..').getByRole('button', { name: 'view' }).click()
      await page.getByText('blog2').locator('..').getByRole('button', { name: 'like' }).click()
      
      await page.reload()
      await page.getByRole('button', { name: 'view' }).first().click()
      await expect(page.getByText('2like')).toBeVisible()
    })
  })
})