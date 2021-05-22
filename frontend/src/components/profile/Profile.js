import React, {Fragment, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {getProfileById} from '../../actions/profileAction';
import Spinner from '../layout/Spinner';
import {Link} from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';

const Profile = ({match}) => {
    const dispatch = useDispatch();
    const {profile, loading} = useSelector(state => state.profile)
    const auth = useSelector(state=>state.auth);
 
    useEffect(()=>{

       dispatch(getProfileById(match.params._id))

    },[dispatch, match])

    return (
        <section className="container">
            {profile !== null && loading ? 
            <Spinner/>: 
            <Fragment>
                <Link className="btn btn-light" to="/profiles">Back To Profile</Link>
                {profile !== null && auth.isAuthenticated && profile.user._id === auth.user._id && (<Link to="/edit-profile" className="btn btn-dark">Edit profile</Link>)}
            </Fragment>}
           {profile !==null &&
            <div className="profile-grid my-1">
                <ProfileTop/>
                <ProfileAbout profile={profile} />
                <div className="profile-exp bg-white p-2">
                    <h2 className="text-primary">Experience</h2>
                    {profile.experience.length > 0 ? 
                    (<Fragment>
                        {profile.experience.map((exp)=>(
                            <ProfileExperience key={exp._id} experience ={exp} />
                        ))}
                    </Fragment>): 
                    (<h4>No experience credentials</h4>)}
                </div>

                <div className="profile-edu bg-white p-2">
                    <h2 className="text-primary">Education</h2>
                    {profile.education.length > 0 ? 
                    (<Fragment>
                        {profile.education.map((edu)=>(
                            <ProfileExperience key={edu._id} experience ={edu} />
                        ))}
                    </Fragment>): 
                    (<h4>No experience credentials</h4>)}
                </div>

            </div>}
        </section>
    )
}

export default Profile;
