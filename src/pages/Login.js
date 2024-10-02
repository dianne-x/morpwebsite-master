import React, {useState} from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import '.././style/Login.scss'; // Make sure to create and import the CSS file

import UserLogin from '../components/loginPage/UserLogin';
import Register from '../components/loginPage/Register';
import ResendPassword from '../components/loginPage/ResendPassword';

import logo from '../img/morp_light_horizontal.png';


const Login = () => {

    const [pages, setPages] = useState([
        { 
            id: 1,
            name: 'Login', 
            component: <UserLogin />,
            active: true
        },
        {
            id: 2, 
            name: 'Register', 
            component: <Register />,
            active: false
        },
        {
            id: 3, 
            name: 'Resend Password', 
            component: <ResendPassword />,
            active: false 
        }
    ]);
    const inactivePages = pages.filter(page => page.active === false);

    const inactivePageLinks = inactivePages.map(page => {
        return <p key={page.id} onClick={() => changeActivePage(page.id)}>{page.name}</p>
    })

    function changeActivePage(id) {
        const newPages = pages.map(page => {
            if(page.id === id) {
                return {...page, active: true};
            } else {
                return {...page, active: false};
            }
        });
        setPages(newPages);
    }


    return (
        <HelmetProvider>
            <Helmet>
              <title>MORP - Login</title>
            </Helmet>

            <div className="login-container">
                
                <main>
                    <img src={logo} alt="logo" />
                    {pages.find(page => page.active === true).component}
                    <div className="links">
                        {inactivePageLinks}
                    </div>
                </main>
            </div>
        </HelmetProvider>
    );
};

export default Login;