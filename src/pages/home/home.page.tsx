import { faker } from '@faker-js/faker';
import { useEffect, useMemo, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { CiLogin } from 'react-icons/ci';
import { IoPersonOutline, IoPersonSharp } from 'react-icons/io5';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { MdLogin } from 'react-icons/md';
import { Link } from 'react-router-dom';

import Section2img from '../../assets/imgs/about-illustration1.svg';
import ChatBot from '../../assets/imgs/chatBot-illustration.svg';
import Courses from '../../assets/imgs/courses-illustration.svg';
import icons from '../../assets/imgs/icons.svg';
import Star from '../../assets/imgs/star.svg';
import StudyGroup from '../../assets/imgs/studyGroup-illustration.svg';
import StudyPlanner from '../../assets/imgs/studyPlanner-illustration.svg';
import Feature from '../../components/Feature';
import SingleBlog from '../../components/article-item/article-item.component';
import Button from '../../components/button/button.component';
import { BetweenPageAnimation } from '../../index.styles';
import { useGetArticlesQuery } from '../../store';
import { ReceivedArticle } from '../../types/article';
import { Response } from '../../types/response';
import {
    AISection,
    AIWrapper,
    AItitle,
    BlogsContainer,
    BlogsSection,
    BlogsTitle,
    Body,
    BodySpan,
    ButtonLeft,
    ButtonRight,
    CarouselItem,
    CopyRightText,
    FeaturesSection,
    FeedbackCard,
    FeedbackSection,
    FooterContainer,
    FooterLink,
    FooterNav,
    HeroContainer,
    HeroContent,
    HeroSection,
    IconContainer,
    ImgContainer,
    MenuList,
    MenuTitles,
    NavContainer,
    PageContainer,
    ProfilePic,
    Sidebar,
    SlideIndicator,
    StyledFooter,
    StyledLink,
    TextAIContainer,
    Title,
    UpperContainer,
} from './home.style';

function Nav() {
    const [navbarOpen, setMenuOpen] = useState(false);

    const handleNav = () => {
        setMenuOpen(!navbarOpen);
    };
    const menuItems = ['Home', 'About', 'Features', 'Pricing'];

    return (
        <NavContainer>
            <UpperContainer>
                <Link to="/" className="w-[130px] h-auto">
                    <Title>Mujedd</Title>
                </Link>
                <div className="flex gap-16 items-center">
                    <div className="hidden lg:flex">
                        <ul className="flex px-1 ">
                            {menuItems.map((item, index) => (
                                <li key={index}>
                                    <MenuTitles href="#">{item}</MenuTitles>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex gap-6 items-center">
                        <Link to="/auth/signup" className="lg:flex hidden">
                            <Button
                                select="primary"
                                type="button"
                                className="text-sm !px-8  !rounded-lg gap-2"
                            >
                                <IoPersonSharp size={14} />
                                Signup
                            </Button>
                        </Link>
                        <Link to="/auth/login" className="lg:flex hidden">
                            <Button
                                type="button"
                                outline={true}
                                className=" !px-8 !rounded-lg gap-2 text-sm"
                            >
                                <MdLogin size={15} />
                                Login
                            </Button>
                        </Link>
                        <div
                            onClick={handleNav}
                            id="navbarToggler"
                            className="lg:hidden"
                        >
                            <AiOutlineMenu size={25} color="#fff" />
                        </div>
                    </div>
                </div>
            </UpperContainer>
            <Sidebar $navbarOpen={navbarOpen}>
                <div className="flex w-full items-center justify-end px-6">
                    <div onClick={handleNav} className="cursor-pointer">
                        <AiOutlineClose size={25} />
                    </div>
                </div>
                <MenuList>
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <a href="#">{item}</a>
                        </li>
                    ))}
                    <li>
                        <StyledLink to="/auth/signup">
                            <span>
                                <IoPersonOutline size={14} />
                                Sign up
                            </span>
                        </StyledLink>
                    </li>
                    <li>
                        <StyledLink to="/auth/login">
                            <span>
                                <CiLogin size={15} />
                                Log in
                            </span>
                        </StyledLink>
                    </li>
                </MenuList>
            </Sidebar>
        </NavContainer>
    );
}

function Hero() {
    return (
        <HeroSection>
            <HeroContainer>
                <HeroContent>
                    <h1>Turn Your Ambition Into Success Story.</h1>
                    <p>
                        In our student platform, we designed features to support
                        and enhance your educational journey, enabling you to
                        thrive academically. Join us today and unlock your
                        academic potential.
                    </p>
                </HeroContent>
            </HeroContainer>
        </HeroSection>
    );
}

function FeatureSection() {
    const features = [
        {
            color: 'bg-indigo-300',
            imgURL: StudyPlanner,
            title: 'Study Planner',
            para: 'Stay organized and on track with our intuitive study planner, allowing you to schedule your study sessions, and monitor your progress.',
            additionalClass: 'text-txt font-semibold',
        },
        {
            color: 'bg-indigo-900',
            imgURL: Courses,
            title: 'Courses Recommendations',
            para: 'Receive tailored course recommendations based on your academic interests, ensuring you make the most informed choices.',
            additionalClass: 'text-white',
        },
        {
            color: 'bg-indigo-900',
            imgURL: ChatBot,
            title: 'Chatbot Helper',
            para: 'Get instant assistance and guidance for your academic queries and challenges through our chatbot helper.',
            additionalClass: 'text-white',
        },
        {
            color: 'bg-indigo-300',
            imgURL: StudyGroup,
            title: 'Study Group Finder',
            para: 'Connect with like-minded peers by using our study group finder, which helps you discover and join study groups for your courses.',
            additionalClass: 'text-txt font-semibold',
        },
    ];
    return (
        <>
            <AISection>
                <div>
                    <AIWrapper>
                        <ImgContainer>
                            <img src={Section2img} alt="about img" />
                        </ImgContainer>
                        <TextAIContainer>
                            <div className="mb-2 sm:mb-10">
                                <AItitle>AI-Powered Service</AItitle>
                            </div>
                            <p>
                                Gain access to our cutting-edge AI-based content
                                service, where you can request video
                                explanations on specific topics in your favorite
                                professor's style, enhancing your understanding
                                and engagement.
                            </p>
                            <Button
                                type="button"
                                select="secondary"
                                className="w-4/6! rounded-lg text-xl! px-8 py-2.5 shadow-sm md:w-max! h-auto"
                            >
                                See more
                            </Button>
                        </TextAIContainer>
                    </AIWrapper>
                </div>
            </AISection>

            <FeaturesSection>
                <div>
                    {features.map((feature, index) => (
                        <Feature
                            key={index}
                            color={feature.color}
                            imgURL={feature.imgURL}
                            title={feature.title}
                            para={feature.para}
                            additionalClass={feature.additionalClass}
                            typoStyles="w-[60%]"
                        />
                    ))}
                </div>
            </FeaturesSection>
        </>
    );
}

function BlogSection() {
    const { data } = useGetArticlesQuery();
    const [articles, setArticles] = useState<ReceivedArticle[]>([]);
    const receivedData = (data as unknown as Response)?.data ?? [];

    useEffect(() => {
        setArticles(receivedData);
    }, [data]);
    return (
        <BlogsSection>
            <div>
                <BlogsTitle>
                    <h1>From Our Latest Blogs</h1>
                </BlogsTitle>
                <BlogsContainer>
                    {articles?.slice(0, 3).map((article: ReceivedArticle) => {
                        return <SingleBlog {...article} />;
                    })}
                </BlogsContainer>
            </div>
        </BlogsSection>
    );
}

function Feedback() {
    const fakeProfilePic = useMemo(() => {
        return faker.image.urlLoremFlickr({ category: 'people' });
    }, []);

    const [currentIndex, setCurrentIndex] = useState(0);

    const person = [
        {
            name: 'Jane Smith',
            rate: 5,
            feedback: 'I love using this website it is very helpful.',
        },
        {
            name: 'Simon Adams',
            rate: 4.4,
            feedback:
                'Outstanding! I am amazed by the attention to detail. Highly recommended.',
        },
        {
            name: 'Jeffry Brad',
            rate: 3.8,
            feedback: 'Not bad.',
        },
    ];

    const changeSlide = (index: number) => {
        setCurrentIndex((index + person.length) % person.length);
    };

    return (
        <FeedbackSection>
            <div className="lg:w-4/6 w-5/6">
                <div
                    id="default-carousel"
                    className="relative mb-4 mt-4 ml-4"
                    data-carousel="static"
                >
                    <div className="overflow-hidden relative h-auto rounded-lg ">
                        {person.map((item, index) => (
                            <CarouselItem
                                key={index}
                                isActive={index === currentIndex}
                            >
                                <FeedbackCard>
                                    <ProfilePic
                                        src={fakeProfilePic}
                                        alt="profile pic"
                                    />
                                    <div className="relative flex flex-col gap-4 items-center justify-center">
                                        <div className="flex gap-2">
                                            <h1 className="text-lg sm:text-xl lg:text-2xl">
                                                {item.name}
                                            </h1>
                                            <div className="flex items-center pl-6">
                                                <img
                                                    src={Star}
                                                    alt="star"
                                                    className="h-5 w-5"
                                                />
                                                <p className="ms-2  text-sm font-semibold text-white md:text-md ml-2">
                                                    {item.rate}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="lg:text-lg text-slate-300 text-center text-sm">
                                            "{item.feedback}"
                                        </p>
                                    </div>
                                </FeedbackCard>
                            </CarouselItem>
                        ))}
                    </div>
                    <div className="flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
                        {person.map((_, index) => (
                            <SlideIndicator
                                key={index}
                                type="button"
                                isActive={index === currentIndex}
                                aria-current={
                                    index === currentIndex ? 'true' : 'false'
                                }
                                onClick={() => changeSlide(index)}
                            />
                        ))}
                    </div>

                    <ButtonRight
                        type="button"
                        className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
                        data-carousel-next
                        onClick={() => changeSlide(currentIndex + 1)}
                    >
                        <BodySpan>
                            <IoChevronForwardOutline
                                className="w-6 h-6 rounded-full sm:w-8 sm:h-8 ml-1"
                                color="white"
                            />
                        </BodySpan>
                    </ButtonRight>
                    <ButtonLeft
                        type="button"
                        className="flex absolute top-0 left-0  justify-center items-center px-4 h-full cursor-pointer group "
                        data-carousel-prev
                        onClick={() => changeSlide(currentIndex - 1)}
                    >
                        <BodySpan>
                            <IoChevronBackOutline
                                className="w-6 h-6 rounded-full sm:w-8 sm:h-8 mr-1"
                                color="white"
                            />
                        </BodySpan>
                    </ButtonLeft>
                </div>
            </div>
        </FeedbackSection>
    );
}

function Footer() {
    const menuItems = ['Blogs', 'About', 'Services', 'Projects'];

    return (
        <StyledFooter>
            <FooterContainer>
                <div>
                    <FooterNav>
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <FooterLink href="/">{item}</FooterLink>
                            </li>
                        ))}
                    </FooterNav>
                </div>
                <div className="container pt-9 md:flex justify-between mt-10">
                    <CopyRightText>
                        Copyright &copy; 2022. All rights reserved.
                    </CopyRightText>
                    <IconContainer>
                        <img src={icons} alt="icons" />
                    </IconContainer>
                </div>
                <div className="mt-4 flex items-center space-x-4 sm:mt-0" />
            </FooterContainer>
        </StyledFooter>
    );
}

function HomePage() {
    return (
        <PageContainer>
            <Nav />
            <Body {...BetweenPageAnimation}>
                <Hero />
                <FeatureSection />
                <BlogSection />
                <Feedback />
            </Body>
            <Footer />
        </PageContainer>
    );
}
export default HomePage;
