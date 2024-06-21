import { useEffect, useState } from 'react';
import { PageContainer, SearchBarContainer, AttachmentIcon, GenerateButton, Holder, DownloadIcon, ShareIcon } from './ai-service.styles';
import { BetweenPageAnimation, PageTitle } from '../../index.styles';

export const AIServicePage = () => {
    const [prompt, setPrompt] = useState('');

    useEffect(() => {
        document.title = 'AI Service | Mujedd';
        return () => {
            document.title = 'Mujedd';
        };
    }, []);

    // const { data: subscriptionResponse, isLoading: isSubscriptionDataLoading, isError } = useGetSubscriptionQuery();
    // const subscriptionData = subscriptionResponse?.data;

    return (

            <PageContainer {...BetweenPageAnimation}>
                <PageTitle className="text-center">AI Service</PageTitle>
                <SearchBarContainer>
                    <AttachmentIcon size={18} />
                    <input
                        className="border-none outline-none focus-visible:outline-none flex-1"
                        placeholder="Enter Your Prompt here..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                    <GenerateButton>Generate</GenerateButton>
                </SearchBarContainer>
                <Holder>
                    <div className="flex w-full justify-end gap-2 items-center p-4">
                        <ShareIcon size={20} title="Share" />
                        <DownloadIcon size={20} title="Download" />
                    </div>
                </Holder>
            </PageContainer>
        );
};
