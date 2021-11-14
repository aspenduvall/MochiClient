import React from "react";

const Sitebar = (props) => {
  return (
    <div>
    <div class="contenttitle">
      <h2>mochi</h2>
      </div>
        <button class="logoutbutton" onClick={props.clickLogout}>
          Logout
        </button>
    </div>
  );
};

export default Sitebar;
