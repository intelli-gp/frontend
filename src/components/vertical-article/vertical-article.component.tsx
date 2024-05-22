import { useNavigate } from 'react-router-dom';

import { ReceivedArticle } from '../../types/article';
import {
    ArticleText,
    ArticleTitle,
} from '../wide-article-item/wide-article-item.styles';
import './vertical-article.style';
import {
    ArticleTime,
    AuthorImage,
    AuthorName,
    CardBody,
    CardContainer,
    CardFooter,
    CardImage,
    ContinueReadingButton,
} from './vertical-article.style';
import moment from 'moment';

const VerticalArticle = ({
    Author,
    CoverImage,
    Title,
    UpdatedAt,
    Sections,
    CreatedAt,
}: ReceivedArticle) => {
    const navigate = useNavigate();
    const articleText =
        Sections?.find(
            (section) => section.ContentType === 'markdown',
        )?.Value?.replaceAll('#', '') ?? '';
    return (
        <CardContainer>
            <CardImage src={CoverImage} alt={Title} />
            <CardBody>
                <ArticleTitle lines={2}>{Title}</ArticleTitle>
                <ArticleText lines={4}>{articleText}</ArticleText>
            </CardBody>

            <CardFooter>
                <AuthorImage src={Author.ProfileImage} alt={Author.FullName} />
                <div className="flex flex-col">
                    <AuthorName>by {Author.FullName}</AuthorName>
                    <ArticleTime dateTime={UpdatedAt}>
                        {moment(new Date(UpdatedAt! || CreatedAt!)).format(
                            'DD MMM, YYYY',
                        )}
                    </ArticleTime>
                </div>
                <ContinueReadingButton
                    size={24}
                    title="continue reading"
                    onClick={() => navigate('/auth/signup')}
                />
            </CardFooter>
        </CardContainer>
    );
};
export default VerticalArticle;
