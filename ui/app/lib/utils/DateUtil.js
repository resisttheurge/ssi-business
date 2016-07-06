import AbstractController from './AbstractController'

export default class DateUtil extends AbstractController{
  constructor() {
    super()

    var newDate = function stringToDate(dateString) {
        var newDate = new Date(dateString)
        return newDate
      }

    var newDateString = function getFormattedDate(date) {
      var year      = date.getFullYear()
      var month     = (1 + date.getMonth()).toString()
      month         = month.length > 1 ? month : '0' + month
      var day       = date.getDate().toString()
      day           = day.length > 1 ? day : '0' + day
      return month  + '/' + day + '/' + year
    }

  }
}
