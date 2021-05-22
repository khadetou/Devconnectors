import React, { Fragment } from 'react';
import Moment from 'react-moment';
import {useSelector} from 'react-redux';

const Experience = () => {
    const {experience} = useSelector(state=>state.profile.profile)

    let experiences = experience.map((ex)=>
    (
        <tbody>
            <tr>
                <td>{ex.company}</td>
                <td className="hide-sm">{ex.title}</td>
                <td className="hide-sm">
                    <Moment format="YYYY/MM/DD">{ex.from}</Moment> - {
                        ex.to !==null ? (<Moment format="YYYY/MM/DD">{ex.to}</Moment>): ' Now'
                    }
                </td>
                <td>
                    <button className="btn btn-danger">
                        Delete
                    </button>
                </td>
            </tr>
        </tbody>))

    return (
<Fragment>
    <h2 className="my-2">Experience Credentials</h2>
        <table className="table">
        <thead>
            <tr>
                <th>Company</th>
                <th className="hide-sm">Title</th>
                <th className="hide-sm">Years</th>
                <th></th>
            </tr>
        </thead>
            {experiences}
        </table>
</Fragment>
    )
}

export default Experience;
