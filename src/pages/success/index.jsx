import { selectStripPaidEvent, setStripPaidEvent } from "@/store/User";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Index() {
  const router = useRouter();
  const getPayEvent = useSelector(selectStripPaidEvent);
  const dispatch = useDispatch();

  console.log(getPayEvent, router, "getPayEventgetPayEvent");

  useEffect(() => {
    dispatch(setStripPaidEvent({ ...getPayEvent, payment: "success" }));
    // if (getPayEvent?.done===false) {
      router.push(getPayEvent?.pathUrl);
    // }
  }, []);

  return <div></div>;
}
