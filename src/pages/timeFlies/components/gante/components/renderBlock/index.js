import React from "react";
import "./index.scss";

/*
解耦他说明一个问题。
1）能拆出来，就拆出来
2）能没有state 就没有state。
 */

// 应该直接穿重点
function RenderBlock(props) {
  const { posX, posY, width, height, content } = props;
  let styleContainer = {
    left: posX,
    top: posY
  };
  let style = {
    maxWidth: width,
    width: width,
    height: height,
    background: "green",
    border: "1px solid red"
  };
  // const dialogLeft = style.width / 4;
  // this.currentColor++;
  return (
    <div
      // onMouseEnter={() => {
      //   this.setState(
      //     {
      //       showDialog: item
      //     },
      //     () => {
      //       const otherHeight = 85;
      //       let currentHeight =
      //         otherHeight +
      //         this.heightRef.current.clientHeight +
      //         this.heightRef.current.parentElement.offsetTop;
      //       if (currentHeight > this.state.lineHeight) {
      //         this.setState({
      //           lineHeight: currentHeight
      //         });
      //       } else if (currentHeight < defaultLineHeight) {
      //         this.setState({
      //           lineHeight: defaultLineHeight
      //         });
      //       }
      //     }
      //   );
      // }}
      // onMouseLeave={() => {
      //   this.setState({
      //     lineHeight: defaultLineHeight,
      //     showDialog: {}
      //   });
      // }}
      style={styleContainer}
      className="x-container"
    >
      <div className="center-flex zao-line-clamp item-block" style={style}>
        {content}
      </div>
      {/*{RenderDialog(item && item.attr && item.attr.name, dialogLeft)}*/}
    </div>
  );
}

// function RenderDialog(name, dialogLeft) {
//   if (
//     this.state.showDialog &&
//     this.state.showDialog.attr &&
//     this.state.showDialog.attr.name === name
//   ) {
//     console.log("get it");
//     console.log(dialogLeft);
//     return (
//       <div ref={this.heightRef} style={{ left: dialogLeft }} className="dialog">
//         {this.state.showDialog.attr.name}
//         {/*{this.state.showDialog.childArr.map((item, index) => {*/}
//         {/*return <li key={index}>{item.attr.name}</li>;*/}
//         {/*})}*/}
//       </div>
//     );
//   }
// }

export default RenderBlock;
