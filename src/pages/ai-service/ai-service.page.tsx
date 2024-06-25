import { useEffect, useState } from 'react';

import PlayImage from '../../assets/imgs/play-placeholder-2.svg';
import { ForbiddenModal } from '../../components/ForbiddenModal';
import Button from '../../components/button/button.component';
import { Label } from '../../components/input/input.styles';
import { BetweenPageAnimation, PageTitle } from '../../index.styles';
import {
    useGenerateAiVideoMutation,
    useTestSubscriptionQuery,
} from '../../store';
import { errorToast, successToast } from '../../utils/toasts';
import {
    AttachmentIcon,
    GenerateButton,
    Holder,
    PageContainer,
    SearchBarContainer,
} from './ai-service.styles';

const MainContent = ({ videoSrc }: { videoSrc: string }) => {
    return (
        <video
            width={'100%'}
            height={500}
            src={videoSrc}
            controls
            poster={PlayImage}
            className="rounded-md"
        />
    );
};

export const AIServicePage = () => {
    const [prompt, setPrompt] = useState('');

    const [generateVideo, { isLoading }] = useGenerateAiVideoMutation();
    const [videoSrc, setVideoSrc] = useState('');
    const [invalidSubscription, setInvalidSubscription] = useState(false);

    useEffect(() => {
        document.title = 'AI Service | Mujedd';
        return () => {
            document.title = 'Mujedd';
        };
    }, []);

    const handleGenerateVideo = async () => {
        try {
            const { data } = await generateVideo({ Content: prompt }).unwrap();
            setVideoSrc(data.Url);
            successToast('Video generated successfully');
        } catch (e) {
            errorToast('Failed to generate video');
        }
    };

    const { error } = useTestSubscriptionQuery();

    useEffect(() => {
        if ((error as any)?.status === 403) {
            setInvalidSubscription(true);
        }
    }, [error]);

    return (
        <PageContainer {...BetweenPageAnimation}>
            <PageTitle className="text-center">AI Lectures</PageTitle>
            <SearchBarContainer>
                <AttachmentIcon size={18} />
                <input
                    className="border-none outline-none focus-visible:outline-none flex-1"
                    placeholder="Enter Your Prompt here..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <GenerateButton
                    onClick={handleGenerateVideo}
                    loading={isLoading}
                >
                    Generate
                </GenerateButton>
            </SearchBarContainer>
            <div className="mt-6 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <Label className="!w-auto">Select your instructor:</Label>
                    <select className="px-4 py-2 bg-indigo-100 rounded-md hover:bg-indigo-200 cursor-pointer">
                        <option value="Andrew Ng">Andrew Ng</option>
                    </select>
                </div>
                <Holder>
                    <div className="flex-grow">
                        <MainContent videoSrc={videoSrc} />
                    </div>
                    <div className="flex w-full gap-2 flex-row-reverse pb-4 px-4">
                        <Button outline>Share</Button>
                        <Button select="warning">Download</Button>
                    </div>
                </Holder>
            </div>
            <ForbiddenModal
                isOpen={invalidSubscription}
                setIsOpen={setInvalidSubscription}
            />
        </PageContainer>
    );
};
