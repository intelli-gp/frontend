import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/button/button.component';
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
import { PageContainer } from './interests.styles';

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
            navigate('/app');
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
            <header>
                <PageTitle className="text-center">
                    Add your interests
                </PageTitle>
                <h3 className="text-lg text-[var(--gray-800)] text-center">
                    Help us to customize your feed
                </h3>
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
                <Button onClick={handleContinue} loading={isLoading}>
                    Continue
                </Button>
            </FooterButtons>
        </PageContainer>
    );
};

export default InterestsPage;
