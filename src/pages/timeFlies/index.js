import React, { useEffect } from "react";
import connect from "./redux/connect";
import Layout from "../components/layout";
import RenderList from "./components/renderList";

function TimeFlies(props) {
  const { getEventStreamList, eventStreamList } = props;
  useEffect(() => {
    // 好怀念直接拿server but u cant
    // server.getEventStreamList();
    getEventStreamList();
  }, [getEventStreamList]);
  return (
    <Layout>
      <RenderList eventStreamList={eventStreamList} />
    </Layout>
  );
}

export default connect(TimeFlies);
