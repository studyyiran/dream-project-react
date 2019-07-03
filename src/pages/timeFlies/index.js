import React, { useEffect } from "react";
import connect from "./redux/connect";
import server from "./redux/server";
import Layout from "../components/layout";

function TimeFlies(props) {
  useEffect(() => {
    server.getEventStreamList();
  }, []);
  console.log(props);
  return (
    <Layout>
      <div>123</div>;
    </Layout>
  );
}

export default connect(TimeFlies);
