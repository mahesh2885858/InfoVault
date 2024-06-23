import moment from 'moment';

export function formatMessageDate(timestamp: moment.Moment | Date): string {
  const messageDate = moment(timestamp);
  const today = moment().startOf('day');
  const yesterday = moment().subtract(1, 'days').startOf('day');

  if (messageDate.isSame(today, 'd')) {
    return messageDate.format('HH:MM a');
  } else if (messageDate.isSame(yesterday, 'd')) {
    return 'Yesterday';
  } else {
    return messageDate.format('MM/DD/YY');
  }
}
