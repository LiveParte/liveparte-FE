export const thousand = (amount) => {
    // convert number to string
    let amnt = String(amount).split(".");
    // add commas to numbers before the decimal
    amnt[0] = amnt[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // return comma separated string
    return amnt.join(".");
  };