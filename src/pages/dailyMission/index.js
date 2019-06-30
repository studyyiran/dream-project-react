import React, { useEffect } from "react";
import Connect from "./connect";
import NewMission from "./components/newMission";
import TodayMission from "./components/todayMission";
import HistoryMission from "./components/historyMission";
import Layout from "../components/layout";

function Page(props) {
  // 这边需要一个switch标签
  return (
    <Layout>
      <h1>新增dailyMission</h1>
      <NewMission {...props} />
      <h1>今日</h1>
      <TodayMission {...props} />
      <h1>历史</h1>
      <HistoryMission {...props} />
    </Layout>
  );
}

export default Connect(Page);
