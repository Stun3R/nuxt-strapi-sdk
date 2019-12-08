const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '../../..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  modules: ['@nuxtjs/axios', '@nuxtjs/auth', '@@'],
  axios: {
    baseURL: 'https://strapi-host/'
  },
  strapi: {
    plugins: [
      '~/plugins/strapi.js'
    ]
  },
  auth: {
    redirect: {
      login: '/auth',
      logout: '/',
      home: '/'
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/local',
            method: 'post',
            propertyName: 'jwt'
          },
          user: {
            url: '/users/me',
            method: 'get',
            propertyName: false
          },
          logout: false
        },
        tokenRequired: true,
        tokenType: 'bearer'
      }
    }
  }
}
