import classNames from 'classnames';
import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { CiLogin } from 'react-icons/ci';
import { IoPersonOutline } from 'react-icons/io5';
import { IoPersonSharp } from 'react-icons/io5';
import { MdLogin } from 'react-icons/md';
import { Link } from 'react-router-dom';

import Logo1 from '../../assets/imgs/logo.png';
import Button from '../../components/Button';

export default function Nav() {
    const [navbarOpen, setMenuOpen] = useState(false);

    const handleNav = () => {
        setMenuOpen(!navbarOpen);
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
        <nav className=" sticky left-0 top-0 z-50 bg-txt w-full backdrop-blur py-3">
            <div className="px-8 lg:px-16 flex justify-between items-center h-full flex-wrap">
                <Link to="/" className="w-[130px] h-auto">
                    <img src={Logo1} />
                </Link>

                <div className="flex gap-16 items-center">
                    <div className="hidden md:flex">
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

                    <div className="flex gap-6 items-center">
                        <Link to="/auth/signup" className="md:flex hidden">
                            <Button
                                select="primary"
                                type="button"
                                className="text-sm !px-8 border-indigo-900 border-2 rounded-lg gap-2"
                            >
                                <IoPersonSharp size={14} />
                                Signup
                            </Button>
                        </Link>
                        <Link to="/auth/login" className="md:flex hidden">
                            <Button
                                type="button"
                                outline={true}
                                className="text-sm text-white border-white !px-8 rounded-lg gap-2"
                            >
                                <MdLogin size={15} />
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
                            className="py-2   border-b-[1px] border-slate-200  px-10 hover:bg-indigo-900 hover:text-white text-txt flex items-center gap-2"
                        >
                            <IoPersonOutline size={14} />
                            Sign up
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/auth/login"
                            className="py-2   border-b-[1px] border-slate-200 px-10 hover:bg-indigo-900 hover:text-white text-txt flex items-center gap-2"
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
