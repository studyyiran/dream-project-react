import React from "react";
import { NavLink } from "react-router-dom";
import "./index.scss";

export default function(props) {
  const { children, currentPath } = props;
  return (
    <div className="layout">
      <ul>
        <li>
          <NavLink activeClassName="active" to={"/studyReview"}>
            studyReview
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to={"/studyTodo"}>
            studyTodo
          </NavLink>
        </li>
      </ul>
      <div>{children}</div>
    </div>
  );
}
