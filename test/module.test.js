const { setup, loadConfig, url } = require('@nuxtjs/module-test-utils')
const sinon = require('sinon')
const FormData = require('form-data')

describe('Strapi Sdk', () => {
  let nuxt

  beforeAll(async () => {
    ({ nuxt } = (await setup(loadConfig(__dirname, 'basic'))))
  }, 60000)

  afterAll(async () => {
    await nuxt.close()
  })

  test('Correct Load module', async () => {
    const window = await nuxt.renderAndGetWindow(url('/'))

    expect(window.$nuxt.$auth).toBeDefined()
    expect(window.$nuxt.$axios).toBeDefined()
    expect(window.$nuxt.$strapi).toBeDefined()
  })

  test('Extend Module with Plugin', async () => {
    const window = await nuxt.renderAndGetWindow(url('/'))
    const flag = window.$nuxt.$strapi._custom_plugin

    expect(flag).toBe(true)
  })

  describe('Auth', () => {
    test('initial state', async () => {
      const window = await nuxt.renderAndGetWindow(url('/'))
      const state = window.__NUXT__.state

      expect(state.auth).toEqual({ user: null, loggedIn: false, strategy: 'local' })
    })

    test('register', async () => {
      const window = await nuxt.renderAndGetWindow(url('/'))
      const strapi = window.$nuxt.$strapi
      const axios = window.$nuxt.$axios
      const axiosRequest = sinon.stub(axios, 'request').resolves({
        data: {}
      })

      axiosRequest.resolves({
        data: {
          jwt: 'foo',
          user: {}
        }
      })
      const authentication = await strapi.register('username', 'foo@bar.com', 'password')

      expect(axiosRequest.calledWithExactly({
        data: {
          email: 'foo@bar.com',
          password: 'password',
          username: 'username'
        },
        method: 'post',
        url: '/auth/local/register'
      })).toBe(true)

      expect(authentication).toEqual({
        jwt: 'foo',
        user: {}
      })
    })

    test('login', async () => {
      const window = await nuxt.renderAndGetWindow(url('/'))
      const strapi = window.$nuxt.$strapi
      const axios = window.$nuxt.$axios
      const axiosRequest = sinon.stub(axios, 'request').resolves({
        data: {}
      })

      axiosRequest.resolves({
        data: {
          jwt: 'foo',
          user: {}
        }
      })
      await strapi.login('identifier', 'password')

      const axiosBearer = window.$nuxt.$axios.defaults.headers.common.Authorization
      const token = window.$nuxt.$auth.getToken('local')
      const user = window.$nuxt.$auth.user

      expect(axiosBearer).toBeDefined()
      expect(axiosBearer.split(' ')).toHaveLength(2)
      expect(axiosBearer.split(' ')[0]).toMatch(/^Bearer$/i)
      expect(token).toBeDefined()
      expect(user).toBeDefined()
    })

    test('logout', async () => {
      const window = await nuxt.renderAndGetWindow(url('/'))
      const strapi = window.$nuxt.$strapi
      const axios = window.$nuxt.$axios
      const axiosRequest = sinon.stub(axios, 'request').resolves({
        data: {}
      })

      axiosRequest.resolves({
        data: {
          jwt: 'foo',
          user: {}
        }
      })
      await strapi.login('identifier', 'password')

      const loginAxiosBearer = window.$nuxt.$axios.defaults.headers.common.Authorization
      const loginToken = window.$nuxt.$auth.getToken()

      expect(loginAxiosBearer).toBeDefined()
      expect(loginToken).toBeDefined()

      await strapi.logout()

      const logoutAxiosBearer = window.$nuxt.$axios.defaults.headers.common.Authorization
      const logoutToken = window.$nuxt.$auth.getToken()

      expect(logoutAxiosBearer).toBeUndefined()
      expect(logoutToken).toBeNull()
    })

    test('Forgot Password', async () => {
      const window = await nuxt.renderAndGetWindow(url('/'))
      const strapi = window.$nuxt.$strapi
      const axios = window.$nuxt.$axios
      const axiosRequest = sinon.stub(axios, 'request').resolves({
        data: {}
      })

      await strapi.forgotPassword('foo@bar.com')

      expect(axiosRequest.calledWithExactly({
        data: {
          email: 'foo@bar.com'
        },
        method: 'post',
        url: '/auth/forgot-password'
      })).toBe(true)
    })

    test('Reset Password', async () => {
      const window = await nuxt.renderAndGetWindow(url('/'))
      const strapi = window.$nuxt.$strapi
      const axios = window.$nuxt.$axios
      const axiosRequest = sinon.stub(axios, 'request').resolves({
        data: {}
      })

      await strapi.resetPassword('code', 'password', 'confirm')

      expect(axiosRequest.calledWithExactly({
        data: {
          code: 'code',
          password: 'password',
          passwordConfirmation: 'confirm'
        },
        method: 'post',
        url: '/auth/reset-password'
      })).toBe(true)
    })
  })

  describe('Entries', () => {
    test('Get Entries', async () => {
      const window = await nuxt.renderAndGetWindow(url('/'))
      const strapi = window.$nuxt.$strapi
      const axios = window.$nuxt.$axios
      const axiosRequest = sinon.stub(axios, 'request').resolves({
        data: {}
      })

      await strapi.getEntries('users', {
        _sort: 'email:asc'
      })

      expect(axiosRequest.calledWithExactly({
        method: 'get',
        params: {
          _sort: 'email:asc'
        },
        url: '/users'
      })).toBe(true)
    })

    test('Get Entry Count', async () => {
      const window = await nuxt.renderAndGetWindow(url('/'))
      const strapi = window.$nuxt.$strapi
      const axios = window.$nuxt.$axios
      const axiosRequest = sinon.stub(axios, 'request').resolves({
        data: {}
      })

      await strapi.getEntryCount('users', {
        username_contains: 'john'
      })

      expect(axiosRequest.calledWithExactly({
        method: 'get',
        params: {
          username_contains: 'john'
        },
        url: '/users/count'
      })).toBe(true)
    })

    test('Get Entry', async () => {
      const window = await nuxt.renderAndGetWindow(url('/'))
      const strapi = window.$nuxt.$strapi
      const axios = window.$nuxt.$axios
      const axiosRequest = sinon.stub(axios, 'request').resolves({
        data: {}
      })

      await strapi.getEntry('users', 'id')

      expect(axiosRequest.calledWithExactly({
        method: 'get',
        url: '/users/id'
      })).toBe(true)
    })

    test('Create entry', async () => {
      const window = await nuxt.renderAndGetWindow(url('/'))
      const strapi = window.$nuxt.$strapi
      const axios = window.$nuxt.$axios
      const axiosRequest = sinon.stub(axios, 'request').resolves({
        data: {}
      })

      await strapi.createEntry('users', {
        foo: 'bar'
      })

      expect(axiosRequest.calledWithExactly({
        method: 'post',
        url: '/users',
        data: {
          foo: 'bar'
        }
      })).toBe(true)
    })

    test('Update entry', async () => {
      const window = await nuxt.renderAndGetWindow(url('/'))
      const strapi = window.$nuxt.$strapi
      const axios = window.$nuxt.$axios
      const axiosRequest = sinon.stub(axios, 'request').resolves({
        data: {}
      })

      await strapi.updateEntry('users', 'id', {
        foo: 'bar'
      })

      expect(axiosRequest.calledWithExactly({
        method: 'put',
        url: '/users/id',
        data: {
          foo: 'bar'
        }
      })).toBe(true)
    })

    test('Delete entry', async () => {
      const window = await nuxt.renderAndGetWindow(url('/'))
      const strapi = window.$nuxt.$strapi
      const axios = window.$nuxt.$axios
      const axiosRequest = sinon.stub(axios, 'request').resolves({
        data: {}
      })

      await strapi.deleteEntry('users', 'id')

      expect(axiosRequest.calledWithExactly({
        method: 'delete',
        url: '/users/id'
      })).toBe(true)
    })
  })

  describe('Files', () => {
    test('Search Files', async () => {
      const window = await nuxt.renderAndGetWindow(url('/'))
      const strapi = window.$nuxt.$strapi
      const axios = window.$nuxt.$axios
      const axiosRequest = sinon.stub(axios, 'request').resolves({
        data: {}
      })

      await strapi.searchFiles('foo')

      expect(axiosRequest.calledWithExactly({
        method: 'get',
        url: '/upload/search/foo'
      })).toBe(true)
    })

    test('Get Files', async () => {
      const window = await nuxt.renderAndGetWindow(url('/'))
      const strapi = window.$nuxt.$strapi
      const axios = window.$nuxt.$axios
      const axiosRequest = sinon.stub(axios, 'request').resolves({
        data: {}
      })

      await strapi.getFiles({
        _sort: 'size:asc'
      })

      expect(axiosRequest.calledWithExactly({
        method: 'get',
        params: {
          _sort: 'size:asc'
        },
        url: '/upload/files'
      })).toBe(true)
    })

    test('Get file', async () => {
      const window = await nuxt.renderAndGetWindow(url('/'))
      const strapi = window.$nuxt.$strapi
      const axios = window.$nuxt.$axios
      const axiosRequest = sinon.stub(axios, 'request').resolves({
        data: {}
      })
      await strapi.getFile('id')

      expect(axiosRequest.calledWithExactly({
        method: 'get',
        url: '/upload/files/id'
      })).toBe(true)
    })

    test('Upload file on Node.js', async () => {
      const window = await nuxt.renderAndGetWindow(url('/'))
      const strapi = window.$nuxt.$strapi
      const axios = window.$nuxt.$axios
      const axiosRequest = sinon.stub(axios, 'request').resolves({
        data: {}
      })
      const form = new FormData()
      form.append('files', 'foo', 'file-name.ext')
      await strapi.upload(form)

      expect(axiosRequest.calledWithExactly({
        data: form,
        method: 'post',
        url: '/upload'
      })).toBe(true)
    })
  })
})
