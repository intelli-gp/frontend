import { useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { CiLogin } from 'react-icons/ci';
import { IoPersonOutline, IoPersonSharp } from 'react-icons/io5';
import { MdLogin } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

import Section2img from '../../assets/imgs/about-illustration1.svg';
import ChatBot from '../../assets/imgs/chatBot-illustration.svg';
import Courses from '../../assets/imgs/courses-illustration.svg';
import icons from '../../assets/imgs/icons.svg';
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
    CardHolder,
    CopyRightText,
    FeaturesSection,
    PricingSection,
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
    Sidebar,
    Check,
    StyledFooter,
    StyledLink,
    TextAIContainer,
    Title,
    UpperContainer,
    PricingList,
    PricesHolder,
    PricingTitle,
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
                                    <MenuTitles href={`#${item}`}>{item}</MenuTitles>
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
        <HeroSection id='Home'>
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
        <div id='Features'>
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
        </div>
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
                    From Our Latest Blogs
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
type Type = {
    id: number;
    type: string;
    price: number;
    para: string[];
    payment: string;
};

const Card = ({ el }: { el: Type }) => {
    const navigate = useNavigate();
    return (
        <CardHolder Pro={el.type === 'Pro'}  onClick ={()=>navigate("/auth/login")}>
            <span className='flex  flex-col justify-start gap-4 items-start w-[35%] p-2'>
            <h2 className='text-[38px] '>
                    {el.type}
                </h2>
                <div className=' w-[100%] flex text-xs py-6 items-end gap-2'>
                    <h1 className="font-extrabold text-[44px]">
                        {el.price}$
                    </h1>
                    <p>/Monthly</p>
                </div>
            </span>
            <PricingList>
                {el.para.map((sentence) => (
                    <div className=" pb-2  pl-6 relative w-[100%] ">
                        <Check/>
                        <li>{sentence}</li>
                    </div>
                ))}
            </PricingList>
        </CardHolder>
    );
};
function PriceSection() {

    const subscriptionPlans: Type[] = [
        {
            id: 1,
            type: 'Free',
            price: 0,
            para: [
                'Tailor and design personalized study plans.',
                'Find and collaborate with study groups.',
                'Receive personalized course recommendations based on your progress and interests.',
                'Get assistance from chatbot helper for up to 3 questions per month.',
            ],
            payment: "Monthly",
        },
        {
            id: 2,
            type: 'Pro',
            price: 12,
            para: [
                'Enjoy all the features included in the Free Plan.',
                'Enjoy unlimited access to the chatbot helper feature.',
                'Enjoy all the features included in the Free Plan.',
                'Enjoy unlimited access to the chatbot helper feature.',
            ],
            payment: 'Monthly',
        },

    ];
    return (
        <PricingSection id='Pricing'>
            <PricingTitle>
                Our Prices
            </PricingTitle>
            <PricesHolder>
            {subscriptionPlans.map((plan) => {
                return <Card el={plan}/>;

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
                <Body {...BetweenPageAnimation}>
                    <Hero />
                    <FeatureSection />
                    <BlogSection />
                    <PriceSection />
                </Body>
                <Footer />
            </PageContainer>
        </>
    );
}
export default HomePage;
