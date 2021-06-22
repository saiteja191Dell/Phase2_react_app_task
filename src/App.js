import './App.css';
import React,{ Component } from "react";
import { BrowserRouter as Router,NavLink, Redirect,Route } from "react-router-dom"; // configure the route
import Home from "./components/home";
import Contact from "./components/contact";
import User from "./components/user";
import About from "./components/about";
import UserList from './components/userlist';
import Events from './components/employees';
import EmployeeDetails from './components/EmployeeDetails';
import EmployeeAdd from './components/EmployeeAdd';
import EventEdit from './components/EventEdit';

class App extends Component{

  state={
    loggedIn:false
  }

  loginHandle = () =>{
    this.setState({
      loggedIn:true
    })
  }

  render(){
    return(
      <div>
        <Router>          
          {/* <div>
              <NavLink to="/home" activeStyle={{color:'green'}}>Home</NavLink> |
              <NavLink to="/About" activeStyle={{color:'green'}}>About</NavLink> |
              <NavLink to="/Contact" activeStyle={{color:'green'}}>Contact</NavLink> |
              <NavLink to="/user/king_bhai" activeStyle={{color:'green'}}>User</NavLink> | 
              <NavLink to="/userlist" activeStyle={{color:'green'}}>User List</NavLink> | 
              <NavLink to="/emplist" activeStyle={{color:'green'}}>Employees List</NavLink> | 
              <button type="button" onClick={this.loginHandle.bind(this)}>Click Me</button> 
            <input type="button" className="btn btn-secondary" onClick={this.loginHandle.bind(this)} 
                value={this.state.loggedIn ? 'Logout' : 'Login'}></input>
          </div> */}          

          <div className="container">
              <header className="d-flex justify-content-center py-3 border-bottom">
                <ul className="nav nav-pills">    
                  <li className="navbar-brand">My Event</li>              
                  <li className="nav-item"><NavLink to="/home" className="nav-link" aria-current="page">Home</NavLink></li>
                  <li className="nav-item"><NavLink to="/about" className="nav-link">About</NavLink></li>
                  <li className="nav-item"><NavLink to="/contact" className="nav-link">Contact</NavLink></li>
                  <li className="nav-item"><NavLink to="/userlist" className="nav-link">User List</NavLink></li>
                  <li className="nav-item"><NavLink to="/eventlist" className="nav-link">My List Events</NavLink></li>
                </ul> 
              </header>
            </div>
          
          <Route path="/" exact render={Home}></Route>
          <Route path="/home" render={Home}></Route>
          {/* <Route path="/contact" render={Contact}></Route> */}
          <Route path="/contact" render={() => (this.state.loggedIn ? <Contact/> : (<Redirect to="/" />))}></Route>
          <Route path="/about" render={About}></Route>
          <Route path="/user/:username" render={User}></Route>
          <Route path="/userlist" component={UserList}></Route>
          <Route path="/eventlist" component={Events}></Route>
          <Route path="/empdetail/:id" component={EmployeeDetails}></Route>
          <Route path="/empadd" component={EmployeeAdd}></Route>
          <Route path="/eventedit/:id" component={EventEdit}></Route>
        </Router>
      </div>
    )
  }  
}

export default App;
