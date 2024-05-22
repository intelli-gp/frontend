import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { CiLogin } from 'react-icons/ci';
import { IoPersonOutline, IoPersonSharp } from 'react-icons/io5';
import { MdLogin } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Navigation } from 'swiper/modules';
import { Swiper } from 'swiper/react';

import Section2img from '../../assets/imgs/about-illustration1.svg';
import ChatBot from '../../assets/imgs/chatBot-illustration.svg';
import Courses from '../../assets/imgs/courses-illustration.svg';
import icons from '../../assets/imgs/icons.svg';
import StudyGroup from '../../assets/imgs/studyGroup-illustration.svg';
import StudyPlanner from '../../assets/imgs/studyPlanner-illustration.svg';
import Button from '../../components/button/button.component';
import { FeatureCard } from '../../components/feature-card/feature-card.component';
import PricingCard from '../../components/pricing-card/pricing-card.component';
import { SwiperCustomSlide } from '../../components/user-card/user-card.styles';
import VerticalArticle from '../../components/vertical-article/vertical-article.component';
import { BetweenPageAnimation } from '../../index.styles';
import { useGetArticlesQuery } from '../../store';
import { Plan } from '../../types/plan';
import {
    AISection,
    AISectionWrapper,
    AiImage,
    BlogsSection,
    BrandName,
    CopyRightText,
    FeaturesSection,
    FeaturesWrapper,
    FooterContainer,
    FooterLink,
    FooterNav,
    HeroContent,
    HeroSection,
    HomeSideNav,
    HomeSideNavItemsContainer,
    HomeSideNavLink,
    IconContainer,
    JoinButton,
    NavContainer,
    PageBody,
    PageContainer,
    PricesHolder,
    PricingSection,
    SectionRegularText,
    SectionTitle,
    StyledFooter,
    StyledLink,
} from './home.style';

function Nav() {
    const [navbarOpen, setMenuOpen] = useState(false);

    const toggleMobileNav = () => {
        setMenuOpen(!navbarOpen);
    };

    const menuItems = ['Home', 'Features', 'Pricing'];

    return (
        <>
            <HomeSideNav isOpen={navbarOpen}>
                <div className="flex w-full items-center justify-end px-6">
                    <AiOutlineClose
                        size={25}
                        onClick={toggleMobileNav}
                        className="cursor-pointer"
                    />
                </div>
                <HomeSideNavItemsContainer>
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <StyledLink to={`#${item}`}>{item}</StyledLink>
                        </li>
                    ))}
                    <li>
                        <StyledLink to="/auth/signup">
                            <IoPersonOutline size={14} />
                            Sign up
                        </StyledLink>
                    </li>
                    <li>
                        <StyledLink to="/auth/login">
                            <CiLogin size={15} />
                            Log in
                        </StyledLink>
                    </li>
                </HomeSideNavItemsContainer>
            </HomeSideNav>
            <NavContainer>
                <Link to="/">
                    <BrandName>Mujedd</BrandName>
                </Link>
                <div className="flex gap-16 items-center">
                    <div className="hidden lg:flex">
                        <ul className="flex px-1 ">
                            {menuItems.map((item, index) => (
                                <li key={index}>
                                    <HomeSideNavLink href={`#${item}`}>
                                        {item}
                                    </HomeSideNavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex gap-6 items-center">
                        <Link to="/auth/signup" className="lg:flex hidden">
                            <Button
                                select="primary"
                                className="text-sm !px-8  !rounded-lg gap-2"
                            >
                                <IoPersonSharp size={14} />
                                Signup
                            </Button>
                        </Link>
                        <Link to="/auth/login" className="lg:flex hidden">
                            <Button
                                outline={true}
                                className=" !px-8 !rounded-lg gap-2 text-sm"
                            >
                                <MdLogin size={15} />
                                Login
                            </Button>
                        </Link>
                        <AiOutlineMenu
                            size={25}
                            color="#fff"
                            onClick={toggleMobileNav}
                            className="lg:hidden"
                        />
                    </div>
                </div>
            </NavContainer>
        </>
    );
}

function Hero() {
    return (
        <HeroSection id="Home">
            <HeroContent>
                <SectionTitle>
                    Turn Your Ambition Into Success Story.
                </SectionTitle>
                <SectionRegularText>
                    In our student platform, we designed features to support and
                    enhance your educational journey, enabling you to thrive
                    academically. Join us today and unlock your academic
                    potential.
                </SectionRegularText>
            </HeroContent>
        </HeroSection>
    );
}

function FeatureSection() {
    const features = [
        {
            image: StudyPlanner,
            title: 'Study Planner',
            description:
                'Stay organized and on track with our intuitive study planner, allowing you to schedule your study sessions, and monitor your progress.',
            className: 'bg-indigo-200',
        },
        {
            image: Courses,
            title: 'Courses Recommendations',
            description:
                'Receive tailored course recommendations based on your academic interests, ensuring you make the most informed choices.',
            className: 'bg-indigo-900 text-[var(--gray-300)]',
        },
        {
            image: ChatBot,
            title: 'Chatbot Helper',
            description:
                'Get instant assistance and guidance for your academic queries and challenges through our chatbot helper.',
            className: 'bg-indigo-900 text-[var(--gray-300)]',
        },
        {
            image: StudyGroup,
            title: 'Study Group Finder',
            description:
                'Connect with like-minded peers by using our study group finder, which helps you discover and join study groups for your courses.',
            className: 'bg-indigo-200',
        },
    ];
    return (
        <section id="Features" className="w-full">
            <FeaturesSection>
                <SectionTitle> Our Features</SectionTitle>
                <FeaturesWrapper>
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            image={feature.image}
                            title={feature.title}
                            description={feature.description}
                            className={feature.className}
                        />
                    ))}
                </FeaturesWrapper>
            </FeaturesSection>
            <AISection>
                <AISectionWrapper>
                    <AiImage
                        transparentPlaceholder
                        src={Section2img}
                        objectFit="contain"
                        alt="robot image"
                    />
                    <div className="flex flex-col">
                        <SectionTitle>AI-Powered Service</SectionTitle>
                        <SectionRegularText>
                            Gain access to our cutting-edge AI-based content
                            service, where you can request video explanations on
                            specific topics in your favorite professor's style,
                            enhancing your understanding and engagement.
                        </SectionRegularText>

                        <JoinButton select="success">
                            <Link
                                to={'/auth/signup'}
                                className="w-full text-[inherit]"
                            >
                                Join now
                            </Link>
                        </JoinButton>
                    </div>
                </AISectionWrapper>
            </AISection>
        </section>
    );
}

function BlogSection() {
    const { data } = useGetArticlesQuery();
    const articles = data?.data?.slice(0, 10) ?? [];

    return (
        <BlogsSection>
            <SectionTitle>Latest Blogs</SectionTitle>
            <Swiper
                navigation={true}
                spaceBetween={20}
                modules={[Navigation]}
                className="w-full !p-2"
                slidesPerView={'auto'}
            >
                {articles.map((article) => (
                    <SwiperCustomSlide key={article.ID} width="350px">
                        <VerticalArticle {...article} />
                    </SwiperCustomSlide>
                ))}
            </Swiper>
        </BlogsSection>
    );
}

function PriceSection() {
    const subscriptionPlans: Plan[] = [
        {
            id: 1,
            title: 'starter',
            price: 0,
            benefits: [
                'Tailor and design personalized study plans.',
                'Find and collaborate with study groups.',
                'Receive personalized course recommendations based on your interests.',
                'Get assistance from chatbot helper for up to 3 questions per month.',
            ],
            period: 'month',
        },
        {
            id: 2,
            title: 'premium',
            price: 12,
            benefits: [
                'Enjoy all the features included in the Free Plan.',
                'Enjoy unlimited access to the chatbot helper feature.',
                'Enjoy all the features included in the Free Plan.',
                'Enjoy unlimited access to the chatbot helper feature.',
            ],
            period: 'month',
        },
    ];
    return (
        <PricingSection id="Pricing">
            <SectionTitle>Pricing</SectionTitle>
            <PricesHolder>
                {subscriptionPlans.map((plan) => {
                    return (
                        <PricingCard {...plan} key={plan.id} withoutButton />
                    );
                })}
            </PricesHolder>
        </PricingSection>
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
        <>
            <Nav />
            <PageContainer>
                <PageBody {...BetweenPageAnimation}>
                    <Hero />
                    <FeatureSection />
                    <BlogSection />
                    <PriceSection />
                </PageBody>
                <Footer />
            </PageContainer>
        </>
    );
}

export default HomePage;
