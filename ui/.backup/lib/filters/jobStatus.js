export default () =>
  function jobStatus(job) {
    if (job && job.status) {
      switch (job.status) {
        case 'INACTIVE': return 'Inactive'
        case 'ACTIVE': return 'Active'
        case 'COMPLETED': return 'Completed'
        case 'CANCELLED': return 'Cancelled'
        case 'DELETED': return 'Deleted'
        default: return undefined
      }
    } else {
      return undefined
    }
  }
