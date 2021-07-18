import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface OtherState {
  isRefreshingToken: boolean;
}

// Define the initial state using that type
const initialState: OtherState = {
  isRefreshingToken: false,
};

export const otherSlice = createSlice({
  name: 'other',
  initialState,
  reducers: {
    setIsRefreshingToken: (state, action: PayloadAction<boolean>) => {
      state.isRefreshingToken = action.payload;
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsRefreshingToken } = otherSlice.actions;

export default otherSlice;
