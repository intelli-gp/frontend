import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <nav className="flex gap-4 p-4 ">
            <Link to="/auth/login">Login Page</Link>
            <Link to="/auth/signup">Signup Page</Link>
            <Link to="/secret">Secret</Link>
        </nav>
    );
}
