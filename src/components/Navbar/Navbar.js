import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  console.log(localStorage);
  const username=localStorage.getItem('u-username');
  console.log(username);
  const navigate=useNavigate();
  const Logout=()=>{
    localStorage.clear();
    navigate('/');
  }
  return (
    <div className='mainNavbar'>
      <div className="leftSide">
        <div className="nameHeading">Game Classix</div>
        <Link className='NavbarLinks leftLinks' to={'/About'}>
          <div className="about">About</div>
        </Link>
        <Link className='NavbarLinks leftLinks' to={'/Leaderboard'}>
          <div className="about">LeaderBoard</div>
        </Link>
      </div>
      <div className="rightSide">
        {
          username?
          <div className="loggedIn">
            <Link className='NavbarLinks' to={`/users/${username}`}>
              <div className="signUpLoginInNavbar giveLeftPadding">Profile</div>
            </Link>
            <div className="NavbarLogout giveLeftPadding" onClick={Logout}>Logout</div>
          </div>
          :
          <Link className='NavbarLinks' to={'/signup_login'}>
            <div className="signUpLoginInNavbar">Login</div>
          </Link>
        }
        
      </div>
    </div>
  )
}

export default Navbar
