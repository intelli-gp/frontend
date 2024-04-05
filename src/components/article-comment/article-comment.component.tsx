import moment from 'moment';
import { ChangeEvent, useState } from 'react';

import { useCommentOnArticleMutation } from '../../store';
import type { ArticleComment as ArticleCommentType } from '../../types/article';
import { profileURL } from '../../utils/profileUrlBuilder';
import { errorToast } from '../../utils/toasts';
import Button from '../button/button.component';
import { CustomInput } from '../input/Input.component';
import {
    CommentContainer,
    CommentContent,
    CommentDate,
    CommentHeader,
    CommenterFullName,
    CommenterProfileImage,
    WriteCommentContainer,
} from './article-comment.styles';

type ArticleCommentProps = {
    comment: ArticleCommentType;
};

const ArticleComment = ({ comment }: ArticleCommentProps) => {
    return (
        <CommentContainer data-color-mode="light">
            <CommentHeader>
                <CommenterProfileImage src={comment.Commenter.ProfileImage} />
                <div className="flex flex-col gap-0">
                    <CommenterFullName
                        to={profileURL(comment.Commenter.Username)}
                    >
                        {comment.Commenter.FullName}
                    </CommenterFullName>
                    <CommentDate>
                        {moment(comment.CreatedAt).fromNow()}
                    </CommentDate>
                </div>
            </CommentHeader>
            <CommentContent source={comment.Content} />
        </CommentContainer>
    );
};

export const ArticleWriteComment = ({ articleId }: { articleId: number }) => {
    const [comment, setComment] = useState('');

    const [addComment, { isLoading, reset }] = useCommentOnArticleMutation();

    const handleAddComment = async () => {
        if (!comment.trim()) return;
        try {
            await addComment({ content: comment, id: articleId });
            setComment('');
        } catch (error) {
            console.error(error);
            errorToast('Failed to add comment');
        } finally {
            reset();
        }
    };

    return (
        <WriteCommentContainer>
            <CustomInput
                value={comment}
                limit={512}
                maxLength={512}
                multiline
                rows={3}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setComment(e.target.value)
                }
                placeholder="Write a comment..."
                className="resize-none"
            />

            <div className="text-sm flex gap-1">
                <Button onClick={handleAddComment} loading={isLoading}>
                    Post
                </Button>
                <Button
                    select="danger"
                    outline
                    onClick={() => setComment('')}
                    loading={isLoading}
                >
                    Reset
                </Button>
            </div>
        </WriteCommentContainer>
    );
};

export default ArticleComment;
