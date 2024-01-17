import { Blog } from '../../types/blog';
import Tag from '../tag/tag.component';
import {
    AuthorData,
    AuthorPicture,
    BlogContainer,
    BlogContentContainer,
    BlogFooter,
    BlogTextContent,
    BlogThumbnail,
} from './wide-blog-post.styles';

const WideBlogPost = ({
    author,
    title,
    content,
    coverImageUrl,
    createdAt,
    tags,
}: Blog) => {
    return (
        <BlogContainer>
            <BlogContentContainer>
                <AuthorData>
                    <AuthorPicture
                        src={author.image}
                        alt="user profile picture"
                    />
                    {author.full_name}
                    <span className="text-xs opacity-50"> • </span>
                    <span className="text-xs opacity-70">
                        {new Date(createdAt).toDateString()}
                    </span>
                </AuthorData>

                <div className="flex justify-between gap-4">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-xl font-semibold text-slate-700">
                            {title}
                        </h1>
                        <BlogTextContent>{content}</BlogTextContent>
                    </div>
                    <BlogThumbnail src={coverImageUrl} alt={'thumbnail'} />
                </div>

                <BlogFooter>
                    {tags.slice(0, 3).map((tag) => (
                        <Tag text={tag} size="sm" />
                    ))}
                </BlogFooter>
            </BlogContentContainer>
        </BlogContainer>
    );
};

export default WideBlogPost;
