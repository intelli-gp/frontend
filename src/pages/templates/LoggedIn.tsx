import { Outlet } from 'react-router-dom';

import SideNav from '../../components/SideNav';

export default function LoggedInTemplatePage() {
    return (
        <div className="flex min-h-full w-full relative">
            <SideNav />
            <main className="w-full h-full">
                <Outlet />
            </main>
        </div>
    );
}
