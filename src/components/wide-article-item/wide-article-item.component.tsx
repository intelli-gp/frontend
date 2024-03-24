import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import defaultUserImage from '../../assets/imgs/user.jpg';
import { ReceivedArticle } from '../../types/article';
import Tag from '../tag/tag.component';
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
            <div className="flex justify-between items-center w-full gap-4">
                <div className="flex flex-col gap-4 max-w-[70%]">
                    <AuthorData
                        onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            navigate(`/app/user/${Author?.Username}`);
                        }}
                        title={`View ${Author?.FullName}'s profile`}
                    >
                        <AuthorPicture
                            src={Author?.ProfileImage ?? defaultUserImage}
                            alt="user profile picture"
                        />
                        <AuthorFullName>{Author?.FullName}</AuthorFullName>
                    </AuthorData>
                    <ArticleTitle lines={2}>{title}</ArticleTitle>
                    <ArticleFooter>
                        <TagsContainer>
                            {ArticleTags?.slice(0, 3).map((tag) => (
                                <Tag text={tag} size="xs" />
                            ))}
                        </TagsContainer>
                        <ArticleDate>
                            {moment(
                                new Date(UpdatedAt! || CreatedAt!),
                            ).fromNow()}
                        </ArticleDate>
                    </ArticleFooter>
                </div>
                <ArticleThumbnail src={CoverImage} alt={'thumbnail'} />
            </div>
        </ArticleContainer>
    );
};

export default WideArticleItem;
