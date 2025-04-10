import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URLS } from '../../config/urls';

export const fetchFeed = createAsyncThunk('feed/fetchFeed', async (token) => {  
    
    const response = await fetch(API_URLS.FEED, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const result = await response.json();
    return result.feedUsers;
});

const feedSlice = createSlice({
    name: 'feed',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFeed.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFeed.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchFeed.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default feedSlice.reducer;
