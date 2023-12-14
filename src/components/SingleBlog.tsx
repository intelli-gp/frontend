import { faker } from '@faker-js/faker';
import { useMemo } from 'react';
import Blogt from '../assets/imgs/comp.svg';
export default function SingleBlog() {
    const fakeProfilePic = useMemo(() => {
        return faker.image.urlLoremFlickr({ category: 'people' });
    }, []);
    return (
        <div className="w-full rounded-t-xl duration-200 flex flex-col  hover:scale-95 max-h-[480px] shadow-md shadow-indigo-500/10 mb-6">
            <img src={Blogt} alt="blog img" className="w-full rounded-t-xl " />
            <div className="px-5 pb-5 rounded-b-xl">
                <div className="flex flex-col gap-2">
                    <div>
                        <a
                            href="#"
                            className="mr-2 rounded-2xl bg-indigo-100 px-3 py-2 text-xs text-slate-600"
                        >
                            Development
                        </a>
                        <a
                            href="#"
                            className="mr-2 rounded-2xl bg-indigo-100 px-3 py-2 text-xs text-slate-600"
                        >
                            Software
                        </a>
                    </div>
                    <div className="flex  justify-between">
                        <h2 className="pt-3 text-lg  capitalize text-slate-800 font-bold">
                            Blog Post Title
                        </h2>
                        <p className="text-xs font-semibold text-slate-600 pt-5 pr-3">
                            Oct 13 2024
                        </p>
                    </div>

                    <a
                        href="#"
                        className="block font-medium text-xs md:text-sm text-slate-800"
                    >
                        Lorem ipsum dolor sit amet consectetur. Leo at amet
                        gravida viverra volutpat egestas condimentum. Placerat
                        adipiscing turpis nibh massa ornare fames lobortis
                        accumsan.
                    </a>
                    <hr className="my-0 border-slate-100" />
                    <div className="flex">
                        <img
                            src={fakeProfilePic}
                            alt="user img"
                            className="mr-3 h-8 w-8 rounded-full object-cover"
                        />
                        <p className="text-xs font-semibold capitalize text-slate-600 pt-2">
                            Jim Jackson
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
