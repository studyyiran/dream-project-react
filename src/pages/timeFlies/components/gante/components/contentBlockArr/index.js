/*
根据坐标，进行渲染。
传入相对坐标，计算出绝对坐标，和绝对大小
 */

import RenderBlock from "../renderBlock";
import React from "react";
import moment from "moment";

export default function RenderContentBlockArr(props) {
  const { list = [], unitStretch, unitContent, type = "vertical" } = props;
  return list.map(item => {
    const { attr } = item;
    const {
      contentPos,
      startTimePos,
      endTimePos,
      contentSpace = 1
    } = attr.posInfo;
    const { content, _id, eventType } = attr;
    const eventTypeToColor = {
      dream: 1,
      studytodo: 2,
      review: 3
    };
    const { eventStartTime, eventEndTime } = attr;
    const stretchLength = unitStretch * (endTimePos - startTimePos);
    const contentLength = unitContent * contentSpace;
    const stretchPosWithUnit = startTimePos * unitStretch;
    const contentPosWithUnit = contentPos * unitContent;
    let posX, posY, width, height;
    if (type === "vertical") {
      posX = contentPosWithUnit;
      posY = stretchPosWithUnit;
      width = contentLength;
      height = stretchLength;
    } else if (type === "horizontal") {
      posX = stretchPosWithUnit;
      posY = contentPosWithUnit;
      width = stretchLength;
      height = contentLength;
    }
    return (
      <RenderBlock
        type={eventTypeToColor[eventType]}
        key={_id}
        content={
          <div>
            <span>
              {moment(eventStartTime).format("HH:mm")}—
              {moment(eventEndTime).format("HH:mm")}
            </span>
            <br />
            <span>{content}</span>
          </div>
        }
        posX={posX}
        posY={posY}
        width={width}
        height={height}
      />
    );
  });
}
