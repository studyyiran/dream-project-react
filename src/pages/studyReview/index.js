import React, { useEffect, useState } from "react";
import sudtyReviewServer from "./server";

export default function() {
  return <div>123</div>
  useEffect(() => {
    sudtyReviewServer.getReviewList().then(res => {
      console.log(res);
    });
  }, []);
  return <div>123</div>;
}
