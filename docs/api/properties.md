# Properties

[Source Code](https://github.com/Stun3R/nuxt-strapi-sdk/blob/master/lib/core/strapi.js)

This module globally injects `$strapi` instance, meaning that you can access it anywhere using `this.$strapi`.
For plugins, asyncData, fetch, nuxtServerInit and Middleware, you can access it from `context.$strapi`.

All properties are reactive. Meaning that you can safely use them in Vue template `v-if` conditions.

## `user`

This object contains details about authenticated user such as name.
You can access it using either `$strapi` or Vuex.
```js
this.$strapi.user
```
