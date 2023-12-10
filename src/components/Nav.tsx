import { useState } from 'react';
import Button from './Button';
import { AiOutlineMenu } from 'react-icons/ai';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

export default function Nav() {
    const [navbarOpen, setmenuOpen] = useState(false);
    const handleNav = () => {
        setmenuOpen(!navbarOpen);
    };
    const className = classNames(
        'absolute right-0 top-[90px] w-full max-w-[350px] rounded-lg border border-blue-200 bg-white py-5 px-6 shadow-lg shadow-blue-400/5 transition-all lg:static lg:block lg:max-w-full lg:border-none lg:shadow-none lg:bg-transparent lg:px-0 lg:py-0',
        {
            '': navbarOpen,
            hidden: !navbarOpen,
        },
    );
    return (
        <div className="absolute sticky left-0 top-0 z-50 bg-txt w-full backdrop-blur">
            <div className="mx-auto h-[75px] max-w-7xl px-8 md:px-6">
                <div className="relative flex h-full items-center justify-between border-b border-slate-500/10">
                    {/* logo  */}
                    <div className="w-[15rem] max-w-full">
                        <a href="#">
                            <img src="" alt="logo" className="w-full" />
                        </a>
                    </div>
                    <div className="flex w-full items-center justify-end ">
                        <nav x-transition className={className}>
                            <ul className="flex flex-col justify-center gap-8 lg:flex-row">
                                <li>
                                    <a
                                        href="#"
                                        className="text-lg font-medium lg:text-white text-txt lg:text-base"
                                    >
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-lg font-medium lg:text-white text-txt lg:text-base"
                                    >
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-lg font-medium  lg:text-white text-txt  lg:text-base"
                                    >
                                        Features
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="#"
                                        className="text-lg font-medium lg:text-white text-txt lg:text-base"
                                    >
                                        Pricing
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="flex w-full pt-3 gap-10 justify-center ">
                        <Link to="/auth/signup" className="w-2/6">
                            <Button
                                select="primary700"
                                type="button"
                                className="flex items-center justify-center gap-2 text-lg h-auto py-[9px] w-full mx-5 rounded-xl"
                            >
                                Signup
                            </Button>
                        </Link>
                        <Link to="/auth/login" className="w-2/6">
                            <Button
                                type="button"
                                outline={true}
                                className="flex items-center justify-center text-lg h-auto py-[9px] w-full mx-5 rounded-xl"
                            >
                                Login
                            </Button>
                        </Link>
                        <div
                            onClick={handleNav}
                            id="navbarToggler"
                            className="block lg:hidden pt-4 px-3"
                        >
                            <AiOutlineMenu size={25} color="#fff" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
