import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cruise } from './types';

export interface MainSliceState {
  cruises: Cruise[];
  totalArea: number;
}

const initialState: MainSliceState = {
  cruises: [],
  totalArea: 0,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setCruises: (state, action: PayloadAction<Cruise[]>) => {
      state.cruises = action.payload;
    },
    setTotalArea: (state, action: PayloadAction<number>) => {
      state.totalArea = action.payload;
    },
  },
});

export const { setCruises, setTotalArea } = mainSlice.actions;
