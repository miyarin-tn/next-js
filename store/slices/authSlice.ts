import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '@/types/userType';

// Define a type for the slice state
interface Auth {
  loggedIn: boolean;
  user?: UserType | null;
}

// Define the initial state using that type
const initialState: Auth = {
  loggedIn: false,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getAuth: (state) => {
      return state;
    },
    setAuth: (state, action: PayloadAction<Auth>) => {
      return { ...state, ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { getAuth, setAuth } = authSlice.actions;

export default authSlice;
