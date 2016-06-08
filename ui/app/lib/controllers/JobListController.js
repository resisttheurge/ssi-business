import { ListController } from 'utils'

export default class JobListController extends ListController {
  /*@ngInject*/
  constructor($q, $route, $filter, $scope, Job, enums, $mdDialog, $mdToast, JobAddresses, Customer, JobSearchParameters) {
    super()

    var self = this;

    var jobBatchSize = 100;

    this.Job = Job;

    self.JobSearchParameters = JobSearchParameters;

    self.searchPrompt = function (event) {
      $mdDialog.show({
        clickOutsideToClose: true,
        scope: $scope,
        preserveScope: true,
        template: `<md-dialog-content>
                <form name="searchForm">
                <md-content flex layout-padding>

                <div ng-model="$jobs.search" type=text style="margin-bottom=0px;">
                  <label style="margin-right: 15px;">Job Number</label>
                  <md-input-container style="margin-top: 0px; margin-right: 20px; width: 50px;">
                    <md-select ng-model="$jobs.JobSearchParameters.prefix" style="width: 50px;">
                      <md-option ng-repeat="prefix in $jobs.prefixes" ng-value="prefix">
                             {{prefix}}
                      </md-option>
                    </md-select>
                  </md-input-container>
                    -
                  <md-input-container style="margin-top: 24px; width: 50px;">
                    <input ng-model="$jobs.JobSearchParameters.year" type="number">
                  </md-input-container>
                    -
                  <md-input-container style="margin-top: 24px; width: 125px;">
                    <input ng-model="$jobs.JobSearchParameters.label" type="text">
                  </md-input-container>
                </div>

                <label class="md-block" flex>Customer</label>
                <md-autocomplete
                    md-selected-item="$jobs.JobSearchParameters.customer"
                    md-search-text="customerSearchText"
                    md-items="customer in queryCustomers(customerSearchText)"
                    md-item-text="customer.label"
                    md-floating-label="Customer" layout-margin>
                  <span>{{customer.label}}</span>
                </md-autocomplete>

                <label class="md-block" flex>Location</label>
                <div layout="row">

                 <md-input-container flex="70">
                    <label>City</label>
                    <input name="city" ng-model="$jobs.JobSearchParameters.city">
                 </md-input-container>



                 <md-input-container flex="30">
                    <label>State</label>
                    <input name="state" ng-model="$jobs.JobSearchParameters.state">
                 </md-input-container>

                 </div>

                 <label class="md-block" flex>Description</label>
                 <md-input-container class="md-block">
                    <label>Description</label>
                    <input name="description" ng-model="$jobs.JobSearchParameters.description">
                 </md-input-container>

                 <label class="md-block" flex>Start Date</label>
                 <div class="md-block" layout = "row">

                 <div flex = "50">
                    <label>From</label>
                    <md-datepicker ng-model="$jobs.JobSearchParameters.startDateBefore"></md-datepicker>
                 </div>

                 <div flex = "50">
                    <label>Until</label>
                    <md-datepicker ng-model="$jobs.JobSearchParameters.startDateAfter"></md-datepicker>
                 </div>

                 </div>

                 <label class="md-block" flex>End Date</label>
                 <div class="md-block" layout = "row">

                 <div flex = "50">
                    <label>From</label>
                    <md-datepicker ng-model="$jobs.JobSearchParameters.endDateBefore"></md-datepicker>
                 </div>

                 <div flex = "50">
                    <label>Until</label>
                    <md-datepicker ng-model="$jobs.JobSearchParameters.endDateAfter"></md-datepicker>
                 </div>

                 </div>

                 <section layout="row" layout-sm="column" layout-align="center center" layout-wrap>
                    <md-button class="md-raised md-primary" ng-click="done()">Done</md-button>
                    <md-button class="md-raised md-warn" ng-click="clear()">Clear</md-button>
                 </section>

                 </md-content>
               </form>
            </md-dialog-content>`,
        controller: function SearchController($scope, $mdDialog, $unpack, $filter, $q, JobSearchParameters) {

          $scope.$jobs = self;

          function filter(expression, comparator) {
            return function (array) {
              return $q(function (resolve, reject) {
                return resolve($filter('filter')(array, expression, comparator))
              })
            }
          }

          $scope.queryCustomers = function queryCustomers(expression) {
            return Customer.endpoint.query().$promise.then($unpack).then(filter(expression))
          }

          $scope.done = function () {
            $mdDialog.hide();
          }

          $scope.clear = function () {
            for (var member in JobSearchParameters) delete JobSearchParameters[member];
            $scope.customerSearchText = undefined;
          }
        }
      });
    };

    this.search = {}
    this.total = 0
    this.query = {
      page: 1,
      limit: 10,
      order: ['identifier.label', 'identifier.year', 'identifier.prefix'],
      filters: {
        active: true
      }
    }

    self.JobAddresses = JobAddresses;

    $scope.$watch('$jobs.Job.showInactive',
                    function toggle(newValue, oldValue) {

                      if (newValue === oldValue)
                        return;

                      if (newValue === true)
                      {
                        self.query.filters = {};
                      } else
                      {
                        self.query.filters = {
                          active: true
                        }
                      }

                      Job.cacheInvalid = true;
                      self.getJobs();
                    }
                );

    this.refresh = function ()
    {
      Job.cacheInvalid = true;
      self.getJobs();
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

    this.processAddressBatch = (jobs, jobBatchSize) =>
    {
      // let promiseResults = [];
      // let batch =  [];

      return jobs.length === 0
        ? $q.resolve([])
        : $q.all(
          jobs
            .slice(0, jobBatchSize)
            .map(
              job =>
                JobAddresses
                  .get({ jobId: job.id })
                  .then(
                    address => ({
                      ...job,
                      displayAddress: {
                        city: address.shipping.city,
                        state: address.shipping.stateOrProvince
                      }
                    })
                  )
            )
          ).then(
            updated =>
              this.processAddressBatch(jobs.slice(jobBatchSize), jobBatchSize)
                .then(
                  processed =>
                    [...updated, ...processed]
                  )
          )

    }

    this.database101 = jobs =>
    {
      if (Job.attachAddressess) {
        Job.attachAddressess = false;
        return this.processAddressBatch(jobs, 1000).then(result => Job.cache = result);
      } else {
        return $q.resolve(jobs);
      }

      // return jobs;
    }

    self.getJobs = () =>
      this.promise =
        Job.list(this.query.filters)
          .then(::this.jobSearchFilter)
          .then(::this.storeTotal)
          .then(this.sort(this.query))
          .then(this.page(this.query))
          .then(::this.store)

    $scope.$watchCollection(() => this.JobSearchParameters,
      (o) => {
        this.getJobs();
        this.query.page = 1;
      })
    self.getJobs()
  }

  jobSearchFilter(jobs) {
    console.dir(jobs)
    return this.JobSearchParameters
      ? jobs.filter(job =>
          job.identifier.prefix === (this.JobSearchParameters.prefix || job.identifier.prefix)
            && `${job.identifier.year}`
                .substring(2, 4)
                .match(new RegExp(`^${this.JobSearchParameters.year || ''}.*`))
            && job.identifier.label
                .toUpperCase()
                .match(new RegExp(`^${(this.JobSearchParameters.label || '').toUpperCase()}.*`))
            && (job.customer !== undefined && job.customer.label
                .toUpperCase()
                .match(new RegExp(`^${((this.JobSearchParameters.customer && this.JobSearchParameters.customer.label) || '').toUpperCase()}.*`)))
            && (this.JobSearchParameters.city === undefined || (job.addresses.shipping.city && job.addresses.shipping.city
                .toUpperCase()
                .match(new RegExp(`^${(this.JobSearchParameters.city || '').toUpperCase()}.*`))))
            && (this.JobSearchParameters.state === undefined || (job.addresses.shipping.stateOrProvince && job.addresses.shipping.stateOrProvince
                .toUpperCase()
                .match(new RegExp(`^${(this.JobSearchParameters.state || '').toUpperCase()}.*`))))
            && (job.description === undefined || job.description
                .toUpperCase()
                .match(new RegExp(`.*${(this.JobSearchParameters.description || '').toUpperCase()}.*`)))
            && (this.JobSearchParameters.startDateBefore === undefined || (job.startDate && Date.parse(job.startDate) >= Date.parse(this.JobSearchParameters.startDateBefore)))
            && (this.JobSearchParameters.startDateAfter === undefined || (job.startDate && Date.parse(job.startDate) <= Date.parse(this.JobSearchParameters.startDateAfter)))
            && (this.JobSearchParameters.endDateBefore === undefined || (job.endDate && Date.parse(job.endDate) >= Date.parse(this.JobSearchParameters.endDateBefore)))
            && (this.JobSearchParameters.endDateAfter === undefined || (job.endDate && Date.parse(job.endDate) <= Date.parse(this.JobSearchParameters.endDateAfter)))

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
