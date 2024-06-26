import { Outlet } from 'react-router-dom';

import illustration from '../../assets/imgs/login-signup-illustration.svg';
import EnhancedImage from '../../components/image/image.component';

export default function AuthTemplatePage() {
    return (
        <div className="flex min-h-screen w-full xs:max-lg:flex 3xs:max-lg:justify-center flex-row-reverse">
            <div className="bg-indigo-950 w-2/5 hidden lg:flex lg:flex-col xl:justify-center items-center py-4 fixed h-full left-0">
                <div className="flex justify-center items-center flex-col h-full gap-28">
                    <div className="flex flex-col gap-2">
                        <h1 className="3xl:text-8xl xl:text-7xl text-6xl text-white font-black">
                            Think
                            <br />
                            Forward
                        </h1>
                        <h2 className="text-white xl:text-2xl text-xl">
                            Education for future-proof career
                        </h2>
                    </div>
                    <EnhancedImage
                        transparentPlaceholder
                        src={illustration}
                        alt="todo: add description"
                        className="3xl:w-[28rem] lg:w-96 w-72"
                        objectFit="contain"
                    />
                </div>
            </div>

            <div className="flex flex-col justify-center items-center xs:w-full lg:w-3/5">
                <Outlet />
            </div>
        </div>
    );
}
