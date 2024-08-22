export const formatMoney = (amount, koboRes = true,currencySymbol) => {
    if (!amount) return null;
    //ensure all commas are striped from the amount
    amount = String(amount).replace(/,/g, "");
    //split the amount into naira and kobo
    //format the naira and add the kobo at the end of the process
    amount = String(amount).split(".");
    let naira = amount[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let kobo = String(amount[1]);
    if (!kobo || kobo === "undefined") kobo = "00";
    return koboRes ? `${naira}.${kobo}`:`${naira}`;
};


export function isValidJson(str) {
    try {
      JSON.parse(str);
      return true;
    } catch (error) {
      return false;
    }
  }