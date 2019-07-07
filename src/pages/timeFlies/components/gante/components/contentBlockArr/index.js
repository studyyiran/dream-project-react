
/*
根据坐标，进行渲染。
传入相对坐标，计算出绝对坐标，和绝对大小
 */

import RenderBlock from "../renderBlock";
import React from "react";

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
    const { content, _id } = attr;
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
        key={_id}
        content={content + eventStartTime + eventEndTime}
        posX={posX}
        posY={posY}
        width={width}
        height={height}
      />
    );
  });
}
