import { faker } from '@faker-js/faker';
import { useMemo } from 'react';
import Blogt from '../assets/imgs/comp.svg';
export default function SingleBlog() {
    const fakeProfilePic = useMemo(() => {
        return faker.image.urlLoremFlickr({ category: 'people' });
    }, []);
    return (
        <div className="w-full duration-200 hover:scale-95">
            <div className="max-h-52 w-full overflow-hidden rounded-t-xl">
                <img src={Blogt} alt="blog img" className="w-full" />
            </div>
            <div className="rounded-b-xl px-5 pb-5 pt-3 shadow-md shadow-indigo-500/10">
                <div className="flex flex-col gap-3">
                    <div>
                        <a
                            href="#"
                            className="mr-2 rounded-lg bg-indigo-100 px-3 py-2 text-sm text-slate-600"
                        >
                            Development
                        </a>
                        <a
                            href="#"
                            className="mr-2 rounded-lg bg-indigo-100 px-3 py-2 text-sm text-slate-600"
                        >
                            Software
                        </a>
                    </div>
                    <div className="flex  justify-between">
                        <h2 className="pt-3 text-xl capitalize text-slate-800 font-extrabold">
                            Blog Post Title{' '}
                        </h2>
                        <p className="text-sm font-semibold text-slate-600 pt-5 pr-3">
                            Oct 13 2024
                        </p>
                    </div>

                    <a href="#" className="block font-medium  text-slate-800">
                        Lorem ipsum dolor sit amet consectetur. Leo at amet
                        gravida viverra...
                    </a>
                </div>
                <hr className="my-4 border-slate-100" />
                <div className="flex">
                    <img
                        src={fakeProfilePic}
                        alt="user img"
                        className="mr-3 h-10 w-10 rounded-full object-cover"
                    />
                    <p className="text-sm font-semibold capitalize text-slate-600">
                        Jim Jackson
                        <span className="block text-xs text-slate-400">
                            web designer
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
