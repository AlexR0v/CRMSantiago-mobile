import Moment from 'moment'

export const formatDate = (date: string) => {
  if (date) {
    return Moment(date).format('d-MMM-yyyy')
  }
  return ''
}
