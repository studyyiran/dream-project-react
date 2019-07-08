import React from "react";
import "./index.scss";
import moment from "moment";
import DateBlockArr from "./components/dateBlockArr";
import ContentBlockArr from "./components/contentBlockArr";
import listMapAddPosInfo from "./listMapAddPosInfo";
/*
  props:
    list: []
    ganteConfig: {
      unitStretch 时间轴上的单位长度
      minInterval 最小时间精度
      type 展示的方式（vertical）
    }
 */
export default function RenderGanteContainer(props) {
  const { list = [], ganteConfig = {} } = props;
  const { type } = ganteConfig;
  if (list && list.length) {
    const startCalcTime = moment(list[0].attr.eventStartTime)
      .clone()
      .minute(0);
    const dataBlockValue = 50; //日期flex长度
    const dataBlockStyle = {
      flexBasis: dataBlockValue
    };
    return (
      <div className={`${type} gante-container`}>
        <div style={dataBlockStyle} className={`${type} date-container`}>
          {renderDateBlockArr(ganteConfig, startCalcTime)}
        </div>
        <div className={`${type} item-container`}>
          {renderContentBlockArr(ganteConfig, startCalcTime, list)}
        </div>
      </div>
    );
  } else {
    return null;
  }
}

function renderDateBlockArr(ganteConfig, startCalcTime) {
  const timeRenderInterval = 60; // 时间间隔
  return (
    <DateBlockArr
      {...ganteConfig}
      startCalcTime={startCalcTime}
      timeRenderInterval={timeRenderInterval}
    />
  );
}
function renderContentBlockArr(ganteConfig, startCalcTime, list) {
  const { minInterval, ...otherGanteConfig } = ganteConfig;
  const unitContent = 100; // 单位内容长度
  const contentSpaceType = 1; // contentSpace标准采用 1 2 还是calc
  let listWithPosInfo = listMapAddPosInfo(
    list,
    minInterval,
    startCalcTime,
    contentSpaceType
  );
  return (
    <ContentBlockArr
      {...otherGanteConfig}
      list={listWithPosInfo}
      unitContent={unitContent}
    />
  );
}
