import { useMemo } from 'react';
import { faker } from '@faker-js/faker';
//This page will be removed
export default function Feedback() {
    interface Person {
        name: string;
        rate: number;
        feedback: string;
    }
    const fakeProfilePic = useMemo(() => {
        return faker.image.urlLoremFlickr({ category: 'people' });
    }, []);
    const persons: Person[] = [
        {
            name: 'Jane Smith',
            rate: 3.8,
            feedback: 'I like it <3.',
        },
    ];
    return (
        <>
            {persons.map((item) => (
                <div className="flex flex-col items-center justify-center bg-indigo-900 gap-6 mb-20 group shadow-lg text-white rounded-3xl px-16 py-18 h-[250px] w-full my-8">
                    <div className="flex flex-col gap-6 items-center justify-center">
                        <img
                            src={fakeProfilePic}
                            alt="profile pic"
                            className="w-[80px] h-[80px] rounded-full"
                        />
                        <div className="relative flex flex-col gap-4 items-center justify-center">
                            <div className="flex gap-2">
                                <h1 className="text-xl lg:text-2xl">
                                    {' '}
                                    {item.name}{' '}
                                </h1>
                                <div className="flex items-center pl-6">
                                    <svg
                                        className="w-6 h-6 text-yellow-300 "
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 22 20"
                                    >
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                    <p className="ms-2 mt-1 text-sm font-semibold text-white">
                                        {' '}
                                        {item.rate}{' '}
                                    </p>
                                </div>
                            </div>
                            <p className="lg:text-md text-slate-300 text-center">
                                {' '}
                                "{item.feedback}"{' '}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
