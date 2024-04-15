import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
import { RootState } from '../../store';
import { useLazyGeneralSearchQuery } from '../../store/apis/searchApi';
import { GeneralSearchData } from '../../types/search';
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
    const [searchValue, setSearchValue] = useState('');
    const [isFirstRender, setIsFirstRender] = useState(true);
    const storedUser = useSelector((state: RootState) => state.auth.user);

    const [triggerSearch, { isLoading, data: _searchResult }] =
        useLazyGeneralSearchQuery();
    const searchResult = _searchResult?.data as GeneralSearchData;

    const handleSearchValueChange = (newValue: string) => {
        setSearchValue(newValue);
    };

    const searchHandler = async () => {
        if (searchValue.trim().length === 0) return;
        try {
            await triggerSearch(searchValue).unwrap();
            setIsFirstRender(false);
        } catch (error) {
            errorToast('Error occurred while searching.');
            console.error(error);
        }
    };

    useEffect(() => {
        if (!isFirstRender) return;
        let userInterests = storedUser.UserTags?.join(' ') ?? '';
        triggerSearch(userInterests);
    }, []);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <PageContainer {...BetweenPageAnimation}>
            <ExplorePageHeader
                WithoutButton
                searchValue={searchValue}
                onSearchValueChange={handleSearchValueChange}
                searchHandler={searchHandler}
            />

            <SearchPageSection
                empty={searchResult && searchResult?.users?.length === 0}
            >
                <SectionTitle>
                    {isFirstRender
                        ? 'Suggested users'
                        : 'users based on your search'}
                </SectionTitle>
                <Swiper
                    navigation={true}
                    spaceBetween={25}
                    modules={[Navigation]}
                    className="w-full !p-2"
                    slidesPerView={'auto'}
                >
                    {searchResult?.users?.slice(0, 10)?.map((user) => {
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
                    {isFirstRender
                        ? 'Suggested chat groups'
                        : 'chat groups based on your search'}
                    <ExploreMoreLink to="/app/groups">
                        Explore More
                    </ExploreMoreLink>
                </SectionTitle>
                <Swiper
                    navigation={true}
                    spaceBetween={25}
                    modules={[Navigation]}
                    className="w-full !p-2"
                    slidesPerView={'auto'}
                >
                    {searchResult?.groups?.slice(0, 10)?.map((group) => {
                        return (
                            <SwiperCustomSlide key={group.ID}>
                                <GroupCard {...group} />
                            </SwiperCustomSlide>
                        );
                    })}
                </Swiper>
            </SearchPageSection>

            <SearchPageSection
                empty={searchResult && searchResult?.articles?.length === 0}
            >
                <SectionTitle>
                    {isFirstRender
                        ? 'Suggested articles'
                        : 'articles based on your search'}
                    <ExploreMoreLink to="/app/articles">
                        Explore More
                    </ExploreMoreLink>
                </SectionTitle>
                <ArticleSectionBody>
                    {searchResult?.articles?.slice(0, 10)?.map((article) => {
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
