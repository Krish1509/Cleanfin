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

export const initialState: ThemeState = {
  themeMode: THEME_MODE.LIGHT,
  layoutTheme: LAYOUT_THEME.HORIZONTAL,
  sidebarTheme: SIDEBAR_THEME.LIGHT,
  sidebarThemeCaptions: SIDEBAR_THEME_CAPTION.CAPTION_SHOW,
  themePreset: THEME_PRESET.PRESET_1,
  themeLayout: THEME_LAYOUT.LTR,
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
