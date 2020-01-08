const { resolve, join } = require('path')
const { readdirSync } = require('fs')

const libRoot = resolve(__dirname, '..')

export default function (moduleOptions) {
  // Merge all option sources
  const options = Object.assign(moduleOptions, this.options.strapi);

  options.namespace = 'strapi'

  // Copy all core templates
  copyCore.call(this, options)

  // Copy plugin
  copyPlugin.call(this, options)
}

function copyPlugin (options) {
  const { dst } = this.addTemplate({
    src: resolve(libRoot, 'module', 'plugin.js'),
    fileName: join(options.namespace, 'plugin.js'),
    options
  })

  this.options.plugins.push(resolve(this.options.buildDir, dst))

  // Extend auth with plugins
  if (options.plugins) {
    options.plugins.forEach(p => this.options.plugins.push(p))
    delete options.plugins
  }
}

function copyCore (options) {
  const coreRoot = resolve(libRoot, 'core')

  for (const file of readdirSync(coreRoot)) {
    this.addTemplate({
      src: resolve(coreRoot, file),
      fileName: join(options.namespace, file)
    })
  }
}

// REQUIRED if publishing the module as npm package
module.exports.meta = require('../../package.json')
