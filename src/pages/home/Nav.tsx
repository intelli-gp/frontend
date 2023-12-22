import classNames from 'classnames';
import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { CiLogin } from 'react-icons/ci';
import { IoPersonOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

import Button from '../../components/Button';

export default function Nav() {
    const [navbarOpen, setmenuOpen] = useState(false);
    const handleNav = () => {
        setmenuOpen(!navbarOpen);
    };
    const className = classNames(
        'fixed right-0 top-0 w-[55%] h-screen md:hidden ease-in bg-indigo-50 py-6 shadow-lg shadow-indigo-400/5 ',
        {
            '': navbarOpen,
            hidden: !navbarOpen,
        },
    );
    const menuItems = ['Home', 'About', 'Features', 'Pricing'];

    return (
        <nav className=" sticky left-0 top-0 z-50  h-[53px]  bg-txt w-full backdrop-blur">
            <div className="mx-auto max-w-7xl px-6 2xl:px-16 flex justify-between items-center h-full flex-wrap">
                <div className="w-1/6">
                    <div className="w-2/6">
                        <a href="#">
                            <img src="" alt="logo" className="w-full" />
                        </a>
                    </div>
                </div>
                <div className="hidden md:flex md:w-3/6 w-0 ">
                    <ul className="flex px-1 ">
                        {menuItems.map((item) => (
                            <li>
                                <a
                                    href="#"
                                    className="text-sm font-medium text-white lg:text-base ml-10"
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex w-2/6 pt-2 md:justify-center  justify-end">
                    <Link to="/auth/signup" className="md:flex hidden">
                        <Button
                            select="primary"
                            type="button"
                            className="flex items-center justify-center text-sm h-auto py-[4px] w-5/6 border-2 border-indigo-900 lg:mx-5 rounded-md"
                        >
                            Signup
                        </Button>
                    </Link>
                    <Link to="/auth/login" className="md:flex hidden">
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
                        className="md:hidden"
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
                    {menuItems.map((item) => (
                        <li>
                            <a
                                href="#"
                                className="block border-b-[1px] border-slate-200 py-2 px-10 hover:bg-indigo-900 hover:text-white text-txt"
                            >
                                {item}
                            </a>
                        </li>
                    ))}
                    <li>
                        <Link
                            to="/auth/signup"
                            className="block py-2   border-b-[1px] border-slate-200  px-10 hover:bg-indigo-900 hover:text-white text-txt flex items-center gap-2"
                        >
                            <IoPersonOutline size={14} />
                            Sign up
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/auth/login"
                            className="block py-2   border-b-[1px] border-slate-200 px-10 hover:bg-indigo-900 hover:text-white text-txt flex items-center gap-2"
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
