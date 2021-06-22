import axios from "axios";
import React,{ Component } from "react";
import EventEdit from "./EventEdit";

class EmployeeDetails extends Component{

    constructor(props){
        super(props);
        this.state={
            employee:{}
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3000/employees/' +this.props.match.params.id)
        .then(result=>{
            this.setState({employee:result.data})
            console.log(this.state.employee);
        })
        .catch(
            error=>{console.log(error)}
        )
    }

    deleteEmployee(id){
        axios.delete('http://localhost:3000/employees/' +id)
                .then(result=>{
                    alert("employee id is deleted : "+id)
                    this.props.history.push('/emplist')
                })
                .catch()
        
    }

    navigateBack(){
        axios.get('http://localhost:3000/employees')
                .then(result => {
                    this.props.history.push('/eventlist')
                    console.log(this.state.employees)
                })
                .catch(error => {
                    console.log("Error caught : " + error)
                })
    }
    editEvent(id){

    }
    render(){
        return(
    <div className="container">
        <div className="p-5 mb-4 bg-light rounded-3">            
          <div className="container-fluid py-5 text-center">
            <h1 className="display-5 fw-bold">Employee Detail</h1>     
            <div class="card">
                <div class="card-header fw-bold">
                    Employee Detail of ID : {this.props.match.params.id}
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Event Organiser Name : {this.state.employee.organisername}</li>
                        <li class="list-group-item">Event Name : {this.state.employee.eventname}</li>
                        <li class="list-group-item">Event Timing : {this.state.employee.eventtiming}</li> 
                        <li class="list-group-item">Event Place : {this.state.employee.eventplace}</li>                    
                </ul>
                </div>
                <div class="card-footer">
                  <button className="btn btn-secondary" onClick={this.deleteEmployee.bind(this,this.state.employee.id)}>Delete</button> |
                  <button className="btn btn-secondary" onClick={this.editEvent} >Update</button>|
                  <button className="btn btn-secondary" onClick={this.navigateBack.bind(this,this.state.employee)}>Back</button>
                </div>
            </div>
        </div>
    </div>
        )
    }
}

export default EmployeeDetails;