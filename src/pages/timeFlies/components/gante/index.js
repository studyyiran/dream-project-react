import React, { useState } from "react";
import "./index.scss";
import moment from "moment";
import RenderBlock from "./components/renderBlock";

let maxDate;
/*
props:
  list: [
    attr: {
      name:
      content:
    }
  ]
 */

/*
样式定制
横竖屏。
基本参数。
 */

export default function(props) {
  const { list = [] } = props;
  const [startTime, setStartTime] = useState(moment().subtract(1, "day"));
  const [endTime, setEndTime] = useState(moment());
  return (
    <div>
      <RangeSelect />
      <RenderGanteContainer
        list={list.filter(item => {
          return moment(item.attr.startTime).isSame(startTime, "day");
        })}
      />
    </div>
  );
}

function RangeSelect() {
  return <div>RangeSelect</div>;
}

/*
负责：
  unitStretch 时间轴上的单位长度
  minInterval 最小时间精度
  type 展示的方式（vertical）
 */

function RenderGanteContainer(props) {
  const { list = [] } = props;
  console.log(list);
  if (list && list.length) {
    // 决定了主向量的单位长度
    const unitStretch = 4.8;
    const minInterval = "m";
    const type = "vertical";
    const startCalcTime = moment(list[0].attr.startTime)
      .clone()
      .minute(0);
    return (
      <div className="gante-container">
        <div className="date-container">
          <RenderDateBlockArr
            unitStretch={unitStretch}
            minInterval={minInterval}
            startCalcTime={startCalcTime}
            type={type}
            timeRenderInterval={30}
          />
        </div>
        <div className="item-container">
          <RenderContentBlockArr
            unitStretch={unitStretch}
            list={getModal(list, minInterval, startCalcTime)}
            type={type}
            unitContent={100}
          />
        </div>
      </div>
    );
  } else {
    return null;
  }
}

/*
传入两个时间，转成moment
 */
function RenderDateBlockArr(props) {
  let {
    type,
    startCalcTime,
    minInterval,
    unitStretch,
    timeRenderInterval
  } = props;
  let timeNow = startCalcTime.clone();
  let timeEnd = startCalcTime
    .clone()
    .hour(23)
    .minute(59);
  let arr = [];
  const value = unitStretch * timeRenderInterval;
  let style = type === "vertical" ? { height: value } : { width: value };
  while (moment(timeNow).isBefore(timeEnd)) {
    timeNow.add(timeRenderInterval, minInterval);
    arr.push(
      <DateBlock
        style={style}
        unitStretch={unitStretch}
        key={timeNow.format("HH:mm")}
        content={timeNow.format("HH:mm")}
      />
    );
  }
  return arr;
}

function DateBlock(props) {
  const { content, style } = props;
  return (
    <div className="date-container" style={style}>
      {content}
    </div>
  );
}

/*
根据排布的算法，计算出正确的坐标。
 */
function getModal(list = [], minInterval, startCalcTime) {
  const getWidthPos = getCell()(1);
  return list.map(item => {
    const { attr } = item;
    let { startTime, endTime } = attr;
    startTime = moment(startTime);
    endTime = moment(endTime);
    attr.posInfo = {
      timeStart: startTime.diff(startCalcTime, minInterval),
      timeEnd: endTime.diff(startCalcTime, minInterval),
      contentPos: getWidthPos(attr.timeStart, attr.timeEnd)
    };
    console.log(startTime);
    console.log(startCalcTime);
    return item;
  });

  function getCell() {
    const cell = [[]];
    return value => {
      return (lengthStartPos, lengthEndPos) => {
        let contentPos = 0;
        while (!checkCanFill()) {
          contentPos++;
        }
        fillInto();
        function checkCanFill() {
          let result = true;
          loop((b, a) => {
            if (cell && cell[a] && cell[a][b] && cell[a][b] === true) {
              result = false;
              return "break";
            }
          });
          return result;
        }
        function fillInto() {
          loop((b, a) => {
            if (!cell[a]) {
              cell[a] = [];
            }
            cell[a][b] = true;
          });
        }
        function loop(callBack) {
          for (let length = lengthStartPos; length < lengthEndPos; length++) {
            for (let width = 0; width < value; width++) {
              if (callBack(length, contentPos + width) === "break") {
                break;
              }
            }
          }
        }
        return contentPos;
      };
    };
  }
}

/*
根据坐标，进行渲染。
传入相对坐标，计算出绝对坐标，和绝对大小
 */

function RenderContentBlockArr(props) {
  const { list = [], unitStretch, unitContent, type = "vertical" } = props;
  return list.map(item => {
    const { attr } = item;
    console.log(attr.posInfo);
    const { contentPos, timeStart, timeEnd, contentSpace = 1 } = attr.posInfo;
    const { content, _id } = attr;
    const stretchLength = unitStretch * (timeEnd - timeStart);
    const contentLength = unitContent * contentSpace;
    const stretchPosWithUnit = timeStart * unitStretch;
    const contentPosWithUnit = contentPos * unitContent;
    let posX, posY, width, height;
    if (type === "vertical") {
      posX = contentPosWithUnit;
      posY = stretchPosWithUnit;
      width = contentLength;
      height = stretchLength;
    } else if (type === "h") {
      posX = stretchPosWithUnit;
      posY = contentPosWithUnit;
      width = stretchLength;
      height = contentLength;
    }
    console.log(posX);
    console.log(posY);
    console.log(width);
    console.log(height);
    return (
      <RenderBlock
        key={_id}
        content={content}
        posX={posX}
        posY={posY}
        width={width}
        height={height}
      />
    );
  });
}
