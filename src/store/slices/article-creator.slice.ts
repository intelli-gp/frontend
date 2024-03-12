import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ArticleSection, ArticleSectionType } from '../../types/article.d';

const initialState = {
    cover: '',
    title: '',
    tags: ['we-are-examples', `don't-forget-to`, 'delete-us'],
    sections: [
        {
            ID: 1,
            ContentType: ArticleSectionType.Markdown,
            Value: '',
        },
        {
            ID: 2,
            ContentType: ArticleSectionType.Image,
            Value: '',
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
                (section) => section.ID != state.sectionToBeDeletedId,
            );
            state.sectionToBeDeletedId = -1;
            state.deleteSectionModalIsOpen = false;
        },
        addArticleSection(
            state,
            action: PayloadAction<
                Partial<ArticleSection> & { ContentType: ArticleSectionType }
            >,
        ) {
            state.sections.push({
                ID: Math.floor(Math.random() * 10e9),
                ContentType: action.payload.ContentType,
                Value: action.payload.Value || '',
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
                if (section.ID === targetSectionId) {
                    return {
                        ...section,
                        Value: newValue,
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
