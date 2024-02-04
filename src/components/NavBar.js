import React from "react";
import "../static/Navbar.css"

function NavBar(){
   function logout(){
    window.location.href = '/';
    localStorage.removeItem('username');
   }
    return(
        <div className="topnav">
        <a className="active"  href='/home' >Weather Forecast</a>
        <a href='/table'>User Table</a>
        <a onClick={logout}>Logout</a>
        </div>
    );
}
export default NavBar;