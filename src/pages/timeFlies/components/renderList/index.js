import React, { useState } from "react";
import Gante from "../gante";
import moment from "moment";
/*
props:
  list: [
    attr: {
      name:
      content:
    }
  ]
 */
export default function(props) {
  const { eventStreamList } = props;
  const [rangeStartTime, setRangeStartTime] = useState(
    moment().subtract(2, "day")
  );
  const [isVertical, setVertical] = useState(true);
  console.log(eventStreamList);
  const list = (eventStreamList || []).map(item => {
    const eventStartTime = moment(item.createTime)
      .subtract(item.duration, "ms")
      .format();
    const eventEndTime = item.createTime;
    return {
      attr: {
        ...item,
        name: item.content,
        eventStartTime,
        eventEndTime
      }
    };
  });
  const ganteConfig = {
    unitStretch: 4.8, // 决定了主向量的单位长度
    minInterval: "m",
    type: isVertical ? "vertical" : "horizontal"
    // type: "horizontal"
  };
  return (
    <div>
      <div
        onClick={() => {
          setVertical(value => {
            return !value;
          });
        }}
      >
        setVertical
      </div>
      <RangeSelect
        onChangeDate={date => {
          setRangeStartTime(date);
        }}
      />
      <Gante
        ganteConfig={ganteConfig}
        list={list.filter(item => {
          return moment(item.attr.eventStartTime).isSame(rangeStartTime, "day");
        })}
      />
    </div>
  );
}

function RangeSelect(props) {
  const { onChangeDate } = props;
  return <div>RangeSelect</div>;
}
