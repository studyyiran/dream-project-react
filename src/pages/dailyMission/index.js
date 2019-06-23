import React, { useEffect, useState } from "react";
import ajax from "../../util/ajax";
import dailyMissionServer from "./server";

export default function() {
  useEffect(() => {
    dailyMissionServer.getReviewList().then(res => {
      console.log(res);
    });
  }, []);
  return <div>123</div>;
}
