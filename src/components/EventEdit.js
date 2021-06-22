import React,{ Component } from "react";
import axios from "axios";

class EventEdit extends Component{

    constructor(props){
        super(props);
        this.state={
            id:null,
            organisername:null,
            eventname:null,
            eventtiming:null,
            eventplace:null
        };
    }

    componentWillMount(){
        this.getEventDetails();
    }

    getEventDetails(){
        axios.get('http://localhost:3000/employees/' +this.props.match.params.id)
        .then(result=>{
            this.setState({
                id:result.data.id,
                organisername:result.data.organisername,
                eventname:result.data.eventname,
                eventtiming:result.data.eventtiming,
                eventplace:result.data.eventplace
            })
            console.log(this.state);
            console.log("Data retrived successfully");
        })
        .catch(
            error=>{console.log(error)}
        )
    }
    handleSubmit = event =>{
        event.preventDefault();
        const employee={
            id:this.state.id,
            organisername:this.state.organisername,
            eventname:this.state.eventname,
            eventtiming:this.state.eventtiming,
            eventplace:this.state.eventplace
        }
        console.log(employee);
        console.log('employee got')
        axios.put('http://localhost:3000/employees/'+this.props.match.params.id,employee)
        .then(result => {
            console.log('employee added successfully')
            this.props.history.push('/eventlist')
        })
        .catch(error => {console.log(error)})
    }
    handleChange = event =>{
        event.preventDefault();
        const{name, value} = event.target;
        this.setState({[name]:value});
        console.log(this.state);
    }
    render(){
        return(
            <div className="container">
            <div className="p-5 mb-4 bg-light rounded-3">
            <div className="container-fluid py-5">
                <h1 className="display-5 fw-bold">Edit Event Page</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                                <label>Organiser Name</label>
                                <input type="text" className="form-control" name="organisername" value={this.state.organisername} onChange={this.handleChange} />
                     </div>
                     <div className="form-group">
                                <label>Event Name</label>
                                <input type="text" className="form-control" name="eventname" value={this.state.eventname} onChange={this.handleChange} />
                     </div>
                     <div className="form-group">
                                <label>Event Timing</label>
                                <input type="text" className="form-control" name="eventtiming" value={this.state.eventtiming}  onChange={this.handleChange}/>
                     </div> 
                     <div className="form-group">
                                <label>Event Place</label>
                                <input type="text" className="form-control" name="eventplace" value={this.state.eventplace}  onChange={this.handleChange}/>
                     </div>   
                     <br></br>
                     <button type="submit" className="btn btn-secondary">Update Event</button>                  
                </form>                
            </div>
            </div>
            </div>
        )
    }
}

export default EventEdit;