import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ArticleSection, ArticleSectionType } from '../../types/article.d';

const initialState = {
    cover: '',
    title: '',
    tags: ['we-are-examples', `don't-forget-to`, 'delete-us'],
    sections: [
        {
            id: 1,
            contentType: ArticleSectionType.Markdown,
            value: '',
        },
        {
            id: 2,
            contentType: ArticleSectionType.Image,
            value: '',
        },
    ] as ArticleSection[],
    sectionToBeDeletedId: -1,
    deleteSectionModalIsOpen: false,
};

const articleCreatorSlice = createSlice({
    name: 'article-creator',
    initialState,
    reducers: {
        changeArticleCoverImage(state, action: PayloadAction<string>) {
            state.cover = action.payload;
        },
        changeArticleTitle(state, action: PayloadAction<string>) {
            state.title = action.payload;
        },
        changeArticleTags(state, action: PayloadAction<string[]>) {
            state.tags = action.payload;
        },
        setSectionToBeDeleted(state, action: PayloadAction<number>) {
            state.sectionToBeDeletedId = action.payload;
            state.deleteSectionModalIsOpen = true;
        },
        executeSectionDeletion(state) {
            state.sections = state.sections.filter(
                (section) => section.id != state.sectionToBeDeletedId,
            );
            state.sectionToBeDeletedId = -1;
            state.deleteSectionModalIsOpen = false;
        },
        addArticleSection(
            state,
            action: PayloadAction<
                Partial<ArticleSection> & { contentType: ArticleSectionType }
            >,
        ) {
            state.sections.push({
                id: Math.floor(Math.random() * 10e9),
                contentType: action.payload.contentType,
                value: action.payload.value || '',
            });
        },
        changeArticleSectionValue(
            state,
            action: PayloadAction<{
                targetSectionId: number;
                newValue: string;
            }>,
        ) {
            const { targetSectionId, newValue } = action.payload;
            state.sections = state.sections.map((section) => {
                if (section.id === targetSectionId) {
                    return {
                        ...section,
                        value: newValue,
                    };
                } else return section;
            });
        },
        openDeleteSectionModal(state, action: PayloadAction<boolean>) {
            state.deleteSectionModalIsOpen = action.payload;
        },
        resetArticleCreator() {
            return initialState;
        },
        deleteAllSections(state) {
            state.sections = [];
        },
    },
});

export const {
    changeArticleCoverImage,
    changeArticleSectionValue,
    changeArticleTags,
    changeArticleTitle,
    addArticleSection,
    resetArticleCreator,
    executeSectionDeletion,
    setSectionToBeDeleted,
    openDeleteSectionModal,
    deleteAllSections,
} = articleCreatorSlice.actions;
export const articleCreatorReducer = articleCreatorSlice.reducer;
