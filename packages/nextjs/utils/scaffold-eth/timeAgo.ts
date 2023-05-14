import { DateTime } from "luxon";

export const timeAgo = (stamp: string) => {
  const dt = DateTime.fromISO(stamp);
  const diff = dt.diffNow().negate();
  const duration = diff.shiftTo("hours", "minutes").toObject();
  const hours = duration.hours ? Math.round(duration.hours) : 0;
  const minutes = duration.minutes ? Math.round(duration.minutes) : 0;
  if (hours >= 24) {
    const days = Math.floor(hours / 24);
    if (days === 1) {
      return "1 day ago";
    } else {
      return `${days} days ago`;
    }
  } else if (hours === 0 && minutes === 0) {
    return "just now";
  } else if (hours === 0 && minutes === 1) {
    return "1 minute ago";
  } else if (hours === 0) {
    return `${minutes} minutes ago`;
  } else if (hours === 1 && minutes === 0) {
    return "1 hour ago";
  } else if (hours === 1) {
    return `1 hour and ${minutes} minutes ago`;
  } else if (minutes === 0) {
    return `${hours} hours ago`;
  } else {
    return `${hours} hours and ${minutes} minutes ago`;
  }
};
