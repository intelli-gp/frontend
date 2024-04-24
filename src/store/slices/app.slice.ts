import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface AppStateArgs {
    /**
     * The search query that the user has entered.
     * to be saved between page navigation.
     */
    searchTerm: string;

    /**
     * The category that the user has selected to help the search with
     */
    searchCategory?: string;
    /**
     * Does the user initiated a search query?
     * this is to be used to show recommendations
     * or search results and keep the state between
     * page navigation.
     */
    searchInitiated: boolean;

    /**
     * The current page number that the user is on.
     */
    paginationPageNumber: number;
    /**
     * The limit of items to show per page.
     */
    paginationPageLimit?: number;
}

export interface AppState {
    searchPage: AppStateArgs;
    articlesPage: AppStateArgs;
    groupsPage: AppStateArgs;
    coursesPage: AppStateArgs;
}

const initialState: AppState = {
    searchPage: {
        searchTerm: '',
        searchInitiated: false,
        paginationPageNumber: 1,
    },
    articlesPage: {
        searchTerm: '',
        searchInitiated: false,
        paginationPageNumber: 1,
    },
    groupsPage: {
        searchTerm: '',
        searchInitiated: false,
        paginationPageNumber: 1,
    },
    coursesPage: {
        searchTerm: '',
        searchCategory: '',
        searchInitiated: false,
        paginationPageNumber: 1,
        paginationPageLimit: 24,
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
        changeArticlesPagePaginationPageNumber(
            state,
            action: PayloadAction<number>,
        ) {
            state.articlesPage.paginationPageNumber = action.payload;
        },
        changeGroupsPageSearchQuery(state, action: PayloadAction<string>) {
            state.groupsPage.searchTerm = action.payload;
        },
        changeGroupsPageSearchInitiated(state, action: PayloadAction<boolean>) {
            state.groupsPage.searchInitiated = action.payload;
        },
        changeGroupsPagePaginationPageNumber(
            state,
            action: PayloadAction<number>,
        ) {
            state.groupsPage.paginationPageNumber = action.payload;
        },
        changeCoursesPageSearchInitiated(
            state,
            action: PayloadAction<boolean>,
        ) {
            state.coursesPage.searchInitiated = action.payload;
        },
        changeCoursesPageSearchCategory(state, action: PayloadAction<string>) {
            state.coursesPage.searchCategory = action.payload;
        },
        changeCoursesPageSearchQuery(state, action: PayloadAction<string>) {
            state.coursesPage.searchTerm = action.payload;
        },
        changeCoursesPagePaginationPageNumber(
            state,
            action: PayloadAction<number>,
        ) {
            state.coursesPage.paginationPageNumber = action.payload;
        },
        changeCoursesPagePaginationPageLimit(
            state,
            action: PayloadAction<number>,
        ) {
            state.coursesPage.paginationPageNumber = action.payload;
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
    changeArticlesPagePaginationPageNumber,
    changeGroupsPagePaginationPageNumber,
    changeCoursesPageSearchQuery,
    changeCoursesPagePaginationPageLimit,
    changeCoursesPagePaginationPageNumber,
    changeCoursesPageSearchInitiated,
} = appSlice.actions;
export const appReducer = appSlice.reducer;
