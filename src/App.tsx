/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector } from "@reduxjs/toolkit";
import Routing from "./Routes";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const SelecthemeLayout = createSelector(
    (state: any) => state.Theme,
    (state) => state.layoutTheme
  );
  
  const SelectThemeState = createSelector(
    (state: any) => state.Theme,
    (state) => state
  );
  
  const themeLayout = useSelector(SelecthemeLayout);
  const themeState = useSelector(SelectThemeState);
  
  const className = "layout-3";
  const className2 = "layout-extended";
  const className3 = "layout-moduler";

  // Initialize HTML attributes from theme state on app load
  useEffect(() => {
    if (document.body) {
      document.body.setAttribute("data-pc-theme", themeState.themeMode);
      document.body.setAttribute("data-pc-layout", themeState.layoutTheme);
      document.body.setAttribute("data-pc-sidebar-theme", themeState.sidebarTheme);
      document.body.setAttribute("data-pc-sidebar-caption", themeState.sidebarThemeCaptions);
      document.body.setAttribute("data-pc-preset", themeState.themePreset);
      document.body.setAttribute("data-pc-direction", themeState.themeLayout);
    }
  }, [themeState]);

  useEffect(() => {
    if (themeLayout === "vertical-tab") {
      document.body.classList.add(className);
    }
    if (themeLayout === "extended") {
      document.body.classList.add(className2);
    }
    if (themeLayout === "moduler") {
      document.body.classList.add(className3);
    }
  }, [themeLayout]);

  return (
    <>
      <Routing />
    </>
  );
}

export default App;
