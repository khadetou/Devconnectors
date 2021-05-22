import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {addEducation} from '../../actions/profileAction';

const AddEducation = () => {
    const dispacth = useDispatch();
    const msgs  = useSelector(state=>state.alert)
    const history = useHistory();

    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        from: '',
        fieldofstudy: '',
        to: '',
        current: false,
        description: ''
    })
    const [toDisabled, setToDisabled] = useState(false);


    const onChange = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = (e)=>{
        e.preventDefault();
        dispacth(addEducation(formData, history))
    }

    const {school, degree, from, to, current, description, fieldofstudy}= formData;

    
    const alert = msgs.map(msg =>(<div key={msg.id} className={`alert alert-${msg.alertType}`}>{msg.msg}</div>));

    return (
    <section className="container">
        {alert}
      <h1 className="large text-primary">
       Add Your Education
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any school or bootcamp you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e)=>onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="* Degree or Certificat" name="degree" required value={degree} onChange={(e)=>onChange(e)} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* School or Bootcamp" name="school" required value={school} onChange={(e)=>onChange(e)} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Field of study" name="fieldofstudy" value={fieldofstudy} onChange={(e)=>onChange(e)} />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={(e)=>onChange(e)}/>
        </div>
         <div className="form-group">
          <p><input type="checkbox" name="current" checked={current} value={current} 
          onChange={(e)=>{
            setFormData({...formData, current: !current})
            setToDisabled(!toDisabled)
          }} /> Current School</p>
        </div>

        {!toDisabled && 
        (<div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} onChange={(e)=>onChange(e)}/>
        </div>)}

        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Programme Description"
            value={description} 
            onChange={(e)=>onChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </section>
    )
}

export default AddEducation;
