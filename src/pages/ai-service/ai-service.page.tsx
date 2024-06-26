import { useEffect, useState } from 'react';

import PlayImage from '../../assets/imgs/vide-placeholder.svg';
import { ForbiddenModal } from '../../components/ForbiddenModal';
import Skeleton from '../../components/Skeleton';
import EnhancedImage from '../../components/image/image.component';
import { Label } from '../../components/input/input.styles';
import { BetweenPageAnimation, PageTitle } from '../../index.styles';
import {
    useGenerateAiVideoMutation,
    useTestSubscriptionQuery,
} from '../../store';
import { errorToast, successToast } from '../../utils/toasts';
import {
    GenerateButton,
    PageContainer,
    PromptInput,
    SearchBarContainer,
    StarsIcon,
    VideoWrapper,
} from './ai-service.styles';

type MainContentProps = {
    videoSrc: string;
    isLoading?: boolean;
};
const MainContent = ({ videoSrc, isLoading }: MainContentProps) => {
    if (isLoading) {
        return <Skeleton className="w-full h-full rounded-lg !m-0" darker />;
    }

    if (!videoSrc) {
        return (
            <div className="flex items-center justify-center w-full h-full">
                <EnhancedImage
                    src={PlayImage}
                    alt="Play Image"
                    className="rounded-lg"
                />
            </div>
        );
    }

    return (
        <video
            src={videoSrc}
            controls
            className="rounded-[0.75rem] h-full object-contain"
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
        if (!prompt.trim()) return errorToast('Invalid empty prompt');
        try {
            const { data } = await generateVideo({ Content: prompt }).unwrap();
            setVideoSrc(data.Url);
            successToast('Video generated successfully');
        } catch (e) {
            errorToast('Failed to generate video');
        }
    };

    const { error } = useTestSubscriptionQuery();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleGenerateVideo();
        }
    };

    useEffect(() => {
        if ((error as any)?.status === 403) {
            setInvalidSubscription(true);
        }
    }, [error]);

    return (
        <PageContainer {...BetweenPageAnimation}>
            <PageTitle className="text-center">AI Lectures Generator</PageTitle>
            <div className="flex flex-col gap-2">
                <SearchBarContainer>
                    <PromptInput
                        placeholder="Enter Your Prompt here..."
                        value={prompt}
                        multiline
                        row={3}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setPrompt(e.target.value)
                        }
                        onKeyDown={handleKeyDown}
                    />
                </SearchBarContainer>
                <div className="flex items-center gap-4">
                    <Label className="!text-[1.25rem]">
                        Select your instructor:
                    </Label>
                    <select className="!w-[140px] !h-[40px] bg-indigo-200 rounded-xl cursor-pointer px-2">
                        <option value="Andrew Ng">Andrew Ng</option>
                    </select>
                    <GenerateButton
                        select="primary200"
                        onClick={handleGenerateVideo}
                        loading={isLoading}
                    >
                        <StarsIcon />
                        Generate
                    </GenerateButton>
                </div>
            </div>

            <VideoWrapper>
                <MainContent videoSrc={videoSrc} />
            </VideoWrapper>

            <ForbiddenModal
                isOpen={invalidSubscription}
                setIsOpen={setInvalidSubscription}
            />
        </PageContainer>
    );
};
