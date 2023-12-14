import icons from '../assets/imgs/icons.svg';
import Section2img from '../assets/imgs/about-illustration1.svg';
import StudyPlanner from '../assets/imgs/studyPlanner-illustration.svg';
import ChatBot from '../assets/imgs/chatBot-illustration.svg';
import Star from '../assets/imgs/star.svg';
import Courses from '../assets/imgs/courses-illustration.svg';
import StudyGroup from '../assets/imgs/studyGroup-illustration.svg';
import Button from '../components/Button';
import Feature from '../components/Feature';
import SingleBlog from '../components/SingleBlog';
import { useState, useMemo } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { CiLogin } from 'react-icons/ci';
import {
    IoPersonOutline,
    IoChevronBackOutline,
    IoChevronForwardOutline,
} from 'react-icons/io5';
import { faker } from '@faker-js/faker';
function Nav() {
    const [navbarOpen, setmenuOpen] = useState(false);
    const handleNav = () => {
        setmenuOpen(!navbarOpen);
    };
    const className = classNames(
        'fixed right-0 top-0 w-[55%] h-screen md:hidden ease-in bg-indigo-50 py-6 shadow-lg shadow-indigo-400/5 ',
        {
            '': navbarOpen,
            hidden: !navbarOpen,
        },
    );
    const menuItems = ['Home', 'About', 'Features', 'Pricing'];

    return (
        <nav className=" sticky left-0 top-0 z-50  h-[53px]  bg-txt w-full backdrop-blur">
            <div className="mx-auto max-w-7xl px-6 2xl:px-16 flex justify-between items-center h-full flex-wrap">
                <div className="w-1/6">
                    <div className="w-2/6">
                        <a href="#">
                            <img src="" alt="logo" className="w-full" />
                        </a>
                    </div>
                </div>
                <div className="hidden md:flex md:w-3/6 w-0 ">
                    <ul className="flex px-1 ">
                        {menuItems.map((item) => (
                            <li>
                                <a
                                    href="#"
                                    className="text-sm font-medium text-white lg:text-base ml-10"
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex w-2/6 pt-2 md:justify-center  justify-end">
                    <Link to="/auth/signup" className="md:flex hidden">
                        <Button
                            select="primary"
                            type="button"
                            className="flex items-center justify-center text-sm h-auto py-[4px] w-5/6 border-2 border-indigo-900 lg:mx-5 rounded-md"
                        >
                            Signup
                        </Button>
                    </Link>
                    <Link to="/auth/login" className="md:flex hidden">
                        <Button
                            type="button"
                            outline={true}
                            className="flex items-center justify-center text-sm h-auto py-[4px] w-5/6 lg:mx-5 rounded-lg"
                        >
                            Login
                        </Button>
                    </Link>
                    <div
                        onClick={handleNav}
                        id="navbarToggler"
                        className="md:hidden"
                    >
                        <AiOutlineMenu size={25} color="#fff" />
                    </div>
                </div>
            </div>
            <div className={className}>
                <div className="flex w-full items-center justify-end px-6">
                    <div onClick={handleNav} className="cursor-pointer">
                        <AiOutlineClose size={25} />
                    </div>
                </div>
                <ul className="flex flex-col w-full font-medium mt-4  ">
                    {menuItems.map((item) => (
                        <li>
                            <a
                                href="#"
                                className="block border-b-[1px] border-slate-200 py-2 px-10 hover:bg-indigo-900 hover:text-white text-txt"
                            >
                                {item}
                            </a>
                        </li>
                    ))}
                    <li>
                        <Link
                            to="/auth/signup"
                            className="block py-2   border-b-[1px] border-slate-200  px-10 hover:bg-indigo-900 hover:text-white text-txt flex items-center gap-2"
                        >
                            <IoPersonOutline size={14} />
                            Sign up
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/auth/login"
                            className="block py-2   border-b-[1px] border-slate-200 px-10 hover:bg-indigo-900 hover:text-white text-txt flex items-center gap-2"
                        >
                            <CiLogin size={15} />
                            Log in
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

function BlogSection() {
    return (
        <section className="py-12 md:py-8  w-full bg-bgColor  flex justify-center items-center">
            <div className="md:mx-auto mx-[1rem] w-full px-8 md:px-3 flex flex-col justify-center items-center">
                <div className="mb-5 sm:mb-12 sm:mt-5">
                    <h1 className="text-2xl font-bold text-txt md:text-3xl">
                        From Our Latest Blogs
                    </h1>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3  lg:gap-x-6  w-[92%] xl:w-[80%] sm:gap-x-6  place-items-center place-content-center">
                    <SingleBlog />
                    <SingleBlog />
                    <SingleBlog />
                </div>
            </div>
        </section>
    );
}

function Feedback() {
    const fakeProfilePic = useMemo(() => {
        return faker.image.urlLoremFlickr({ category: 'people' });
    }, []);

    const [currentIndex, setCurrentIndex] = useState(0);

    const slideIndicators = [0, 1, 2];
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
        <div className="lg:w-4/6 w-5/6">
            <div
                id="default-carousel"
                className="relative mb-4 mt-4 ml-4"
                data-carousel="static"
            >
                <div className="overflow-hidden relative h-auto rounded-lg ">
                    {person.map((item, index) => (
                        <div
                            key={index}
                            className={`duration-700 ease-in-out w-full my-[4rem] ${
                                index === currentIndex ? '' : 'hidden'
                            }`}
                            data-carousel-item
                        >
                            <div className="flex flex-col items-center justify-center bg-indigo-900   group shadow-lg text-white rounded-3xl md:px-[10rem] sm:py-[9rem] h-[260px] w-full ">
                                <div className="flex flex-col gap-6 items-center justify-center">
                                    <img
                                        src={fakeProfilePic}
                                        alt="profile pic"
                                        className="md:w-[80px] md:h-[80px] w-[50px] h-[50px] rounded-full"
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
                                                <p className="ms-2 mt-1 text-sm font-semibold text-white md:text-lg ml-2">
                                                    {item.rate}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="lg:text-md text-slate-300 text-center text-sm">
                                            "{item.feedback}"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex  absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
                    {slideIndicators.map((indicator, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`w-3 h-3 rounded-full mt-6 ${
                                index === currentIndex
                                    ? 'bg-indigo-600'
                                    : 'bg-gray-300'
                            }`}
                            aria-current={
                                index === currentIndex ? 'true' : 'false'
                            }
                            aria-label={`Slide ${index + 1}`}
                            data-carousel-slide-to={index}
                            onClick={() => changeSlide(index)}
                        ></button>
                    ))}
                </div>

                <button
                    type="button"
                    className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
                    data-carousel-next
                    onClick={() => changeSlide(currentIndex + 1)}
                >
                    <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-gray-800/30  hover:bg-gray-800/50">
                        <IoChevronForwardOutline
                            className="w-6 h-6 rounded-full sm:w-8 sm:h-8 ml-1  "
                            color="white"
                        />
                        <span className="hidden">Next</span>
                    </span>
                </button>
                <button
                    type="button"
                    className="flex absolute top-0 left-0  justify-center items-center px-4 h-full cursor-pointer group "
                    data-carousel-prev
                    onClick={() => changeSlide(currentIndex - 1)}
                >
                    <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-gray-800/30  hover:bg-gray-800/50">
                        <IoChevronBackOutline
                            className="w-6 h-6 rounded-full sm:w-8 sm:h-8 mr-1"
                            color="white"
                        />
                        <span className="hidden">Previous</span>
                    </span>
                </button>
            </div>
        </div>
    );
}
function Footer() {
    const menuItems = ['Blogs', 'About', 'Services', 'Projects'];
    return (
        <footer className="bg-txt">
            <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24 grid grid-cols-1 gap-4 content-between">
                <div className="lg:flex lg:items-end lg:justify-end">
                    <ul className=" flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12">
                        {menuItems.map((item) => (
                            <li>
                                <a
                                    className="text-gray-200 transition hover:text-gray-200/75"
                                    href="/"
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="container pt-9 md:flex justify-between mt-10">
                    <p className="mt-[5rem] text-center text-sm text-gray-200 lg:text-right">
                        Copyright &copy; 2022. All rights reserved.
                    </p>
                    <div className="mt-[5rem]  flex justify-center">
                        <img src={icons} />
                    </div>
                </div>
                <div className="mt-4 flex items-center space-x-4 sm:mt-0"></div>
            </div>
        </footer>
    );
}
function LandingPage() {
    return (
        <div className="bg-red-300">
            <Nav />
            <div className=" flex flex-col  justify-center items-center bg-white  height:calc(100vh - nav-height)">
                <section className="bg-bgColor  h-screen lg:max-h-[100vw] max-h-[60vw]  w-full  flex  justify-center">
                    <div className="flex w-full h-full py-5 justify-center items-center sm:justify-start sm:items-start background">
                        <div className=" flex flex-col  justify-center items-center sm:items-start sm:w-3/6 w-5/6 sm:pl-[4rem] pb-4 pt-[4rem] sm:absolute  lg:top-[18%] xl:left-[10%]">
                            <h1 className="font-bold  lg:text-4xl sm:text-2xl text-2xl xs:text-3xl text-txt sm:text-left text-center  max-w-[520px] ">
                                Turn Your Ambition Into
                                <br />
                                Success Story.
                            </h1>
                            <br />
                            <p className="text-slate-500 mb-8 max-w-[500px]  lg:text-lg  sm:text-[12px] xs:text-[16px]  sm:text-left text-center">
                                In our student platform, we designed features to
                                support and enhance your educational journey,
                                enabling you to thrive academically. Join us
                                today and unlock your academic potential.
                            </p>
                        </div>
                    </div>
                </section>

                <section className=" py-12 w-full">
                    <div className="mx-auto w-5/6 px-10 ">
                        <div className="md:flex md:justify-center md:items-center gap-4 md:gap-8">
                            <div className="mt-6 flex justify-center md:mt-0 md:w-5/12">
                                <img
                                    src={Section2img}
                                    alt="about img"
                                    className="max-h-[500px] md:max-h-max"
                                />
                            </div>
                            <div className="md:w-5/12 lg:p-12 md:px-0 py-14 w-full   sm:text-left text-center">
                                <div className="mb-2 sm:mb-10">
                                    <h1 className=" font-bold text-txt text-2xl sm:text-2xl">
                                        AI-Powered Service
                                    </h1>
                                </div>
                                <p className="text-slate-500 mb-6 text-sm  max-w-[700px]">
                                    Gain access to our cutting-edge AI-based
                                    content service, where you can request video
                                    explanations on specific topics in your
                                    favorite professor's style, enhancing your
                                    understanding and engagement.
                                </p>
                                <Button
                                    type="button"
                                    select="secondary"
                                    className="w-4/6 rounded-lg text-xlg px-8 py-2.5 shadow-sm md:w-max h-auto"
                                >
                                    See more
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className=" flex justify-center m-auto   w-full md:my-[5rem] my-4 p-6 sm:py-0 ">
                    <div className="grid gap-12 grid-cols-1 md:grid-cols-2 w-full xl:w-[85%] sm:p-6 md:p-10 ">
                        <Feature
                            color="bg-indigo-300"
                            imgURL={StudyPlanner}
                            title="Study Planner"
                            para=" Stay organized and on track with our intuitive
                   study planner, allowing you to schedule your
                   study sessions, and monitor your progress."
                            additionalClass="text-txt  font-semibold "
                            typoStyles="w-[60%]"
                        />
                        <Feature
                            color="bg-indigo-900"
                            imgURL={Courses}
                            title="Courses Recommendations"
                            para=" Receive tailored course recommendations based on
                   your academic interests, ensuring you make the
                   most informed choices."
                            additionalClass="text-white"
                            typoStyles="w-[60%]"
                        />
                        <Feature
                            color="bg-indigo-900"
                            imgURL={ChatBot}
                            title="Chatbot Helper"
                            para="Get instant assistance and guidance for your
                   academic queries and challenges through our
                   chatbot helper."
                            additionalClass="text-white"
                            typoStyles="w-[60%]"
                        />
                        <Feature
                            color="bg-indigo-300"
                            imgURL={StudyGroup}
                            title="Study Group Finder"
                            para="  Connect with like-minded peers by using our
                   study group finder, which helps you discover and
                   join study groups for your courses."
                            additionalClass="text-txt  font-semibold "
                            typoStyles="w-[60%]"
                        />
                    </div>
                </section>
                <BlogSection />
                <div className="py-12 sm:w-[90%] w-full px-4  flex justify-center">
                    <Feedback />
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default LandingPage;
