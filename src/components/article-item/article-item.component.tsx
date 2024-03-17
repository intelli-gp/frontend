import defaultUserImage from '../../assets/imgs/user.jpg';
import { ReceivedArticle } from '../../types/article';
import Tag from '../tag/tag.component';
import { Container, Title, UserImage, Username } from './article-item.style';

const SingleBlog = ({
    Author: author,
    CoverImage: coverImageUrl,
    ArticleTags: tags,
    Title: title,
    UpdatedAt: updatedAt,
}: ReceivedArticle) => {
    return (
        <Container>
            <img
                src={coverImageUrl}
                alt="blog img"
                className="w-full rounded-t-xl"
            />
            <div className="py-[12px] px-[20px]">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row p-[8px] gap-2">
                        {tags
                            ?.slice(0, 3)
                            .map((tag) => <Tag text={tag} size="sm" />)}
                    </div>
                    <div className="flex  justify-between">
                        <Title>{title}</Title>
                        <p className="text-xs  text-slate-600 pt-2 ">
                            {new Date(updatedAt).toLocaleDateString('en-US', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                            })}
                        </p>
                    </div>
                    <hr className="my-0 border-slate-200" />
                    <div className="flex items-center ">
                        <UserImage
                            src={author?.ProfileImage ?? defaultUserImage}
                            alt="user img"
                        />
                        <Username>{author.FullName}</Username>
                    </div>
                </div>
            </div>
        </Container>
    );
};
export default SingleBlog;
