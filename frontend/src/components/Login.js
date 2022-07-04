import { useState } from "react";
import { useDispatch } from "react-redux";
import CONSTANTS from "../store/constants";

// styling
import './css/Login.scss';

// helpers
import { login } from "../apiHelpers/auth";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username.length || !password.length) return setError('Must enter username and password')

        let res;
        try {
            res = await login(username, password);
        } catch {
            return setError('Authentication failed');
        }

        dispatch({type: CONSTANTS.SET_LOGGED_IN_ACTION, loggedIn: true});
        localStorage.setItem('token', res.data.token);
    };

    return (
        <form className='login-form' onSubmit={handleSubmit}>
            <h1>Sign In</h1>

            {error &&
                <div className='error-alert'>
                    <p>{error}</p>
                </div>
            }

            <label>User</label>
            <input type='text' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)}/>

            <label>Password</label>
            <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}/>

            <input type='submit' value='Log in' />
        </form>
    );
};

export default Login;