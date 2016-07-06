export default class $convertDate{
/*@ngInject*/
constructor() {

}

  stringToDate(dateString) {
    var newDate = new Date(dateString + ' 06:00:00')
    return newDate
  }

  getFormattedDate(date) {
      var year      = date.getFullYear()
      var month     = (1 + date.getMonth()).toString()
      month         = month.length > 1 ? month : '0' + month
      var day       = date.getDate().toString()
      day           = day.length > 1 ? day : '0' + day
      return month  + '/' + day + '/' + year
    }

}
