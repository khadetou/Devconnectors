import {Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';
import './style/App.css';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';


const App = ()=> 

    <Fragment>
      <Navbar/>
       <Route exact path ="/" component={Landing}/>
      <Switch>
         <Route exact path="/login" component={Login} />
         <Route exact path="/register" component={Register}/>
      </Switch>
    </Fragment>



export default App;
