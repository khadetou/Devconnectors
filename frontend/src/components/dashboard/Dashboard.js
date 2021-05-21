import React, {useEffect} from 'react';
import Spinner from '../layout/Spinner';
import {useDispatch, useSelector} from 'react-redux';
import {getCurrentProfile} from '../../actions/profileAction';
import { Fragment } from 'react';
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const dispatch = useDispatch();
    const {isAuthenticated, user}= useSelector(state=>state.auth);
    const {profile, loading} = useSelector(state=>state.profile);


    useEffect(()=>{

        dispatch(getCurrentProfile())

    },[dispatch])

    return (
        <section className="container">
            {loading && profile === null ? 
            (<Spinner/>):
            ( <Fragment>
                <h1 className="large text-primary">Dashboard</h1>
                <p className="lead">
                    <FaUser/> Welcome {user && user.name}
                </p>
                {profile !== null? 
                    (<Fragment>Has</Fragment>):
                    (<Fragment>
                        <p>You have not yet setup a profile please add some info</p>
                        <Link to ='/create-profile' className="btn btn-primary my-1">Create  Profile</Link>
                    </Fragment>)}
            </Fragment>)}
        </section>
    )
}

export default Dashboard;
