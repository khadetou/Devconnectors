import React, { Fragment } from 'react';
import Moment from 'react-moment';
import {useSelector, useDispatch} from 'react-redux';
import {deleteExperience} from '../../actions/profileAction';

const Experience = () => {
    const {experience} = useSelector(state=>state.profile.profile)
    const dispatch= useDispatch();

    const  Delete = (id)=>{
        dispatch(deleteExperience(id))
      }
    let experiences = experience.map((ex, idx)=>
    (
        <tbody key={idx}>
            <tr>
                <td>{ex.company}</td>
                <td className="hide-sm">{ex.title}</td>
                <td className="hide-sm">
                    <Moment format="YYYY/MM/DD">{ex.from}</Moment> - {
                        ex.to !==null ? (<Moment format="YYYY/MM/DD">{ex.to}</Moment>): ' Now'
                    }
                </td>
                <td>
                    <button onClick={()=>Delete(ex._id)} className="btn btn-danger">
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
