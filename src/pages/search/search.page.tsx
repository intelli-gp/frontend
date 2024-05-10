import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper } from 'swiper/react';

import Spinner from '../../components/Spinner';
import GroupCard from '../../components/chat-group-card/chat-group-card.component';
import ExplorePageHeader from '../../components/explore-page-header/explore-page-header.component';
import UserCard from '../../components/user-card/user-card.component';
import { SwiperCustomSlide } from '../../components/user-card/user-card.styles';
import WideArticleItem from '../../components/wide-article-item/wide-article-item.component';
import { BetweenPageAnimation } from '../../index.styles';
import {
    RootState,
    changeSearchPageInitiated,
    changeSearchPageQuery,
} from '../../store';
import {
    useLazyFetchGeneralArticlesRecommendationQuery,
    useLazyFetchGeneralUsersRecommendationQuery,
} from '../../store/apis/recommendationApi';
import { useLazyGeneralSearchQuery } from '../../store/apis/searchApi';
import { ReceivedArticle } from '../../types/article';
import { GeneralSearchData } from '../../types/search';
import { ReceivedUser } from '../../types/user';
import { errorToast } from '../../utils/toasts';
import {
    ArticleSectionBody,
    ExploreMoreLink,
    PageContainer,
    SearchPageSection,
    SectionTitle,
} from './search.styles';

const SearchPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { UserTags, ID: storedUserId } = useSelector(
        (state: RootState) => state.auth.user,
    );
    const { searchInitiated, searchTerm } = useSelector(
        (state: RootState) => state.appState.searchPage,
    );

    const [triggerSearch, { isLoading, data: _searchResult }] =
        useLazyGeneralSearchQuery();
    const searchResult = _searchResult?.data as GeneralSearchData;

    const [triggerArticleRecommendation, { data: _articleRecommendation }] =
        useLazyFetchGeneralArticlesRecommendationQuery();
    const recommendedArticles =
        _articleRecommendation?.data as ReceivedArticle[];

    const [triggerUsersRecommendation, { data: _userRecommendation }] =
        useLazyFetchGeneralUsersRecommendationQuery();
    const recommendedUsers = _userRecommendation?.data as ReceivedUser[];

    const handleSearchValueChange = (newValue: string) => {
        dispatch(changeSearchPageQuery(newValue));
    };

    const searchHandler = async (searchTerm: string) => {
        if (searchTerm.trim().length === 0) return;
        try {
            await triggerSearch({ searchTerm }).unwrap();
            dispatch(changeSearchPageInitiated(true));
        } catch (error) {
            errorToast('Error occurred while searching.');
            console.error(error);
        }
    };

    useEffect(() => {
        if (searchInitiated) {
            triggerSearch({ searchTerm });
        } else {
            // TODO: leave for now till groups recommendation is implemented
            const userTags = UserTags?.join(' ') ?? '';
            triggerSearch({ searchTerm: userTags });
            triggerArticleRecommendation({});
            triggerUsersRecommendation({});
        }
    }, []);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <PageContainer {...BetweenPageAnimation}>
            <ExplorePageHeader
                WithoutButton
                searchValue={searchTerm}
                onSearchValueChange={handleSearchValueChange}
                searchHandler={searchHandler}
                suggestionsType={'all'}
            />

            <SearchPageSection
                empty={searchResult && searchResult?.users?.length === 0}
            >
                <SectionTitle>
                    {searchInitiated
                        ? 'users search results'
                        : 'Suggested users'}
                </SectionTitle>
                {/* TODO: add skeleton here for loading users */}

                <Swiper
                    navigation={true}
                    spaceBetween={20}
                    modules={[Navigation]}
                    className="w-full !p-2"
                    slidesPerView={'auto'}
                >
                    {(searchInitiated
                        ? searchResult?.users?.slice(0, 10)
                        : recommendedUsers
                    )?.map((user) => {
                        return (
                            <SwiperCustomSlide key={user.ID}>
                                <UserCard {...user} />
                            </SwiperCustomSlide>
                        );
                    })}
                </Swiper>
            </SearchPageSection>

            <SearchPageSection
                empty={searchResult && searchResult?.groups?.length === 0}
            >
                <SectionTitle>
                    {searchInitiated
                        ? 'groups search results'
                        : 'Suggested groups'}
                    <ExploreMoreLink to="/app/groups">
                        Explore More
                    </ExploreMoreLink>
                </SectionTitle>
                {/* TODO: add skeleton here for loading groups */}
                <Swiper
                    navigation={true}
                    spaceBetween={20}
                    modules={[Navigation]}
                    className="w-full !p-2"
                    slidesPerView={'auto'}
                >
                    {searchResult?.groups?.slice(0, 10)?.map((group) => {
                        return (
                            <SwiperCustomSlide key={group.ID} width="250px">
                                <GroupCard
                                    {...group}
                                    alreadyJoined={
                                        group?.GroupMembers?.some(
                                            (member) =>
                                                member?.ID === storedUserId,
                                        ) ||
                                        group?.GroupOwner?.ID === storedUserId
                                    }
                                />
                            </SwiperCustomSlide>
                        );
                    })}
                </Swiper>
            </SearchPageSection>

            <SearchPageSection
                empty={searchResult && searchResult?.articles?.length === 0}
            >
                <SectionTitle>
                    {searchInitiated
                        ? 'Articles search results'
                        : 'Suggested articles'}
                    <ExploreMoreLink to="/app/articles">
                        Explore More
                    </ExploreMoreLink>
                </SectionTitle>
                {/* TODO: add skeleton here for loading articles */}
                <ArticleSectionBody>
                    {(searchInitiated
                        ? searchResult?.articles?.slice(0, 10)
                        : recommendedArticles
                    )?.map((article) => {
                        return (
                            <WideArticleItem
                                {...article}
                                key={article.ID}
                                onClick={() =>
                                    navigate(`/app/articles/${article.ID}`)
                                }
                            />
                        );
                    })}
                </ArticleSectionBody>
            </SearchPageSection>
        </PageContainer>
    );
};

export default SearchPage;
