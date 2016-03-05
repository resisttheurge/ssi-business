'use strict'

angular.module('ssiFilters')
  .filter('unwords', [
    function() {
      return function unwords(array, sep, start, end) {
        var array = array || []
          , sep = sep || ' '
          , start = start || ''
          , end = end || ''
          , result = ''

        if(!angular.isArray(array)) {
          throw new TypeError('input to filter `unwords` must be an array.')
        }
        if(!angular.isString(sep)) {
          throw new TypeError('first argument to filter `unwords` (`sep`) must be a string.')
        }
        if(!angular.isString(start)) {
          throw new TypeError('second argument to filter `unwords` (`start`) must be a string.')
        }
        if(!angular.isString(end)) {
          throw new TypeError('third argument to filter `unwords` (`end`) must be a string.')
        }

        for (var i = 0; i < array.length; i++) {
          result = result + array[i]
          if(i !== array.length - 1){
            result = result + sep
          }
        }

        return start + result + end

      }
    }
  ])
