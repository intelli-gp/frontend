import moment from 'moment';

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
    ContinueWrapper,
} from './vertical-article.style';

type VerticalArticleProps = ReceivedArticle & {
    /**
     * Link to navigate to when the user clicks on the article's `continue reading` button
     */
    continueReadingLink?: string;

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
    continueReadingLink = '/auth/signup',
}: VerticalArticleProps) => {
    const articleText =
        Sections?.find(
            (section) => section.ContentType === 'markdown',
        )?.Value?.replaceAll('#', '') ?? '';

    return (
        <CardContainer>
            <CardImage src={CoverImage} alt={Title} fallbackType='article' transparentPlaceholder/>
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
                <ContinueWrapper to={continueReadingLink}>
                    <ContinueReadingButton size={24} title="continue reading" />
                </ContinueWrapper>
            </CardFooter>
        </CardContainer>
    );
};
export default VerticalArticle;
