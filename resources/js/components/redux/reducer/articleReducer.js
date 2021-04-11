import {
    createSlice
} from '@reduxjs/toolkit';

export const ArticleSlice = createSlice({
    name: 'user',
    initialState: {
        article: [],
        isLoading: true,
        paginate: {
            last_page: 1
        }
    },
    reducers: {
        setArticle: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.article = action.payload.article;
            state.paginate = action.payload.paginate;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload.isLoading
        }

    },
});

export const {
   setArticle,
   setLoading
} = ArticleSlice.actions;

export const selectArticle = (state) => state.user.user;

export default ArticleSlice.reducer;