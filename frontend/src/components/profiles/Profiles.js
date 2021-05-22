import React, {Fragment, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {getAllProfiles} from '../../actions/profileAction';
import ProfileItem from './ProfileItem';
import Spinner from '../layout/Spinner';

const Profiles = () => {
    const dispatch = useDispatch()
    const {loading, profiles} = useSelector(state=>state.profile)


    useEffect(()=>{
        
        dispatch(getAllProfiles());

    },[dispatch])


    return (
        <section className="container">
            {loading? 
            <Spinner/>:
            <Fragment>
                <h1 className="large text-primary">Developers</h1>
                <p className="lead">
                    <i className="fab fa-connectdevelop"></i>
                    Browse and connect with developers
                </p>
                <div className="profiles">
                    {profiles.length > 0? (
                        profiles.map((profile)=>(
                            <ProfileItem key={profile._id} profile={profile}/>
                        ))
                    ): (<h4>No profiles found</h4>) }
                </div>
            </Fragment>
        }
        </section>
    )
}

export default Profiles;
