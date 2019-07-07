import React from "react";
import "./index.scss";
import moment from "moment";
import DateBlockArr from "./components/dateBlockArr";
import ContentBlockArr from "./components/contentBlockArr";
/*
负责：
  ganteConfig: {
  unitStretch 时间轴上的单位长度
  minInterval 最小时间精度
  type 展示的方式（vertical）
  }
样式定制
横竖屏。
基本参数
 */
export default function RenderGanteContainer(props) {
  const { list = [], ganteConfig } = props;
  const { type, minInterval, unitStretch } = ganteConfig;
  if (list && list.length) {
    const startCalcTime = moment(list[0].attr.eventStartTime)
      .clone()
      .minute(0);
    return (
      <div className={`${type} gante-container`}>
        <div className={`${type} date-container`}>
          <DateBlockArr
            unitStretch={unitStretch}
            minInterval={minInterval}
            startCalcTime={startCalcTime}
            type={type}
            timeRenderInterval={30}
          />
        </div>
        <div className={`${type} item-container`}>
          <ContentBlockArr
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
根据排布的算法，计算出正确的坐标。
 */
function getModal(list = [], minInterval, startCalcTime) {
  const getWidthPos = getCell()(1);
  return list.map(item => {
    const { attr } = item;
    let { eventStartTime, eventEndTime } = attr;
    eventStartTime = moment(eventStartTime);
    eventEndTime = moment(eventEndTime);
    attr.posInfo = {
      startTimePos: eventStartTime.diff(startCalcTime, minInterval),
      endTimePos: eventEndTime.diff(startCalcTime, minInterval)
    };
    attr.posInfo.contentPos = getWidthPos(
      attr.posInfo.startTimePos,
      attr.posInfo.endTimePos
    );
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
