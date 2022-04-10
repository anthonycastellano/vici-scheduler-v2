import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to='/all-schedules'>All Schedules</Link>
                    </li>
                    <li>
                        <Link to='/admin'>Admin</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;