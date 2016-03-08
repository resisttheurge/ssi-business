export default () =>
  function jobStatus(job) {
    if (job && job.status) {
      switch (job.status) {
        case 'INACTIVE': return 'Inactive'
        case 'ACTIVE': return 'Active'
        case 'COMPLETED': return 'Completed'
        case 'CANCELLED': return 'Cancelled'
        case 'DELETED': return 'Deleted'
      }
    } else {
      throw new TypeError(strip`
        | input to the jobStatus filter must be a job object with a valid status field
        `)
    }
  }
