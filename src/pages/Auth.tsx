import { Outlet } from 'react-router-dom';

import illustration from '../assets/imgs/login-signup-illustration.svg';

export default function AuthTemplatePage() {
    return (
        <div className="flex h-screen w-screen">
            <div className="bg-indigo-900 w-2/5 flex justify-center items-center flex-col py-16">
                <div className="w-screen flex justify-center items-center flex-col h-full gap-28">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-7xl text-white font-black">
                            Think
                            <br />
                            Forward
                        </h1>
                        <h2 className="text-white text-2xl">
                            Education for future-proof career
                        </h2>
                    </div>
                    <img
                        src={illustration}
                        alt="todo: add description"
                        className="w-96"
                    />
                </div>
            </div>
            <div className="flex flex-col justify-center items-center w-3/5">
                <Outlet />
            </div>
        </div>
    );
}
