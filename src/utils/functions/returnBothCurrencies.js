import { useSelector } from "react-redux";
import { formatMoney } from "../formatMoney";
import { selectCurrentUserData } from "@/store/User";
import { useState } from "react";

export function returnBothCurrencies({
    currencyCode = "USD",
    HeroSectionEvent = [],
    returnJustAmount = false,
    userData = {}
  }) {
    // const []=useState()
    // Always call useSelector without conditions
  
    const isNigeria = userData?.countryInfo?.code === "NG" ? "₦" : "$";
  
    if (HeroSectionEvent?.length === 0) {
      return '';
    }
  
    const amount =
      Array.isArray(HeroSectionEvent?.tickets) &&
      HeroSectionEvent?.tickets?.find(
        (item) => item?.currency?.code === currencyCode
      );
      const amountAlt=Array.isArray(HeroSectionEvent?.tickets)&& HeroSectionEvent?.tickets[0]?.price


      console.log(amount,amountAlt,HeroSectionEvent,'amountamountamountamount')



  
     
    if (returnJustAmount) {
      return amount?.price;
    }
    if(!amount){
        return ''
    }
  
    return `${isNigeria}${formatMoney(amount?.price||amountAlt, false)}`;
  }
  