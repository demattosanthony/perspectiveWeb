import React from "react";
import "./divider.css";

function DividerWithText() {
  return (
    <div class="divider">
      <hr class="left" />
      OR
      <hr class="right" />
    </div>
  );
}

export default DividerWithText;
