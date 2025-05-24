/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//constants
import {
  THEME_MODE,
  THEME_PRESET,
  THEME_LAYOUT,
  SIDEBAR_THEME,
  SIDEBAR_THEME_CAPTION,
  LAYOUT_THEME,
} from "../../Common/layoutConfig";

import { ThemeState } from "./utils";

// Helper function to get theme from localStorage with fallback
const getStoredTheme = (key: string, fallback: any) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? stored : fallback;
  } catch {
    return fallback;
  }
};

export const initialState: ThemeState = {
  themeMode: getStoredTheme("themeMode", THEME_MODE.LIGHT) as THEME_MODE,
  layoutTheme: getStoredTheme("layoutTheme", LAYOUT_THEME.HORIZONTAL) as LAYOUT_THEME,
  sidebarTheme: getStoredTheme("sidebarTheme", SIDEBAR_THEME.LIGHT) as SIDEBAR_THEME,
  sidebarThemeCaptions: getStoredTheme("sidebarThemeCaptions", SIDEBAR_THEME_CAPTION.CAPTION_SHOW) as SIDEBAR_THEME_CAPTION,
  themePreset: getStoredTheme("themePreset", THEME_PRESET.PRESET_1) as THEME_PRESET,
  themeLayout: getStoredTheme("themeLayout", THEME_LAYOUT.LTR) as THEME_LAYOUT,
};

const ThemeSlice = createSlice({
  name: "ThemeSlice",
  initialState,
  reducers: {
    changeLayoutThemeAction(
      state: ThemeState,
      action: PayloadAction<LAYOUT_THEME>
    ) {
      state.layoutTheme = action.payload;
    },
    changeThemeModeAction(
      state: ThemeState,
      action: PayloadAction<THEME_MODE>
    ) {
      state.themeMode = action.payload;
    },
    changeSidebarThemeAction(
      state: ThemeState,
      action: PayloadAction<SIDEBAR_THEME>
    ) {
      state.sidebarTheme = action.payload;
    },
    changeSidebarThemeCaptionsAction(
      state: ThemeState,
      action: PayloadAction<SIDEBAR_THEME_CAPTION>
    ) {
      state.sidebarThemeCaptions = action.payload;
    },
    changeThemePresetAction(
      state: ThemeState,
      action: PayloadAction<THEME_PRESET>
    ) {
      state.themePreset = action.payload;
    },
    changeThemeLayoutAction(
      state: ThemeState,
      action: PayloadAction<THEME_LAYOUT>
    ) {
      state.themeLayout = action.payload;
    },
  },
});

export const {
  changeThemeModeAction,
  changeLayoutThemeAction,
  changeThemePresetAction,
  changeThemeLayoutAction,
  changeSidebarThemeAction,
  changeSidebarThemeCaptionsAction,
} = ThemeSlice.actions;

export default ThemeSlice.reducer;
