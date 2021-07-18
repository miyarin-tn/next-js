import { configureStore } from '@reduxjs/toolkit';
import credentialSlice from '@/store/slices/credentialSlice';
import authSlice from '@/store/slices/authSlice';
import otherSlice from '@/store/slices/otherSlice';

const store = configureStore({
  reducer: {
    credential: credentialSlice.reducer,
    auth: authSlice.reducer,
    other: otherSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
