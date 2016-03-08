export default () =>
  function words(string, sep) {
    var string = string || ''
      , sep = sep || /\s+/
    if (!angular.isString(string)) {
      throw new TypeError('input to filter `words` must be a string')
    }

    if (!angular.isString(sep) && !(sep instanceof RegExp)) {
      throw new TypeError('first argument to filter `words` must be a string or a regex')
    }

    return string.split(sep)
  }
