import Feedback from './templates/Feedback';
import Hero from '../assets/imgs/Hero-illustration.svg';
import Section2img from '../assets/imgs/about-illustration1.svg';
import StudyPlanner from '../assets/imgs/studyPlanner-illustration.svg';
import ChatBot from '../assets/imgs/chatBot-illustration.svg';
import Courses from '../assets/imgs/courses-illustration.svg';
import StudyGroup from '../assets/imgs/studyGroup-illustration.svg';
import Button from '../components/Button';
import Feature from '../components/Feature';
import SingleBlog from '../components/SingleBlog';
import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { CiLogin } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import Nav from '../components/Nav';




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
function LandingPage() {
    return (
        <div className='bg-red-300'>
            <Nav />
            <div className=" flex flex-col  justify-center items-center bg-white ">
                <section className="bg-bgColor   sm:h-screen w-full  flex  justify-center ">
                    <div className="flex w-full h-[90v]  py-5   justify-center sm:justify-between">
                        <img className="w-full absolute h-[90%] sm:visible invisible" src={Hero} />
                        <div className="md:pl-[5.2rem] md:ml-10 sm:pl-[2.5rem]  pt-[5rem]  sm:w-3/6 w-5/6 ">
                            <h1 className="font-bold 3xl:text-5xl  lg:text-4xl sm:text-2xl xs:text-3xl text-txt sm:text-left text-center  max-w-[400px] ">
                                Turn Your Ambition Into
                                <br />
                                Success Story.
                            </h1>
                            <br />
                            <p className="text-slate-500 mb-8 max-w-[500px]  lg:text-sm sm:text-[12px] xs:text-[16px]  sm:text-left text-center">
                                In our student platform, we designed features to support
                                and enhance your educational journey, enabling you to
                                thrive academically. Join us today and unlock your
                                academic potential.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-14 bg-white  sm:h-screen w-full">
                    <div className="mx-auto w-5/6 px-8 md:px-6">
                        <div className="md:flex md:justify-center md:gap-6">
                            <div className="mt-8 flex justify-center md:mt-0 md:w-5/12 ">
                                <img
                                    src={Section2img}
                                    alt="about img"
                                    className="max-h-[510px] md:max-h-max"
                                />
                            </div>
                            <div className="md:w-6/12 p-12 m-12">
                                <div className="mb-5 sm:mb-10">
                                    <h1 className="text-1xl font-bold text-txt sm:text-2xl">
                                        AI-Powered Service
                                    </h1>
                                </div>
                                <p className="text-slate-500 mb-6 text-sm">
                                    Gain access to our cutting-edge AI-based content
                                    service, where you can request video
                                    explanations on specific topics in your favorite
                                    professor's style, enhancing your understanding
                                    and engagement.
                                </p>

                                <Button
                                    type="button"
                                    select="secondary"
                                    className="w-full rounded-lg text-xlg px-8 py-2.5 shadow-sm md:w-max h-auto"
                                >
                                    See more
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className=" bg-white  flex justify-center  lg:h-screen w-full">
                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:gap-8 max-w-[85%] h-[85%] ">
                        <Feature
                            color="bg-indigo-300"
                            imgURL={StudyPlanner}
                            title="Study Planner"
                            para=" Stay organized and on track with our intuitive
                   study planner, allowing you to schedule your
                   study sessions, and monitor your progress."
                            additionalClass="text-txt  font-semibold "
                            typoStyles='w-[60%]'
                        />
                        <Feature
                            color="bg-indigo-900"
                            imgURL={ChatBot}
                            title="Chatbot Helper"
                            para="Get instant assistance and guidance for your
                   academic queries and challenges through our
                   chatbot helper."
                            additionalClass="text-white"
                            typoStyles='w-[60%]'

                        />
                        <Feature
                            color="bg-indigo-900"
                            imgURL={Courses}
                            title="Courses Recommendations"
                            para=" Receive tailored course recommendations based on
                   your academic interests, ensuring you make the
                   most informed choices for your education."
                            additionalClass="text-white"
                            typoStyles='w-[60%]'

                        />
                        <Feature
                            color="bg-indigo-300"
                            imgURL={StudyGroup}
                            title="Study Group Finder"
                            para="  Connect with like-minded peers by using our
                   study group finder, which helps you discover and
                   join study groups for your courses."
                            additionalClass="text-txt  font-semibold "
                            typoStyles='w-[60%]'
                        />

                    </div>
                </section>
                <BlogSection />
                <div className="w-[60%] m-auto">
                    <Feedback />
                </div>
            </div>
            <footer className="bg-txt">
                <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
                    <div className="lg:flex lg:items-end lg:justify-between">
                        <div>
                            <div className="flex justify-center text-white lg:justify-start"></div>

                            <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-200 lg:text-left">
                                Lorem ipsum dolor, sit amet consectetur adipisicing
                                elit. Incidunt consequuntur amet culpa cum itaque
                                neque.
                            </p>
                        </div>

                        <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12">
                            <li>
                                <a
                                    className="text-gray-200 transition hover:text-gray-200/75"
                                    href="/"
                                >
                                    {' '}
                                    About{' '}
                                </a>
                            </li>

                            <li>
                                <a
                                    className="text-gray-200 transition hover:text-gray-200/75"
                                    href="/"
                                >
                                    {' '}
                                    Services{' '}
                                </a>
                            </li>

                            <li>
                                <a
                                    className="text-gray-200 transition hover:text-gray-200/75"
                                    href="/"
                                >
                                    {' '}
                                    Projects{' '}
                                </a>
                            </li>

                            <li>
                                <a
                                    className="text-gray-200 transition hover:text-gray-200/75"
                                    href="/"
                                >
                                    {' '}
                                    Blog{' '}
                                </a>
                            </li>
                        </ul>
                    </div>

                    <p className="mt-12 text-center text-sm text-gray-200 lg:text-right">
                        Copyright &copy; 2022. All rights reserved.
                    </p>
                    <div className="mt-4 flex items-center space-x-4 sm:mt-0"></div>
                </div>
            </footer>
        </div>
    );
}
export default LandingPage;
