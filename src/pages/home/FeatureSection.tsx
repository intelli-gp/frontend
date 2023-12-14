import Courses from '../../assets/imgs/courses-illustration.svg';
import StudyGroup from '../../assets/imgs/studyGroup-illustration.svg';
import Button from '../../components/Button';
import Feature from '../../components/Feature';
import Section2img from '../../assets/imgs/about-illustration1.svg';
import StudyPlanner from '../../assets/imgs/studyPlanner-illustration.svg';
import ChatBot from '../../assets/imgs/chatBot-illustration.svg';
export default function FeatureSection() {
    return (
        <>
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
                                Gain access to our cutting-edge AI-based content
                                service, where you can request video
                                explanations on specific topics in your favorite
                                professor's style, enhancing your understanding
                                and engagement.
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
        </>
    );
}
