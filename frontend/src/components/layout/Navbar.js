import React from 'react'
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../actions/authActions';
import {clearProfile} from '../../actions/profileAction';
import { FaSignOutAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
const Navbar = () => {

    const dispatch = useDispatch();
    const {loading, isAuthenticated} = useSelector(state=>state.auth);

    const onLogout = ()=>{
        dispatch(logout());
        dispatch(clearProfile());
    }
    return (
    <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <i className="fas fa-code"></i> DevConnector
                </Link>
            </h1>
        {!loading && (!isAuthenticated? (
        <ul>
            <li><Link to="/profiles"> 
                <FaUser className="a-icon"/>
                Developers </Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
        ):
        (
        <ul>
            <li><Link to="/profiles">
                <FaUser className="a-icon"/>
                    Developers
                </Link></li>
            <li><Link to="/posts">Posts</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li onClick={onLogout}>
                <Link to="/">
                    <FaSignOutAlt className="a-icon"/>
                    Logout
                </Link></li>
        </ul>
        ))}
    </nav>
    )
}

export default Navbar;
