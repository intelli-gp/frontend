import SideNav from '../../components/SideNav';
import { Outlet } from 'react-router-dom';

export default function LoggedInTemplatePage() {
    return (
        <div className="flex min-h-full w-full">
            <SideNav />
            <main className="w-full h-full">
                <Outlet />
            </main>
        </div>
    );
}
