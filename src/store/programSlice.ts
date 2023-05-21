import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getPrograms } from "../services/programs";
import { AppState } from './index'

const initialState = {
  shortTitle: [null],
  status: [null],
  shortTitleQuery: "",
  statusQuery: "",
  programs: [],
	loading: false,
	error: false
};

export const getProgramsAsync = createAsyncThunk(
  "program/getPrograms",
  async ({ shortTitle, status }: any, { rejectWithValue}: any) => {
    const programs = await getPrograms(shortTitle, status);
    if (!programs || !programs.length) {
      return rejectWithValue("Not found");
    }
    return programs;
  }
);

export const programSlice = createSlice({
  name: "program",
  initialState,
  reducers: {
    setShortTitle: (state, action) => {
      state.shortTitle = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setShortTitleQuery: (state, action) => {
      state.shortTitleQuery = action.payload;
    },
    setStatusQuery: (state, action) => {
      state.statusQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
		.addCase(getProgramsAsync.pending, (state, action) => {
      state.loading = true;
    })
		.addCase(getProgramsAsync.rejected, (state, action) => {
      state.error = true;
			state.loading = false;
    })
		.addCase(getProgramsAsync.fulfilled, (state, action) => {
      state.programs = action.payload;
			state.loading = false;
			state.error = false;
    });
  },
});

export const { setShortTitle, setStatus, setShortTitleQuery, setStatusQuery } =
  programSlice.actions;

export const selectShortTitle = (state: AppState) => state.program.shortTitle;
export const selectShortTitleQuery = (state: AppState) => state.program.shortTitleQuery;
export const selectStatus = (state: AppState) => state.program.status;
export const selectStatusQuery = (state: AppState) => state.program.statusQuery;
export const selectPrograms = (state: AppState) => state.program.programs;
export const selectLoading = (state: AppState) => state.program.loading;
export const selectError = (state: AppState) => state.program.error;

export default programSlice.reducer;
