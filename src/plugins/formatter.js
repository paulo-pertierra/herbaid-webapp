export default function formatter(date) {
  const dateFormatter = new Intl.DateTimeFormat([], {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });
  const timeFormatter = new Intl.DateTimeFormat([], {
    hour: "numeric",
    minute: "numeric",
  });
  function getHumanFriendlyDateString(iso8601_date_string) {
    const date = new Date(Date.parse(iso8601_date_string));
    // When are today and yesterday?
    const today = new Date();
    const yesterday = new Date().setDate(today.getDate() - 1);
    // We have to compare the *formatted* dates rather than the actual dates --
    // for example, if the UTC date and the localised date fall on either side
    // of midnight.
    if (dateFormatter.format(date) == dateFormatter.format(today)) {
      return "Today at " + timeFormatter.format(date);
    } else if (dateFormatter.format(date) == dateFormatter.format(yesterday)) {
      return "Yesterday at " + timeFormatter.format(date);
    } else {
      return dateFormatter.format(date) + " @ " + timeFormatter.format(date);
    }
  }
  function getHumanFriendlyDelta(iso8601_date_string) {
    const date = new Date(Date.parse(iso8601_date_string));
    const now = new Date();
    const deltaMilliseconds = now - date;
    const deltaSeconds = Math.floor(deltaMilliseconds / 1000);
    const deltaMinutes = Math.floor(deltaSeconds / 60);
    const deltaHours = Math.floor(deltaMinutes / 60);
    if (deltaSeconds < 5) {
      return "just now";
    } else if (deltaSeconds < 60) {
      return deltaSeconds + " seconds ago";
    } else if (deltaMinutes == 1) {
      return "1 minute ago";
    } else if (deltaMinutes < 60) {
      return deltaMinutes + " minutes ago";
    } else if (deltaHours == 1) {
      return "1 hour ago";
    } else if (deltaHours < 6) {
      return deltaHours + " hours ago";
    } else {
      return "";
    }
  }
  function timeFormat(date) {
    let newDate = getHumanFriendlyDelta(date);
    if (newDate) {
      return newDate;
    } else {
      newDate = getHumanFriendlyDateString(date);
    }
    return newDate;
  }
  return timeFormat(date);
}