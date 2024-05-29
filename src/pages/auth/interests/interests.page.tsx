import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import TagsInput from '../../../components/tagsInput/tagsInput.component';
import { FooterButtons } from '../../../components/tagsInput/tagsInput.styles';
import { BetweenPageAnimation, PageTitle } from '../../../index.styles';
import {
    RootState,
    setCredentials,
    useUpdateUserMutation,
} from '../../../store';
import { useGetAllTagsQuery } from '../../../store';
import { errorToast } from '../../../utils/toasts';
import { ContinueButton, PageContainer, SubTitle } from './interests.styles';

const InterestsPage = () => {
    const { data: getTagsRes } = useGetAllTagsQuery(undefined);
    const tags = getTagsRes?.data || [];
    const token = useSelector((state: RootState) => state.auth.token);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [updateUser, { isLoading, error, isError, isSuccess }] =
        useUpdateUserMutation();

    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    useEffect(() => {
        if (isError) {
            errorToast(JSON.stringify(error));
        } else if (isSuccess) {
            navigate('/app/search');
        }
    }, [isError, isSuccess]);

    const removeTagFromSelected = (tag: string) => {
        setSelectedTags(selectedTags.filter((t) => t !== tag));
    };

    const addTagToSelected = (tag: string) => {
        setSelectedTags([...selectedTags, tag]);
    };

    const handleContinue = async () => {
        if (selectedTags.length < 3) {
            errorToast('Please select at least 3 tags');
            return;
        }
        const {
            data: { updatedUser },
        } = await updateUser({
            addedInterests: selectedTags,
            removedInterests: [],
        }).unwrap();
        dispatch(
            setCredentials({
                user: updatedUser,
                token,
            }),
        );
    };

    return (
        <PageContainer {...BetweenPageAnimation}>
            <header className="sticky top-0 w-full z-10 bg-white">
                <PageTitle className="text-center">
                    Add your interests
                </PageTitle>
                <SubTitle>Help us to customize your feed</SubTitle>
            </header>

            <main className="flex flex-col flex-1 items-center justify-center w-full ">
                <TagsInput
                    availableTags={tags}
                    selectedTags={selectedTags}
                    addTagToSelected={addTagToSelected}
                    removeTagFromSelected={removeTagFromSelected}
                />
            </main>

            <FooterButtons>
                <ContinueButton onClick={handleContinue} loading={isLoading}>
                    Continue
                </ContinueButton>
            </FooterButtons>
        </PageContainer>
    );
};

export default InterestsPage;
