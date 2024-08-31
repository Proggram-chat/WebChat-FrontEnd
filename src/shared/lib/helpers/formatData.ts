import moment from 'moment';

export const formatDate = (date?: string) => {
  const now = moment();
  const commentDate = moment(date);

  // Якщо повідомлення сьогодні
  if (now.isSame(commentDate, 'day')) {
    return commentDate.format('HH:mm');
  }
  // Якщо повідомлення цього тижня
  else if (now.isSame(commentDate, 'week')) {
    return commentDate.format('dddd');
  }
  // Якщо повідомлення цього року
  else if (now.isSame(commentDate, 'year')) {
    return commentDate.format('D MMMM');
  }
  // Якщо повідомлення з попереднього року
  else {
    return commentDate.format('D MMMM YYYY');
  }
};
