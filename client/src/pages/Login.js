import React, {useState} from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import '../style/Login/Login.scss'; // Make sure to create and import the CSS file

import UserLogin from '../components/loginPage/UserLogin';
import Register from '../components/loginPage/Register';
import ResendPassword from '../components/loginPage/ResendPassword';

import logo from '../img/morp_light_horizontal.png';
import LoadingGIF from '../img/MORP_Loading.gif';


const Login = () => {

    const [loading, setLoading] = useState(false);
    const [pages, setPages] = useState([
        { 
            id: 1,
            name: 'Login', 
            component: <UserLogin changeLoading={changeLoading} />,
            active: true
        },
        {
            id: 2, 
            name: 'Register', 
            component: <Register changeLoading={changeLoading} />,
            active: false
        },
        {
            id: 3, 
            name: 'Resend Password', 
            component: <ResendPassword changeLoading={changeLoading} />,
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

    function changeLoading(value) {
        setLoading(value);
    }


    return (
        <HelmetProvider>
            <Helmet>
              <title>MORP - Login</title>
            </Helmet>

            <div className="login-container">
                
                <main>
                    <img src={logo} alt="logo" className="logo" />
                    {pages.find(page => page.active === true).component}
                    <div className="links">
                        {inactivePageLinks}
                    </div>
                    {
                    loading && 
                    <div className="loading" >
                        <img src={LoadingGIF} alt="loading"/>
                    </div>
                    }
                </main>
            </div>
        </HelmetProvider>
    );
};

export default Login;