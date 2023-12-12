import Feedback from '../components/Feedback';
import Hero from '../assets/imgs/Hero-illustration.svg';
import Section2img from '../assets/imgs/about-illustration1.svg';
import StudyPlanner from '../assets/imgs/studyPlanner-illustration.svg';
import ChatBot from '../assets/imgs/chatBot-illustration.svg';
import Courses from '../assets/imgs/courses-illustration.svg';
import StudyGroup from '../assets/imgs/studyGroup-illustration.svg';
import Button from '../components/Button';
import Feature from '../components/Feature';
import SingleBlog from '../components/SingleBlog';
import { useState, Component } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { CiLogin } from 'react-icons/ci';
import { IoPersonOutline } from 'react-icons/io5';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
class SimpleSlider extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
        };
        return (
            <div className="w-3/6 ">
                <Slider {...settings}>
                    <div className="pt-14 px-6">
                        <Feedback />
                    </div>
                    <div className="pt-14 px-6">
                        <Feedback />
                    </div>
                    <div className="pt-14 px-6">
                        <Feedback />
                    </div>
                </Slider>
            </div>
        );
    }
}

function Nav() {
    const [navbarOpen, setmenuOpen] = useState(false);
    const handleNav = () => {
        setmenuOpen(!navbarOpen);
    };
    const className = classNames(
        'fixed left-0 top-0 w-[55%] h-screen md:hidden ease-in bg-indigo-50 py-6 shadow-lg shadow-indigo-400/5 ',
        {
            '': navbarOpen,
            hidden: !navbarOpen,
        },
    );
    return (
        <nav className="absolute sticky left-0 top-0 z-50  h-[53px]  bg-txt w-full backdrop-blur">
            <div className="mx-auto max-w-7xl px-6 2xl:px-16 flex justify-between items-center h-full flex-wrap">
                <div className="w-1/6">
                    <div className="w-2/6">
                        <a href="#">
                            <img src="" alt="logo" className="w-full" />
                        </a>
                    </div>
                </div>
                <div className="md:visible invisible md:flex md:w-3/6 w-0">
                    <ul className="flex px-1 ">
                        <li>
                            <a
                                href="#"
                                className="text-sm font-medium text-white  lg:text-base ml-10 "
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-sm font-medium text-white  lg:text-base ml-10"
                            >
                                About
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-sm font-medium text-white  lg:text-base ml-10"
                            >
                                Features
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="text-sm font-medium text-white  lg:text-base ml-10"
                            >
                                Pricing
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="flex w-2/6 pt-2 justify-center">
                    <Link to="/auth/signup" className="md:visible invisible">
                        <Button
                            select="primary"
                            type="button"
                            className="flex items-center justify-center text-sm h-auto py-[4px] w-5/6 border-2 border-indigo-900 lg:mx-5 rounded-md"
                        >
                            Signup
                        </Button>
                    </Link>
                    <Link to="/auth/login" className="md:visible invisible">
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
                        className="md:hidden mx-auto"
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
                    <hr className="my-0 border-slate-200" />
                    <li>
                        <a
                            href="#"
                            className="block py-2 px-10 hover:bg-indigo-900 hover:text-white text-txt"
                        >
                            Home
                        </a>
                    </li>
                    <hr className="my-0 border-slate-200" />

                    <li>
                        <a
                            href="#"
                            className="block py-2 px-10 hover:bg-indigo-900 hover:text-white text-txt"
                        >
                            Features
                        </a>
                    </li>
                    <hr className="my-0 border-slate-200" />
                    <li>
                        <a
                            href="#"
                            className="block py-2 px-10 hover:bg-indigo-900 hover:text-white text-txt"
                        >
                            About
                        </a>
                    </li>
                    <hr className="my-0 border-slate-200" />
                    <li>
                        <a
                            href="#"
                            className="block py-2 px-10 hover:bg-indigo-900 hover:text-white text-txt"
                        >
                            Pricing
                        </a>
                    </li>
                    <hr className="my-0 border-slate-200" />
                    <li>
                        <Link
                            to="/auth/signup"
                            className="block py-2 px-10 hover:bg-indigo-900 hover:text-white text-txt flex items-center gap-2"
                        >
                            <IoPersonOutline size={14} />
                            Sign up
                        </Link>
                    </li>
                    <hr className="my-0 border-slate-200" />
                    <li>
                        <Link
                            to="/auth/login"
                            className="block py-2 px-10 hover:bg-indigo-900 hover:text-white text-txt flex items-center gap-2"
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
        <section className="py-5 w-full bg-bgColor  lg:h-screen ">
            <div className="mx-auto w-full px-8 md:px-3 flex flex-col justify-center items-center">
                <div className="mb-5 sm:mb-10">
                    <h1 className="text-2xl font-bold text-txt md:text-3xl">
                        From Our Latest Blogs
                    </h1>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-0 w-[80%]">
                    <SingleBlog />
                    <SingleBlog />
                    <SingleBlog />
                </div>
            </div>
        </section>
    );
}
function Footer() {
    return (
        <footer className="bg-txt">
            <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24 grid grid-cols-1 gap-4 content-between">
                <div className="lg:flex lg:items-end lg:justify-end">
                    <ul className=" flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12">
                        <li>
                            <a
                                className="text-gray-200 transition hover:text-gray-200/75"
                                href="/"
                            >
                                About
                            </a>
                        </li>

                        <li>
                            <a
                                className="text-gray-200 transition hover:text-gray-200/75"
                                href="/"
                            >
                                Services
                            </a>
                        </li>
                        <li>
                            <a
                                className="text-gray-200 transition hover:text-gray-200/75"
                                href="/"
                            >
                                Projects
                            </a>
                        </li>

                        <li>
                            <a
                                className="text-gray-200 transition hover:text-gray-200/75"
                                href="/"
                            >
                                Blog
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="container pt-9 md:flex justify-between mt-10">
                    <p className="mt-12 text-center text-sm text-gray-200 lg:text-right">
                        Copyright &copy; 2022. All rights reserved.
                    </p>
                    <div className="mt-12 flex justify-center">
                        <a
                            href="#!"
                            className="mr-9 text-neutral-800 dark:text-neutral-200"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                            </svg>
                        </a>
                        <a
                            href="#!"
                            className="mr-9 text-neutral-800 dark:text-neutral-200"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                            </svg>
                        </a>
                        <a
                            href="#!"
                            className="mr-9 text-neutral-800 dark:text-neutral-200"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z"
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </a>
                        <a
                            href="#!"
                            className="mr-9 text-neutral-800 dark:text-neutral-200"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>
                        <a
                            href="#!"
                            className="mr-9 text-neutral-800 dark:text-neutral-200"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                            </svg>
                        </a>
                        <a
                            href="#!"
                            className="text-neutral-800 dark:text-neutral-200"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
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
            <div className=" flex flex-col  justify-center items-center bg-white ">
                <section className="bg-bgColor   sm:h-screen w-full  flex  justify-center ">
                    <div className="flex w-full h-[90v]  py-5   justify-center sm:justify-between ">
                        <img
                            className="w-full absolute h-[90%] sm:visible invisible"
                            src={Hero}
                        />
                        <div className="lg:pl-[5.2rem] lg:ml-10 sm:pl-[2.5rem]  pt-[5rem]  sm:w-3/6 w-5/6">
                            <h1 className="font-bold 3xl:text-5xl  mx-auto md:mx-0 lg:text-4xl sm:text-2xl xs:text-3xl text-txt sm:text-left text-center  max-w-[400px] ">
                                Turn Your Ambition Into
                                <br />
                                Success Story.
                            </h1>
                            <br />
                            <p className="text-slate-500 mb-8 max-w-[500px]  lg:text-sm sm:text-[12px] xs:text-[16px]  sm:text-left text-center">
                                In our student platform, we designed features to
                                support and enhance your educational journey,
                                enabling you to thrive academically. Join us
                                today and unlock your academic potential.
                            </p>
                        </div>
                    </div>
                </section>

                <section className=" bg-white  md:h-screen w-full">
                    <div className="mx-auto w-5/6 px-10 ">
                        <div className="md:flex md:justify-center md:items-center gap-4 ">
                            <div className="mt-6 flex justify-center md:mt-0 md:w-5/12">
                                <img
                                    src={Section2img}
                                    alt="about img"
                                    className="max-h-[500px] md:max-h-max"
                                />
                            </div>
                            <div className="md:w-6/12 md:p-12 py-14 w-full   sm:text-left text-center">
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
                <section className=" bg-white  flex justify-center  lg:h-screen w-full md:py-6 py-8">
                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:gap-8 max-w-[85%] h-[85%] ">
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
                            imgURL={ChatBot}
                            title="Chatbot Helper"
                            para="Get instant assistance and guidance for your
                   academic queries and challenges through our
                   chatbot helper."
                            additionalClass="text-white"
                            typoStyles="w-[60%]"
                        />
                        <Feature
                            color="bg-indigo-900"
                            imgURL={Courses}
                            title="Courses Recommendations"
                            para=" Receive tailored course recommendations based on
                   your academic interests, ensuring you make the
                   most informed choices for your education."
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
                <div className="py-5 w-full bg-bgColor  lg:h-screen flex justify-center">
                    <SimpleSlider />
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default LandingPage;
