export default class JobListController {
  /*@ngInject*/
  constructor($q, $filter, $scope, Job, enums) {
    this.search = {}
    this.total = 0
    this.query = {
      page: 1,
      limit: 10,
      order: 'id',
      filters: {
        active: true
      }
    }

    this.orderBy = $filter('orderBy')
    this.prefixes = enums.prefixes

    this.onPaginate = (page, limit) => {
      this.query = { ...this.query, page, limit }
      return this.getJobs()
    }

    this.onReorder = order => {
      this.query = { ...this.query, order }
      return this.getJobs()
    }

    this.getJobs = () =>
      this.promise =
        Job.list(this.query.filters)
          .then(::this.jobSearchFilter)
          .then(::this.storeTotal)
          .then(this.sort(this.query))
          .then(this.page(this.query))
          .then(::this.store)

    $scope.$watchCollection(() => this.search, (o) => this.getJobs())
    this.getJobs()
  }

  jobSearchFilter(jobs) {
    return this.search
      ? jobs.filter(job =>
        job.identifier.prefix === (this.search.prefix || job.identifier.prefix)
          && `${job.identifier.year}`
              .substring(2, 4)
              .match(new RegExp(`^${this.search.year || ''}.*`))
          && job.identifier.label
              .toUpperCase()
              .match(new RegExp(`^${(this.search.label || '').toUpperCase()}.*`))
      )
      : jobs
  }

  storeTotal(array) {
    this.total = array.length
    return array
  }

  sort({ order }) {
    return array => this.orderBy(array, order)
  }

  page({ page, limit }) {
    return array => array.slice((page - 1) * limit, page * limit)
  }

  store(jobs) {
    return this.jobs = jobs
  }

}
