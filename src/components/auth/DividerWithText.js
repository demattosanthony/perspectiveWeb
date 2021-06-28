import React from "react";
import "./divider.css";

function DividerWithText() {
  return (
    <div className="divider">
      <hr className="left" />
      OR
      <hr className="right" />
    </div>
  );
}

export default DividerWithText;
