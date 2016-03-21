import { ListController } from 'utils'

export default class JobListController extends ListController {
  /*@ngInject*/
  constructor($q, $filter, $scope, Job, enums, $mdDialog, $mdToast) {
    super()
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

    this.jobTitle = $filter('jobTitle')
    this.jobStatus = $filter('jobStatus')
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

    this.delete = item =>
      $mdDialog.show(
        $mdDialog.confirm()
          .title(`Are you sure?`)
          .textContent(`Are you sure you want to delete job ${item.label}?`)
          .ok('ok')
          .cancel('cancel')
      )
      .then(() => Job.delete(item))
      .then(
        () =>
          $mdToast.show(
            $mdToast.simple()
              .textContent(`Deleted job ${item.label}`)
              .position('bottom right')
          )
          .then(() => $route.reload()),
        reason => $mdToast.show(
          $mdToast.simple()
            .textContent(`Could not delete job ${item.label} because ${reason}`)
            .position('bottom right')
          )
      )

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
