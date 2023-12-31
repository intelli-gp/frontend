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
                        src={author.imageUrl}
                        alt="user profile picture"
                    />
                    {author.fname + ' ' + author.lname}
                </AuthorData>
                <h1 className="text-xl font-semibold">{title}</h1>
                <BlogTextContent>{content}</BlogTextContent>
                <BlogFooter>
                    {tags.slice(0,3).map((tag) => (
                        <Tag text={tag} size="small" />
                    ))}
                </BlogFooter>
            </BlogContentContainer>
            <BlogThumbnail src={coverImageUrl} alt={'thumbnail'} />
        </BlogContainer>
    );
};

export default WideBlogPost;
