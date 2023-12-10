import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <nav className="flex gap-4 p-4 ">
            <Link to="/auth/login">Login</Link>
            <Link to="/auth/signup">Signup</Link>
            <Link to="/app">App</Link>
            <Link to="/secret">Secret</Link>
            <Link to="/logged-in">Side-nav</Link>
            <Link to="/landingPage">Landing Page</Link>
        </nav>
    );
}
