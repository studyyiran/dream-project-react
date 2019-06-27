import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import StudyReview from "./pages/studyReview";
import StudyTodo from "./pages/studyTodo";
import DailyMission from "./pages/dailyMission";

function AppRouter() {
  // 为什么component拿的是 StudyReview 而不是 <StudyReview /> 应该使用什么 我非常好奇
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/studyTodo" component={StudyTodo} />
        <Route path="/studyReview" component={StudyReview} />
        <Route path="/dailyMission" component={DailyMission} />
      </Switch>
    </BrowserRouter>
  );
}

export default AppRouter;
