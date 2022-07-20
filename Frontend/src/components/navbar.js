import React from 'react'
import { Link } from "react-router-dom";


export default function Navbar() {
    var user = null


    const handleLogout = () => {
        alert('loggedout!')
        localStorage.clear();
        localStorage.setItem('userObject', {});
        // this.props.history.push('/');
        console.log(JSON.parse(localStorage.getItem("authToken")))
    };
    function ifLoggedIn() {
        try {
            this.user = localStorage.getItem("authToken");
            console.log('this.user', this.user)

        } catch (error) {
        }
        return user
    }
    ifLoggedIn()

    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-light fixed-top" >
                <div className="container">
                    <Link className="navbar-brand" to={"/"}>Logo.com</Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto">
                            {
                                localStorage.getItem("authToken") ?
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" onClick={handleLogout} to={"/"}>Log Out</Link>
                                        </li>
                                    </>
                                    :
                                    <>
                                        < li className="nav-item" >
                                            <Link className="nav-link" to={"/login"} >Login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to={"/signup"}>Sign up</Link>
                                        </li>

                                    </>

                            }

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
