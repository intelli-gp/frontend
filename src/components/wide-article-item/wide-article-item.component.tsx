import moment from 'moment';

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
    AuthorPicture,
    TagsContainer,
} from './wide-article-item.styles';

type WideArticleItemProps = ReceivedArticle & {
    onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const WideArticleItem = ({
    Author: author,
    CoverImage: coverImageUrl,
    ArticleTags: tags,
    Title: title,
    UpdatedAt: updatedAt,
    onClick,
}: WideArticleItemProps) => {
    return (
        <ArticleContainer onClick={onClick} title={title}>
            <div className="flex justify-between items-center w-full gap-4">
                <div className="flex flex-col gap-4 max-w-[70%]">
                    <AuthorData>
                        <AuthorPicture
                            src={author?.ProfileImage ?? defaultUserImage}
                            alt="user profile picture"
                        />
                        {author?.FullName}
                    </AuthorData>
                    <ArticleTitle lines={2}>{title}</ArticleTitle>
                    <ArticleFooter>
                        <TagsContainer>
                            {tags
                                ?.slice(0, 3)
                                .map((tag) => <Tag text={tag} size="xs" />)}
                        </TagsContainer>
                        <ArticleDate>
                            {moment(new Date(updatedAt)).fromNow()}
                        </ArticleDate>
                    </ArticleFooter>
                </div>
                <ArticleThumbnail src={coverImageUrl} alt={'thumbnail'} />
            </div>
        </ArticleContainer>
    );
};

export default WideArticleItem;
