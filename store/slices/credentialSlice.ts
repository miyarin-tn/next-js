import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from '@/store/configureStore';
import { CredentialType } from '@/types/credentialType';

// Define a type for the slice state

// Define the initial state using that type
// @ts-ignore
const initialState: CredentialType = {};

export const credentialSlice = createSlice({
  name: 'credential',
  initialState,
  reducers: {
    getCredential: (state) => {
      return state;
    },
    // @ts-ignore
    setCredential: (state, action: PayloadAction<CredentialType>) => {
      if (!action.payload) {
        return null;
      }
      return { ...state, ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { getCredential, setCredential } = credentialSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectOther = (state: RootState) => state.other;

export default credentialSlice;
