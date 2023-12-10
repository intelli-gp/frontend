import Section2img from '../../assets/imgs/about-illustration1.svg';
import StudyPlanner from '../../assets/imgs/studyPlanner-illustration.svg';
import ChatBot from '../../assets/imgs/chatBot-illustration.svg';
import Courses from '../../assets/imgs/courses-illustration.svg';
import StudyGroup from '../../assets/imgs/studyGroup-illustration.svg';
import Button from '../../components/Button';

export default function FeaturesSection() {
    return (
        <div>
            <section className="py-14 bg-white w-full">
                <div className="mx-auto max-w-7xl px-8 md:px-6">
                    <div className="md:flex md:justify-center md:gap-6">
                        <div className="mt-8 flex justify-center md:mt-0 md:w-5/12 p-2">
                            <img
                                src={Section2img}
                                alt="about img"
                                className="max-h-[510px] md:max-h-max"
                            />
                        </div>
                        <div className="md:w-6/12 p-12 m-12">
                            <div className="mb-5 sm:mb-10">
                                <h1 className="text-2xl font-bold text-slate-700 sm:text-3xl">
                                    AI-Powered Service
                                </h1>
                            </div>
                            <p className="text-slate-500 mb-6 text-xl">
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
            <section className="py-8 bg-white w-full flex justify-center">
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:gap-8 w-5/6 ">
                    <div className=" h-auto flex flex-wrap cursor-pointer flex-row items-center rounded-2xl bg-indigo-300 px-10 py-8 shadow-md shadow-indigo-500/10">
                        <div className=" flex flex-col justify-between w-3/6">
                            <h2 className=" mb-1 text-[28px] font-semibold text-txt">
                                Study Planner
                            </h2>
                            <br />
                            <p className=" text-sm text-txt">
                                Stay organized and on track with our intuitive
                                study planner, allowing you to schedule your
                                study sessions, and monitor your progress.
                            </p>
                        </div>
                        <img
                            src={StudyPlanner}
                            alt="StudyPlanner img"
                            className="max-h-[300px] md:max-h-max w-3/6"
                        />
                    </div>
                    <div className=" h-auto flex flex-wrap cursor-pointer flex-row items-center rounded-2xl bg-indigo-900 px-10 py-8 shadow-sm shadow-indigo-200/10 ">
                        <div className=" flex flex-col justify-between w-3/6">
                            <h2 className=" mb-1 text-[28px] text-white">
                                Chatbot Helper
                            </h2>
                            <br />
                            <p className=" text-sm text-white">
                                Get instant assistance and guidance for your
                                academic queries and challenges through our
                                chatbot helper.
                            </p>
                        </div>
                        <img
                            src={ChatBot}
                            alt="Chatbot img"
                            className="max-h-[200px] md:max-h-max w-3/6"
                        />
                    </div>
                    <div className=" flex flex-wrap cursor-pointer flex-row items-center rounded-2xl bg-indigo-900 px-10 py-3  shadow-sm shadow-indigo-200/10 ">
                        <div className=" flex flex-col justify-between w-3/6">
                            <h2 className=" mb-1 text-[28px] text-white">
                                Courses Recommendations
                            </h2>
                            <br />
                            <p className=" text-sm text-white">
                                Receive tailored course recommendations based on
                                your academic interests, ensuring you make the
                                most informed choices for your education.
                            </p>
                        </div>
                        <img
                            src={Courses}
                            alt="Courses img"
                            className="max-h-[220px]  2/6"
                        />
                    </div>
                    <div className=" h-auto flex flex-wrap cursor-pointer flex-row items-center rounded-2xl bg-indigo-300 pl-10 pr-3 py-8 shadow-md shadow-indigo-900/10 ">
                        <div className=" flex flex-col justify-between w-3/6">
                            <h2 className=" mb-1 text-[28px] font-semibold text-txt">
                                Study Group Finder
                            </h2>
                            <br />
                            <p className=" text-sm text-txt">
                                Connect with like-minded peers by using our
                                study group finder, which helps you discover and
                                join study groups for your courses.
                            </p>
                        </div>
                        <img
                            src={StudyGroup}
                            alt="StudyGroup img"
                            className="max-h-[300px]  w-3/6"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
