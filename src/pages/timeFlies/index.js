import React, { useEffect } from "react";
import connect from "./redux/connect";
import Layout from "../components/layout";

function TimeFlies(props) {
  const { getEventStreamList } = props;
  useEffect(() => {
    // 好怀念直接拿server but u cant
    // server.getEventStreamList();
    getEventStreamList();
  }, [getEventStreamList]);
  return (
    <Layout>
      <div>123</div>;
    </Layout>
  );
}

export default connect(TimeFlies);
