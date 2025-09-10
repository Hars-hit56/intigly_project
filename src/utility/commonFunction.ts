import moment from 'moment';

export const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
};

export function uploadedTime(value: string) {
  const specificDate = moment(value);
  const now = moment();

  const diffInSeconds = now.diff(specificDate, 'seconds');
  const diffInMinutes = now.diff(specificDate, 'minutes');
  const diffInHours = now.diff(specificDate, 'hours');
  const diffInDays = now.diff(specificDate, 'days');
  const diffInMonths = now.diff(specificDate, 'months');
  const diffInYears = now.diff(specificDate, 'years');

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s ago`;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else if (diffInDays < 30) {
    return `${diffInDays}d ago`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths}mon ago`;
  } else {
    return `${diffInYears}y ago`;
  }
}
