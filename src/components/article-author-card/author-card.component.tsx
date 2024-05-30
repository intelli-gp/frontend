import { useEffect, useState } from 'react';

import defaultUserImage from '../../assets/imgs/user.jpg';
import { useLazyFetchUserQuery, useLazyGetFollowersQuery } from '../../store';
import { ReceivedArticle } from '../../types/article';
import { ReceivedUser } from '../../types/user';
import { formatCompactNumber } from '../../utils/compactNumbers';
import { profileURL } from '../../utils/profileUrlBuilder';
import { errorToast } from '../../utils/toasts';
import {
    AuthorData,
    AuthorDataContainer,
    AuthorHeadline,
    AuthorName,
    AuthorProfileImage,
    FollowButtonComponent,
} from './author-card.styles';

type AuthorCardProps = {
    article: ReceivedArticle;
};

export const AuthorCard = ({ article }: AuthorCardProps) => {
    const [fetchUser] = useLazyFetchUserQuery();
    const [fetchUserFollowers] = useLazyGetFollowersQuery();

    const [authorFullData, setAuthorFullData] = useState<ReceivedUser>();
    const [authorFollowersCount, setAuthorFollowersCount] = useState<number>();

    useEffect(() => {
        if (!article?.Author?.Username) return;
        fetchUser(article?.Author?.Username)
            .unwrap()
            .then((response) => {
                setAuthorFullData(response?.data?.user);
                fetchUserFollowers(response?.data?.user?.ID)
                    .unwrap()
                    .then((data) => {
                        setAuthorFollowersCount(data?.data?.TotalEntityCount);
                    });
            })
            .catch(() => errorToast("Couldn't fetch author data"));
    }, []);

    return (
        <AuthorDataContainer>
            <AuthorProfileImage
                src={article?.Author?.ProfileImage ?? defaultUserImage}
                alt="author profile image"
            />
            <AuthorData>
                <div>
                    <AuthorName to={profileURL(article?.Author?.Username)}>
                        {article?.Author?.FullName}
                    </AuthorName>
                    <AuthorHeadline>{article?.Author?.Headline}</AuthorHeadline>
                </div>
                <div className="flex justify-evenly">
                    <VerticalBadge
                        count={formatCompactNumber(
                            authorFullData?.Articles?.length ?? 0,
                        )}
                        title="articles"
                    />
                    <VerticalBadge
                        count={formatCompactNumber(authorFollowersCount ?? 0)}
                        title="followers"
                    />
                </div>
                <div className="flex gap-2">
                    <FollowButtonComponent
                        AnotherUserUserName={article?.Author?.Username}
                        AnotherUserID={authorFullData?.ID}
                    />
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
