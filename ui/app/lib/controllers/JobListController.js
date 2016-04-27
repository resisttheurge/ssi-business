import { ListController } from 'utils'

export default class JobListController extends ListController {
  /*@ngInject*/
  constructor($q, $route, $filter, $scope, Job, enums, $mdDialog, $mdToast, JobAddresses) {
    super()

    var self = this;

    this.search = {}
    this.total = 0
    $scope.showInactive = false;
    this.query = {
      page: 1,
      limit: 10,
      order: ['identifier.label', 'identifier.year', 'identifier.prefix'],
      filters: {
        active: true
      }
    }

    self.JobAddresses = JobAddresses;

    $scope.$watch('showInactive',
                    function toggle(newValue, oldValue) {
                      if (newValue === true)
                      {
                        self.query.filters = {};
                      } else
                      {
                        self.query.filters = {
                          active: true
                        }
                      }

                      self.getJobs();
                    }
                );

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
          .textContent(`Are you sure you want to delete job ${this.jobTitle(item)}?`)
          .ok('ok')
          .cancel('cancel')
      )
      .then(() => Job.delete(item))
      .then(
        () =>
          $mdToast.show(
            $mdToast.simple()
              .textContent(`Deleted job ${this.jobTitle(item)}`)
              .position('bottom right')
          )
          .then(() => $route.reload()),
        reason => $mdToast.show(
          $mdToast.simple()
            .textContent(`Could not delete job ${this.jobTitle(item)} because ${reason}`)
            .position('bottom right')
          )
      )

    this.attachDisplayAddress = jobs =>
    {
      jobs.forEach(job => {

        JobAddresses.get({ jobId: job.id }).then(address => {

          job.displayAddress =
            {
              city: address.shipping.city,
              state: address.shipping.stateOrProvince
            }

        });

      });
      return jobs;
    }

    self.getJobs = () =>
      this.promise =
        Job.list(this.query.filters)
          .then(::this.jobSearchFilter)
          .then(::this.storeTotal)
          .then(this.attachDisplayAddress)
          .then(this.sort(this.query))
          .then(this.page(this.query))
          .then(::this.store)

    $scope.$watchCollection(() => this.search, (o) => this.getJobs())
    self.getJobs()
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
    return array => {
      order.forEach(constraint => array = this.orderBy(array, constraint));
      return array;
    }
  }

  page({ page, limit }) {
    return array => array.slice((page - 1) * limit, page * limit)
  }

  store(jobs) {
    return this.jobs = jobs
  }

}
