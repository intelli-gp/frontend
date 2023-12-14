import icons from '../../assets/imgs/icons.svg';

export default function Footer() {
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
