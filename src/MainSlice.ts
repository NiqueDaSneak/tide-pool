import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cruise } from './types';

export interface MainSliceState {
  cruises: Cruise[];
  totalArea: number;
  sortOrder: 'asc' | 'desc';
  itemsPerPage: number;
  currentPage: number;
}

const initialState: MainSliceState = {
  cruises: [],
  totalArea: 0,
  sortOrder: 'asc',
  itemsPerPage: 10,
  currentPage: 1,
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
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setCruises, setTotalArea, setSortOrder, setItemsPerPage, setCurrentPage } = mainSlice.actions;
