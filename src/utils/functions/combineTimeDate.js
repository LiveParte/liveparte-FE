import moment from "moment";

export function combineDateTime({ eventDate, eventTime }) {
    const combinedDateTime = moment(eventDate)
      .set({
        hour: moment(eventTime, 'hh:mm A').hour(),
        minute: moment(eventTime, 'hh:mm A').minute()
      })
      .toISOString();
  
    return combinedDateTime;
  }
  