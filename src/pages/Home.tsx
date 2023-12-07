import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <nav className="flex gap-4 p-4 ">
            <Link to="/auth/login">Login</Link>
            <Link to="/auth/signup">Signup</Link>
            <Link to="/logged-in">LoggedIn</Link>
        </nav>
    );
}
