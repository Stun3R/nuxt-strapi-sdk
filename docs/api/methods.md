# Methods

[Source Code](https://github.com/Stun3R/nuxt-strapi-sdk/blob/master/lib/core/strapi.js)

This module globally injects `$strapi` instance, meaning that you can access it anywhere using `this.$strapi`.
For plugins, asyncData, fetch, nuxtServerInit and Middleware, you can access it from `context.$strapi`.

All properties are reactive. Meaning that you can safely use them in Vue template `v-if` conditions.

## `request(method, url, requestConfig)`
Basic Axios request.
```js
await this.$strapi.request()
```

## `register(username, email, password)`
Register a new user.
```js
await this.$strapi.register('username', 'email', 'password')
```

## `login(identifier, password)`
Login through the auth module.
```js
await this.$strapi.login('username_or_email', 'password')
```

## `logout()`
Logout by removing authentication token.
```js
await this.$strapi.logout()
```

## `forgotPassword(email)`
Sends an email to a user with the link of your reset password page.
```js
await this.$strapi.forgotPassword('email')
```

## `resetPassword(code, password, passwordConfirmation)`
Reset the user password.
```js
await this.$strapi.resetPassword('code', 'password', 'confirm')
```

## `getEntries(contentTypePluralized, params)`
List entries
```js
const restaurants = await this.$strapi.getEntries('restaurants')
```

## `getEntryCount(contentTypePluralized, params)`
Get the total count of entries with the provided criteria.
```js
const restaurantsCount = await this.$strapi.getEntryCount('restaurants')
```

## `getEntry(contentTypePluralized, id)`
Get a specific entry.
```js
const restaurant = await this.$strapi.getEntry('restaurants', 'id')
```

## `createEntry(contentTypePluralized, data)`
Create entry.
```js
const newRestaurant = await this.$strapi.createEntry('restaurants', { name: 'La Baguette' })
```

## `updateEntry(contentTypePluralized, id, data)`
Update entry.
```js
const updateRestaurant = await this.$strapi.updateEntry('restaurants', 'id', { name: 'La Baguette' })
```

## `deleteEntry(contentTypePluralized, id)`
Delete an entry.
```js
await this.$strapi.deleteEntry('restaurants', 'id')
```

## `searchFiles(query)`
Search for files.
```js
const search = await this.$strapi.searchFiles('query')
```

## `getFiles(params)`
Get files.
```js
const files = await this.$strapi.getFiles({ _sort: 'size:asc' })
```

## `getFile(id)`
Get file.
```js
const file = await this.$strapi.getFile('id')
```

## `upload(data, requestConfig )`
Upload files.

- Browser example
```js
const form = new FormData();
form.append('files', fileInputElement.files[0], 'file-name.ext');
form.append('files', fileInputElement.files[1], 'file-2-name.ext');
const files = await this.$strapi.upload(form);
```

- Node.js example
```js
const FormData = require('form-data');
const fs = require('fs');
const form = new FormData();
form.append('files', fs.createReadStream('./file-name.ext'), 'file-name.ext');
const files = await strapi.upload(form, {
   headers: form.getHeaders()
});
```
