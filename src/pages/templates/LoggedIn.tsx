import { Outlet } from 'react-router-dom';

import SideNav from '../../components/side-nav/side-nav.component';

export default function LoggedInTemplatePage() {
    return (
        <div className="flex min-h-full w-full relative flex-col lg:flex-row">
            <SideNav />
            <main className="w-full h-full">
                <Outlet />
            </main>
        </div>
    );
}
