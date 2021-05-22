import React, {useEffect} from 'react';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import {useDispatch, useSelector} from 'react-redux';
import {deleteAccount, getCurrentProfile} from '../../actions/profileAction';
import { Fragment } from 'react';
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Experience from './Experience';
import Education from './Education';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { user}= useSelector(state=>state.auth);
    const {profile, loading} = useSelector(state=>state.profile);


    useEffect(()=>{

        dispatch(getCurrentProfile())

    },[dispatch])

    const msgs  = useSelector(state=>state.alert)
    const alert = msgs.map(msg =>(<div key={msg.id} className={`alert alert-${msg.alertType}`}>{msg.msg}</div>));

    const DeleteAccount =()=>{
        dispatch(deleteAccount());
    }

    return (
        <section className="container">
            {alert}
            
            {loading && profile === null ? 
            (<Spinner/>):
            ( <Fragment>
                <h1 className="large text-primary">Dashboard</h1>
                <p className="lead">
                    <FaUser/> Welcome {user && user.name}
                </p>
                {profile !== null? 
                    (<Fragment>
                        <DashboardActions/>
                        <Education/>
                        <Experience/>
                        <div className="my-2">
                            <button onClick={()=>DeleteAccount()} className="btn btn-danger">
                                <i className="fas fa-user-minus"></i> Delete my account 
                            </button>
                        </div>
                    </Fragment>):
                    (<Fragment>
                        <p>You have not yet setup a profile please add some info</p>
                        <Link to ='/create-profile' className="btn btn-primary my-1">Create  Profile</Link>
                    </Fragment>)}
            </Fragment>)}
        </section>
    )
}

export default Dashboard;
