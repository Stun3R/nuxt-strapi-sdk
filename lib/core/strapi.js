export default class Strapi {
  constructor (ctx) {
    this.ctx = ctx
  }

  get user () {
    return this.ctx.app.$auth.user
  }

  /**
   * Axios basic request
   * @param {string} method - Request method type
   * @param {string} url - Server URL
   * @param {AxiosRequestConfig} requestConfig - Custom Axios config
   */
  async request (method, url, requestConfig = {}) {
    try {
      const response = await this.ctx.app.$axios.request({
        method,
        url,
        ...requestConfig
      })
      return response.data
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message)
      } else {
        throw error
      }
    }
  }

  /**
   * Register a new user.
   * @param {string} username
   * @param {string} email
   * @param {string} password
   */
  register (username, email, password) {
    return this.request('post', '/auth/local/register', {
      data: {
        username,
        email,
        password
      }
    })
  }

  /**
   * Login by getting an authentication token.
   * @param {string} identifier - Can either be an email or a username.
   * @param {string} password
   */
  login (identifier, password) {
    return this.ctx.$auth.loginWith('local', {
      data: {
        identifier,
        password
      }
    })
  }

  /**
   * Logout by removing authentication token.
   */
  logout () {
    return this.ctx.$auth.logout()
  }

  /**
   * Sends an email to a user with the link of your reset password page.
   * This link contains an URL param code which is required to reset user password.
   * Received link url format https://my-domain.com/reset-password?code=privateCode.
   * @param {string} email
   */
  forgotPassword (email) {
    return this.request('post', '/auth/forgot-password', {
      data: {
        email
      }
    })
  }

  /**
   * Reset the user password.
   * @param {string} code - Is the url params received from the email link (see forgot password).
   * @param {string} password
   * @param {string} passwordConfirmation
   */
  resetPassword (code, password, passwordConfirmation) {
    return this.request('post', '/auth/reset-password', {
      data: {
        code,
        password,
        passwordConfirmation
      }
    })
  }

  // TODO: Add provider

  /**
   * List entries
   * @param {string} contentTypePluralized - Type of entry pluralized
   * @param {object} params - Filter and order queries.
   */
  getEntries (contentTypePluralized, params = {}) {
    return this.request('get', `/${contentTypePluralized}`, {
      params: params
    })
  }

  /**
   * Get the total count of entries with the provided criteria
   * @param {string} contentTypePluralized - Type of entry pluralized
   * @param {object} params - Filter and order queries.
   */
  getEntryCount (contentTypePluralized, params = {}) {
    return this.request('get', `/${contentTypePluralized}/count`, {
      params: params
    })
  }

  /**
   * Get a specific entry
   * @param {string} contentTypePluralized - Type of entry pluralized
   * @param id - ID of entry
   */
  getEntry (contentTypePluralized, id) {
    return this.request('get', `/${contentTypePluralized}/${id}`)
  }

  /**
   * Create an entry
   * @param {string} contentTypePluralized - Type of entry pluralized
   * @param {object} data - New entry
   */
  createEntry (contentTypePluralized, data) {
    return this.request('post', `/${contentTypePluralized}`, {
      data
    })
  }

  /**
   * Update an entry
   * @param {string} contentTypePluralized - Type of entry pluralized
   * @param id - ID of entry
   * @param {object} data
   */
  updateEntry (contentTypePluralized, id, data) {
    return this.request('put', `/${contentTypePluralized}/${id}`, {
      data
    })
  }

  /**
   * Delete an entry
   * @param {string} contentTypePluralized - Type of entry pluralized
   * @param id ID of entry
   */
  deleteEntry (contentTypePluralized, id) {
    return this.request('delete', `/${contentTypePluralized}/${id}`)
  }

  /**
   * Search for files
   * @param {string} query - Keywords
   */
  searchFiles (query) {
    return this.request('get', `/upload/search/${decodeURIComponent(query)}`)
  }

  /**
   * Get files
   * @param {object} params - Filter and order queries
   * @returns Promise<Object[]> Files data
   */
  getFiles (params = {}) {
    return this.request('get', '/upload/files', {
      params: params
    })
  }

  /**
   * Get file
   * @param id ID of entry
   */
  getFile (id) {
    return this.request('get', `/upload/files/${id}`)
  }

  /**
   * Upload files
   *
   * ### Browser example
   * ```js
   * const form = new FormData();
   * form.append('files', fileInputElement.files[0], 'file-name.ext');
   * form.append('files', fileInputElement.files[1], 'file-2-name.ext');
   * const files = await strapi.upload(form);
   * ```
   *
   * ### Node.js example
   * ```js
   * const FormData = require('form-data');
   * const fs = require('fs');
   * const form = new FormData();
   * form.append('files', fs.createReadStream('./file-name.ext'), 'file-name.ext');
   * const files = await strapi.upload(form, {
   *   headers: form.getHeaders()
   * });
   * ```
   *
   * @param {formData} data - FormData
   * @param {object} requestConfig
   */
  upload (data, requestConfig = {}) {
    return this.request('post', '/upload', {
      data,
      ...requestConfig
    })
  }
}
