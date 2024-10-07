import React from 'react'
import './Navbar.css'
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className="navbarLeft">
                <div className="siteName addMarginLeft">NostalgicGames</div>
                <div className="about addMarginLeft">About</div>
                <div className="leaderBoard addMarginLeft">LeaderBoard</div>
            </div>
            <div className="navbarRight">
                {
                    localStorage.getItem('u-token')
                    ?
                    <div className="profile_logout">
                        <div className="nav_profile addMarginRight">{localStorage.getItem('u-username')}</div>
                        <div className="nav_logout addMarginRight">Logout</div>
                    </div>
                    :
                    <div className="login_register">
                        <Link className="links" to='/signup_login'>
                            <div className="nav_login addMarginRight">Login</div>
                        </Link>
                        <Link className='links' to='/signup_login'>
                            <div className="nav_register addMarginRight">Register</div>
                        </Link>
                    </div>
                }
            </div>
        </div>
    )
}

export default Navbar
