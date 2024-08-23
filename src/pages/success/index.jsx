import { selectStripPaidEvent, setStripPaidEvent } from "@/store/User";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Index() {
  const router = useRouter();
  const getPayEvent = useSelector(selectStripPaidEvent);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setStripPaidEvent({ ...getPayEvent, payment: "success" }));
    // router.push(getPayEvent?.pathUrl || "event");
      router.push("/myshows");

  }, []);

  return <div></div>;
}
