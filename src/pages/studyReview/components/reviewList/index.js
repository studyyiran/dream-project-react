import React from "react";
import "./index.scss";

export default function(props) {
  const { reviewList = [] } = props;
  console.log(props);
  return (
    <div>
      {reviewList.map(item => (
        <Item key={item._id} info={item} />
      ))}
    </div>
  );
}

function Item(props) {
  const { info } = props;
  return <div>{JSON.stringify(info)}</div>;
}
