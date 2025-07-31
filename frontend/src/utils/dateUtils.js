import { format, isToday, formatDistanceToNow, isYesterday } from "date-fns";

export const formatDate = (dateString) => {
  // Handle empty or null dateString
  if (!dateString) {
    return ""; // Return an empty string for invalid input
  }

  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return ""; // Return an empty string for invalid dates
  }

  if (isToday(date)) {
    return formatDistanceToNow(date, { addSuffix: true });
  } else if (isYesterday(date)) {
    return "Yesterday";
  } else {
    return format(date, "PP");
    // Example format: 'Jul 11 2024'
  }
};

/**
 * Formats a date string to display both the date and time.
 *
 * @param {string} dateString The date string, typically from MongoDB.
 * @returns {string} The formatted date and time string (e.g., 'Jul 11, 2024 at 10:30 AM').
 */
export const formatDateTime = (dateString) => {
  // Handle empty or null dateString
  if (!dateString) {
    return ""; // Return an empty string for invalid input
  }

  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return ""; // Return an empty string for invalid dates
  }
  // 'PPpp' is a date-fns format string that includes both date and time.
  // Example: 'Jul 11, 2024 at 10:30 AM'
  return format(date, "PPpp");
};


/**
 * Formats a date string for use in an HTML input of type "datetime-local".
 * The required format is YYYY-MM-DDThh:mm.
 *
 * @param {string} dateString The date string, typically from MongoDB.
 * @returns {string} The formatted date string suitable for datetime-local input (e.g., '2024-07-11T10:30').
 */
export const formatDateForDatetimeLocal = (dateString) => {
  // Handle empty or null dateString
  if (!dateString) {
    return ""; // Return an empty string for invalid input
  }

  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return ""; // Return an empty string for invalid dates
  }

  // 'yyyy-MM-dd'T'HH:mm' is the specific format required by <input type="datetime-local">
  return format(date, "yyyy-MM-dd'T'HH:mm");
};