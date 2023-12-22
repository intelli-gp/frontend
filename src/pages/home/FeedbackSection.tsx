import { faker } from '@faker-js/faker';
import { useMemo, useState } from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

import Star from '../../assets/imgs/star.svg';

export default function Feedback() {
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
        <div className="py-12 sm:w-[90%] w-full px-4  flex justify-center">
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
                                <div className="flex flex-col items-center justify-center bg-indigo-900   group shadow-lg text-white rounded-3xl  sm:py-[10rem] h-[260px] w-full ">
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
                                                    <p className="ms-2  text-sm font-semibold text-white md:text-md ml-2">
                                                        {item.rate}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="lg:text-lg text-slate-300 text-center text-sm">
                                                "{item.feedback}"
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex  absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
                        {slideIndicators.map((index) => (
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
        </div>
    );
}
