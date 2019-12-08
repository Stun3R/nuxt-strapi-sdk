import { resolve } from 'path'

module.exports = {
  rootDir: resolve(__dirname, '../..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  modules: ['@nuxtjs/markdownit', '@nuxtjs/axios', '@nuxtjs/auth', '@@'],
  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    injected: true
  },
  plugins: ['@/plugins/antd-ui'],
  css: [
    { src: 'ant-design-vue/dist/antd.less', lang: 'less' },
    { src: '@/assets/scss/main.scss', lang: 'scss' }
  ],
  axios: {
    baseURL: 'https://strapi-host-tests.herokuapp.com'
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
  },
  router: {
    middleware: ['auth']
  },
  build: {
    /*
     ** You can extend webpack config here
     */
    extractCSS: true,
    extend(config, ctx) {},
    loaders: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#00C889'
        }
      }
    }
  }
}
