module.exports = {
  title: 'Strapi SDK',
  description: 'Easy integration Strapi with Nuxt.js',
  head: [
    ['link', { rel: "shortcut icon", href: "/favicon.ico"}]
  ],
  configureWebpack: {
    resolve: {
      alias: {
        '@': '/'
      }
    }
  },
  plugins: [ 'vuepress-plugin-element-tabs' ],
  themeConfig: {
    repo: 'Stun3R/nuxt-strapi-sdk',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    sidebar: {
      '/': [
        {
          title: '📚 Guide',
          collapsable: false,
          children: [
            '/',
            '/guide/setup',
          ]
        },
        {
          title: '🚀 API',
          collapsable: false,
          children: [
            '/api/properties',
            '/api/methods'
          ]
        },
      ]
    }
  }
}
