import defaultUserImage from '../../assets/imgs/user.jpg';
import { ReceivedArticle } from '../../types/article';
import Tag from '../tag/tag.component';
import {
    ArticleImg,
    Container,
    Graph,
    Title,
    UserImage,
    Username,
} from './article-item.style';

const SingleBlog = ({
    Author: author,
    CoverImage: coverImageUrl,
    ArticleTags: tags,
    Title: title,
    UpdatedAt: updatedAt,
    Sections: sections,
}: ReceivedArticle) => {
    return (
        <Container>
            <ArticleImg src={coverImageUrl} alt="blog img" />
            <div className="py-[12px] px-[20px] h-[59%]">
                <div className="flex flex-col h-full">
                    <div className="flex flex-row p-[8px] gap-2">
                        {tags
                            ?.slice(0, 3)
                            .map((tag) => (
                                <Tag key={tag} text={tag} size="sm" />
                            ))}
                    </div>
                    <span className="flex-1 py-2 flex flex-col gap-[6px]">
                        <div className="flex  justify-between ">
                            <Title>{title}</Title>
                            <p className="text-xs  text-slate-600 pt-2 ">
                                {new Date(updatedAt).toLocaleDateString(
                                    'en-US',
                                    {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                    },
                                )}
                            </p>
                        </div>
                        <Graph>{sections[0].Value}</Graph>
                    </span>
                    <span className="flex flex-col gap-[7px]">
                        <hr className="my-0 border-slate-200" />
                        <div className="flex items-center ">
                            <UserImage
                                src={author?.ProfileImage ?? defaultUserImage}
                                alt="user img"
                            />
                            <Username>{author.FullName}</Username>
                        </div>
                    </span>
                </div>
            </div>
        </Container>
    );
};
export default SingleBlog;
