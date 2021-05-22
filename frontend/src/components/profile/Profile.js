import React, {Fragment, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {getProfileById} from '../../actions/profileAction';
import Spinner from '../layout/Spinner';
import {Link} from 'react-router-dom';

const Profile = ({match}) => {
    const dispatch = useDispatch();
    const {profile, loading} = useSelector(state => state.profile)
    const auth = useSelector(state=>state.auth);

    useEffect(()=>{
       dispatch(getProfileById(match.params._id))
    },[dispatch, match])
    return (
        <section className="container">
            {profile === null || loading ? 
            <Spinner/>: 
            <Fragment>
                <Link className="btn btn-light" to="/profiles">Back To Profile</Link>
                {profile !== null && auth.isAuthenticated && profile.user._id === auth.user._id && (<Link to="/edit-profile" className="btn btn-dark">Edit profile</Link>)}
            </Fragment>}
           
        </section>
    )
}

export default Profile;
