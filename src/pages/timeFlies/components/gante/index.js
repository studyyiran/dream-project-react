import React from "react";
import "./index.scss";
import moment from "moment";
import DateBlockArr from "./components/dateBlockArr";
import ContentBlockArr from "./components/contentBlockArr";
import listMapAddPosInfo from "./listMapAddPosInfo";
/*
  list: []
  ganteConfig: {
  unitStretch 时间轴上的单位长度
  minInterval 最小时间精度
  type 展示的方式（vertical）
  }

  设置一些数据
  1）
 */
export default function RenderGanteContainer(props) {
  const { list = [], ganteConfig } = props;
  const { type, minInterval, unitStretch } = ganteConfig;
  if (list && list.length) {
    const startCalcTime = moment(list[0].attr.eventStartTime)
      .clone()
      .minute(0);
    const dataBlockValue = 50; // 日期flex长度
    const dataBlockStyle = {
      flexBasis: dataBlockValue
    };
    function renderDateBlockArr() {
      const timeRenderInterval = 60; // 时间间隔
      return (
        <DateBlockArr
          unitStretch={unitStretch}
          minInterval={minInterval}
          startCalcTime={startCalcTime}
          type={type}
          timeRenderInterval={timeRenderInterval}
        />
      );
    }
    function renderContentBlockArr() {
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
          unitStretch={unitStretch}
          list={listWithPosInfo}
          type={type}
          unitContent={unitContent}
        />
      );
    }
    return (
      <div className={`${type} gante-container`}>
        <div style={dataBlockStyle} className={`${type} date-container`}>
          {renderDateBlockArr()}
        </div>
        <div className={`${type} item-container`}>
          {renderContentBlockArr()}
        </div>
      </div>
    );
  } else {
    return null;
  }
}
