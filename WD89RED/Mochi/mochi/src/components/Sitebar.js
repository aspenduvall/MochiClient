import React from "react";

const Sitebar = (props) => {
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div>
    <div class="contenttitle">
      <h2 onClick={refreshPage}>mochi</h2>
      </div>
        <button class="logoutbutton" onClick={props.clickLogout}>
          Logout
        </button>
    </div>
  );
};

export default Sitebar;
