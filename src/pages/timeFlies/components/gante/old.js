import React from "react";
import "./oldindex.scss";
import moment from "moment";

let minDate;
let maxDate;
const perBlockWidth = 4.8 * 1;
const perBlockHeight = 24;
const widthDistance = 1;
const heightDistance = 3;
const topHeight = 45;
const defaultLineHeight = 363 - topHeight;
const bgColorArr = ["#E1F3FF", "#FFF3E3", "#E7F3E7", "#E4E1FF", "#FFE3E9"];
const minInterval = "m";
/*
props:
  list: [
    attr: {
      name:
      content:
    }
  ]
 */
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canRender: false,
      showDialog: {},
      lineHeight: defaultLineHeight
    };
    this.heightRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.list && this.props.list.length) {
      this.init(this.props.list);
    }
  }

  componentDidUpdate(prev) {
    if (
      this.props.list &&
      this.props.list.length &&
      this.props.list !== prev.list
    ) {
      this.init(this.props.list);
    }
  }

  getModal(list) {
    list = list.filter(item => {
      return moment().isSame(moment(item.attr.startTime), "day");
    });
    console.log(list);
    let minStartTime = list[0].attr.startTime;
    // let minStartTime = list[list.length - 1].attr.startTime;
    const getWidthPos = getCell()(1);
    return list.map(item => {
      const { attr } = item;
      let { startTime, endTime } = attr;
      startTime = moment(startTime);
      endTime = moment(endTime);
      console.log(startTime);
      console.log(minStartTime);
      attr.timeStart = startTime.diff(minStartTime, minInterval);
      attr.timeEnd = endTime.diff(minStartTime, minInterval);
      attr.widthPos = getWidthPos(timeStart, timeEnd);
      return item;
    });

    function getCell() {
      const cell = [[]];
      return value => {
        return (lengthStartPos, lengthEndPos) => {
          console.log(lengthStartPos);
          let widthPos = 0;
          while (!checkCanFill()) {
            console.log("loop");
            widthPos++;
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
                if (callBack(length, widthPos + width) === "break") {
                  break;
                }
              }
            }
          }
          return widthPos;
        };
      };
    }
    // function checkCanFill(startPos) {
    //   return cell.every((lengthLine, lengthPos) => {
    //     const notArrive = lengthPos < lengthStartPos
    //     const notFill = lengthLine.every((cellItem, index) => {
    //       const notArrive = index > value
    //       const notFill = !cellItem
    //       return notArrive || notFill
    //     })
    //     return notArrive || notFill
    //   })
    // }

    // function fillRect(posX, length) {
    //   // 默认从最上面开始搞
    //   let posY = 0;
    //   let findPosY = false;
    //   while (!findPosY) {
    //     findPosY = true;
    //     for (let i = posX; i < posX + length; i++) {
    //       if (
    //         this.cellArr &&
    //         this.cellArr.length &&
    //         this.cellArr[posY] &&
    //         this.cellArr[posY][i]
    //       ) {
    //         findPosY = false;
    //       }
    //     }
    //     if (!findPosY) {
    //       posY++;
    //     }
    //   }
    //   return posY;
    // }
  }

  dateToRender(start, end, item) {
    start = moment(start);
    // 数据定义为，起始时间的0点和终止时间的23.59分。因此endTime需要+1
    // end = this.formatEndTime(end);
    end = moment(end);
    let length = end.diff(start, minInterval);
    // console.log(length);
    let posX = start.diff(minDate, minInterval);
    // console.log(length);
    let posY = this.getYPos(posX, length);
    // return <RenderPoint />(posX, posY, length, item);
  }

  formatEndTime(time) {
    return moment(time).add(1, "d");
  }

  // 需要先按照起始日起进行排序。相同日期不做处理。
  // 然后根据排序后的进行绘制

  init(list) {
    // console.log("init");
    minDate = moment()
      .subtract(1, `days`)
      .hour(10)
      .minutes(0)
      .seconds(0);
    maxDate = moment()
      .subtract(1, `days`)
      .hour(24)
      .minutes(59)
      .seconds(59);
    this.setState({
      canRender: true
    });
  }

  render() {
    // console.log(this.props);
    this.currentColor = 0;
    this.cellArr = [];
    if (
      this.state.canRender
    // &&
    // this.props.taskInfo &&
    // this.props.taskInfo.attr
    ) {
      // let propsArray = [];
      // this.props.taskInfo.childArr.forEach(item =>
      //   item.childArr.forEach(item => propsArray.push(item))
      // );
      // 不应该把逻辑和jsx混写，这样不够声明。
      // 尽量调用组件，不要调用函数，觉得不好看，不够声明。
      // 对于属性封装的不够好
      console.log(this.getModal(this.props.list));
      return (
        <div className="gante-out-container">
          <div
            style={{ height: topHeight + this.state.lineHeight }}
            className="gante-container"
          >
            {/*<div className="title-container">*/}
            {/*{this.props.list.map(item => {*/}
            {/*return (*/}
            {/*<RenderTitleBlock*/}
            {/*item={item}*/}
            {/*key={item && item.attr && item.attr._id}*/}
            {/*/>*/}
            {/*);*/}
            {/*})}*/}
            {/*</div>*/}
            <div className="date-container">
              <RenderDateAndDay />
              <RenderLine />
            </div>
            <div className="item-container">
              {this.props.list.map(({attr}) => <RenderBlock posX={attr.widthPos} posY={} width={} height={}/>
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

function RenderTitleBlock(props) {
  const { item } = props;
  let start = moment(item.attr.stageStartTime);
  let end = moment(item.attr.stageEndTime);
  let length = end.diff(start, minInterval);
  // console.log(length);
  let posX = start.diff(minDate, minInterval);
  // console.log(posX);
  const titleHeight = 22;
  let style = {
    width: perBlockWidth * length - perBlockWidth,
    maxWidth: perBlockWidth * length - perBlockWidth,
    left: perBlockWidth * posX + perBlockWidth / 2,
    top: 0,
    height: titleHeight
  };
  return (
    <div
      key={item && item.attr && item.attr._id}
      style={style}
      className="title-block"
    >
      <div style={{ height: titleHeight / 2 }} className="inner-line left" />
      <a
        title={item && item.attr && item.attr.name}
        className="title center-flex zao-line-clamp"
      >
        {item && item.attr && item.attr.name}
      </a>
      <div style={{ height: titleHeight / 2 }} className="inner-line right" />
    </div>
  );
}

function TimeBlock(props) {
  const { width, height, content } = props;
}

function RenderLine(props) {
  const { lineHeight } = props;
  let now = moment(minDate);
  let arr = [];
  let style = {};
  let posX = 0;
  const lineWidth = 2;
  while (now.isBefore(moment(maxDate).add(1, minInterval))) {
    style = {
      left: perBlockWidth * posX - lineWidth / 2
    };
    arr.push(<div key={posX} style={style} className="line" />);
    posX++;
    now.add(1, minInterval);
  }
  return (
    <div style={{ height: lineHeight }} className="line-container">
      {arr}
    </div>
  );
}

function RenderDateAndDay() {
  let now = moment(minDate);
  let arr = [];
  let index = 0;
  // console.log(now.format());
  // console.log(maxDate.format());
  while (now.isBefore(moment(maxDate).add(1, minInterval))) {
    let isWeek = false;
    let isToday = false;
    let isFirstDay = false;
    // if (now.isSame(moment(), "day")) {
    //   // 今日
    //   isToday = true;
    // }
    // if (now.date() === 1) {
    //   // 每月首日
    //   isFirstDay = true;
    // }
    // if (now.day() === 0 || now.day() === 6) {
    //   // 每月首日
    //   isWeek = true;
    // }
    let dateStyle = {
      width: perBlockWidth
    };
    if (isWeek) {
      dateStyle = Object.assign({}, dateStyle, {
        fontWeight: "600",
        color: "rgba(51,51,51,1)"
      });
    }
    let isTodayStyle;
    if (isToday) {
      isTodayStyle = Object.assign({}, dateStyle, {
        color: "white",
        background: "#F11815",
        borderRadius: "50%"
      });
    }
    let dayStyle = {
      width: perBlockWidth
    };
    if (isWeek || isToday) {
      dayStyle = Object.assign({}, dayStyle, {
        fontWeight: "600",
        color: "rgba(51,51,51,1)"
      });
    }
    if (isFirstDay) {
      dateStyle = Object.assign({}, dateStyle, {
        fontWeight: "600",
        color: "#14A3FF"
      });
      dayStyle = Object.assign({}, dayStyle, {
        fontWeight: "600",
        color: "#14A3FF"
      });
    }
    if (isToday) {
      dayStyle = Object.assign({}, dayStyle, { color: "#F11815" });
    }

    const checkiSFirstMintue = time => {
      // 除了format之后，进行比较，还有没有更优雅的方式。
      const result =
        moment(time).format("mm") === "00" ||
        moment(time).format("mm") === "30";
      return result;
    };

    const displayTime = checkiSFirstMintue(now) ? now.format("HH:mm") : "";
    if (displayTime) {
      console.log("enter");
      console.log(now.format("MM-DD HH-mm-ss"));
    }

    arr.push(
      <div key={index++}>
        <div style={dateStyle} className="block date-block center-flex">
          <div style={isTodayStyle}>{displayTime}</div>
        </div>
        {/*<span style={dayStyle} className="block day-block center-flex">*/}
        {/*{now.format("mm")}*/}
        {/*</span>*/}
      </div>
    );
    now.add(1, minInterval);
  }
  return <div className="flex">{arr}</div>;
}
