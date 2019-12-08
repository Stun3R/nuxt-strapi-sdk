# Setup

### 1. Install Strapi SDK and dependencies
:::: tabs
::: tab yarn
``` bash
yarn add @nuxtjs/auth @nuxtjs/axios @stun3r/nuxt-strapi-sdk
```
:::
::: tab npm
``` bash
npm install @nuxtjs/auth @nuxtjs/axios @stun3r/nuxt-strapi-sdk
```
:::
::::


### 2. Edit `nuxt.config.js`:

```js
modules: [
  '@nuxtjs/axios',
  '@nuxtjs/auth',
  '@stun3r/nuxt-strapi-sdk'
],

axios: {
  baseURL: 'http://your-api-domain/'
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
}
```

::: warning IMPORTANT
When adding `auth-module` to a new Nuxt project ensure you have activated the Vuex store. More information on how to do that can be found on the [Nuxt Getting Started Guide](https://nuxtjs.org/guide/vuex-store).
:::

::: warning IMPORTANT
For more explanation, I invite you to go look at the documentation of [axios-module](https://axios.nuxtjs.org/) & [auth-module](https://auth.nuxtjs.org/). **_But this configuration is the recommended one._**
:::
