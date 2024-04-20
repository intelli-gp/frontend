import { useEffect, useState } from 'react';

import defaultUserImage from '../../assets/imgs/user.jpg';
import { useLazyFetchUserQuery } from '../../store';
import { ReceivedArticle } from '../../types/article';
import { Response } from '../../types/response';
import { ReceivedUser } from '../../types/user';
import { formatCompactNumber } from '../../utils/compactNumbers';
import { profileURL } from '../../utils/profileUrlBuilder';
import { errorToast } from '../../utils/toasts';
import Button from '../button/button.component';
import {
    AuthorData,
    AuthorDataContainer,
    AuthorHeadline,
    AuthorName,
    AuthorProfileImage,
} from './author-card.styles';

type AuthorCardProps = {
    article: ReceivedArticle;
};

export const AuthorCard = ({ article }: AuthorCardProps) => {
    const [fetchUser] = useLazyFetchUserQuery();
    const [authorFullData, setAuthorFullData] = useState<ReceivedUser>();

    useEffect(() => {
        if (article?.Author?.Username) {
            fetchUser(article?.Author?.Username)
                .unwrap()
                .then((data) => {
                    setAuthorFullData(
                        (data as Response)?.data?.user as ReceivedUser,
                    );
                    console.log(authorFullData);
                })
                .catch(() => errorToast("Couldn't fetch author data"));
        }
    }, []);

    return (
        <AuthorDataContainer to={profileURL(article?.Author?.Username)}>
            <AuthorProfileImage
                src={article?.Author?.ProfileImage ?? defaultUserImage}
                alt="author profile image"
            />
            <AuthorData>
                <div>
                    <AuthorName>{article?.Author?.FullName}</AuthorName>
                    <AuthorHeadline>{article?.Author?.Headline}</AuthorHeadline>
                </div>
                <div className="flex justify-between">
                    <VerticalBadge
                        count={formatCompactNumber(
                            authorFullData?.Articles?.length ?? 0,
                        )}
                        title="articles"
                    />
                    <VerticalBadge
                        count={formatCompactNumber(200)}
                        title="followers"
                    />
                    <VerticalBadge
                        count={formatCompactNumber(1500)}
                        title="likes"
                    />
                </div>
                <div className="flex gap-2">
                    <Button className="text-sm w-full !py-1">Follow</Button>
                </div>
            </AuthorData>
        </AuthorDataContainer>
    );
};

const VerticalBadge = ({ count, title }: { count: string; title: string }) => {
    return (
        <div className="flex flex-col justify-center gap-0">
            <h1 className="font-black text-lg leading-none">{count}</h1>
            <p className="opacity-90 text-xs leading-none">{title}</p>
        </div>
    );
};
