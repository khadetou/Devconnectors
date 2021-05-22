import React, { Fragment } from 'react'
import Moment from 'react-moment';
import {useSelector, useDispatch} from 'react-redux';
import {deleteEducation} from '../../actions/profileAction';

const Education = () => {

    const {education} = useSelector(state=>state.profile.profile);
    const dispatch = useDispatch();
    
  const  Delete = (e)=>{
    dispatch(deleteEducation(e))
  }

    const educations = education.map((edu, idx)=>(
        <tbody key={idx}>
        <tr>
          <td>{edu.school}</td>
          <td className="hide-sm">{edu.degree}</td>
          <td className="hide-sm">
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> - {edu.to !==null ? (<Moment format="YYYY/MM/DD">{edu.to}</Moment>): ' Now'}
          </td>
          <td>
            <button onClick={()=>Delete(edu._id)} className="btn btn-danger">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    ))

    return (
<Fragment>
    <h2 className="my-2">Education Credentials</h2>
    <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th className="hide-sm">Degree</th>
              <th className="hide-sm">Years</th>
              <th />
            </tr>
          </thead>
          {educations}
    </table>
</Fragment>
    )
}

export default Education;
