import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import StudyReview from "./pages/studyReview";
import StudyTodo from "./pages/studyTodo";
import DailyMission from "./pages/dailyMission";
import TimeFlies from "./pages/timeFlies";
import { AppLayout } from "./components/appLayout";

function AppRouter() {
  return (
    <AppLayout>
      <BrowserRouter>
        <Switch>
          <Route path="/timeFlies" component={TimeFlies} />
          <Route path="/studyTodo" component={StudyTodo} />
          <Route path="/studyReview" component={StudyReview} />
          <Route path="/dailyMission" component={DailyMission} />
        </Switch>
      </BrowserRouter>
    </AppLayout>
  );
}

export default AppRouter;
