import {Fragment, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import './style/App.css';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profileForm/CreateProfile';
import EditProfile from './components/profileForm/EditProfile';
import AddExperience from './components/profileForm/AddExperience';
import AddEducation from './components/profileForm/AddEducation';
import {loadUser} from './actions/authActions';
import setAuthToken from './utils/setAuthToken';
import {useDispatch} from 'react-redux';


if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = ()=> {

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(loadUser())
  },[dispatch])

  return ( <Fragment>
      <Navbar/>
       <Route exact path ="/" component={Landing}/>
      <Switch>
         <Route exact path="/login" component={Login} />
         <Route exact path="/register" component={Register}/>
         <PrivateRoute exact path="/dashboard" component={Dashboard}/>
         <Route exact path="/create-profile" component={CreateProfile}/>
         <Route exact path="/edit-profile" component={EditProfile}/>
         <Route exact path="/add-education" component={AddEducation}/>
         <Route exact path="/add-experience" component={AddExperience}/>
      </Switch>
    </Fragment>)
}


export default App;
