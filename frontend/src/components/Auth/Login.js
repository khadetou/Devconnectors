import React, { Fragment, useState } from 'react'
import {Link, Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../actions/authActions';
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
})

const dispacth = useDispatch();
const msgs = useSelector(state=>state.alert);
const auth = useSelector(state=>state.auth)

const {email, password} = formData;

const onChange= (e) =>setFormData({...formData, [e.target.name]: e.target.value});
const onSubmit = async(e)=>{
    e.preventDefault();

       dispacth(login({email, password}));
   
}

const alert = msgs.map(msg =>(<div key={msg.id} className={`alert alert-${msg.alertType}`}>{msg.msg}</div>));
// let lastItem = alert.length-1;


//Redirect if logge in 
if(auth.isAuthenticated){
  return <Redirect to= '/dashboard'/>
}


    return (
        <Fragment>
            <section className="container">
            {alert}
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
        <form className="form" onSubmit={(e)=>{onSubmit(e)}}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email} 
                  onChange={(e=>onChange(e))}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password} 
                  onChange={(e=>onChange(e))}
                />
              </div>
              <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
            Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
            </section>
        </Fragment>
    )
}

export default Login;
