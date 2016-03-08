import register from './register'

const _registered =
  ([
    'animations',
    'components',
    'configs',
    'constants',
    'controllers',
    'decorators',
    'directives',
    'factories',
    'filters',
    'providers',
    'scripts',
    'services',
    'values'
  ]).reduce((obj, tag) => ({ ...obj, tag: register(tag) }), {})

export default _registered
