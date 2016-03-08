import { strip } from 'utils'

const _arrayTags = {
  configs: 'config',
  scripts: 'run'
}

const _objectTags = {
  animations: 'animation',
  components: 'component',
  constants: 'constant',
  controllers: 'controller',
  decorators: 'decorator',
  directives: 'directive',
  factories: 'factory',
  filters: 'filter',
  providers: 'provider',
  services: 'service',
  values: 'value'
}

export const _allTags = {
  ..._arrayTags,
  ..._objectTags
}

const _validArrayTag = tag => tag in _arrayTags
const _validObjectTag = tag => tag in _objectTags
const _validTag = tag => _validArrayTag(tag) || _validObjectTag(tag)

const _registerArray =
  tag =>
    function _registerArray(...registrees) {
      const module = this
      return registrees.reduce(
        (_module, _registree) => _module[_arrayTags[tag]](_registree),
        module
      )
    }

const _registerObject =
  tag =>
    function _registerObject(registrees = {}) {
      const module = this
      return Object.keys(registrees).reduce(
        (_module, key) => _module[_objectTags[tag]](key, registrees[key]),
        module
      )
    }

const register = tag => {
  if (!_validTag(tag)) {
    throw new TypeError(strip`
      | invalid angular registration tag.
      | tag must be one of:
      |   ${JSON.stringify([...Object.keys(_allTags)])}
      | but got:
      |   ${tag}
      `)
  }

  if (_validArrayTag(tag)) {
    return _registerArray(tag)
  } else {
    return _registerObject(tag)
  }
}

export default register
