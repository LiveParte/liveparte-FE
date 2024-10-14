import { useSelector } from "react-redux";
import { formatMoney } from "../formatMoney";
import { selectCurrentUserData } from "@/store/User";
import { useState } from "react";

export function returnBothCurrencies({
  currencyCode = "USD",
  HeroSectionEvent = [],
  returnJustAmount = false,
  userData = {},
}) {
  
  const isNigeria = userData?.countryInfo?.code === "NG" ? "₦" : "$";

  if (HeroSectionEvent?.tickets?.length === 0) {
    return "";
  }

  //
  const amount =
    Array.isArray(HeroSectionEvent?.tickets) &&
    HeroSectionEvent?.tickets?.find(
      (item) =>
        item?.currency?.code?.toLowerCase() == currencyCode?.toLowerCase() ||
        item?.code?.toLowerCase() == currencyCode?.toLowerCase()
    );
  const amountAlt =
    Array.isArray(HeroSectionEvent?.tickets) &&
    HeroSectionEvent?.tickets[0]?.price;

  if (returnJustAmount) {
    return amount?.price;
  }
  if (!amount) {
    return "";
  }

  // console.log('returnBothCurrencies',amount?.price,amountAlt)

  return userData?._id
    ? `${isNigeria}${formatMoney(amount?.price || amountAlt || "0", false)}`
    : "";
}


export function returnBothCurrenciesII({
  currencyCode = "USD",
  HeroSectionEvent = [],
  returnJustAmount = false,
  userData = {},
}) {
  
  const isNigeria = userData?.countryInfo?.code === "NG" ? "₦" : "$";

  if (HeroSectionEvent?.tickets?.length === 0) {
    return "";
  }

  //
  const amount =
    Array.isArray(HeroSectionEvent?.tickets) &&
    HeroSectionEvent?.tickets?.find(
      (item) =>
        item?.currency?.code?.toLowerCase() == currencyCode?.toLowerCase() ||
        item?.code?.toLowerCase() == currencyCode?.toLowerCase()
    );
  const amountAlt =
    Array.isArray(HeroSectionEvent?.tickets) &&
    HeroSectionEvent?.tickets[0]?.price;

  if (returnJustAmount) {
    return amount?.price;
  }
  if (!amount) {
    return "";
  }

  // console.log('returnBothCurrencies',amount?.price,amountAlt)

  return userData?._id
    ? `${isNigeria}${formatMoney(amount?.price || amountAlt || "0", false)}`
    : "";
}
