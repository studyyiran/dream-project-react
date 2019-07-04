import React from "react";
import Gante from "../gante";
import moment from "moment";

export default function(props) {
  const { eventStreamList } = props;
  console.log(eventStreamList);
  return (
    <div>
      <Gante
        list={(eventStreamList || [])
          .map(item => {
            const startTime = moment(item.createTime)
              .subtract(item.duration, "ms")
              .format();
            const endTime = item.createTime;
            return {
              attr: {
                ...item,
                name: item.content,
                startTime,
                endTime,
                stageStartTime: startTime,
                stageEndTime: endTime
              }
            };
          })
          .filter((item, index) => {
            return index;
            return index < 10;
          })}
      />
    </div>
  );
}
