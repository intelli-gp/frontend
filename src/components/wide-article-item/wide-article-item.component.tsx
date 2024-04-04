import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import defaultUserImage from '../../assets/imgs/user.jpg';
import { ReceivedArticle } from '../../types/article';
import { profileURL } from '../../utils/profileUrlBuilder';
import Tag from '../tag/tag.component';
import { UserUsername } from '../wide-article-item/wide-article-item.styles';
import {
    ArticleContainer,
    ArticleDate,
    ArticleFooter,
    ArticleThumbnail,
    ArticleTitle,
    AuthorData,
    AuthorFullName,
    AuthorPicture,
    TagsContainer,
} from './wide-article-item.styles';

type WideArticleItemProps = Partial<ReceivedArticle> & {
    onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const WideArticleItem = ({
    Author,
    CoverImage,
    ArticleTags,
    Title: title,
    UpdatedAt,
    CreatedAt,
    onClick,
}: WideArticleItemProps) => {
    const navigate = useNavigate();
    return (
        <ArticleContainer onClick={onClick} title={title}>
            <ArticleThumbnail src={CoverImage} alt={'thumbnail'} />
            <div className="flex flex-col justify-between flex-1 overflow-hidden py-3">
                <AuthorData
                    onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        navigate(profileURL(Author?.Username!));
                    }}
                    title={`View ${Author?.FullName}'s profile`}
                >
                    <AuthorPicture
                        src={Author?.ProfileImage ?? defaultUserImage}
                        alt="user profile picture"
                    />
                    <div className="overflow-hidden">
                        <AuthorFullName>{Author?.FullName}</AuthorFullName>
                        <UserUsername className="!text-inherit">
                            @{Author?.Username}
                        </UserUsername>
                    </div>
                </AuthorData>
                <ArticleTitle lines={2}>{title}</ArticleTitle>
                <ArticleFooter>
                    <TagsContainer>
                        {ArticleTags?.slice(0, 3).map((tag) => (
                            <Tag text={tag} size="xs" />
                        ))}
                    </TagsContainer>
                    <ArticleDate>
                        {moment(new Date(UpdatedAt! || CreatedAt!)).format(
                            'DD MMM, YYYY',
                        )}
                    </ArticleDate>
                </ArticleFooter>
            </div>
        </ArticleContainer>
    );
};

export default WideArticleItem;
