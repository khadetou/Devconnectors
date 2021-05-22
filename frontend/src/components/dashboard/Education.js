import React, { Fragment } from 'react'
import Moment from 'react-moment';
import {useSelector} from 'react-redux';
const Education = () => {
    const {education} = useSelector(state=>state.profile.profile);

    const educations = education.map((edu)=>(
        <tbody>
        <tr>
          <td>{edu.school}</td>
          <td className="hide-sm">{edu.degree}</td>
          <td className="hide-sm">
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> - {edu.to !==null ? (<Moment format="YYYY/MM/DD">{edu.to}</Moment>): ' Now'}
          </td>
          <td>
            <button className="btn btn-danger">
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
