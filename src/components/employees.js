import axios from "axios";
import React,{ Component } from "react";
import { NavLink } from "react-router-dom";


class Events extends Component{

    constructor(props){
        super(props)
        this.state={
            employees:[],
            searchvalue:"",
            value:null
        }
    }

    getEmployees(){
        axios.get('http://localhost:3000/employees')
                .then(result => {
                    this.setState({employees:result.data})
                    console.log(this.state.employees)
                })
                .catch(error => {
                    console.log("Error caught : " + error)
                })
    }
    componentDidMount(){
        this.getEmployees()
    }
    
    deleteEmployee(id){
        axios.delete('http://localhost:3000/employees/'+id)
        .then(result=>{
            alert('Employee id is deleted : '+id)
            this.getEmployees()
        })
        .catch()
    }

    handleChange = event =>{
        event.preventDefault();
        const{name, value} = event.target;
        this.setState({[name]:value});
        console.log(this.state);
    }
    handleSubmit = event =>{
        event.preventDefault();
        const searchvalue = this.state.searchvalue
        console.log(searchvalue);
        axios.get('http://localhost:3000/employees/')
        .then(result => {            
            for(var i=0;i<result.data.length;i++)
            {
            if(result.data[i].eventplace.includes(searchvalue))
            {                
                this.setState({value:result.data[i]})
                console.log(this.state.value)
                this.state.employees.push({
                    id:this.state.value.id,
                    organisername:this.state.value.organisername,
                    eventname:this.state.value.eventname,
                    eventtiming:this.state.value.eventtiming,
                    eventplace:this.state.value.eventplace
                })
            }
            else
            <getEmployees/>
        }
        })
        .catch(error => {console.log(error)})
    }
    render(){
        return(
            <div className="container">
            <div className="p-5 mb-4 bg-light rounded-3 text-center">                  
                     <div className="container-fluid py-5">          
                     <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" name="searchvalue"
                     value={this.state.searchvalue} onChange={this.handleChange}></input>
                     <br></br>
                     <button class="btn btn-outline-success" onClick={this.handleSubmit}  type="submit">Search Event</button> OR  <NavLink to="/empadd" 
                     className="btn btn-secondary">Add New Events</NavLink>
                     <br></br>  
                     <br></br>                     
                    <h3 className="display-5 fw-bold">Upcoming Events page</h3>
                    <br></br>
                        <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Event Id</th>
                                <th>Event Organiser Name</th>
                                <th>Event Name</th>
                                <th>Event Timing</th>
                                <th>Event Place</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.employees.map((emp, index) => {
                                return(
                                    <tr key={index}>
                                        <td>{emp.id}</td>
                                        <td>{emp.organisername}</td>
                                        <td>{emp.eventname}</td>
                                        <td>{emp.eventtiming}</td>
                                        <td>{emp.eventplace}</td>
                                        <td>
                                            <NavLink to={'/empdetail/'+emp.id} className="btn btn-secondary">View Detail</NavLink>     |
                                            <button className="btn btn-secondary" onClick={this.deleteEmployee.bind(this, emp.id)}>Delete</button> |
                                            <NavLink to={'/eventedit/'+emp.id} className="btn btn-secondary">Edit Event</NavLink>   
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table> 
                 </div>
            </div>
        </div>
        )
    }
}

export default Events