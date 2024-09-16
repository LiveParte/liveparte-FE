import moment from "moment";

export function isPastDate(dateString) {
 // Check if dateString is empty or invalid
 if (!dateString || !moment(dateString, moment.ISO_8601, true).isValid()) {
  return null; // Return null or handle error
}

const inputDate = moment(dateString).startOf('day'); // Normalize to start of the day
const currentDate = moment().startOf('day'); // Normalize current date to start of the day

// Calculate the difference in days

console.log(inputDate.diff(currentDate, 'days'),'inputDate.diff(currentDate')
return inputDate.diff(currentDate, 'days') >=0?false:true;
}
