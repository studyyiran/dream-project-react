import React from "react";

export default function RenderTimer(props) {
  const { timer } = props;
  const arr = ["天", "时", "分", "秒"];
  let timeString = "";
  (timer || []).forEach((item, index) => {
    if (index === 0) {
      if (item) {
        timeString = `${item}天`;
      }
    } else {
      timeString = timeString + `${item}`;
      if (index !== arr.length - 1) {
        if (index !== 0) {
          timeString = timeString + ":";
        }
      }
    }
  });
  return timeString;
}
