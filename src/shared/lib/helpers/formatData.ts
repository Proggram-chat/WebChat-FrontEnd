import moment from 'moment';

export const formatDate = (date?: string) => {
  const now = moment();
  const commentDate = moment(date);
  if (now.diff(commentDate, 'hours') < 24) {
    return commentDate.fromNow();
  } else {
    return commentDate.subtract(10, 'days').calendar();
  }
};
