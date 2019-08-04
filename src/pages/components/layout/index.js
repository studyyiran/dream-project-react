import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import "./index.scss";

export default connect(
  state => state,
  {}
)(Layout);

function Layout(props) {
  const { children, currentPath } = props;
  function renderCurrentRunList() {
    const { dailyMissionReducers } = props;
    const { historyMissionList } = dailyMissionReducers;
    const list =
      (historyMissionList || []).filter(item => {
        return item.status === "start";
      }) || [];
    return (
      <div className="current-run-list">{list.map(item => item.content)}</div>
    );
  }

  function renderStudyReviewList() {
    const { studyReviewReducers = {} } = props;
    const { reviewList } = studyReviewReducers;
    const list =
      (reviewList || []).filter(item => {
        return item.status === "start";
      }) || [];
    return (
      <div className="current-run-list">
        {list.map(item => item.reviewContent)}
      </div>
    );
  }

  function renderStudyTodoList() {
    const { studyTodoReducers = {} } = props;
    const { list } = studyTodoReducers;
    const fliterList =
      (list || []).filter(item => {
        return item.status === "start";
      }) || [];
    return (
      <div className="current-run-list">
        {fliterList.map(item => item.content)}
      </div>
    );
  }
  return (
    <div className="layout">
      <ul>
        <li>
          <NavLink activeClassName="active" to={"/studyReview"}>
            studyReview
            {renderStudyReviewList()}
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to={"/studyTodo"}>
            studyTodo
            {renderStudyTodoList()}
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to={"/dailyMission"}>
            dailyMission
            {renderCurrentRunList()}
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to={"/timeFlies"}>
            eventStream
          </NavLink>
        </li>
      </ul>
      <div>{children}</div>
    </div>
  );
}
