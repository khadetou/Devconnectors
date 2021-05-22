import React from 'react';
import Moment from 'react-moment';


const ProfileEducation = ({education:{school, degree, current, from, to, fieldofstudy, description}}) => {
    return (
    <div>
        <h3 className="text-dark">{school}</h3>
        <p>
            <Moment format="YYYY/MM/DD">{from}</Moment> -{!to? 'Now': <Moment format="YYYY/MM/DD">{to}</Moment>}
        </p>
        <p>
            <strong>Position: </strong>{degree}
        </p>
        <p>
            <strong>Field Of Study: </strong>{fieldofstudy}
        </p>
        <p>
            <strong>Description: </strong>{description}
        </p>
    </div>
    )
}

export default ProfileEducation;
