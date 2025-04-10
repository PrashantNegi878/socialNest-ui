import { configureStore } from '@reduxjs/toolkit';
import feedReducer from './slices/feedSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
    reducer: {
        feed: feedReducer,
        auth: authReducer,
    },
});

export default store;
