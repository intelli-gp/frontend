import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import { ReceivedArticle } from '../../types/article';
import { profileURL } from '../../utils/profileUrlBuilder';
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

type VerticalArticleProps = ReceivedArticle & {
    /**
     * Function to be called when the user clicks on the article's `continue reading` button
     */
    continueReadingHandler?: () => void;

    /**
     * If true, the author's name will be a link to the author's profile
     */
    enableAuthorLink?: boolean;
};

const VerticalArticle = ({
    Author,
    CoverImage,
    Title,
    UpdatedAt,
    Sections,
    CreatedAt,
    enableAuthorLink,
    continueReadingHandler,
}: VerticalArticleProps) => {
    const navigate = useNavigate();
    const articleText =
        Sections?.find(
            (section) => section.ContentType === 'markdown',
        )?.Value?.replaceAll('#', '') ?? '';

    const defaultContinueReadingHandler = () => navigate('/auth/signup');

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
                    <AuthorName
                        to={enableAuthorLink ? profileURL(Author.Username) : ''}
                    >
                        by {Author.FullName}
                    </AuthorName>
                    <ArticleTime dateTime={UpdatedAt}>
                        {moment(new Date(UpdatedAt! || CreatedAt!)).format(
                            'DD MMM, YYYY',
                        )}
                    </ArticleTime>
                </div>
                <ContinueReadingButton
                    size={24}
                    title="continue reading"
                    onClick={
                        continueReadingHandler ?? defaultContinueReadingHandler
                    }
                />
            </CardFooter>
        </CardContainer>
    );
};
export default VerticalArticle;
