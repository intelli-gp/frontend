import { Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Section2img from '../../assets/imgs/about-illustration1.svg';
import ChatBot from '../../assets/imgs/chatBot-illustration.svg';
import Courses from '../../assets/imgs/courses-illustration.svg';
import StudyGroup from '../../assets/imgs/studyGroup-illustration.svg';
import StudyPlanner from '../../assets/imgs/studyPlanner-illustration.svg';
import { FeatureCard } from '../../components/feature-card/feature-card.component';
import PricingCard from '../../components/pricing-card/pricing-card.component';
import { SwiperSlider } from '../../components/swiper/swiper-slider.component';
import VerticalArticle from '../../components/vertical-article/vertical-article.component';
import { BetweenPageAnimation } from '../../index.styles';
import { RootState, useGetArticlesQuery } from '../../store';
import { Plan } from '../../types/plan';
import {
    AISection,
    AISectionWrapper,
    AiImage,
    BlogsSection,
    BrandName,
    CopyRightText,
    Ellipse,
    FeaturesSection,
    FeaturesWrapper,
    HeroContent,
    HeroSection,
    HomePageFooter,
    HomeSideNav,
    HomeSideNavItemsContainer,
    HorizontalNavLinksContainer,
    JoinButton,
    NAV_HEIGHT,
    NavInnerContainer,
    NavLink,
    NavOuterContainer,
    PageBody,
    PageContainer,
    PricesHolder,
    PricingSection,
    SectionRegularText,
    SectionTitle,
    StyledLink,
} from './home.style';

function Nav() {
    const [navbarOpen, setMenuOpen] = useState(false);

    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated,
    );

    console.log({ isAuthenticated });
    const toggleMobileNav = () => {
        setMenuOpen(!navbarOpen);
    };

    const [horizontalNavLinks, setHorizontalNavLinks] = useState<
        {
            value: string;
            isActive: boolean;
            scrollTarget: HTMLElement | null;
        }[]
    >();

    const scrollHandler = (scrollTarget: HTMLElement) => {
        scrollTo({
            top: scrollTarget.offsetTop - NAV_HEIGHT,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        setHorizontalNavLinks(() => {
            // Initialize the state here to make sure that the page is rendered and all scroll targets are available.
            let newState = [
                {
                    value: 'Home',
                    scrollTarget: document.getElementById('Home'),
                    isActive: false,
                },
                {
                    value: 'Features',
                    scrollTarget: document.getElementById('Features'),
                    isActive: false,
                },
                {
                    value: 'Articles',
                    scrollTarget: document.getElementById('Articles'),
                    isActive: false,
                },
                {
                    value: 'Pricing',
                    scrollTarget: document.getElementById('Pricing'),
                    isActive: false,
                },
            ];

            let observerCallback = (entries: IntersectionObserverEntry[]) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setHorizontalNavLinks(
                            (prev) =>
                                prev?.map((link) => {
                                    if (link.scrollTarget === entry.target) {
                                        return { ...link, isActive: true };
                                    }
                                    return { ...link, isActive: false };
                                }),
                        );
                    }
                });
            };

            let intersectionObserver = new IntersectionObserver(
                observerCallback,
                {
                    threshold: 0.25,
                },
            );

            newState?.forEach((link) => {
                intersectionObserver.observe(link.scrollTarget!);
            });

            return newState;
        });
    }, []);

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
                    {horizontalNavLinks?.map((link) => (
                        <StyledLink
                            active={link.isActive}
                            to="#"
                            onClick={(event: React.MouseEvent) => {
                                event.preventDefault();
                                scrollHandler(link.scrollTarget!);
                            }}
                        >
                            {link.value}
                        </StyledLink>
                    ))}
                    {isAuthenticated ? (
                        <StyledLink to="/app/search">Home</StyledLink>
                    ) : (
                        <>
                            <StyledLink to="/auth/signup">
                                Sign up Lol
                            </StyledLink>
                            <StyledLink to="/auth/login">Log in</StyledLink>
                        </>
                    )}
                </HomeSideNavItemsContainer>
            </HomeSideNav>

            <NavOuterContainer>
                <NavInnerContainer>
                    <Link to="/">
                        <BrandName>Mujedd</BrandName>
                    </Link>
                    <HorizontalNavLinksContainer>
                        {horizontalNavLinks?.map((link) => (
                            <NavLink
                                key={link.value}
                                active={link.isActive}
                                onClick={(event: React.MouseEvent) => {
                                    event.preventDefault();
                                    scrollHandler(link.scrollTarget!);
                                }}
                                to="#"
                            >
                                {link.value}
                            </NavLink>
                        ))}

                        {isAuthenticated ? (
                            <NavLink to="/app/search"> Home</NavLink>
                        ) : (
                            <>
                                <NavLink to="/auth/signup" className="ml-10">
                                    Signup
                                </NavLink>
                                <NavLink to="/auth/login">Login</NavLink>
                            </>
                        )}
                    </HorizontalNavLinksContainer>
                    <AiOutlineMenu
                        size={24}
                        color="#fff"
                        onClick={toggleMobileNav}
                        className="lg:hidden"
                    />
                </NavInnerContainer>
            </NavOuterContainer>
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
                <Ellipse
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: 10,
                    }}
                />
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
            number: -300,
        },
        {
            image: Courses,
            title: 'Courses Recommendations',
            description:
                'Receive tailored course recommendations based on your academic interests, ensuring you make the most informed choices.',
            className: 'bg-indigo-900 text-[var(--gray-300)]',
            number: 300,
        },
        {
            image: ChatBot,
            title: 'Chatbot Helper',
            description:
                'Get instant assistance and guidance for your academic queries and challenges through our chatbot helper.',
            className: 'bg-indigo-900 text-[var(--gray-300)]',
            number: -300,
        },
        {
            image: StudyGroup,
            title: 'Study Group Finder',
            description:
                'Connect with like-minded peers by using our study group finder, which helps you discover and join study groups for your courses.',
            className: 'bg-indigo-200',
            number: 300,
        },
    ];
    const cardVariants: Variants = {
        offscreen: {
            opacity: 0,
        },
        onscreen: {
            opacity: 1,
            transition: {
                type: 'linear',
                delay: 0.35,
                duration: 0.8,
            },
        },
    };

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
                            xenter={feature.number}
                        />
                    ))}
                </FeaturesWrapper>
            </FeaturesSection>
            <AISection>
                <AISectionWrapper
                    initial="offscreen"
                    whileInView="onscreen"
                    variants={cardVariants}
                >
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
    const { data } = useGetArticlesQuery({ limit: 10 });
    const articles = data?.data ?? [];

    return (
        <BlogsSection id="Articles">
            <SectionTitle>Latest Blogs</SectionTitle>
            <SwiperSlider>
                {articles.map((article) => (
                    <VerticalArticle {...article} key={article.ID} />
                ))}
            </SwiperSlider>
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
    return (
        <HomePageFooter>
            <CopyRightText>
                Copyright &copy; 2024 Mujedd. All right reserved.
            </CopyRightText>
        </HomePageFooter>
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
