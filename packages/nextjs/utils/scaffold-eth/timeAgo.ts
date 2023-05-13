import { DateTime } from "luxon";

export const timeAgo = (stamp: string) => {
  const dt = DateTime.fromISO(stamp);
  const diff = dt.diffNow().negate();
  const duration = diff.shiftTo("minutes").toObject();
  const minutes = duration.minutes ? Math.round(duration.minutes) : "1";
  if (minutes === 0) {
    return "just now";
  } else if (minutes === 1) {
    return "1 minute ago";
  } else {
    return `${minutes} minutes ago`;
  }
};
