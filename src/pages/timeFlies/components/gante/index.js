import React from "react";
import "./index.less";
import moment from "moment";

let minDate;
let maxDate;
const perBlockWidth = 48;
const perBlockHeight = 24;
const widthDistance = 1;
const heightDistance = 3;
const topHeight = 45;
const defaultLineHeight = 363 - topHeight;
const bgColorArr = ["#E1F3FF", "#FFF3E3", "#E7F3E7", "#E4E1FF", "#FFE3E9"];
/*
props:
  taskInfo
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
    if (this.props.taskInfo && this.props.taskInfo.attr) {
      this.init(this.props.taskInfo);
    }
  }

  componentDidUpdate(prev) {
    if (this.props.taskInfo !== prev.taskInfo) {
      this.init(this.props.taskInfo);
    }
  }

  dateToRender(start, end, item) {
    start = moment(start);
    // 数据定义为，起始时间的0点和终止时间的23.59分。因此endTime需要+1
    end = this.formatEndTime(end);
    // end = moment(end)
    let length = end.diff(start, "day");
    let posX = start.diff(minDate, "day");
    let posY = this.getYPos(posX, length);
    return this.renderPoint(posX, posY, length, item);
  }

  formatEndTime(time) {
    return moment(time).add(1, "d");
  }

  renderPoint(posX, posY, length, item) {
    // 填充cell
    for (let i = 0; i < length; i++) {
      if (!this.cellArr[posY] || !this.cellArr[posY].length) {
        this.cellArr[posY] = [];
      }
      this.cellArr[posY][posX + i] = true;
    }

    let styleContainer = {
      left: perBlockWidth * posX + widthDistance,
      top: (perBlockHeight + heightDistance) * posY
    };
    let style = {
      maxWidth: perBlockWidth * length - 2 * widthDistance,
      width: perBlockWidth * length - 2 * widthDistance,
      height: perBlockHeight,
      background: bgColorArr[this.currentColor % bgColorArr.length]
    };
    const dialogLeft = style.width / 4;
    this.currentColor++;
    return (
      <div
        key={item && item.attr && item.attr.name}
        onMouseEnter={() => {
          this.setState(
            {
              showDialog: item
            },
            () => {
              const otherHeight = 85;
              let currentHeight =
                otherHeight +
                this.heightRef.current.clientHeight +
                this.heightRef.current.parentElement.offsetTop;
              if (currentHeight > this.state.lineHeight) {
                this.setState({
                  lineHeight: currentHeight
                });
              } else if (currentHeight < defaultLineHeight) {
                this.setState({
                  lineHeight: defaultLineHeight
                });
              }
            }
          );
        }}
        onMouseLeave={() => {
          this.setState({
            lineHeight: defaultLineHeight,
            showDialog: {}
          });
        }}
        style={styleContainer}
        className="x-container"
      >
        <div className="center-flex" style={style}>
          <div className="item-block zao-line-clamp">
            {item && item.attr && item.attr.name}
          </div>
        </div>
        {this.renderDialog(item && item.attr && item.attr.name, dialogLeft)}
      </div>
    );
  }

  renderLine() {
    let now = moment(minDate);
    let arr = [];
    let style = {};
    let posX = 0;
    const lineWidth = 2;
    while (
      now.isBefore(
        moment(maxDate)
          .add(1, "d")
          .add(1, "hour")
      )
    ) {
      style = {
        left: perBlockWidth * posX - lineWidth / 2
      };
      arr.push(<div key={posX} style={style} className="line" />);
      posX++;
      now.add(1, "day");
    }
    return (
      <div style={{ height: this.state.lineHeight }} className="line-container">
        {arr}
      </div>
    );
  }

  renderDateAndDay() {
    let now = moment(minDate);
    let arr = [];
    let index = 0;
    while (now.isBefore(moment(maxDate).add(1, "hour"))) {
      let isWeek = false;
      let isToday = false;
      let isFirstDay = false;
      if (now.isSame(moment(), "day")) {
        // 今日
        isToday = true;
      }
      if (now.date() === 1) {
        // 每月首日
        isFirstDay = true;
      }
      if (now.day() === 0 || now.day() === 6) {
        // 每月首日
        isWeek = true;
      }
      let dateStyle = {};
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
      let dayStyle = {};
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

      arr.push(
        <div key={index++}>
          <div style={dateStyle} className="block date-block center-flex">
            <div style={isTodayStyle}>{now.date()}</div>
          </div>
          <span style={dayStyle} className="block day-block center-flex">
            {get(now)}
          </span>
        </div>
      );
      now.add(1, "day");
    }
    return <div className="flex">{arr}</div>;
    function get() {
      if (now.isSame(moment(), "day")) {
        return "今天";
      } else if (now.date() === 1) {
        return now.month() + 1 + "月";
      } else {
        // 周六 周日 今日 都需要加粗
        // 对应的日期样式也需要修正
        const dayMap = {
          1: "一",
          2: "二",
          3: "三",
          4: "四",
          5: "五",
          6: "六",
          0: "日"
        };
        let day = now.day();
        return "周" + dayMap[day];
      }
    }
  }

  // 需要先按照起始日起进行排序。相同日期不做处理。
  // 然后根据排序后的进行绘制
  getYPos(posX, length) {
    // 默认从最上面开始搞
    let posY = 0;
    let findPosY = false;
    while (!findPosY) {
      findPosY = true;
      for (let i = posX; i < posX + length; i++) {
        if (
          this.cellArr &&
          this.cellArr.length &&
          this.cellArr[posY] &&
          this.cellArr[posY][i]
        ) {
          findPosY = false;
        }
      }
      if (!findPosY) {
        posY++;
      }
    }

    return posY;
    // if (false) {
    //     posY++
    // } else {
    //     renderAt(posX, posY, length)
    // }
  }

  renderTitleBlock(item) {
    let start = moment(item.attr.stageStartTime);
    let end = this.formatEndTime(item.attr.stageEndTime);
    let length = end.diff(start, "day");
    let posX = start.diff(minDate, "day");
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
        key={item && item.attr && item.attr.name}
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

  init(item) {
    let startDate = item.attr.startTime;
    let endDate = item.attr.endTime;
    minDate = moment(startDate);
    maxDate = moment(endDate);
    this.setState({
      canRender: true
    });
  }

  renderDialog(name, dialogLeft) {
    if (
      this.state.showDialog &&
      this.state.showDialog.attr &&
      this.state.showDialog.attr.name === name &&
      this.state.showDialog.childArr &&
      this.state.showDialog.childArr.length
    ) {
      return (
        <div
          ref={this.heightRef}
          style={{ left: dialogLeft }}
          className="dialog"
        >
          {this.state.showDialog.childArr.map((item, index) => {
            return <li key={index}>{item.attr.name}</li>;
          })}
        </div>
      );
    }
  }
  render() {
    this.currentColor = 0;
    this.cellArr = [];
    if (
      this.state.canRender &&
      this.props.taskInfo &&
      this.props.taskInfo.attr
    ) {
      let propsArray = [];
      this.props.taskInfo.childArr.forEach(item =>
        item.childArr.forEach(item => propsArray.push(item))
      );
      return (
        <div className="gante-out-container">
          <div
            style={{ height: topHeight + this.state.lineHeight }}
            className="gante-container"
          >
            <div className="title-container">
              {this.props.taskInfo.childArr.map(item => {
                return this.renderTitleBlock(item);
              })}
            </div>
            <div className="date-container">
              {this.renderDateAndDay()}
              {this.renderLine()}
            </div>
            <div className="item-container">
              {propsArray.map(item =>
                this.dateToRender(item.attr.startTime, item.attr.endTime, item)
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
