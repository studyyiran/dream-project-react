// import React from "react";
//
// /*
// 解耦他说明一个问题。
// 1）能拆出来，就拆出来
// 2）能没有state 就没有state。
//  */
//
// function RenderPoint(posX, posY, length, item) {
//   // 填充cell
//   for (let i = 0; i < length; i++) {
//     if (!this.cellArr[posY] || !this.cellArr[posY].length) {
//       this.cellArr[posY] = [];
//     }
//     this.cellArr[posY][posX + i] = true;
//   }
//
//   let styleContainer = {
//     left: perBlockWidth * posX + widthDistance,
//     top: (perBlockHeight + heightDistance) * posY
//   };
//   let style = {
//     maxWidth: perBlockWidth * length - 2 * widthDistance,
//     width: perBlockWidth * length - 2 * widthDistance,
//     height: perBlockHeight,
//     background: bgColorArr[this.currentColor % bgColorArr.length]
//   };
//   const dialogLeft = style.width / 4;
//   this.currentColor++;
//   return (
//     <div
//       key={item && item.attr && item.attr._id}
//       onMouseEnter={() => {
//         this.setState(
//           {
//             showDialog: item
//           },
//           () => {
//             const otherHeight = 85;
//             let currentHeight =
//               otherHeight +
//               this.heightRef.current.clientHeight +
//               this.heightRef.current.parentElement.offsetTop;
//             if (currentHeight > this.state.lineHeight) {
//               this.setState({
//                 lineHeight: currentHeight
//               });
//             } else if (currentHeight < defaultLineHeight) {
//               this.setState({
//                 lineHeight: defaultLineHeight
//               });
//             }
//           }
//         );
//       }}
//       onMouseLeave={() => {
//         this.setState({
//           lineHeight: defaultLineHeight,
//           showDialog: {}
//         });
//       }}
//       style={styleContainer}
//       className="x-container"
//     >
//       <div className="center-flex" style={style}>
//         <div className="item-block zao-line-clamp">
//           {item && item.attr && item.attr.name}
//         </div>
//       </div>
//       {RenderDialog(item && item.attr && item.attr.name, dialogLeft)}
//     </div>
//   );
// }
//
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
//
// export default renderPoint;
