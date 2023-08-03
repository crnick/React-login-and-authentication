import React from "react";

import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <Outlet />{" "}
      {/**represents all the children of the layout component anything nested inisde layout, can be used more than once*/}
    </div>
  );
}

export default Layout;
