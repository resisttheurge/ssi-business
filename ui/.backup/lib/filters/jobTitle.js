export default ($filter) => {
  'ngInject'
  var limitTo = $filter('limitTo')
    , unwords = $filter('unwords')
  return function jobTitle(job) {
    if (job && job.identifier && job.identifier.prefix && job.identifier.year && job.identifier.label) {
      var prefix = job.identifier.prefix
        , year = job.identifier.year
        , label = job.identifier.label
      return unwords([prefix, limitTo(year, -2), label], '-')
    } else {
      return undefined
    }
  }
}
