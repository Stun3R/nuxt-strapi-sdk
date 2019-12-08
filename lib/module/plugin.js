import Strapi from './strapi'

export default function (ctx, inject) {
  // Options
  const options = JSON.parse(`<%= JSON.stringify(options) %>`)

  const { namespace } = options

  // Create a new Strapi instance
  const $strapi = new Strapi(ctx, options)

  // Inject it to nuxt context as $strapi
  inject(namespace, $strapi)
  ctx.$strapi = $strapi
}
