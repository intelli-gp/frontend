import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/Button';
import TagsInput from '../../../components/tagsInput/tagsInput.component';
import { FooterButtons } from '../../../components/tagsInput/tagsInput.styles';
import { useUpdateUserMutation } from '../../../store';
import { useGetAllTagsQuery } from '../../../store';
import { errorToast } from '../../../utils/toasts';
import { Page } from './interests.styles';

const InterestsPage = () => {
    const { data: getTagsRes } = useGetAllTagsQuery(undefined);
    const tags = getTagsRes?.data || [];

    const navigate = useNavigate();

    const [updateUser, { isLoading, error, isError, isSuccess }] =
        useUpdateUserMutation();

    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    useEffect(() => {
        if (isError) {
            errorToast(JSON.stringify(error), 'top-right');
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

    const handleContinue = () => {
        if (selectedTags.length < 3) {
            errorToast('Please select at least 3 tags', 'top-right');
            return;
        }
        updateUser({ interests: selectedTags });
    };

    return (
        <Page>
            <header>
                <h1 className="text-5xl 3xs:max-md:text-[2.5rem] text-slate-600 font-black text-center tracking-tight pb-1">
                    Add your interests
                </h1>
                <h3 className="text-lg text-slate-600 text-center">
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
                <Button
                    type="button"
                    onClick={handleContinue}
                    loading={isLoading}
                >
                    Continue
                </Button>
            </FooterButtons>
        </Page>
    );
};

export default InterestsPage;
