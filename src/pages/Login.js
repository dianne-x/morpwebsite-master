import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import '.././style/Login.scss'; // Make sure to create and import the CSS file

import UserLogin from '../components/loginPage/UserLogin';
import Register from '../components/loginPage/Register';
import ResendPassword from '../components/loginPage/ResendPassword';

import logo from '../img/morp_light_horizontal.png';

/*
<div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                <form>
                    <div className="input-group">
                        <FontAwesomeIcon icon={faUser} className="icon" />
                        <input type="text" placeholder="Username" required />
                    </div>
                    <div className="input-group">
                        <FontAwesomeIcon icon={faLock} className="icon" />
                        <input type="password" placeholder="Password" required />
                    </div>
                    <button type="submit" className="loginto-button">Login</button>
                </form>
                <div className="login-footer">
                    <a href="#">Forgot Password?</a>
                    <a href="#">Create an Account</a>
                </div>
            </div>
        </div>
*/

const Login = () => {
    return (
        <div className="login-container">
            <main>
                <img src={logo} alt="logo" />
                <UserLogin />
            </main>
        </div>
    );
};

export default Login;