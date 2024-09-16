export function isPastDate(dateString) {
  // Check if dateString is empty or invalid
  if (!dateString || isNaN(Date.parse(dateString))) {
    return false;
  }

  const date = new Date(dateString);

  // Get current UTC date and time
  const now = new Date();

  // Check if the provided date is in the past
  return date < now;
}

