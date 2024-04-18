import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchPage: {
        /**
         * The search query that the user has entered.
         * to be saved between page navigation.
         */
        searchTerm: '',
        /**
         * Does the user initiated a search query?
         * this is to be used to show recommendations
         * or search results and keep the state between
         * page navigation.
         */
        searchInitiated: false,
    },
    articlesPage: {
        searchTerm: '',
        searchInitiated: false,
    },
    groupsPage: {
        searchTerm: '',
        searchInitiated: false,
    },
};

const appSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        changeSearchPageQuery(state, action: PayloadAction<string>) {
            state.searchPage.searchTerm = action.payload;
        },
        changeSearchPageInitiated(state, action: PayloadAction<boolean>) {
            state.searchPage.searchInitiated = action.payload;
        },
        changeArticlesPageSearchQuery(state, action: PayloadAction<string>) {
            state.articlesPage.searchTerm = action.payload;
        },
        changeArticlesPageSearchInitiated(
            state,
            action: PayloadAction<boolean>,
        ) {
            state.articlesPage.searchInitiated = action.payload;
        },
        changeGroupsPageSearchQuery(state, action: PayloadAction<string>) {
            state.groupsPage.searchTerm = action.payload;
        },
        changeGroupsPageSearchInitiated(state, action: PayloadAction<boolean>) {
            state.groupsPage.searchInitiated = action.payload;
        },
    },
});

export const {
    changeSearchPageQuery,
    changeSearchPageInitiated,
    changeArticlesPageSearchInitiated,
    changeArticlesPageSearchQuery,
    changeGroupsPageSearchInitiated,
    changeGroupsPageSearchQuery,
} = appSlice.actions;
export const appReducer = appSlice.reducer;
