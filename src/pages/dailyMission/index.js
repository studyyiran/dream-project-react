import React, { useEffect } from "react";
import Connect from "./connect";
import NewMission from "./components/newMission";
import TodayMission from "./components/todayMission";
import Layout from "../components/layout";

function Page(props) {
  // 这边需要一个switch标签
  return (
    <Layout>
      <NewMission {...props} />
      <TodayMission {...props} />
    </Layout>
  );
}

export default Connect(Page);
