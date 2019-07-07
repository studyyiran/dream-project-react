import React, { useState } from "react";
import "./index.scss";

function RenderBlock(props) {
  const { posX, posY, width, height, content } = props;
  const [dialogContent, setDialogContent] = useState(false);
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
  return (
    <div
      onMouseEnter={() => {
        setDialogContent(content);
        // () => {
        //   const otherHeight = 85;
        //   let currentHeight =
        //     otherHeight +
        //     this.heightRef.current.clientHeight +
        //     this.heightRef.current.parentElement.offsetTop;
        // }
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
        <RenderDialog content={dialogContent} dialogLeft={style.width / 4} />
      ) : null}
    </div>
  );
}

function RenderDialog(props) {
  const { content, dialogLeft } = props;
  if (content) {
    return (
      <div style={{ left: dialogLeft }} className="dialog">
        {content}
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
