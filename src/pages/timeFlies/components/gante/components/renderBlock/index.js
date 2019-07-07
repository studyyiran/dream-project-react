import React, { useState } from "react";
import "./index.scss";

function RenderBlock(props) {
  const { posX, posY, width, height, content } = props;
  const [dialogContent, setDialogContent] = useState(false);
  const [dialogOffsetX, setOffsetX] = useState(0);
  const [dialogOffsetY, setOffsetY] = useState(0);
  const [needUpdate, setNeedUpdate] = useState(true);
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
  function setPos(e, showDialog) {
    // 这块的冒泡有点问题。导师后再看一下
    // 这块还是有抖动。得解决一下
    console.log(e.target.className)
    if (e.target.className === "dialog") {
      return;
    }
    const { nativeEvent } = e;
    const { offsetX, offsetY } = nativeEvent;
    const limit = 100;
    if (
      needUpdate ||
      Math.abs(dialogOffsetX - offsetX) > limit ||
      Math.abs(dialogOffsetY - offsetY) > limit
    ) {
      setNeedUpdate(false)
      setOffsetX(offsetX);
      setOffsetY(offsetY);
    }
  }
  return (
    <div
      onMouseEnter={e => {
        setNeedUpdate(true)
        setDialogContent(content);
        // () => {
        //   const otherHeight = 85;
        //   let currentHeight =
        //     otherHeight +
        //     this.heightRef.current.clientHeight +
        //     this.heightRef.current.parentElement.offsetTop;
        // }
      }}
      onMouseMove={e => {
        setPos(e);
      }}
      onMouseLeave={() => {
        setDialogContent("");
      }}
      style={styleContainer}
      className="x-container"
    >
      <div className="center-flex zao-line-clamp item-block" style={style}>
        {content}
      </div>
      {dialogContent ? (
        <RenderDialog
          content={dialogContent}
          dialogOffsetX={dialogOffsetX}
          dialogOffsetY={dialogOffsetY}
        />
      ) : null}
    </div>
  );
}

function RenderDialog(props) {
  const { content, dialogOffsetX, dialogOffsetY } = props;
  if (content) {
    return (
      <div
        style={{ left: dialogOffsetX, top: dialogOffsetY }}
        className="dialog"
      >
        left{dialogOffsetX}
        top{dialogOffsetY}
        content{content}
        {/*{this.state.showDialog.childArr.map((item, index) => {*/}
        {/*return <li key={index}>{item.attr.name}</li>;*/}
        {/*})}*/}
      </div>
    );
  } else {
    return null;
  }
}

export default RenderBlock;
