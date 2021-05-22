import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {addExperience} from '../../actions/profileAction';

const AddExperience = () => {
    const dispacth = useDispatch();
    const msgs  = useSelector(state=>state.alert)
    const history = useHistory();

    const [formData, setFormData] = useState({
        company: '',
        title: '',
        from: '',
        location: '',
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
        dispacth(addExperience(formData, history))
    }

    const {company, title, from, to, current, description, location}= formData;

    
    const alert = msgs.map(msg =>(<div key={msg.id} className={`alert alert-${msg.alertType}`}>{msg.msg}</div>));

    return (
    <section class="container">
        {alert}
      <h1 class="large text-primary">
       Add An Experience
      </h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={(e)=>onSubmit(e)}>
        <div class="form-group">
          <input type="text" placeholder="* Job Title" name="title" required value={title} onChange={(e)=>onChange(e)} />
        </div>
        <div class="form-group">
          <input type="text" placeholder="* Company" name="company" required value={company} onChange={(e)=>onChange(e)} />
        </div>
        <div class="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={(e)=>onChange(e)} />
        </div>
        <div class="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={(e)=>onChange(e)}/>
        </div>
         <div class="form-group">
          <p><input type="checkbox" name="current" checked={current} value={current} 
          onChange={(e)=>{
            setFormData({...formData, current: !current})
            setToDisabled(!toDisabled)
          }} /> Current Job</p>
        </div>

        {!toDisabled && 
        (<div class="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} onChange={(e)=>onChange(e)}/>
        </div>)}

        <div class="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description} 
            onChange={(e)=>onChange(e)}
          ></textarea>
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <Link class="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </section>
    )
}

export default AddExperience;
