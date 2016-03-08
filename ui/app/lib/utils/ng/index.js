import register from './register'

export const animations = register('animations')
export const components = register('components')
export const configs = register('configs')
export const constants = register('constants')
export const controllers = register('controllers')
export const decorators = register('decorators')
export const directives = register('directives')
export const factories = register('factories')
export const filters = register('filters')
export const providers = register('providers')
export const scripts = register('scripts')
export const services = register('services')
export const values = register('values')

const _registered = {
  animations,
  components,
  configs,
  constants,
  controllers,
  decorators,
  directives,
  factories,
  filters,
  providers,
  scripts,
  services,
  values
}

export const bundle = function (_bundle = {}) {
  Object.keys(_bundle)
    .filter(key => key in _registered)
    .reduce((module, key) => (module::_registered[key])(_bundle[key]), this)
}

export default {
  ..._registered,
  register,
  bundle
}
