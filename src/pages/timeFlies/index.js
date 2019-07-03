import React, { useEffect } from "react";
import connect from "./redux/connect";
import server from "./redux/server";
import Layout from "../components/layout";

function TimeFlies(props) {
  useEffect(() => {
    // 好怀念直接拿server but u cant
    // server.getEventStreamList();
    props.getEventStreamList();
  }, []);
  console.log(props);
  return (
    <Layout>
      <div>123</div>;
    </Layout>
  );
}

export default connect(TimeFlies);
